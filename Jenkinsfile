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
                    bat 'docker build -t your-node-app:latest .'
                    bat 'docker save your-node-app:latest > your-node-app.tar'
                }
            }
        }
        stage('Archive Artifact') {
            steps {
                archiveArtifacts artifacts: 'your-node-app.tar.gz', allowEmptyArchive: false
            }
        }
    }
}