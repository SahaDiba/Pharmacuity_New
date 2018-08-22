'use strict';
var myPO = require('./HomePage.po.js');
var dataObj = require('../TestData.json');

describe('Page load', function () {
  var originalTimeout;
  it('should have a title', function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;

    myPO.go();
    
    expect(browser.getTitle()).toEqual(dataObj.LoginData.title);
    ;
  });


});