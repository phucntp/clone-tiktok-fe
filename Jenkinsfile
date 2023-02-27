pipeline {
    agent any
    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/phucntp/clone-tiktok-fe.git'
            }
        }
        // stage('Build') { 
        //     steps {
        //         script {
        //             withCredentials([usernamePassword(credentialsId: 'Docker-hub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
        //                 sh 'docker build -t phucntp/jenkins-basic:tagname .'
        //                 sh 'docker push phucntp/jenkins-basic:tagname'
        //             }
        //         }
        //     }
        // }
        stage('Build image') {
            steps {
                dockerImage = docker.build("phucntp/jenkins-basic:tagname")
            }
            }
            
        stage('Push image') {
             steps {
                withDockerRegistry([ credentialsId: "Docker-hub", url: "" ]) {
                dockerImage.push()
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