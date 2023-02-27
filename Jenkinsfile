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
                script {
                    withCredentials([usernamePassword(credentialsId: 'Docker-hub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        bat 'docker build -t phucntp/jenkins-basic:tagname .'
                        bat 'docker push phucntp/jenkins-basic:tagname'
                    }
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