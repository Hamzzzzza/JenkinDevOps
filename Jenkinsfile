pipeline {
    agent any

    environment {
        CC_TEST_REPORTER_ID = '769879dedf982c38dc2b6135bea09a322ae28f38fd34032759ea3d7a8bda88ec'
        AWS_DEFAULT_REGION = 'us-east-1'
    }
    stages {
        stage('Build') {
            steps {
                bat 'npm install'
                bat 'npm install express'
                bat 'npm install selenium-webdriver'
                bat 'npm install nyc --save-dev'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    bat 'docker build -t jenkins-sample-app:latest .'
                    bat 'docker save jenkins-sample-app:latest > jenkins-sample-app.tar'
                }
            }
        }
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
                    bat 'C:\\cc-test-reporter.exe after-build'
                }
            }
        }
        stage('Archive Artifact') {
            steps {
                archiveArtifacts artifacts: 'jenkins-sample-app.tar', allowEmptyArchive: false
            }
        }
        stage('Deploy') {
            steps {
                script {

                    // Stop any running services before starting the new ones
                    bat 'docker-compose down'

                    // Build and start the services in detached mode
                    bat 'docker-compose up -d --build'
                }
            }
        }
        stage('Release') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-credentials']]) {
                    script {
                        bat 'aws deploy create-deployment --application-name NodeAppDeploy --deployment-group-name NodeAppDeploymentGroup --s3-location bucket=my-node-app-bucket-2,bundleType=zip,key=JenkinsDevOpsApp.zip --region us-east-1'
                    }
                }
            }
        }
        /* stage('Release to EC2') {
            steps {
                script {
                    bat '''
                    ssh -i E:/Deakin/DevOpsKey.pem -o StrictHostKeyChecking=no ec2-user@54.224.71.251 "cd ~/ && git clone https://github.com/Hamzzzzza/JenkinDevOps.git || (cd ~/JenkinDevOps && git pull)"
                    ssh -i E:/Deakin/DevOpsKey.pem -o StrictHostKeyChecking=no ec2-user@54.224.71.251 "sudo npm install -g pm2 && cd ~/JenkinDevOps && npm install && pm2 describe app || pm2 start app.js --name app"
                    '''
                }
            }
        } */
        stage('Monitor') {
            steps {
                echo 'Monitoring application with New Relic...'
                // Here, i used New Relic’s and simply starting the app as it already integrates New Relic
            }
        }
    }
}
