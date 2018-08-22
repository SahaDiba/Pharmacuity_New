'use strict';  

var dataObj = require('../TestData.json');
var highlightEle = require('../Utility.js');
module.exports = {  
    
    clickMandB: function()
	{

           element.all(by.repeater('phx in ctrl.phxModules')).then(function(item) {
            highlightEle.highlightElement(item[1]);
               item[1].click();
               browser.waitForAngular();
               browser.driver.sleep(8000);
            // item[2].element(by.tagName('span')).getText().then((text) => {
            //     if (text == 'METRICS AND BENCHMARKING'){
            //       console.log("Within if statement");
            //       highlightEle.highlightElement(item);
            //       item.click();
            //       browser.waitForAngular();
            //       console.log("clicked on M&B");
                  
            //     }
            //   });

            })

        // var repeat = element.all(by.repeater("phx in ctrl.phxModules"));
        // repeat.element(by.tagName("span")).getText().then((text) => {
        //       if (text == 'METRICS AND BENCHMARKING'){
        //         console.log("Within if statement");
        //         repeat.click();
        //         browser.waitForAngular();
        //         console.log("clicked on M&B");
        //       }
        //     });
    },
    
    getFilter: function()
    {
        return element(by.xpath('//*[@id="FilterDiv"]/div[1]/custom-component/div/div[1]'));
    },
    getDashboardIcon: function()
    {
        return element(by.xpath('//*[@id="pharmAcquity"]/div[2]/div[1]/div/md-tabs/md-tabs-wrapper/md-tabs-canvas/md-pagination-wrapper/md-tab-item[1]/img'));
    },
    getPFtoSA: function()
    {
        return element(by.xpath('//*[@id="pharmAcquity"]/div[2]/div[1]/div/md-tabs/md-tabs-wrapper/md-tabs-canvas/md-pagination-wrapper/md-tab-item[2]/span'));
    },
    
    getSAtoFPI: function()
    {
        return element(by.xpath('//*[@id="pharmAcquity"]/div[2]/div[1]/div/md-tabs/md-tabs-wrapper/md-tabs-canvas/md-pagination-wrapper/md-tab-item[3]/span'));
    },
    getFSAtoFPI: function()
    {
        return element(by.xpath('//*[@id="pharmAcquity"]/div[2]/div[1]/div/md-tabs/md-tabs-wrapper/md-tabs-canvas/md-pagination-wrapper/md-tab-item[4]/span'));
    },
    getFPItoLPI: function()
    {
        return element(by.xpath('//*[@id="pharmAcquity"]/div[2]/div[1]/div/md-tabs/md-tabs-wrapper/md-tabs-canvas/md-pagination-wrapper/md-tab-item[5]/span'));
    },
    getPFtoLPI: function()
    {
        return element(by.xpath('//*[@id="pharmAcquity"]/div[2]/div[1]/div/md-tabs/md-tabs-wrapper/md-tabs-canvas/md-pagination-wrapper/md-tab-item[6]/span'));
    },
    getPFto10THPI: function()
    {
        return element(by.xpath('//*[@id="pharmAcquity"]/div[2]/div[1]/div/md-tabs/md-tabs-wrapper/md-tabs-canvas/md-pagination-wrapper/md-tab-item[7]/span'));
    },
    getERATE: function()
    {
        return element(by.xpath('//*[@id="pharmAcquity"]/div[2]/div[1]/div/md-tabs/md-tabs-wrapper/md-tabs-canvas/md-pagination-wrapper/md-tab-item[8]/span'));
    },
    getEBINS: function()
    {
        return element(by.xpath('//*[@id="pharmAcquity"]/div[2]/div[1]/div/md-tabs/md-tabs-wrapper/md-tabs-canvas/md-pagination-wrapper/md-tab-item[9]/span'));
    },
    getQUADA: function()
    {
        return element(by.xpath('//*[@id="pharmAcquity"]/div[2]/div[1]/div/md-tabs/md-tabs-wrapper/md-tabs-canvas/md-pagination-wrapper/md-tab-item[10]/span'));
    },
    getS100P: function()
    {
        return element(by.xpath('//*[@id="pharmAcquity"]/div[2]/div[1]/div/md-tabs/md-tabs-wrapper/md-tabs-canvas/md-pagination-wrapper/md-tab-item[11]/span'));
    },
    getPP: function()
    {
        return element(by.xpath('//*[@id="pharmAcquity"]/div[2]/div[1]/div/md-tabs/md-tabs-wrapper/md-tabs-canvas/md-pagination-wrapper/md-tab-item[12]/span'));
    },
    getPC: function()
    {
        return element(by.xpath('//*[@id="pharmAcquity"]/div[2]/div[1]/div/md-tabs/md-tabs-wrapper/md-tabs-canvas/md-pagination-wrapper/md-tab-item[13]/span'));
    },
    getPSITE: function()
    {
        return element(by.xpath('//*[@id="pharmAcquity"]/div[2]/div[1]/div/md-tabs/md-tabs-wrapper/md-tabs-canvas/md-pagination-wrapper/md-tab-item[14]/span'));
    },
    getExporttoXl: function()
    {
        return element(by.xpath('//*[@id="pharmAcquity"]/div[2]/div[1]/div/div/div[1]/button/md-icon'));
    },
    getHelp: function()
    {
        return element(by.xpath('//*[@id="pharmAcquity"]/div[2]/div[1]/div/div/div[2]/a/span'));
    },

    

};