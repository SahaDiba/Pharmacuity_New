'use strict';  
var highlightEle = require('../Utility.js');

module.exports = { 

    ForgotPwd: function() {  
        var pwdchangebtn=element(by.xpath('//*[@id="AuthSignIn"]/form/md-dialog-actions/div/button[1]/span'));
		highlightEle.highlightElement(pwdchangebtn);
		pwdchangebtn.click();
		browser.waitForAngular();
		browser.sleep(1000);

		
    }, 

    getPromptMessage: function()
	{
		return element(by.xpath('//*[@id="AuthSignIn"]/form/md-dialog-content/div/div[2]/div[1]'));
    },
    
    getBackToLoginBtn: function()
	{
		return element(by.xpath('//*[@id="AuthSignIn"]/form/md-dialog-actions/div/button[1]/span'));
    },

    getSubmitBtn: function()
	{
		return element(by.xpath('//*[@id="submit"]/span'));
	},
	
	clickOnSubmitBtn: function()
	{
		var btnSubmit= element(by.xpath('//*[@id="submit"]/span'));
		highlightEle.highlightElement(btnSubmit);
		btnSubmit.click();
		browser.waitForAngular();
	},
	
	clickOnBackToLoginBtn: function()
	{
		var btnBackToLogin=element(by.xpath('//*[@id="AuthSignIn"]/form/md-dialog-actions/div/button[1]/span'));
		highlightEle.highlightElement(btnBackToLogin);
		btnBackToLogin.click();
	},
	enterEmailAddress: function(address)
	{
		var emailAddress = element(by.xpath('//*[@id="email"]'));
		emailAddress.sendKeys(address);
	},
	
	getErrorMessage: function()
	{
		return element(by.xpath('//*[@id="modal-body-auth"]/div[2]'));
	},
	clickOnDone: function()
	{
		var btnDone = element(by.xpath('//*[@id="Done"]/span'));
		highlightEle.highlightElement(btnDone);
		btnDone.click();
	},
	
	enterNewPassword: function(newpwd)
	{
		var newPasswpord = element(by.xpath('//*[@id="NewPassword"]'));
		newPasswpord.sendKeys(newpwd);
	},

	enterConfirmPassword: function(confirmpwd)
	{
		var confirmPasswpord = element(by.xpath('//*[@id="ConfirmPassword"]'));
		confirmPasswpord.sendKeys(confirmpwd);
	},
	getErrorMessageNewPwd: function()
	{
		return element(by.xpath('//*[@id="dialogContent_1"]/form/md-dialog-content/div/div[2]/div[1]/div/div'));
	},
	getErrorMessageConfirmPwd: function()
	{
		return element(by.xpath('//*[@id="dialogContent_1"]/form/md-dialog-content/div/div[2]/div[2]/div/div'));
	},
	getMessageForSuccess: function()
	{
		return element(by.xpath('//*[@id="dialogContent_1"]/form/md-dialog-content/div/div[1]/span'));
	}

	
}