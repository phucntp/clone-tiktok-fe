pipeline {
    agent any
    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/phucntp/clone-tiktok-fe.git'
            }
        }
        stage('Initialize'){
            def dockerHome = tool 'docker-jenkins'
            env.PATH = "${dockerHome}/bin:${env.PATH}"
        }
        stage('Build') { 
            steps {
                sh 'docker build -t phucntp/jenkins-basic:tagname .'
                sh 'docker push phucntp/jenkins-basic:tagname'
            }
        }
        // stage('Push') {
        //     steps {
        //         sh 'docker push phucntp/jenkins-basic:tagname'
        //     }
        // }
    }
}