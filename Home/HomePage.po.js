'use strict';  
var dataObj = require('../TestData.json');
module.exports = {  
  
    go: function() { 
        browser.driver.manage().deleteAllCookies();
        browser.get(dataObj.LoginData.url);
        browser.waitForAngular();  
    },  
  
};