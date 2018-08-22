'use strict';
var myPOLogin = require('../Login/LoginPage.po.js');
var myPOLandingPage = require('../LandingPage/LandingPage.po.js');
var myPO_MAndB = require('../MetricsAndBenchmarking/MetricsAndBenchmarking.po.js');
var dataObj = require('../TestData.json');
var utility = require('../Utility.js');
var myPO = require('./FSA_To_FPI.po.js');


describe('FSA-FPI Page', function () {
  beforeEach(function () {

    myPOLogin.login(dataObj.LoginData.Users[4].username, dataObj.LoginData.Users[4].passwordField);

    browser.driver.sleep(1000);
    myPOLandingPage.clickOnSelectAnApplication();
    myPO_MAndB.clickMandB();
    myPO.clickOnFSAtoFPI();
  });

  it('should display all filter options', function () {
   
    var filter = myPO_MAndB.getFilter();
    expect(filter.isPresent()).toBe(true);

    var filter1 = myPO.getFilter1();
    utility.highlightElement(filter1);
    expect(filter1.isPresent()).toBe(true);
    expect(filter1.getText()).toEqual(dataObj.FilterOptions[0]);
     
    var filter2 = myPO.getFilter2();
    utility.highlightElement(filter2);
    expect (filter2.isPresent()).toBe(true);
    expect (filter2.getText()).toEqual('Clinical Indication');
    expect (filter2.getText()).toEqual(dataObj.FilterOptions[1]);

    var filter3 = myPO.getFilter3();
    utility.highlightElement(filter3);
    expect (filter3.isPresent()).toBe(true);
    expect (filter3.getText()).toEqual(dataObj.FilterOptions[2]);

    var filter4 = myPO.getFilter4();
    utility.highlightElement(filter4);
    expect (filter4.isPresent()).toBe(true);
    expect (filter4.getText()).toEqual(dataObj.FilterOptions[3]);

    var filter5 = myPO.getFilter5();
    utility.highlightElement(filter5);
    expect (filter5.isPresent()).toBe(true);
    expect (filter5.getText()).toEqual(dataObj.FilterOptions[4]);

    var filter6 = myPO.getFilter6();
    utility.highlightElement(filter6);
    expect (filter6.isPresent()).toBe(true);
    expect (filter6.getText()).toEqual(dataObj.FilterOptions[5]);

    var filter7 = myPO.getFilter7();
    utility.highlightElement(filter7);
    expect (filter7.isPresent()).toBe(true);
    expect (filter7.getText()).toEqual(dataObj.FilterOptions[6]);

    var filter8 = myPO.getFilter8();
    utility.highlightElement(filter8);
    expect (filter8.isPresent()).toBe(true);
    expect (filter8.getText()).toEqual(dataObj.FilterOptions[7]);

    var filter9 = myPO.getFilter9();
    utility.highlightElement(filter9);
    expect (filter9.isPresent()).toBe(true);
    expect (filter9.getText()).toEqual(dataObj.FilterOptions[8]);


    var filter10 = myPO.getFilter10();
    utility.highlightElement(filter10);
    expect (filter10.isPresent()).toBe(true);
    expect (filter10.getText()).toEqual(dataObj.FilterOptions[9]);

    var filter11 = myPO.getFilter11();
    utility.highlightElement(filter11);
    expect (filter11.isPresent()).toBe(true);
    expect (filter11.getText()).toEqual(dataObj.FilterOptions[10]);

    var filter12 = myPO.getFilter12();
    utility.highlightElement(filter12);
    expect (filter12.isPresent()).toBe(true);
    expect (filter12.getText()).toEqual(dataObj.FilterOptions[11]);

    var filter13 = myPO.getFilter13();
    utility.highlightElement(filter13);
    expect (filter13.isPresent()).toBe(true);
    expect (filter13.getText()).toEqual(dataObj.FilterOptions[12]);

    var filter14 = myPO.getFilter14();
    utility.highlightElement(filter14);
    expect (filter14.isPresent()).toBe(true);
    expect (filter14.getText()).toEqual(dataObj.FilterOptions[13]);

    var filter15 = myPO.getFilter15();
    utility.highlightElement(filter15);
    expect (filter15.isPresent()).toBe(true);
    expect (filter15.getText()).toEqual(dataObj.FilterOptions[14]);

    var filter16 = myPO.getFilter16();
    utility.highlightElement(filter16);
    expect (filter16.isPresent()).toBe(true);
    expect (filter16.getText()).toEqual(dataObj.FilterOptions[15]);


  });

  it('Should display all the filter options under TherapeuticArea',function(){

    browser.driver.sleep(1000);
    
    var filter1 = myPO.getFilter1();
    utility.highlightElement(filter1);
    filter1.click();
        var all = element(by.xpath('//*[@id="c-TherapeuticArea-md-check"]/div[2]/span'));
        utility.highlightElement(all);
        expect(all.isDisplayed()).toBe(true);
    var index = 0;
    element.all(by.repeater('listItem in initValues | filter:searchTxt.txt | limitTo : limit : limitFrom')).count().then(function(total) {
    element.all(by.repeater('listItem in initValues | filter:searchTxt.txt | limitTo : limit : limitFrom')).each(function (item) {
  
      var titleElement = item.element(by.tagName('span'));
      utility.highlightElement(titleElement);
      expect(titleElement.getText()).toEqual(dataObj.TherapeuticAreaOptions[index]);
      index++;
    })
  })

});



 it('should populate the Total Matching Protocols box', function (){

    var totMatchingProtocol = myPO.getTotalMatchingProtocol();
    utility.highlightElement(totMatchingProtocol);
    expect (totMatchingProtocol.isDisplayed()).toBe(true);

    var sponsor = myPO.getSponsor();
    utility.highlightElement(sponsor);
    expect (sponsor.isDisplayed()).toBe(true);

    var competition = myPO.getCompetition();
    utility.highlightElement(competition);
    expect (competition.isDisplayed()).toBe(true);

  });
  
it('should display all left side Box Plots', function () {

    utility.boxPlotValidation("boxplotEnrollmentDDS");

  });

it('should display all right side Box Plots', function () {
    utility.boxPlotValidation("boxplotEnrollmentDDS");
  
  })

})

