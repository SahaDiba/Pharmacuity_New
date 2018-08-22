'use strict';
var myPOLogin = require('../Login/LoginPage.po.js');
var myPO = require('./LandingPage.po.js');
var dataObj = require('../TestData.json');

describe('Landing Page', function () {
  
  // beforeEach(function () {
  //   browser.get("http://qa.pharmacuity.healthcare/EH/");
	// 	browser.waitForAngular();
  //   myPOLogin.login(dataObj.LoginData.Users[4].username, dataObj.LoginData.Users[4].passwordField);
  //   browser.driver.sleep(1000);
    
    
  // });
  
  it('should have Option “About Pharmacuity” when login with any valid user', function () {
    browser.get(dataObj.LoginData.url);
		browser.waitForAngular();
    myPOLogin.login(dataObj.LoginData.Users[4].username, dataObj.LoginData.Users[4].passwordField);
    browser.driver.sleep(1000);

    myPO.clickOnSelectAnApplication();
    browser.driver.sleep(2000);
   
    element.all(by.repeater('phx in ctrl.phxModules')).then(function (item) {
    
           item[0].getText().then(function(Text){
            since(function () {
              return 'About Pharmacuity option is not present';
            }). 
           expect(Text==dataObj.ApplicationList[0]).toBe(true);
           })
        })
    
  });
  it('should have Option “Metrics and Benchmarking” when login with any valid user', function () {
    browser.get(dataObj.LoginData.url);
		browser.waitForAngular();
    myPOLogin.login(dataObj.LoginData.Users[4].username, dataObj.LoginData.Users[4].passwordField);
    browser.driver.sleep(1000);

    myPO.clickOnSelectAnApplication();
    browser.driver.sleep(1000); 
    element.all(by.repeater('phx in ctrl.phxModules')).then(function (item) {
    
      item[1].getText().then(function(Text){
      expect(Text==dataObj.ApplicationList[1]).toBe(true);
      })
   })

  });

  it('should have Option “Site,PI & Recuitment Optimization” when login with any valid user', function () {
    browser.get(dataObj.LoginData.url);
		browser.waitForAngular();
    myPOLogin.login(dataObj.LoginData.Users[4].username, dataObj.LoginData.Users[4].passwordField);
    browser.driver.sleep(1000);

    myPO.clickOnSelectAnApplication();
    browser.driver.sleep(1000);
    element.all(by.repeater('phx in ctrl.phxModules')).then(function (item) {
    
      item[2].getText().then(function(Text){
      expect(Text==dataObj.ApplicationList[2]).toBe(true);
      })
   })

  });

  it('should have Option “Inovvative Protocol Design” when login with any valid user', function () {
    browser.get(dataObj.LoginData.url);
		browser.waitForAngular();
    myPOLogin.login(dataObj.LoginData.Users[4].username, dataObj.LoginData.Users[4].passwordField);
    browser.driver.sleep(1000);

    myPO.clickOnSelectAnApplication();
    browser.driver.sleep(1000);
    element.all(by.repeater('phx in ctrl.phxModules')).then(function (item) {
    
      item[3].getText().then(function(Text){
      expect(Text==dataObj.ApplicationList[3]).toBe(true);
      })
   })
  });

  it('should have Option “Trial Forcasting” when login with any valid user', function () {
    browser.get(dataObj.LoginData.url);
		browser.waitForAngular();
    myPOLogin.login(dataObj.LoginData.Users[4].username, dataObj.LoginData.Users[4].passwordField);
    browser.driver.sleep(1000);

    myPO.clickOnSelectAnApplication();
    browser.driver.sleep(1000);
    element.all(by.repeater('phx in ctrl.phxModules')).then(function (item) {
    
      item[4].getText().then(function(Text){
      expect(Text==dataObj.ApplicationList[4]).toBe(true);
      })
   })

  });
  it('the user should be able to logout and not able to access menu untill login again', function () {
    browser.get(dataObj.LoginData.url);
		browser.waitForAngular();
    myPOLogin.login(dataObj.LoginData.Users[4].username, dataObj.LoginData.Users[4].passwordField);
    browser.driver.sleep(1000);

    myPO.clickOnLogoutButton();
    expect(browser.getTitle()).toEqual(dataObj.LoginData.title);
    var options = myPO.getSelectAnApplication();
    expect(options.isPresent()).toBe(false);

  });

  it('should display only 2 options “About Pharmacuity” and “Metrics and Benchmarking” when login with the Roche user', function () {
    browser.get("https://demo1.pharmacuity.com/#/login");
		browser.waitForAngular();
    
    myPOLogin.login(dataObj.LoginData.rocheuser,dataObj.LoginData.password);
    myPO.clickOnSelectAnApplication();
    browser.driver.sleep(1000);

    element.all(by.repeater('phx in ctrl.phxModules')).then(function (item) {
    
      item[0].getText().then(function(Text){
      expect(Text==dataObj.ApplicationList[0]).toBe(true);
      })

      item[1].getText().then(function(Text){
        expect(Text==dataObj.ApplicationList[1]).toBe(true);
        })
   })

  });


});