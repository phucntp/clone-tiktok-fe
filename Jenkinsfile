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
//         stage('Build image') {
//             steps {
//                 script {
//                 dockerImage = docker.build("phucntp/jenkins-basic:tagname")
//             }}
//             }
            
        stage('Push image') {
             steps {
                 script {
//                      withDockerRegistry(credentialsId: 'Docker-hub', url: '') {
//                      docker.withRegistry('https://registry.hub.docker.com', 'Docker-hub') {
//                         sh 'docker build -t phucntp/jenkins-basic:tagname .'
//                     }
                     withDockerRegistry(credentialsId: 'Docker-hub', toolName: 'docker', url: 'https://index.docker.io/v1/') {
                         sh 'docker build -t phucntp/jenkins-basic:tagname .'
                         sh 'docker push phucntp/jenkins-basic:tagname'
                    }
//                  withDockerServer([uri: 'https://hub.docker.com/repository/docker/phucntp/jenkins-basic']) {
//                 sh 'docker build -t phucntp/jenkins-basic:tagname .'
//                 sh 'docker push phucntp/jenkins-basic:tagname'
//                 }
                 }
                }
            }    
        // stage('Push') {
        //     steps {
        //         sh 'docker push phucntp/jenkins-basic:tagname'
        //     }
        }

}
