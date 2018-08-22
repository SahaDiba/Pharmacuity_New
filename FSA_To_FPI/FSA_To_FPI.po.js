'use strict';  

var dataObj = require('../TestData.json');
var highlightEle = require('../Utility.js');
module.exports = {  
    clickOnFSAtoFPI: function()
    {
        var fSA_FPI = element(by.xpath('//*[@id="pharmAcquity"]/div[2]/div[1]/div/md-tabs/md-tabs-wrapper/md-tabs-canvas/md-pagination-wrapper/md-tab-item[4]/span'));
        fSA_FPI.click();
        browser.waitForAngular();
        browser.driver.sleep(1000);
    },
    getFilter1: function(){
        return element(by.xpath('//*[@id="FilterDiv"]/div[1]/custom-component/div/div[1]'));
    },
    getFilter2: function(){
        return element(by.xpath('//*[@id="FilterDiv"]/div[2]/custom-component/div/div[1]'));
    },

    getFilter3: function(){
        return element(by.xpath('//*[@id="FilterDiv"]/div[3]/custom-component/div/div[1]'));
    },
    getFilter4: function(){
        return element(by.xpath('//*[@id="FilterDiv"]/div[4]/custom-component/div/div[1]'));
    },
    getFilter5: function(){
        return element(by.xpath('//*[@id="FilterDiv"]/div[5]/custom-component/div/div[1]'));
    },
    getFilter6: function(){
        return element(by.xpath('//*[@id="FilterDiv"]/div[6]/custom-component/div/div[1]'));
    },
    getFilter7: function(){
        return element(by.xpath('//*[@id="FilterDiv"]/div[7]/custom-component/div/div[1]'));
    },
    getFilter8: function(){
        return element(by.xpath('//*[@id="FilterDiv"]/div[8]/custom-component/div/div[1]'));
    },
    getFilter9: function(){
        return element(by.xpath('//*[@id="FilterDiv"]/div[9]/custom-component/div/div[1]'));
    },
    getFilter10: function(){
        return element(by.xpath('//*[@id="FilterDiv"]/div[10]/custom-component/div/div[1]'));
    },
    getFilter11: function(){
        return element(by.xpath('//*[@id="FilterDiv"]/div[11]/custom-component/div/div[1]'));
    },
    getFilter12: function(){
        return element(by.xpath('//*[@id="FilterDiv"]/div[12]/custom-component/div/div[1]'));
    },
    getFilter13: function(){
        return element(by.xpath('//*[@id="FilterDiv"]/div[13]/custom-component/div/div[1]'));
    },
    getFilter14: function(){
        return element(by.xpath('//*[@id="FilterDiv"]/div[14]/custom-component/div/div[1]'));
    },
    getFilter15: function(){
        return element(by.xpath('//*[@id="FilterDiv"]/div[15]/custom-component/div/div[1]'));
    },
    getFilter16: function(){
        return element(by.xpath('//*[@id="FilterDiv"]/div[16]/custom-component/div/div[1]'));
    },

    getTotalMatchingProtocol: function(){
        return element(by.xpath('//*[@id="ProtocolleftSideBar"]/p[1]'));
    },
    getSponsor: function(){
        return element(by.xpath('//*[@id="ProtocolleftSideBar"]/p[2]'));
    },
    getCompetition: function(){
        return element(by.xpath('//*[@id="ProtocolleftSideBar"]/p[3]'));
    },
    
   
}