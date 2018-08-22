'use strict';
var myPOLogin = require('../Login/LoginPage.po.js');
var myPOLandingPage = require('../LandingPage/LandingPage.po.js');
var myPO = require('./MetricsAndBenchmarking.po.js');
var dataObj = require('../TestData.json');
var highlightEle = require('../Utility.js');

describe('Metrics And Benchmarking Page', function () {
  
  beforeEach(function () {
    browser.get(dataObj.LoginData.url);
		browser.waitForAngular();
  });
  
  it('should not display filter option', function () {
    myPOLogin.login(dataObj.LoginData.Users[4].username,dataObj.LoginData.Users[4].passwordField);
    myPOLandingPage.clickOnSelectAnApplication();
    myPO.clickMandB();
    var filter = myPO.getFilter();
    expect (filter.isPresent()).toBe(false);

  });

  it('should display Dashboard option', function () {
    myPOLogin.login(dataObj.LoginData.Users[4].username,dataObj.LoginData.Users[4].passwordField);
    myPOLandingPage.clickOnSelectAnApplication();
    myPO.clickMandB();
    var dashBoard = myPO.getDashboardIcon();
    highlightEle.highlightElement(dashBoard);
    expect (dashBoard.isPresent()).toBe(true); 
    expect (dashBoard.isDisplayed()).toBe(true);

  });
  it('should display PF-SA option', function () {
    myPOLogin.login(dataObj.LoginData.Users[4].username,dataObj.LoginData.Users[4].passwordField);
    myPOLandingPage.clickOnSelectAnApplication();
    myPO.clickMandB();
    var PFtoSA = myPO.getPFtoSA();
    highlightEle.highlightElement(PFtoSA);
    expect (PFtoSA.isPresent()).toBe(true); 
    expect (PFtoSA.isDisplayed()).toBe(true);

  });
  
  it('should display SA-FPI option', function () {
    myPOLogin.login(dataObj.LoginData.Users[4].username,dataObj.LoginData.Users[4].passwordField);
    myPOLandingPage.clickOnSelectAnApplication();
    myPO.clickMandB();
    var SAtoFPI = myPO.getSAtoFPI();
    highlightEle.highlightElement(SAtoFPI);
    expect (SAtoFPI.isPresent()).toBe(true); 
    expect (SAtoFPI.isDisplayed()).toBe(true);

  });

  it('should display FPI-LPI option', function () {
    myPOLogin.login(dataObj.LoginData.Users[4].username,dataObj.LoginData.Users[4].passwordField);
    myPOLandingPage.clickOnSelectAnApplication();
    myPO.clickMandB();
    var FPItoLPI = myPO.getFPItoLPI();
    highlightEle.highlightElement(FPItoLPI);
    expect (FPItoLPI.isPresent()).toBe(true); 
    expect (FPItoLPI.isDisplayed()).toBe(true);

  });

  it('should display PF-10THPI option', function () {
    myPOLogin.login(dataObj.LoginData.Users[4].username,dataObj.LoginData.Users[4].passwordField);
    myPOLandingPage.clickOnSelectAnApplication();
    myPO.clickMandB();
    var PFto10THPI = myPO.getPFto10THPI();
    highlightEle.highlightElement(PFto10THPI);
    expect (PFto10THPI.isPresent()).toBe(true); 
    expect (PFto10THPI.isDisplayed()).toBe(true);
  });

  it('should display ERATE option', function () {
    myPOLogin.login(dataObj.LoginData.Users[4].username,dataObj.LoginData.Users[4].passwordField);
    myPOLandingPage.clickOnSelectAnApplication();
    myPO.clickMandB();
    var eRate = myPO.getERATE();
    highlightEle.highlightElement(eRate);
    expect (eRate.isPresent()).toBe(true); 
    expect (eRate.isDisplayed()).toBe(true);
  });

  it('should display E BINS option', function () {
    myPOLogin.login(dataObj.LoginData.Users[4].username,dataObj.LoginData.Users[4].passwordField);
    myPOLandingPage.clickOnSelectAnApplication();
    myPO.clickMandB();
    var eBins = myPO.getEBINS();
    highlightEle.highlightElement(eBins);
    expect (eBins.isPresent()).toBe(true); 
    expect (eBins.isDisplayed()).toBe(true);
  });

  it('should display QUADA option', function () {
    myPOLogin.login(dataObj.LoginData.Users[4].username,dataObj.LoginData.Users[4].passwordField);
    myPOLandingPage.clickOnSelectAnApplication();
    myPO.clickMandB();
    var qUADA = myPO.getQUADA();
    highlightEle.highlightElement(qUADA);
    expect (qUADA.isPresent()).toBe(true); 
    expect (qUADA.isDisplayed()).toBe(true);
  });

  it('should display #S-100P option', function () {
    myPOLogin.login(dataObj.LoginData.Users[4].username,dataObj.LoginData.Users[4].passwordField);
    myPOLandingPage.clickOnSelectAnApplication();
    myPO.clickMandB();
    var s100P = myPO.getS100P();
    highlightEle.highlightElement(s100P);
    expect (s100P.isPresent()).toBe(true); 
    expect (s100P.isDisplayed()).toBe(true);
  });

  it('should display P(P) option', function () {
    myPOLogin.login(dataObj.LoginData.Users[4].username,dataObj.LoginData.Users[4].passwordField);
    myPOLandingPage.clickOnSelectAnApplication();
    myPO.clickMandB();
    var pP = myPO.getPP();
    highlightEle.highlightElement(pP);
    expect (pP.isPresent()).toBe(true); 
    expect (pP.isDisplayed()).toBe(true);
  });

  it('should display P(C) option', function () {
    myPOLogin.login(dataObj.LoginData.Users[4].username,dataObj.LoginData.Users[4].passwordField);
    myPOLandingPage.clickOnSelectAnApplication();
    myPO.clickMandB();
    var pC = myPO.getPC();
    highlightEle.highlightElement(pC);
    expect (pC.isPresent()).toBe(true); 
    expect (pC.isDisplayed()).toBe(true);
  });

  it('should display P/SITE option', function () {
    myPOLogin.login(dataObj.LoginData.Users[4].username,dataObj.LoginData.Users[4].passwordField);
    myPOLandingPage.clickOnSelectAnApplication();
    myPO.clickMandB();
    var pSITE = myPO.getPSITE();
    highlightEle.highlightElement(pSITE);
    expect (pSITE.isPresent()).toBe(true); 
    expect (pSITE.isDisplayed()).toBe(true);
  });

  it('should display Export to excel option', function () {
    myPOLogin.login(dataObj.LoginData.Users[4].username,dataObj.LoginData.Users[4].passwordField);
    myPOLandingPage.clickOnSelectAnApplication();
    myPO.clickMandB();
    var exportToXL = myPO.getExporttoXl();
    highlightEle.highlightElement(exportToXL);
    expect (exportToXL.isPresent()).toBe(true); 
    expect (exportToXL.isDisplayed()).toBe(true);
  });

  it('should display Help option', function () {
    myPOLogin.login(dataObj.LoginData.Users[4].username,dataObj.LoginData.Users[4].passwordField);
    myPOLandingPage.clickOnSelectAnApplication();
    myPO.clickMandB();
    var help = myPO.getHelp();
    highlightEle.highlightElement(help);
    expect (help.isPresent()).toBe(true); 
    expect (help.isDisplayed()).toBe(true);
  });


});