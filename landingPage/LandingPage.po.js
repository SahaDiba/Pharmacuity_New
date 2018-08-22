'use strict';  
var dataObj = require('../TestData.json');
var highlightEle = require('../Utility.js');
module.exports = {  
    clickOnSelectAnApplication: function()
	{
		var selApp = element(by.xpath('//*[@id="ng-app"]/body/header/div[1]/div/md-menu-bar/md-menu/button/span'));
        highlightEle.highlightElement(selApp);
        selApp.click();
        browser.driver.sleep(1000);
        //browser.waitForAngular();
    },
    getSelectAnApplication: function()
	{
       return element(by.xpath('//*[@id="ng-app"]/body/header/div[1]/div/md-menu-bar/md-menu/button/span'));
     },
    // getAboutPharmacuity: function()
	// {
    //     return element(by.xpath('//*[@id="menu_container_1"]/md-menu-content/md-menu-item[1]/button/span'));
    
    // },
    // getMandB: function()
	// {
	// 	return element(by.xpath('//*[@id="menu_container_1"]/md-menu-content/md-menu-item[2]/button/span'));
        
    // },
    // getSitePIandRecOpt: function()
	// {
	// 	return element(by.xpath('//*[@id="menu_container_1"]/md-menu-content/md-menu-item[3]/button/span'));
        
    // },
    // getInnovativeProtocolDesign: function()
	// {
	// 	return element(by.xpath('//*[@id="menu_container_1"]/md-menu-content/md-menu-item[4]/button/span'));
        
    // },
     
    // getTrialForcasting: function()
	// {
	// 	return element(by.xpath('//*[@id="menu_container_1"]/md-menu-content/md-menu-item[5]/button/span'));
        
    // },
    clickOnLogoutButton: function()
	{
        var logOut = element(by.xpath('//*[@id="ng-app"]/body/header/div[1]/div/ul[1]/li/a/i'));
        highlightEle.highlightElement(logOut);
        logOut.click();
    },

    
};