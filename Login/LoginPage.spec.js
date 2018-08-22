'use strict';  

var myPO = require('./LoginPage.po.js');  
var dataObj = require('../TestData.json');

describe('Login Page', function() {

  it('should display incorrect userid error message when entering incorrect userid', function() {
	myPO.login(dataObj.LoginData.Users[0].username,dataObj.LoginData.Users[0].passwordField);
	
	var errorMessage = myPO.getLoginErrorMessage();
	
	expect (errorMessage.isPresent()).toBe(true); 
	expect (errorMessage.isDisplayed()).toBe(true);
	});
	

	it('should display required field error message and not go to main menu when password entering as blank', function() {
		myPO.login(dataObj.LoginData.Users[1].username,dataObj.LoginData.Users[1].passwordField);
		var menu = myPO.getMenuElement();
		expect (menu.isPresent()).toBe(false);
		 
	 	});


	it('should display required field error message and not go to main menu when username entering as blank', function() {
		myPO.login(dataObj.LoginData.Users[2].username,dataObj.LoginData.Users[2].passwordField);
		var menu = myPO.getMenuElement();
		since(function () {
			return 'Error message is not displayed for blank username';
		  }).
		expect (menu.isPresent()).toBe(false);
		 
		});

	it('should display incorrect password error message when entering incorrect password', function() {
		myPO.login(dataObj.LoginData.Users[3].username,dataObj.LoginData.Users[3].passwordField);
		
		var errorMessage = myPO.getLoginErrorMessage();
		//expect (errorMessage.isPresent()).toBe(true); 
		//expect (errorMessage.isDisplayed()).toBe(true);

		since(function () {
			return 'Error message is not displayed for incorrect password';
		  }).
		  expect (errorMessage.isPresent()).toBe(true);
		});
	

  it('should go to main menu when entering correct password', function() {
	browser.get("https://demo1.pharmacuity.com/");  
	myPO.login(dataObj.LoginData.Users[4].username,dataObj.LoginData.Users[4].passwordField);
	
	var errorMessage =myPO.getLoginErrorMessage();
	expect (errorMessage.isPresent()).toBe(false); 
	
 	var menu = myPO.getMenuElement();
 	expect (menu.isDisplayed()).toBe(true);
 });
});
