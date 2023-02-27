pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                sh 'docker build -t jenkins/jenkins:lts-jdk11 .'
            }
        }
    }
}