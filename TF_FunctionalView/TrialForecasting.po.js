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

    clickOnFuncView: function()
    {
        var clickFuncView = element(by.xpath('//*[@id="TF-globalTabs"]/div/div/md-tabs/md-tabs-wrapper/md-tabs-canvas/md-pagination-wrapper/md-tab-item[3]/span'));
        browser.driver.sleep(1000);
        utility.highlightElement(clickFuncView);
        clickFuncView.click();
        browser.waitForAngular();
        browser.driver.sleep(1000);
    },

    setPercentActuals: function(id,value)
    {
        var percentActuals = element(by.xpath("//*[@id='" + id + "']/md-toolbar/div/div/span[1]/input"));
        percentActuals.clear();
        percentActuals.sendKeys(value);
    },

    moveSlider: function(id)
    {
        var slider = element(by.xpath("//*[@id='" + id + "']/div/multi-line-chart/svg:svg/svg:g/svg:g[2]/svg:rect"));
        browser.actions().dragAndDrop(slider, { x: -100, y: -100 }).perform();
        browser.sleep(5000);
    },

    moveSlider50: function(id)
    {
        var slider = element(by.xpath("//*[@id='" + id + "']/div/multi-line-chart/svg:svg/svg:g/svg:g[2]/svg:rect"));
        browser.actions().dragAndDrop(slider, { x: 0, y: 77 }).perform();
        browser.sleep(5000);
    },
    
    clickOnLegendBox: function(id)
    {
        var legendBoxpfTosa = element(by.xpath("//*[@id='" + id + "']/div/multi-line-chart/div/div[2]/md-button/i"));
        utility.highlightElement(legendBoxpfTosa);
        browser.sleep(3000);
        legendBoxpfTosa.click();
        browser.sleep(5000);
    },
    
};