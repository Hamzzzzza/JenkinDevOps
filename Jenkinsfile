pipeline {
    agent any

    environment {
        CC_TEST_REPORTER_ID = '769879dedf982c38dc2b6135bea09a322ae28f38fd34032759ea3d7a8bda88ec'  // Replace with your actual CodeClimate Reporter ID
    }
    stages {
        stage('Build') {
            steps {
                bat 'npm install'
                bat 'npm install express'  // Ensure express is installed
                bat 'npm install selenium-webdriver'
                bat 'npm install nyc --save-dev'
            }
        }
        /*
        stage('Build Docker Image') {
            steps {
                script {
                    bat 'docker build -t jenkins-sample-app:latest .'
                    bat 'docker save jenkins-sample-app:latest > jenkins-sample-app.tar'
                }
            }
        }
        */
        stage('Run Tests') {
            steps {
                script {
                    // Start your app
                    bat 'start /B node app.js'

                    // Run your Selenium tests
                    bat 'npx mocha test/test.mjs'
                }
            }
        }
        stage('Code Quality Analysis') {
            steps {
                script {
                    // Before running the tests, we tell CodeClimate to prepare for coverage report
                    bat 'C:\\cc-test-reporter.exe before-build'
                    
                    // Re-run the tests with coverage to ensure the coverage is reported
                    bat 'npx nyc --reporter=lcov --report-dir coverage mocha test/test.mjs'

                    // Format the lcov report for CodeClimate
                    bat 'C:\\cc-test-reporter.exe format-coverage --input-type lcov --output coverage/codeclimate.json'

                    // Upload the formatted coverage report to CodeClimate
                    bat 'C:\\cc-test-reporter.exe upload-coverage --input coverage/codeclimate.json'
                    // Send the report to CodeClimate
                    // bat 'C:\\cc-test-reporter.exe after-build'
                }
            }
        }

        /*
        stage('Archive Artifact') {
            steps {
                archiveArtifacts artifacts: 'jenkins-sample-app.tar', allowEmptyArchive: false
            }
        }
        */
        stage('Deploy') {
            steps {
                // Stop any running container that might be using the port
                bat 'docker ps -q --filter "ancestor=jenkins-sample-app:latest" | for /F %i in (\'findstr /r .\') do docker stop %i'
                bat 'docker ps -a -q --filter "ancestor=jenkins-sample-app:latest" | for /F %i in (\'findstr /r .\') do docker rm %i'

                bat 'docker run -d -p 8083:8080 jenkins-sample-app:latest' // Use 8082 externally
            }
        }
    }
}
