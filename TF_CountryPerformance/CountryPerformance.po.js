'use strict';  

var dataObj = require('../TestData.json');
var utility = require('../Utility.js');

module.exports = {  
    
    clickTrialForecastng: function()
	{
		var trialForecasting = element(by.xpath('//*[@id="menu_container_2"]/md-menu-content/md-menu-item[5]/button/span'));
        utility.highlightElement(trialForecasting);
        trialForecasting.click();
        browser.waitForAngular();
        browser.driver.sleep(1000);
    },

    clickOnCountryPerf: function()
    {
        var clickCountryPerf = element(by.xpath('//*[@id="TF-globalTabs"]/div/div/md-tabs/md-tabs-wrapper/md-tabs-canvas/md-pagination-wrapper/md-tab-item[4]'));
        browser.driver.sleep(1000);
        utility.highlightElement(clickCountryPerf);
        clickCountryPerf.click();
        browser.waitForAngular();
        browser.driver.sleep(1000);
    },

    
};