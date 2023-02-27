pipeline {
    agent {
        docker { image 'jenkins/jenkins:lts-jdk11' }
    }
    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/phucntp/clone-tiktok-fe.git'
            }
        }
        stage('Build') { 
            steps {
                sh 'docker-compose up --build --force-recreate'
            }
        }
    }
}