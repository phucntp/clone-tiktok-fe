pipeline {
    agent any
    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/phucntp/clone-tiktok-fe.git'
            }
        }
        stage('Build') { 
            withDockerRegistry([ credentialsId: "Docker-hub", url: "" ]) {
                sh 'docker build -t phucntp/jenkins-basic:tagname .'
                sh 'docker push phucntp/jenkins-basic:tagname'
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
        // stage('Push') {
        //     steps {
        //         sh 'docker push phucntp/jenkins-basic:tagname'
        //     }
        // }
    }
}