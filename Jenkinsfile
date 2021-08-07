properties([buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '', numToKeepStr: '2'))])
pipeline {
	agent any
	options {
    timeout(time: 60)
		disableResume()
		disableConcurrentBuilds()
    	}
	stages {
		stage ("Check for branch") {
			steps {
				script {
					if (env.BRANCH_NAME == 'uat') {
						stage('npm install') {
							sh "npm install"
						}
						stage('npm install') {
							sh "npm install"
						}
						stage('ng test') {
							sh "ng test --browsers=ChromeHeadlessCI --watch false --code-coverage"
						}
						stage('SonarQube Analaysis') {
							def scannerHome = tool 'SonarQubeScanner'
							withSonarQubeEnv('sonar') {
								sh "${scannerHome}/bin/sonar-scanner"
							}
						}
            	stage("SonarQube Quality Gate") {
						    timeout(time: 1, unit: 'HOURS') {
							    waitForQualityGate abortPipeline: false
						    }
						}
					}
				}
			}
		}
	}
	post { 
		always { 
			cleanWs()
			dir("${workspace}@tmp") {
                		deleteDir()
            		}
        	}
    	}
}
