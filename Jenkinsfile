pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                bat 'npm install'
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
    }
}