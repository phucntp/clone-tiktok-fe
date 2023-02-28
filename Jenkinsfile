pipeline {
    agent {
        docker { image 'jenkins/jenkins' }
    }
    environment {
        DOCKERHUB_CREDENTIALS = credentials('Docker-hub')
    }    
    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/phucntp/clone-tiktok-fe.git'
            }
        }
//         stage('Build') { 
//             steps {
//                 script {
//                     withCredentials([usernamePassword(credentialsId: 'Docker-hub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
//                         sh 'docker build -t phucntp/jenkins-basic:tagname .'
//                         sh 'docker push phucntp/jenkins-basic:tagname'
//                     }
//                 }
//             }
//         }
//         stage('Build image') {
//             steps {
//                 script {
//                 dockerImage = docker.build("phucntp/jenkins-basic:tagname")
//             }}
//             }
            
        stage('Push image') {
             steps {
//                  script {
//                      withDockerRegistry(credentialsId: 'Docker-hub', url: '') {
     sh 'docker build -t phucntp/jenkins-basic:tagname .'
}
//                  withDockerServer([uri: 'https://hub.docker.com/repository/docker/phucntp/jenkins-basic']) {
//                 sh 'docker build -t phucntp/jenkins-basic:tagname .'
//                 sh 'docker push phucntp/jenkins-basic:tagname'
//                 }
//                  }
//              } 
            }    
        // stage('Push') {
        //     steps {
        //         sh 'docker push phucntp/jenkins-basic:tagname'
        //     }
        // }
    }
}
