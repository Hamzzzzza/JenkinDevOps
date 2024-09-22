pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                bat 'npm install'
                bat 'npm install express'  // Ensure express is installed
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
                    bat 'npx mocha test.mjs'
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
                bat 'docker run -d -p 8080:8080 jenkins-sample-app:latest'
            }
        }
    }
}
