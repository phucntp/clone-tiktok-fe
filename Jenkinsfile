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
                withDockerRegistry(credentialsId: 'docker-hub', url: 'https://hub.docker.com/r/phucntp/jenkins-basic') {
                    sh 'docker build -t phucntp/jenkins-basic:tagname .'
                    sh 'docker push phucntp/jenkins-basic:tagname'
                }
            }
        }
        // stage('Push') {
        //     steps {
        //         sh 'docker push phucntp/jenkins-basic:tagname'
        //     }
        // }
    }
}