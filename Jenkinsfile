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
        stage('Install Selenium') {
            steps {
                bat 'npm install selenium-webdriver'
            }
        }
        stage('Install ChromeDriver') {
            steps {
                // Download and install ChromeDriver if not already present
                script {
                    if (isUnix()) {
                        sh 'wget https://chromedriver.storage.googleapis.com/your-version/chromedriver_linux64.zip'
                        sh 'unzip chromedriver_linux64.zip'
                        sh 'sudo mv chromedriver /usr/local/bin/'
                    } else {
                        bat 'curl -O https://chromedriver.storage.googleapis.com/your-version/chromedriver_win32.zip'
                        bat 'unzip chromedriver_win32.zip'
                        bat 'move chromedriver.exe C:\\path\\to\\your\\directory'
                    }
                }
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    // Start your app
                    bat 'start /B node app.js'

                    // Run your Selenium tests
                    bat 'npx mocha test.js'
                }
            }
        }
        stage('Archive Artifact') {
            steps {
                archiveArtifacts artifacts: 'jenkins-sample-app.tar', allowEmptyArchive: false
            }
        }
        
    }
}
