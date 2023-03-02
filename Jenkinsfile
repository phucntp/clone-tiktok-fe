pipeline {
    agent any
    stages {
        stage('Initialize') {
            steps{
                script {
                    def dockerHome = tool 'docker'
                    env.PATH = "${dockerHome}/bin:${env.PATH}"
                }
            }
        }
        stage('Clone') {
            steps {
                git 'https://github.com/phucntp/clone-tiktok-fe.git'
            }
        }
        stage('Push image') {
             steps {
                 script {
                     withDockerRegistry(credentialsId: 'Docker-hub', toolName: 'docker', url: 'https://index.docker.io/v1/') {
                         sh 'docker build -t phucntp/jenkins-basic:tagname .'
                         sh 'docker push phucntp/jenkins-basic:tagname'
                    }
                 }
            }
        }    
    }
}
