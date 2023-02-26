pipeline {
    agent {
        docker {
            image 'jenkins/jenkins:lts-jdk11' 
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'yarn install' 
            }
        }
    }
}