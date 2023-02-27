pipeline {
    agent any
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