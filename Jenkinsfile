pipeline {
     agent any
     stages {
        stage("Build") {
            steps {
                sh "sudo npm install"
                sh "sudo npm run build"
            }
        }
        stage("Deploy") {
            steps {
                sh "sudo rm -rf /var/www/jenkins-react-app"
				sh "sudo mkdir -p /var/www/jenkins-react-app"
                sh "sudo cp -R ${WORKSPACE}/build/* /var/www/jenkins-react-app/*"
            }
        }
    }
}