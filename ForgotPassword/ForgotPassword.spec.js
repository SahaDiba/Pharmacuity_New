'use strict';

var myPO = require('./ForgotPassword.po.js');
var dataObj = require('../TestData.json');
var myPOLogin = require('../Login/LoginPage.po.js');
var myPOLandingPage = require('../LandingPage/LandingPage.po.js');

describe('Forgot Password page', function () {
  var getLink;
  it('should show the prompt message when user clicks on FORGOT PASSWORD', function () {
      myPO.ForgotPwd();
      browser.waitForAngular();
      var promptMsg = myPO.getPromptMessage();
      expect(promptMsg.getText()).toEqual(dataObj.ForgotPasswordData.messages[0].promptmsg);

    });

  it('should show the BackToLogin button', function () {
      var btnBackToLogin = myPO.getBackToLoginBtn();
      expect(btnBackToLogin.isPresent()).toBe(true);
      expect(btnBackToLogin.isDisplayed()).toBe(true);
    });

  it('should show the Submit button', function () {
      var btnSubmit = myPO.getSubmitBtn();
      expect(btnSubmit.isPresent()).toBe(true);
      expect(btnSubmit.isDisplayed()).toBe(true);
    });

  it('should go back to the login screen when clicks on BackToLogin button', function() {


      myPO.ForgotPwd(); 
      myPO.clickOnBackToLoginBtn();
      browser.waitForAngular();
      expect(browser.getTitle()).toEqual(dataObj.LoginData.title);

    });

  it('should display a prompt message when enters valid email address and clicks on sumbit', function () {
      myPO.ForgotPwd();
      myPO.enterEmailAddress(dataObj.ForgotPasswordData.emailaddress);
      myPO.clickOnSubmitBtn();
      browser.driver.sleep(1000);
      browser.waitForAngular();
      var errorMsg = myPO.getErrorMessage();
      expect(errorMsg.getText()).toEqual(dataObj.ForgotPasswordData.messages[1].promptmsg);
      myPO.clickOnDone();
      browser.waitForAngular();
      
      browser.wait(browser.params.getLastEmail()).then((email) => {
        var mailHtml = email.html;
        browser.sleep(5000);
        console.log(mailHtml);
        getLink = mailHtml.match(/https:\/\/[^\s<]+resetPassword[^\s<]+/g)[0];
        console.log(new Date());
      });

    //  browser.wait(browser.params.getLastEmail()).then((email) => {
    //     var lastRecentEmail = email[email.length - 1];
    //     console.log(lastRecentEmail.subject);
    //     var mailHtml = email.html;
    //     console.log(mailHtml);
    //   });

    

    });



  it("should show error message when not entering 4 characters new password", function () {
      console.log(new Date());
      console.log("Link-"+getLink);
      browser.sleep(2000);
      browser.get(getLink);
      browser.waitForAngular();
        
      //For 4 characters new password
      myPO.enterNewPassword(dataObj.ForgotPasswordData.Passwords[0].newpassword);
      var errorMessageNewPwd =myPO.getErrorMessageNewPwd();
      expect(errorMessageNewPwd.isDisplayed()).toBe(true);

      

    });

  it("should show error message when entering 8 characters new password", function () {
    
      console.log("Link-"+getLink);
      browser.get(getLink);
      browser.sleep(2000);
      browser.waitForAngular();
      myPO.enterNewPassword(dataObj.ForgotPasswordData.Passwords[1].newpassword);
      var errorMessageNewPwd =myPO.getErrorMessageNewPwd();
      expect(errorMessageNewPwd.isDisplayed()).toBe(true);
      });

  it("should show error message when entering 8 digits new password", function () {

      console.log("Link-"+getLink);
      browser.get(getLink);
      browser.sleep(2000);
      browser.waitForAngular();
      myPO.enterNewPassword(dataObj.ForgotPasswordData.Passwords[2].newpassword);
      var errorMessageNewPwd =myPO.getErrorMessageNewPwd();
      expect(errorMessageNewPwd.isDisplayed()).toBe(true);
    });


  it("should show error message when not entering 4 characters Confirm password", function () {
      console.log(new Date());
      console.log("Link-"+getLink);
      browser.get(getLink);
      browser.waitForAngular();
      
      //For 4 characters new password
      myPO.enterConfirmPassword(dataObj.ForgotPasswordData.Passwords[0].confirmpassword);
      var errorMessageConfirmPwd =myPO.getErrorMessageConfirmPwd();
      expect(errorMessageConfirmPwd.isDisplayed()).toBe(true);

    });

  it("should show error message when entering 8 characters Confirm password", function () {

      console.log("Link-"+getLink);
      browser.get(getLink);
      browser.sleep(2000);
      browser.waitForAngular();
      myPO.enterConfirmPassword(dataObj.ForgotPasswordData.Passwords[1].confirmpassword);
      var errorMessageConfirmPwd =myPO.getErrorMessageConfirmPwd();
      expect(errorMessageConfirmPwd.isDisplayed()).toBe(true);
    });

  it("should show error message when entering 8 digits Confirm password", function () {

      console.log("Link-"+getLink);
      browser.get(getLink);
      browser.sleep(2000);
      browser.waitForAngular();
      myPO.enterConfirmPassword(dataObj.ForgotPasswordData.Passwords[2].confirmpassword);
      var errorMessageConfirmPwd =myPO.getErrorMessageConfirmPwd();
      expect(errorMessageConfirmPwd.isDisplayed()).toBe(true);
    });


  it("should display prompt message for successful password change when entering correct new and confirm password", function () {
      console.log("Link-"+getLink);
      browser.get(getLink);
      browser.sleep(2000);
      browser.waitForAngular();
      myPO.enterNewPassword(dataObj.ForgotPasswordData.Passwords[3].newpassword);
      myPO.enterConfirmPassword(dataObj.ForgotPasswordData.Passwords[3].confirmpassword);
      myPO.clickOnSubmitBtn();
      var successMsg =myPO.getMessageForSuccess();
      expect(successMsg.isDisplayed()).toBe(true);
      myPO.clickOnDone();
        
    });

  it("should redirect to the main landing page when login using the changed password", function () {
        
      myPOLogin.login(dataObj.LoginData.Users[4].username,dataObj.ForgotPasswordData.Passwords[3].newpassword);
      var validateLandingPage = myPOLandingPage.getSelectAnApplication();
      expect(validateLandingPage.isDisplayed()).toBe(true);
    });

});