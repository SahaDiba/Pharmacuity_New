'use strict';  
var highlightEle = require('../Utility.js');
var dataObj = require('../TestData.json');
module.exports = {  
   
    login: function(userString, passString) {  
        var username=element(by.id('username'));
		var password=element(by.id('password'));
		var submit=element(by.xpath('//*[@id="submit"]'));
		username.clear();
		password.clear();
		//highlightEle.highlightElement(username);
		username.sendKeys(userString);
		//highlightEle.highlightElement(password);
		password.sendKeys(passString);
		highlightEle.highlightElement(submit);
		submit.click();
		browser.driver.sleep(8000);
		browser.waitForAngular();

    },  
	getLoginErrorMessage: function()
	{
		
		return element(by.xpath('//*[@id="AuthSignIn"]/form/md-dialog-content/div/div[2]/div[3]/span/span'));
				
	},
	getMenuElement: function()
	{
		return element(by.xpath('//*[@id="ng-app"]/body/header/div[1]/div/md-menu-bar/md-menu/button/span'));
		
		
	},
	getHtmlErrorMessage: function()
	{
		return element(By.css("input:required"));
		
	}
	
	
};