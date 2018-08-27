var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var jasmineReporters = require('jasmine-reporters');
var MailListener = require("mail-listener2");


exports.config = {
	framework: 'jasmine2',
	seleniumjar: '.\node_modules\protractor\selenium\selenium-server-standalone-2.45.0.jar',
	chromeOnly:true,

	//seleniumAddress: 'http://localhost:4444/wd/hub',
	suites: {
		//specs: ['./Home/HomePage.spec.js','./Login/LoginPage.spec.js','./landingPage/Landing.spec.js','./MetricsAndBenchmarking/MetricsAndBenchmarking.spec.js','./PF_To_SA/PF_To_SA.spec.js','./FSA_To_FPI/FSA_To_FPI.spec.js','./SA_To_FPI/SA_To_FPI.spec.js']
	//'./ForgotPassword/ForgotPassword.spec.js',

	//specs: ['./Home/HomePage.spec.js','./Login/LoginPage.spec.js','./landingPage/LandingPage.spec.js','./MetricsAndBenchmarking/MetricsAndBenchmarking.spec.js','./PF_To_SA/PF_To_SA.spec.js','./M&B-FPI_To_LPI/FPI_To_LPI.spec.js','./TF_FunctionalView/TrialForecasting_PF_To_SA.spec.js','./TF_FunctionalView/TrialForecasting_FPI_To_LPI.spec.js','./TF_FunctionalView/TrialForecasting_PF_To_LPI.spec.js']
	//,'./landingPage/LandingPage.spec.js','./MetricsAndBenchmarking/MetricsAndBenchmarking.spec.js','./PF_To_SA/PF_To_SA.spec.js','./M&B-FPI_To_LPI/FPI_To_LPI.spec.js']
	//,'./TF_FunctionalView/TrialForecasting_PF_To_SA.spec.js','./TF_FunctionalView/TrialForecasting_FPI_To_LPI.spec.js','./TF_FunctionalView/TrialForecasting_PF_To_LPI.spec.js'

	specs: ['./Home/HomePage.spec.js','./M&B-FPI_To_LPI/FPI_To_LPI.spec.js']
	
	//specs: ['./Home/HomePage.spec.js','./TF_FunctionalView/TrialForecasting_PF_To_SA.spec.js']
	
	//specs: ['./Home/HomePage.spec.js','./TF_FunctionalView/TrialForecasting_FPI_To_LPI.spec.js']
	//specs: ['./Home/HomePage.spec.js','./TF_FunctionalView/TrialForecasting_PF_To_LPI.spec.js']
	
	//specs: ['./Home/HomePage.spec.js','./PF_To_SA/PF_To_SA.spec.js']
	//specs: ['./Home/HomePage.spec.js','./PF_To_SA/PF_To_SA.spec.js','./M&B-FPI_To_LPI/FPI_To_LPI.spec.js']
	//specs: ['./Home/HomePage.spec.js','./TF_CountryPerformance/CountryPerformance.spec.js']
	},
	onPrepare: function () {
		browser.manage().timeouts().setScriptTimeout(240000);
		var folderName = (new Date()).toString().split(' ').splice(1, 4).join(' ');
		var mkdirp = require('mkdirp');
		var newFolder = "./reports/" + folderName;

		//Email
		var emailDate = new Date().getTime();
		global.mailListener = new MailListener({
			username: "diba.saha@tcg-digital.com",  //Email Address of the user
			password: "Banani@2011",  //Password
			host: "imap.gmail.com",
			port: 993,
			tls: true,
			//mailbox: "[Gmail]/Spam",
			mailbox: "Spam",
			searchFilter: [["FROM", "admin@pharmacuity.com"], ["SINCE", emailDate]],
			markSeen: true,
			fetchUnreadOnStart: true,
			attachments: false,
			mailParserOptions: { streamAttachments: false }
		})
		
		
		global.mailListener.on("server:connected", () => { console.log("Imap Connected"); })
		global.mailListener.on("server:disconnected", () => { console.log("Imap Disconnected"); })
		global.mailListener.on("error", (error) => { console.log(err); });

		String.prototype.replaceAll = function (search, replacement) {
			var target = this;
			return target.replace(new RegExp(search, 'g'), replacement);
		};
		newFolder = newFolder.replaceAll(":", "-");

		var junitReporter = new jasmineReporters.JUnitXmlReporter({
			savePath: newFolder,
			consolidateAll: true
		});

		mkdirp(newFolder, function (err) {
			if (err) {
				console.error(err);

			} else {
				//xml report
				jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter(junitReporter));
				jasmine.getEnv().defaultTimeoutInterval = 360000;

				// jasmine.getEnv().topSuite().beforeEach({
				// 	fn: function () {
				// 		//log in
				// 		browser.get("http://qa.pharmacuity.healthcare/EH/");
				// 		browser.waitForAngular();

				// 	}
				// });
				//html report
				jasmine.getEnv().addReporter(
					new Jasmine2HtmlReporter({
						savePath: newFolder,
						screenshotsFolder: 'Screenshots',
						takeScreenshots: true,
						takeScreenshotsOnlyOnFailures: true,
						fileName: 'e2eTestReport',
						fileNameDateSuffix: true,
						showPassed: true
					})
				);

			}
		});
		browser.driver.manage().window().maximize();
	},
	params: {
		getLastEmail: function () {
			console.log("Waiting for email...");
			mailListener.start();
			const deferred = protractor.promise.defer();
			mailListener.on("mail", (mail, seqno, attributes) => {
				mailListener.stop();
				deferred.fulfill(mail);
			});
			return deferred.promise;
		}
			
		// getLastEmail: function () {
		// 	mailListener.start();
		// 	const deferred = protractor.promise.defer();
		// 	var mailList = new Array();
		// 	mailListener.on("mail", (mail, seqno, attributes) => {
		// 		mailList.push(mail)
		// 		deferred.fulfill(mailList);
		// 	});
		// 	return deferred.promise;
		// }
		
	},
	 
	jasmineNodeOpts: {
		// If true, print colors to the terminal.
		showColors: true,
		// Default time to wait in ms before a test fails.
		defaultTimeoutInterval: 3600000
		

	},


};
