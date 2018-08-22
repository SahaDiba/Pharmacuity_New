'use strict';
var myPOLogin = require('../Login/LoginPage.po.js');
var myPOLandingPage = require('../LandingPage/LandingPage.po.js');
var myPO_MAndB = require('../MetricsAndBenchmarking/MetricsAndBenchmarking.po.js');
var dataObj = require('../TestData.json');
var utility = require('../Utility.js');
var myPO = require('./PF_To_SA.po.js');


const sql = require('mssql');
var since = require('jasmine2-custom-message');

const config = {
  user: 'tcg_dev',
  password: 'LcABurlIn9t0n',
  server: '52.11.255.238',
  port: '1433',
  database: 'Refined',
  options: {
    encrypt: true // Use this if you're on Windows Azure
  }
};
var shortWaitTime = 500;
var longWaitTime = 3000;
const connectionPool = new sql.ConnectionPool(config, err => { });


describe('M&B PF-SA Page', function () {

  beforeEach(function () {
    browser.get(dataObj.LoginData.url);
    browser.waitForAngular();
    
    myPOLogin.login(dataObj.LoginData.Users[4].username, dataObj.LoginData.Users[4].passwordField);

    browser.driver.sleep(1000);
    myPOLandingPage.clickOnSelectAnApplication();
    myPO_MAndB.clickMandB();
    myPO.clickOnPFtoSA();
  });

  // it('should display all main filter options', function () {

  //     browser.driver.sleep(1000);
  //     var filter = myPO_MAndB.getFilter();
  //     expect (filter.isPresent()).toBe(true);

  //     var filter1 = myPO.getFilter1();
  //     utility.highlightElement(filter1);
  //     expect (filter1.isPresent()).toBe(true);
  //     expect (filter1.getText()).toEqual(dataObj.FilterOptions[0]);


  //     var filter2 = myPO.getFilter2();
  //     utility.highlightElement(filter2);
  //     expect (filter2.isPresent()).toBe(true);
  //     expect (filter2.getText()).toEqual('Clinical Indication');
  //     expect (filter2.getText()).toEqual(dataObj.FilterOptions[1]);

  //     var filter3 = myPO.getFilter3();
  //     utility.highlightElement(filter3);
  //     expect (filter3.isPresent()).toBe(true);
  //     expect (filter3.getText()).toEqual(dataObj.FilterOptions[2]);

  //     var filter4 = myPO.getFilter4();
  //     utility.highlightElement(filter4);
  //     expect (filter4.isPresent()).toBe(true);
  //     expect (filter4.getText()).toEqual(dataObj.FilterOptions[3]);

  //     var filter5 = myPO.getFilter5();
  //     utility.highlightElement(filter5);
  //     expect (filter5.isPresent()).toBe(true);
  //     expect (filter5.getText()).toEqual(dataObj.FilterOptions[4]);

  //     var filter6 = myPO.getFilter6();
  //     utility.highlightElement(filter6);
  //     expect (filter6.isPresent()).toBe(true);
  //     expect (filter6.getText()).toEqual(dataObj.FilterOptions[5]);

  //     var filter7 = myPO.getFilter7();
  //     utility.highlightElement(filter7);
  //     expect (filter7.isPresent()).toBe(true);
  //     expect (filter7.getText()).toEqual(dataObj.FilterOptions[6]);

  //     var filter8 = myPO.getFilter8();
  //     utility.highlightElement(filter8);
  //     expect (filter8.isPresent()).toBe(true);
  //     expect (filter8.getText()).toEqual(dataObj.FilterOptions[7]);

  //     var filter9 = myPO.getFilter9();
  //     utility.highlightElement(filter9);
  //     expect (filter9.isPresent()).toBe(true);
  //     expect (filter9.getText()).toEqual(dataObj.FilterOptions[8]);


  //     var filter10 = myPO.getFilter10();
  //     utility.highlightElement(filter10);
  //     expect (filter10.isPresent()).toBe(true);
  //     expect (filter10.getText()).toEqual(dataObj.FilterOptions[9]);

  //     var filter11 = myPO.getFilter11();
  //     utility.highlightElement(filter11);
  //     expect (filter11.isPresent()).toBe(true);
  //     expect (filter11.getText()).toEqual(dataObj.FilterOptions[10]);

  //     var filter12 = myPO.getFilter12();
  //     utility.highlightElement(filter12);
  //     expect (filter12.isPresent()).toBe(true);
  //     expect (filter12.getText()).toEqual(dataObj.FilterOptions[11]);

  //     var filter13 = myPO.getFilter13();
  //     utility.highlightElement(filter13);
  //     expect (filter13.isPresent()).toBe(true);
  //     expect (filter13.getText()).toEqual(dataObj.FilterOptions[12]);

  //     var filter14 = myPO.getFilter14();
  //     utility.highlightElement(filter14);
  //     expect (filter14.isPresent()).toBe(true);
  //     expect (filter14.getText()).toEqual(dataObj.FilterOptions[13]);

  //     var filter15 = myPO.getFilter15();
  //     utility.highlightElement(filter15);
  //     expect (filter15.isPresent()).toBe(true);
  //     expect (filter15.getText()).toEqual(dataObj.FilterOptions[14]);

  //     var filter16 = myPO.getFilter16();
  //     utility.highlightElement(filter16);
  //     expect (filter16.isPresent()).toBe(true);
  //     expect (filter16.getText()).toEqual(dataObj.FilterOptions[15]);

  //     var filter17 = myPO.getFilter17();
  //     utility.highlightElement(filter17);
  //     expect (filter17.isPresent()).toBe(true);
  //     expect (filter17.getText()).toEqual(dataObj.FilterOptions[16]);

  //   });



  // it('should populate the Total Matching Protocols box', function (){

  //     var totMatchingProtocol = myPO.getTotalMatchingProtocol();
  //     utility.highlightElement(totMatchingProtocol);
  //     expect (totMatchingProtocol.isDisplayed()).toBe(true);

  //     var sponsor = myPO.getSponsor();
  //     utility.highlightElement(sponsor);
  //     expect (sponsor.isDisplayed()).toBe(true);

  //     var competition = myPO.getCompetition();
  //     utility.highlightElement(competition);
  //     expect (competition.isDisplayed()).toBe(true);

  //   });
  // it('should display the S-Curve of sponsor', function (){
  //     utility.sCurveValidation("scurveSponsor");

  //    });

  //   it('should display the S-Curve of competition', function (){

  //     utility.sCurveValidation("scurveCompetition");


  //  });

  // it('should display all left side Box Plots', function () {

  //   utility.boxPlotValidation("boxplotpftosacp");
  //  });

  //   it('should display all right side Box Plots', function () {

  //       utility.boxPlotValidation("boxplotpftosac");
  //     });


  //   it('Should populate the graphs while applying each of the TA filter option', function () {
  //     browser.driver.sleep(1000);

  //     var filter1 = myPO.getFilter1();
  //     utility.highlightElement(filter1);
  //     filter1.click();

  //     var getTotat = myPO.getTotalFilter();
  //     var count;
  //     getTotat.count().then(function(data){
  //       count = data;
  //       console.log(data);
  //     })
  //     expect(getTotat.count()).toEqual(12);
  //     utility.validateCurveIsPresent('Therapeutic Area');



  // });



  // it('Should populate the graphs while applying each of the CI filter option',function(){

  //   browser.driver.sleep(1000);

  //   var filter2 = myPO.getFilter2();
  //   utility.highlightElement(filter2);
  //   filter2.click();

  //   var getTotat = myPO.getTotalFilter();
  //   var count;
  //   getTotat.count().then(function(data){
  //     count = data;
  //     console.log(data);
  //   })
  //   expect(getTotat.count()).toEqual(43);



  //   utility.validateCurveIsPresent('Clinical Indication');


  //   });

  //   it('Should populate the graphs while applying each of the Subindication filter option', function () {

  //     browser.driver.sleep(1000);

  //     var filter3 = myPO.getFilter3();
  //     utility.highlightElement(filter3);
  //     filter3.click();

  //     var getTotat = myPO.getTotalFilter();
  //     var count;
  //     getTotat.count().then(function (data) {
  //       count = data;
  //       console.log(data);
  //     })
  //    expect(getTotat.count()).toEqual(30);


  //   utility.validateCurveIsPresent('Subindication');


  //   });
  //   it('Should populate the graphs while applying each of the Phase filter option', function () {

  //     browser.driver.sleep(1000);

  //     var filter4 = myPO.getFilter4();
  //     utility.highlightElement(filter4);
  //     filter4.click();

  //     var getTotat = myPO.getTotalFilter();
  //     var count;
  //     getTotat.count().then(function (data) {
  //       count = data;
  //       console.log(data);
  //     })
  //     expect(getTotat.count()).toEqual(11);

  //     utility.validateCurveIsPresent('Phase');


  //   });

  //   it('Should populate the graphs while applying each of the EnrollmentStatus filter option', function () {

  //     browser.driver.sleep(1000);

  //     var filter5 = myPO.getFilter5();
  //     utility.highlightElement(filter5);
  //     filter5.click();

  //     var getTotat = myPO.getTotalFilter();
  //     var count;
  //     getTotat.count().then(function (data) {
  //       count = data;
  //       console.log(data);
  //     })
  //     expect(getTotat.count()).toEqual(2);
  //     utility.validateCurveIsPresent('Enrollment Status');


  //   });

  // it('should be matched Studies Box Plots value of Sponsor with the database value', function () {

  //   browser.sleep(3000);
  //   var percentage = element(by.xpath('//*[@id="content"]/div/div/div/div/div/div[2]/header/div[1]/input'));
  //   utility.highlightElement(percentage);
  //   percentage.clear();
  //   percentage.sendKeys(0);
  //   browser.sleep(5000);


  //   var databaseConnect = (countryText) => {
  //     return new Promise((resolve, reject) => {
  //        connectionPool.request().query(`select  count(distinct a.ProtocolId) as Studies from [dbo].[CLSPerformanceData] as a INNER JOIN [dbo].[Protocol] as b ON a.ProtocolId = b.ProtocolId  INNER JOIN [dbo].[Sponsor] as c ON b.SponsorId = c.SponsorId   INNER JOIN [dbo].[ProtocolExclusionList] as d ON not exists (select d.ProtocolId FROM [dbo].[ProtocolExclusionList] as d where a.ProtocolId = d.ProtocolId) INNER JOIN [dbo].[Country] as e ON a.CountryId = e.CountryId where b.ClinicalIndicationId != 43 and e.CountryName LIKE '${countryText}%' and c.SponsorDisplayName='Sponsor'`).then((result) => {
  //         if (result.recordset.length > 0)
  //           resolve(result.recordset[0].Studies);
  //         else
  //           resolve(`No record`);
  //         sql.close();
  //       }).catch(() => {
  //         reject("reject for " + countryText);
  //         sql.close();
  //       })
  //     })
  //   };

  //   var totalColCount;
  //   var currentAvgIndex, currentMedIndex, currentStuIndex;
  //   var avgElement, medElement, stuElement;
  //   element.all(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g')).count().then(function (totalElement) {
  //     totalColCount = ((totalElement - 1) / 4);
  //     element.all(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + totalElement + ']/svg:g')).each((currentCountryElement, currentCountryIndex) => {
  //       currentCountryElement.getText().then((countryText) => {
  //         currentAvgIndex = (currentCountryIndex + 1);
  //         currentMedIndex = (totalColCount * 1) + currentAvgIndex;
  //         currentStuIndex = (totalColCount * 2) + currentAvgIndex;
  //         avgElement = element(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + currentAvgIndex + ']'));
  //         medElement = element(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + currentMedIndex + ']'));
  //         stuElement = element(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + currentStuIndex + ']'));
  //         protractor.promise.all([
  //           avgElement.getText(),
  //           medElement.getText(),
  //           stuElement.getText(),
  //           databaseConnect(countryText.replace("...",""))
  //         ]).then((result) => {
  //           console.log((currentCountryIndex + 1), countryText, result[0], result[1], result[2], result[3]);

  //           if(result[3]==0 || result[3]==null || dbResult== 'No record'){
  //             since(function() {
  //               return 'For the country ' + countryText +' studies are not matched with the database'+': ' +'Actual-'+ result[2] + ' =/= ' + 'Expected-'+result[3];
  //             }).
  //             expect(result[2] == 'NA').toBe(true);

  //             }else{
  //               since(function() {
  //                 return 'For the country ' + countryText +' studies are not matched with the database'+': ' +'Actual-'+ result[2] + ' =/= ' + 'Expected-'+result[3];
  //               }).
  //               expect(result[2] == result[3]).toBe(true);
  //             }

  //         })
  //       });
  //     });
  //   });
  // },1000000);











  // it('should be matched Average Box Plots value of Sponsor with the database value', function () {

  //   browser.sleep(3000);
  //   var percentage = element(by.xpath('//*[@id="content"]/div/div/div/div/div/div[2]/header/div[1]/input'));
  //   utility.highlightElement(percentage);
  //   percentage.clear();
  //   percentage.sendKeys(0);
  //   browser.sleep(5000);


  //   var databaseConnect = (countryText) => {
  //     return new Promise((resolve, reject) => {
  //        connectionPool.request().query(`select cast(sum(SitePFtoSACycleTimeInWeeks)/count(*) as decimal(18,1)) as 'Avg' from (select  a.ProtocolId, min(cast(a.SitePFtoSACycleTimeInDays as decimal(18,1)))/7 as 'SitePFtoSACycleTimeInWeeks'from [dbo].[CLSPerformanceData] as a INNER JOIN [dbo].[Protocol] as b ON a.ProtocolId = b.ProtocolId  INNER JOIN [dbo].[Sponsor] as c ON b.SponsorId = c.SponsorId   INNER JOIN [dbo].[ProtocolExclusionList] as d on not exists (select d.ProtocolId FROM [dbo].[ProtocolExclusionList] as d where a.ProtocolId = d.ProtocolId) INNER JOIN [dbo].[Country] as e ON a.CountryId = e.CountryId where b.ClinicalIndicationId != 43 and e.CountryName LIKE '${countryText}%' and c.SponsorDisplayName='SPONSOR' group by a.ProtocolId) as result`).then((result) => {
  //         if (result.recordset.length > 0)
  //           resolve(result.recordset[0].Avg);
  //         else
  //           resolve(`No record`);
  //         sql.close();
  //       }).catch(() => {
  //         reject("reject for " + countryText);
  //         sql.close();
  //       })
  //     })
  //   };

  //   var totalColCount;
  //   var currentAvgIndex, currentMedIndex, currentStuIndex;
  //   var avgElement, medElement, stuElement;
  //   element.all(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g')).count().then(function (totalElement) {
  //     totalColCount = ((totalElement - 1) / 4);
  //     element.all(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + totalElement + ']/svg:g')).each((currentCountryElement, currentCountryIndex) => {
  //       currentCountryElement.getText().then((countryText) => {
  //         currentAvgIndex = (currentCountryIndex + 1);
  //         currentMedIndex = (totalColCount * 1) + currentAvgIndex;
  //         currentStuIndex = (totalColCount * 2) + currentAvgIndex;
  //         avgElement = element(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + currentAvgIndex + ']'));
  //         medElement = element(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + currentMedIndex + ']'));
  //         stuElement = element(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + currentStuIndex + ']'));
  //         protractor.promise.all([
  //           avgElement.getText(),
  //           medElement.getText(),
  //           stuElement.getText(),
  //           databaseConnect(countryText.replace("...",""))
  //         ]).then((result) => {
  //           console.log((currentCountryIndex + 1), countryText, result[0], result[1], result[2], result[3]);

  //           if(result[3]==0 || result[3]==null || dbResult== 'No record'){
  //             since(function() {
  //               return 'For the country ' + countryText +' avgs are not matched with the database'+': ' + 'Actual-'+ result[2] + ' =/= ' + 'Expected-'+ result[3];
  //             }).
  //             expect(result[0] == 'NA').toBe(true);

  //             }else{
  //               since(function() {
  //                 return 'For the country ' + countryText +' avgs are not matched with the database '+': ' + 'Actual-'+ result[2] + ' =/= ' + 'Expected-'+ result[3];
  //               }).
  //               expect(result[0] == result[3]).toBe(true);
  //             }

  //         })
  //       });
  //     });
  //   });
  // },1000000);









  // it('should be matched Median Box Plots value of Sponsor with the database value', function () {

  //   browser.sleep(3000);
  //   var percentage = element(by.xpath('//*[@id="content"]/div/div/div/div/div/div[2]/header/div[1]/input'));
  //   utility.highlightElement(percentage);
  //   percentage.clear();
  //   percentage.sendKeys(0);
  //   browser.sleep(5000);


  //   var databaseConnect = (countryText) => {
  //     return new Promise((resolve, reject) => {
  //        connectionPool.request().query(`SELECT cast(AVG(SitePFtoSACycleTimeInWeeks/7) AS DECIMAL(18, 1)) as Median FROM (SELECT a.ProtocolId,CAST(MIN(a.SitePFtoSACycleTimeInDays) AS DECIMAL) AS 'SitePFtoSACycleTimeInWeeks',row_number() over(order by MIN(a.SitePFtoSACycleTimeInDays))- row_number() over(order by MIN(a.SitePFtoSACycleTimeInDays) DESC) as CN FROM [dbo].[CLSPerformanceData] AS a	INNER JOIN [dbo].[Protocol] AS b ON a.ProtocolId = b.ProtocolId	INNER JOIN [dbo].[Sponsor] AS c ON b.SponsorId = c.SponsorId INNER JOIN [dbo].[ProtocolExclusionList] AS d ON NOT EXISTS (SELECT d.ProtocolId FROM [dbo].[ProtocolExclusionList] AS d WHERE a.ProtocolId = d.ProtocolId) INNER JOIN [dbo].[Country] as e ON a.CountryId = e.CountryId where b.ClinicalIndicationId != 43 and e.CountryName LIKE '${countryText}%' AND c.SponsorDisplayName = 'SPONSOR' GROUP BY a.ProtocolId)A WHERE CN BETWEEN -1 AND 1`).then((result) => {
  //         if (result.recordset.length > 0)
  //           resolve(result.recordset[0].Median);
  //         else
  //           resolve(`No record`);
  //         sql.close();
  //       }).catch(() => {
  //         reject("reject for " + countryText);
  //         sql.close();
  //       })
  //     })
  //   };

  //   var totalColCount;
  //   var currentAvgIndex, currentMedIndex, currentStuIndex;
  //   var avgElement, medElement, stuElement;
  //   element.all(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g')).count().then(function (totalElement) {
  //     totalColCount = ((totalElement - 1) / 4);
  //     element.all(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + totalElement + ']/svg:g')).each((currentCountryElement, currentCountryIndex) => {
  //       currentCountryElement.getText().then((countryText) => {
  //         currentAvgIndex = (currentCountryIndex + 1);
  //         currentMedIndex = (totalColCount * 1) + currentAvgIndex;
  //         currentStuIndex = (totalColCount * 2) + currentAvgIndex;
  //         avgElement = element(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + currentAvgIndex + ']'));
  //         medElement = element(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + currentMedIndex + ']'));
  //         stuElement = element(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + currentStuIndex + ']'));
  //         protractor.promise.all([
  //           avgElement.getText(),
  //           medElement.getText(),
  //           stuElement.getText(),
  //           databaseConnect(countryText.replace("...",""))
  //         ]).then((result) => {
  //           console.log((currentCountryIndex + 1), countryText, result[0], result[1], result[2], result[3]);

  //           if(result[3]==0 || result[3]==null || dbResult== 'No record'){
  //             since(function() {
  //               return 'For the country ' + countryText +' Medians are not matched with the database'+': ' + 'Actual-'+ result[2] + ' =/= ' + 'Expected-'+ result[3];
  //             }).
  //             expect(result[1] == 'NA').toBe(true);

  //             }else{
  //               since(function() {
  //                 return 'For the country ' + countryText +' Medians are not matched with the database '+': ' + 'Actual-'+ result[2] + ' =/= ' + 'Expected-'+ result[3];
  //               }).
  //               expect(result[1] == result[3]).toBe(true);
  //             }

  //         })
  //       });
  //     });
  //   });
  // },1000000);



  // it('should be matched Studies Box Plots value of Competition with the database value', function () {

  //   browser.sleep(3000);
  //   var percentage = element(by.xpath('//*[@id="content"]/div/div/div/div/div/div[2]/header/div[1]/input'));
  //   utility.highlightElement(percentage);
  //   percentage.clear();
  //   percentage.sendKeys(0);
  //   browser.sleep(5000);


  //   var databaseConnect = (countryText) => {
  //     return new Promise((resolve, reject) => {
  //        connectionPool.request().query(`select  count(distinct a.ProtocolId) as Studies from [dbo].[CLSPerformanceData] as a INNER JOIN [dbo].[Protocol] as b ON a.ProtocolId = b.ProtocolId  INNER JOIN [dbo].[Sponsor] as c ON b.SponsorId = c.SponsorId   INNER JOIN [dbo].[ProtocolExclusionList] as d ON not exists (select d.ProtocolId FROM [dbo].[ProtocolExclusionList] as d where a.ProtocolId = d.ProtocolId) INNER JOIN [dbo].[Country] as e ON a.CountryId = e.CountryId where b.ClinicalIndicationId != 43 and e.CountryName LIKE '${countryText}%' and c.SponsorDisplayName='COMPETITION'`).then((result) => {
  //         if (result.recordset.length > 0)
  //           resolve(result.recordset[0].Studies);
  //         else
  //           resolve(`No record`);
  //         sql.close();
  //       }).catch(() => {
  //         reject("reject for " + countryText);
  //         sql.close();
  //       })
  //     })
  //   };

  //   var totalColCount;
  //   var currentAvgIndex, currentMedIndex, currentStuIndex;
  //   var avgElement, medElement, stuElement;
  //   element.all(by.xpath('//*[@id="boxplotpftosac"]/div[2]/svg:svg/svg:g/svg:g')).count().then(function (totalElement) {
  //     totalColCount = ((totalElement - 1) / 4);
  //     element.all(by.xpath('//*[@id="boxplotpftosac"]/div[2]/svg:svg/svg:g/svg:g[' + totalElement + ']/svg:g')).each((currentCountryElement, currentCountryIndex) => {
  //       currentCountryElement.getText().then((countryText) => {
  //         currentAvgIndex = (currentCountryIndex + 1);
  //         currentMedIndex = (totalColCount * 1) + currentAvgIndex;
  //         currentStuIndex = (totalColCount * 2) + currentAvgIndex;
  //         avgElement = element(by.xpath('//*[@id="boxplotpftosac"]/div[2]/svg:svg/svg:g/svg:g[' + currentAvgIndex + ']'));
  //         medElement = element(by.xpath('//*[@id="boxplotpftosac"]/div[2]/svg:svg/svg:g/svg:g[' + currentMedIndex + ']'));
  //         stuElement = element(by.xpath('//*[@id="boxplotpftosac"]/div[2]/svg:svg/svg:g/svg:g[' + currentStuIndex + ']'));
  //         protractor.promise.all([
  //           avgElement.getText(),
  //           medElement.getText(),
  //           stuElement.getText(),
  //           databaseConnect(countryText.replace("...",""))
  //         ]).then((result) => {
  //           console.log((currentCountryIndex + 1), countryText, result[0], result[1], result[2], result[3]);

  //           if(result[3]==0 || result[3]==null || dbResult== 'No record'){
  //             since(function() {
  //               return 'For the country ' + countryText +' studies are not matched with the database'+': ' +'Actual-'+ result[2] + ' =/= ' + 'Expected-'+result[3];
  //             }).
  //             expect(result[2] == 'NA').toBe(true);

  //             }else{
  //               since(function() {
  //                 return 'For the country ' + countryText +' studies are not matched with the database'+': ' +'Actual-'+ result[2] + ' =/= ' + 'Expected-'+result[3];
  //               }).
  //               expect(result[2] == result[3]).toBe(true);
  //             }

  //         })
  //       });
  //     });
  //   });
  // },1000000);










  // it('should be matched Average Box Plots value of Competition with the database value', function () {

  //   browser.sleep(3000);
  //   var percentage = element(by.xpath('//*[@id="content"]/div/div/div/div/div/div[2]/header/div[1]/input'));
  //   utility.highlightElement(percentage);
  //   percentage.clear();
  //   percentage.sendKeys(0);
  //   browser.sleep(5000);


  //   var databaseConnect = (countryText) => {
  //     return new Promise((resolve, reject) => {
  //        connectionPool.request().query(`select cast(sum(SitePFtoSACycleTimeInWeeks)/count(*) as decimal(18,1)) as 'Avg' from (select  a.ProtocolId, min(cast(a.SitePFtoSACycleTimeInDays as decimal(18,1)))/7 as 'SitePFtoSACycleTimeInWeeks'from [dbo].[CLSPerformanceData] as a INNER JOIN [dbo].[Protocol] as b ON a.ProtocolId = b.ProtocolId  INNER JOIN [dbo].[Sponsor] as c ON b.SponsorId = c.SponsorId   INNER JOIN [dbo].[ProtocolExclusionList] as d on not exists (select d.ProtocolId FROM [dbo].[ProtocolExclusionList] as d where a.ProtocolId = d.ProtocolId) INNER JOIN [dbo].[Country] as e ON a.CountryId = e.CountryId where b.ClinicalIndicationId != 43 and e.CountryName LIKE '${countryText}%' and c.SponsorDisplayName='COMPETITION' group by a.ProtocolId) as result`).then((result) => {
  //         if (result.recordset.length > 0)
  //           resolve(result.recordset[0].Avg);
  //         else
  //           resolve(`No record`);
  //         sql.close();
  //       }).catch(() => {
  //         reject("reject for " + countryText);
  //         sql.close();
  //       })
  //     })
  //   };

  //   var totalColCount;
  //   var currentAvgIndex, currentMedIndex, currentStuIndex;
  //   var avgElement, medElement, stuElement;
  //   element.all(by.xpath('//*[@id="boxplotpftosac"]/div[2]/svg:svg/svg:g/svg:g')).count().then(function (totalElement) {
  //     totalColCount = ((totalElement - 1) / 4);
  //     element.all(by.xpath('//*[@id="boxplotpftosac"]/div[2]/svg:svg/svg:g/svg:g[' + totalElement + ']/svg:g')).each((currentCountryElement, currentCountryIndex) => {
  //       currentCountryElement.getText().then((countryText) => {
  //         currentAvgIndex = (currentCountryIndex + 1);
  //         currentMedIndex = (totalColCount * 1) + currentAvgIndex;
  //         currentStuIndex = (totalColCount * 2) + currentAvgIndex;
  //         avgElement = element(by.xpath('//*[@id="boxplotpftosac"]/div[2]/svg:svg/svg:g/svg:g[' + currentAvgIndex + ']'));
  //         medElement = element(by.xpath('//*[@id="boxplotpftosac"]/div[2]/svg:svg/svg:g/svg:g[' + currentMedIndex + ']'));
  //         stuElement = element(by.xpath('//*[@id="boxplotpftosac"]/div[2]/svg:svg/svg:g/svg:g[' + currentStuIndex + ']'));
  //         protractor.promise.all([
  //           avgElement.getText(),
  //           medElement.getText(),
  //           stuElement.getText(),
  //           databaseConnect(countryText.replace("...",""))
  //         ]).then((result) => {
  //           console.log((currentCountryIndex + 1), countryText, result[0], result[1], result[2], result[3]);

  //           if(result[3]==0 || result[3]==null || dbResult== 'No record'){
  //             since(function() {
  //               return 'For the country ' + countryText +' avgs are not matched with the database'+': ' + 'Actual-'+ result[2] + ' =/= ' + 'Expected-'+ result[3];
  //             }).
  //             expect(result[0] == 'NA').toBe(true);

  //             }else{
  //               since(function() {
  //                 return 'For the country ' + countryText +' avgs are not matched with the database '+': ' + 'Actual-'+ result[2] + ' =/= ' + 'Expected-'+ result[3];
  //               }).
  //               expect(result[0] == result[3]).toBe(true);
  //             }

  //         })
  //       });
  //     });
  //   });
  // },1000000);



  // it('should be matched Median Box Plots value of Competition with the database value', function () {

  //   browser.sleep(3000);
  //   var percentage = element(by.xpath('//*[@id="content"]/div/div/div/div/div/div[2]/header/div[1]/input'));
  //   utility.highlightElement(percentage);
  //   percentage.clear();
  //   percentage.sendKeys(0);
  //   browser.sleep(5000);


  //   var databaseConnect = (countryText) => {
  //     return new Promise((resolve, reject) => {
  //        connectionPool.request().query(`SELECT cast(AVG(SitePFtoSACycleTimeInWeeks/7) AS DECIMAL(18, 1)) as Median FROM (SELECT a.ProtocolId,CAST(MIN(a.SitePFtoSACycleTimeInDays) AS DECIMAL) AS 'SitePFtoSACycleTimeInWeeks',row_number() over(order by MIN(a.SitePFtoSACycleTimeInDays))- row_number() over(order by MIN(a.SitePFtoSACycleTimeInDays) DESC) as CN FROM [dbo].[CLSPerformanceData] AS a	INNER JOIN [dbo].[Protocol] AS b ON a.ProtocolId = b.ProtocolId	INNER JOIN [dbo].[Sponsor] AS c ON b.SponsorId = c.SponsorId INNER JOIN [dbo].[ProtocolExclusionList] AS d ON NOT EXISTS (SELECT d.ProtocolId FROM [dbo].[ProtocolExclusionList] AS d WHERE a.ProtocolId = d.ProtocolId) INNER JOIN [dbo].[Country] as e ON a.CountryId = e.CountryId where b.ClinicalIndicationId != 43 and e.CountryName LIKE '${countryText}%' AND c.SponsorDisplayName = 'COMPETITION' GROUP BY a.ProtocolId)A WHERE CN BETWEEN -1 AND 1`).then((result) => {
  //         if (result.recordset.length > 0)
  //           resolve(result.recordset[0].Median);
  //         else
  //           resolve(`No record`);
  //         sql.close();
  //       }).catch(() => {
  //         reject("reject for " + countryText);
  //         sql.close();
  //       })
  //     })
  //   };

  //   var totalColCount;
  //   var currentAvgIndex, currentMedIndex, currentStuIndex;
  //   var avgElement, medElement, stuElement;
  //   element.all(by.xpath('//*[@id="boxplotpftosac"]/div[2]/svg:svg/svg:g/svg:g')).count().then(function (totalElement) {
  //     totalColCount = ((totalElement - 1) / 4);
  //     element.all(by.xpath('//*[@id="boxplotpftosac"]/div[2]/svg:svg/svg:g/svg:g[' + totalElement + ']/svg:g')).each((currentCountryElement, currentCountryIndex) => {
  //       currentCountryElement.getText().then((countryText) => {
  //         currentAvgIndex = (currentCountryIndex + 1);
  //         currentMedIndex = (totalColCount * 1) + currentAvgIndex;
  //         currentStuIndex = (totalColCount * 2) + currentAvgIndex;
  //         avgElement = element(by.xpath('//*[@id="boxplotpftosac"]/div[2]/svg:svg/svg:g/svg:g[' + currentAvgIndex + ']'));
  //         medElement = element(by.xpath('//*[@id="boxplotpftosac"]/div[2]/svg:svg/svg:g/svg:g[' + currentMedIndex + ']'));
  //         stuElement = element(by.xpath('//*[@id="boxplotpftosac"]/div[2]/svg:svg/svg:g/svg:g[' + currentStuIndex + ']'));
  //         protractor.promise.all([
  //           avgElement.getText(),
  //           medElement.getText(),
  //           stuElement.getText(),
  //           databaseConnect(countryText.replace("...",""))
  //         ]).then((result) => {
  //           console.log((currentCountryIndex + 1), countryText, result[0], result[1], result[2], result[3]);

  //           if(result[3]==0 || result[3]==null || dbResult== 'No record'){
  //             since(function() {
  //               return 'For the country ' + countryText +' Medians are not matched with the database'+': ' + 'Actual-'+ result[2] + ' =/= ' + 'Expected-'+ result[3];
  //             }).
  //             expect(result[1] == 'NA').toBe(true);

  //             }else{
  //               since(function() {
  //                 return 'For the country ' + countryText +' Medians are not matched with the database '+': ' + 'Actual-'+ result[2] + ' =/= ' + 'Expected-'+ result[3];
  //               }).
  //               expect(result[1] == result[3]).toBe(true);
  //             }

  //         })
  //       });
  //     });
  //   });
  // },1000000);


//Start
  it('should be matched Studies Box Plots value of Sponsor with the database value for the given filter options', function () {

    browser.sleep(3000);
    myPO.setSitePercentZero();
    browser.sleep(500);

    var subMenuValues = {
      "Therapeutic Area": "ONCOLOGY",
      "Clinical Indication": "BREAST CANCER",
      "Subindication": "EBC, HER2+",
      "Phase": "PHASE 2",
      "Enrollment Status": "COMPLETED",
      "Patients Randomized": "201 - 500",
      "Site Count": "51 - 100"
    }
    var databaseConnect = (countryText) => {
      return new Promise((resolve, reject) => {
        connectionPool.request().query(`select count(distinct a.protocolid) as Studies from protocol a inner join pftosa pf on a.protocolid =pf.protocolid inner JOIN TherapeuticArea F1 ON a.TherapeuticAreaId=F1.TherapeuticAreaId inner JOIN SubIndication F3 ON a.SubIndicationId=F3.SubIndicationId and a.ClinicalIndicationId = F3.ClinicalIndicationId inner join clinicalindication b on a.clinicalindicationid = b.clinicalindicationid inner join Therapy th on a.TherapyId = th.TherapyId left join ProtocolDiseaseStage pds on a.Protocolid = pds.ProtocolId inner join diseasestage ds on ds.diseasestageid = pds.diseasestageid inner join Phase ph on a.phaseid = ph.phaseid inner join LineOfTherapy lp on a.LineOfTherapyId = lp.LineOfTherapyId inner JOIN Country Co ON Co.CountryId = pf.CountryId inner JOIN Sponsor c ON a.SponsorId = c.SponsorId where a.ClinicalIndicationId != 43 and SponsorDisplayName='SPONSOR' and TherapeuticAreaName = 'ONCOLOGY' and PhaseName = 'PHASE 2' and SubIndicationName='EBC, HER2+' and ClinicalIndicationName = 'BREAST CANCER' and HasCancerImmunotherapy = '0' and DiseaseStageName = 'EARLY' and AdultPediatric ='1' and a.Protocolid not in(select protocolid from ProtocolExclusionList) and PhaseName = 'PHASE 2' and LineOfTherapyName ='ADJUVANT' and th.TherapyName='MONOTHERAPY' and SiteCount = '51 - 100' and	PatientRandomized='201 - 500' and CountryName LIKE '${countryText}%'`).then((result) => {
          if (result.recordset.length > 0)
            resolve(result.recordset[0].Studies);
          else
            resolve(`No record`);
          sql.close();
        }).catch((err) => {
          reject("reject for", countryText, err);
          sql.close();
        })
      })
    };


    var filterMenuList = () => {
      element.all(by.repeater('i in filterComponents')).filter((parentFilter, index) => {
        return parentFilter.element(by.css('.panel-heading')).getText().then((text) => {
          return (text === text);
        });
      }).each((parentElement, parentIndex) => {
        parentElement.click();
        browser.sleep(shortWaitTime);
        
        parentElement.all(by.repeater('listItem in initValues')).count().then((count) => {
          if (count > 1) {
            parentElement.element(by.css('.panel-heading')).getText().then((menuText) => {
              if (subMenuValues[menuText] != null) {
                
                console.log("menu click for", menuText);
                parentElement.element(by.css('[ng-click="toggleAll()"]')).click();
                browser.sleep(shortWaitTime);

                parentElement.all(by.repeater('listItem in initValues')).filter((parentFilter, index) => {
                  return parentFilter.element(by.css('.md-label')).getText().then((text) => {
                    console.log(text === subMenuValues[menuText], text);
                    return (text === subMenuValues[menuText]);
                  });
                }).each((childElement, childIndex) => {

                  browser.sleep(2000);
                  childElement.click();
                  browser.actions().mouseMove(childElement, { x: 500, y: 0 }).perform();

                  parentElement.element(by.css('[ng-click="applyFilter()"]')).click();
                  browser.actions().mouseMove(parentElement.element(by.css('[ng-click="applyFilter()"]')), { x: 500, y: 0 }).perform();
                  browser.sleep(shortWaitTime);

                  element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).isPresent().then(function (isVisible) {
                    if (isVisible) {
                      element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).click();
                      browser.sleep(shortWaitTime);
                      browser.sleep(5000);
                    }
                  });
                  browser.sleep(longWaitTime);
                });
              }
            })
          }
        });
      });
    }
    var validateCountryData = () => {
      var totalColCount;
      var currentAvgIndex, currentMedIndex, currentStuIndex;
      var avgElement, medElement, stuElement;
      element.all(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g')).count().then(function (totalElement) {
        totalColCount = ((totalElement - 1) / 4);
        console.log("total country count - ", totalColCount);
        element.all(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + totalElement + ']/svg:g')).each((currentCountryElement, currentCountryIndex) => {
          currentCountryElement.getText().then((countryText) => {
            currentAvgIndex = (currentCountryIndex + 1);
            currentMedIndex = (totalColCount * 1) + currentAvgIndex;
            currentStuIndex = (totalColCount * 2) + currentAvgIndex;
            avgElement = element(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + currentAvgIndex + ']'));
            medElement = element(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + currentMedIndex + ']'));
            stuElement = element(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + currentStuIndex + ']'));
            protractor.promise.all([
              avgElement.getText(),
              medElement.getText(),
              stuElement.getText()
            ]).then((result) => {
              databaseConnect(countryText.replace("...", "")).then(dbResult => {


                console.log((currentCountryIndex + 1), countryText, result[0], result[1], result[2], dbResult);

                if (dbResult == 0 || dbResult == null || dbResult== 'No record') {
                  console.log("dbResult", dbResult);
                  since(function () {
                    return 'For the country ' + countryText + ' studies are not matched with the database' + ': ' + 'Actual-' + result[2] + ' =/= ' + 'Expected-' + dbResult;
                  }).
                    expect(result[2] == 'NA').toBe(true);

                } else {
                  console.log("dbResult", dbResult);
                  since(function () {
                    return 'For the country ' + countryText + ' studies are not matched with the database' + ': ' + 'Actual-' + result[2] + ' =/= ' + 'Expected-' + dbResult;
                  }).
                    expect(result[2] == dbResult).toBe(true);
                }

              });
              browser.sleep(5000);
            })
          });
        });
      });
    }
    //Callback
    filterMenuList();
    validateCountryData();


  });


  it('should be matched Average Box Plots value of Sponsor with the database value for the given filter options', function () {

    browser.sleep(3000);
    myPO.setSitePercentZero();
    browser.sleep(500);

    var subMenuValues = {
      "Therapeutic Area": "ONCOLOGY",
      "Clinical Indication": "BREAST CANCER",
      "Subindication": "EBC, HER2+",
      "Phase": "PHASE 2",
      "Enrollment Status": "COMPLETED",
      "Patients Randomized": "201 - 500",
      "Site Count": "51 - 100"
    }
    var databaseConnect = (countryText) => {
      return new Promise((resolve, reject) => {
        connectionPool.request().query(`select cast(sum(SitePFtoSACycleTimeInWeeks)/count(*) as decimal(18,1)) as 'Avg' from (select  a.ProtocolId, min(cast(pf."Weeks to Activate First Site" as decimal(18,1))) as 'SitePFtoSACycleTimeInWeeks' from protocol a inner join pftosa pf on a.protocolid =pf.protocolid inner JOIN TherapeuticArea F1 ON a.TherapeuticAreaId=F1.TherapeuticAreaId inner JOIN SubIndication F3 ON a.SubIndicationId=F3.SubIndicationId and a.ClinicalIndicationId = F3.ClinicalIndicationId inner join clinicalindication b on a.clinicalindicationid = b.clinicalindicationid inner join Therapy th on a.TherapyId = th.TherapyId left join ProtocolDiseaseStage pds on a.Protocolid = pds.ProtocolId inner join diseasestage ds on ds.diseasestageid = pds.diseasestageid inner join Phase ph on a.phaseid = ph.phaseid inner join LineOfTherapy lp on a.LineOfTherapyId = lp.LineOfTherapyId inner JOIN Country Co ON Co.CountryId = pf.CountryId inner JOIN Sponsor c ON a.SponsorId = c.SponsorId where a.ClinicalIndicationId != 43 and SponsorDisplayName='SPONSOR' and TherapeuticAreaName = 'ONCOLOGY' and PhaseName = 'PHASE 2' and SubIndicationName='EBC, HER2+' and ClinicalIndicationName = 'BREAST CANCER' and EnrollmentStatus ='COMPLETED' and HasCancerImmunotherapy = '0' and DiseaseStageName = 'EARLY' and AdultPediatric ='1' and a.Protocolid not in(select protocolid from ProtocolExclusionList) and PhaseName = 'PHASE 2' and LineOfTherapyName ='ADJUVANT' and th.TherapyName='MONOTHERAPY' and SiteCount = '51 - 100' and	PatientRandomized='201 - 500' and CountryName LIKE '${countryText}%' group by a.ProtocolId) as result`).then((result) => {
          if (result.recordset.length > 0)
            resolve(result.recordset[0].Avg);
          else
            resolve(`No record`);
          sql.close();
        }).catch((err) => {
          reject("reject for", countryText, err);
          sql.close();
        })
      })
    };


    var filterMenuList = () => {
      element.all(by.repeater('i in filterComponents')).filter((parentFilter, index) => {
        return parentFilter.element(by.css('.panel-heading')).getText().then((text) => {
          return (text === text);
        });
      }).each((parentElement, parentIndex) => {
        parentElement.click();
        browser.sleep(shortWaitTime);
        parentElement.all(by.repeater('listItem in initValues')).count().then((count) => {
          if (count > 1) {
            parentElement.element(by.css('.panel-heading')).getText().then((menuText) => {
              if (menuText != "Country" && subMenuValues[menuText] != null) {
                console.log("menu click for", menuText);
                parentElement.element(by.css('[ng-click="toggleAll()"]')).click();
                browser.sleep(shortWaitTime);

                parentElement.all(by.repeater('listItem in initValues')).filter((parentFilter, index) => {
                  return parentFilter.element(by.css('.md-label')).getText().then((text) => {
                    return (text === subMenuValues[menuText]);
                  });
                }).each((childElement, childIndex) => {

                  childElement.click();
                  browser.actions().mouseMove(childElement, { x: 500, y: 0 }).perform();

                  parentElement.element(by.css('[ng-click="applyFilter()"]')).click();
                  browser.actions().mouseMove(parentElement.element(by.css('[ng-click="applyFilter()"]')), { x: 500, y: 0 }).perform();
                  browser.sleep(shortWaitTime);

                  element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).isPresent().then(function (isVisible) {
                    if (isVisible) {
                      element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).click();
                      browser.sleep(shortWaitTime);
                      browser.sleep(5000);
                    }
                  });
                  browser.sleep(longWaitTime);
                });
              }
            })
          }
        });
      });
    }
    var validateCountryData = () => {
      var totalColCount;
      var currentAvgIndex, currentMedIndex, currentStuIndex;
      var avgElement, medElement, stuElement;
      element.all(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g')).count().then(function (totalElement) {
        totalColCount = ((totalElement - 1) / 4);
        console.log("total country count - ", totalColCount);
        element.all(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + totalElement + ']/svg:g')).each((currentCountryElement, currentCountryIndex) => {
          currentCountryElement.getText().then((countryText) => {
            currentAvgIndex = (currentCountryIndex + 1);
            currentMedIndex = (totalColCount * 1) + currentAvgIndex;
            currentStuIndex = (totalColCount * 2) + currentAvgIndex;
            avgElement = element(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + currentAvgIndex + ']'));
            medElement = element(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + currentMedIndex + ']'));
            stuElement = element(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + currentStuIndex + ']'));
            protractor.promise.all([
              avgElement.getText(),
              medElement.getText(),
              stuElement.getText()
            ]).then((result) => {
              databaseConnect(countryText.replace("...", "")).then(dbResult => {


                console.log((currentCountryIndex + 1), countryText, result[0], result[1], result[2], dbResult);

                if (dbResult == 0 || dbResult == null || dbResult== 'No record') {
                  console.log("dbResult", dbResult);
                  since(function () {
                    return 'For the country ' + countryText + ' averages are not matched with the database' + ': ' + 'Actual-' + result[0] + ' =/= ' + 'Expected-' + dbResult;
                  }).
                    expect(result[0] == 'NA').toBe(true);

                } else {
                  console.log("dbResult", dbResult);
                  since(function () {
                    return 'For the country ' + countryText + ' averages are not matched with the database' + ': ' + 'Actual-' + result[0] + ' =/= ' + 'Expected-' + dbResult;
                  }).
                    expect(result[0] == dbResult).toBe(true);
                }

              });
              browser.sleep(5000);
            })
          });
        });
      });
    }

    filterMenuList();
    validateCountryData();


  });


  it('should be matched Median Box Plots value of Sponsor with the database value for the given filter options', function () {

    browser.sleep(3000);
    myPO.setSitePercentZero();
    browser.sleep(500);

    var subMenuValues = {
      "Therapeutic Area": "ONCOLOGY",
      "Clinical Indication": "BREAST CANCER",
      "Subindication": "EBC, HER2+",
      "Phase": "PHASE 2",
      "Enrollment Status": "COMPLETED",
      "Patients Randomized": "201 - 500",
      "Site Count": "51 - 100"
    }
    var databaseConnect = (countryText) => {
      return new Promise((resolve, reject) => {
        connectionPool.request().query(`SELECT cast(SitePFtoSACycleTimeInWeeks AS DECIMAL(18, 1)) as Median FROM (SELECT a.ProtocolId,CAST(MIN(pf."Weeks to Activate First Site") AS DECIMAL(18,2)) AS 'SitePFtoSACycleTimeInWeeks',row_number() over(order by MIN(pf."Weeks to Activate First Site")) - row_number() over(order by MIN(pf."Weeks to Activate First Site") DESC) as CN from protocol a inner join pftosa pf on a.protocolid =pf.protocolid inner JOIN TherapeuticArea F1 ON a.TherapeuticAreaId=F1.TherapeuticAreaId inner JOIN SubIndication F3 ON a.SubIndicationId=F3.SubIndicationId and a.ClinicalIndicationId = F3.ClinicalIndicationId inner join clinicalindication b on a.clinicalindicationid = b.clinicalindicationid inner join Therapy th on a.TherapyId = th.TherapyId left join ProtocolDiseaseStage pds on a.Protocolid = pds.ProtocolId inner join diseasestage ds on ds.diseasestageid = pds.diseasestageid inner join Phase ph on a.phaseid = ph.phaseid inner join LineOfTherapy lp on a.LineOfTherapyId = lp.LineOfTherapyId inner JOIN Country Co ON Co.CountryId = pf.CountryId inner JOIN Sponsor c ON a.SponsorId = c.SponsorId where a.ClinicalIndicationId != 43 and SponsorDisplayName='SPONSOR' and TherapeuticAreaName = 'ONCOLOGY' and PhaseName = 'PHASE 2' and SubIndicationName='EBC, HER2+' and ClinicalIndicationName = 'BREAST CANCER' and EnrollmentStatus ='COMPLETED' and HasCancerImmunotherapy = '0' and DiseaseStageName = 'EARLY' and AdultPediatric ='1' and a.Protocolid not in(select protocolid from ProtocolExclusionList) and PhaseName = 'PHASE 2' and LineOfTherapyName ='ADJUVANT' and th.TherapyName='MONOTHERAPY' and SiteCount = '51 - 100'and	PatientRandomized='201 - 500' and CountryName LIKE '${countryText}%' GROUP BY a.ProtocolId)A WHERE CN BETWEEN -1 AND 1`).then((result) => {
          if (result.recordset.length > 0)
            resolve(result.recordset[0].Median);
          else
            resolve(`No record`);
          sql.close();
        }).catch((err) => {
          reject("reject for", countryText, err);
          sql.close();
        })
      })
    };


    var filterMenuList = () => {
      element.all(by.repeater('i in filterComponents')).filter((parentFilter, index) => {
        return parentFilter.element(by.css('.panel-heading')).getText().then((text) => {
          return (text === text);
        });
      }).each((parentElement, parentIndex) => {
        parentElement.click();
        browser.sleep(shortWaitTime);
        parentElement.all(by.repeater('listItem in initValues')).count().then((count) => {
          if (count > 1) {
            parentElement.element(by.css('.panel-heading')).getText().then((menuText) => {
              if (menuText != "Country" && subMenuValues[menuText] != null) {
                console.log("menu click for", menuText);
                parentElement.element(by.css('[ng-click="toggleAll()"]')).click();
                browser.sleep(shortWaitTime);

                parentElement.all(by.repeater('listItem in initValues')).filter((parentFilter, index) => {
                  return parentFilter.element(by.css('.md-label')).getText().then((text) => {
                    return (text === subMenuValues[menuText]);
                  });
                }).each((childElement, childIndex) => {

                  childElement.click();
                  browser.actions().mouseMove(childElement, { x: 500, y: 0 }).perform();

                  parentElement.element(by.css('[ng-click="applyFilter()"]')).click();
                  browser.actions().mouseMove(parentElement.element(by.css('[ng-click="applyFilter()"]')), { x: 500, y: 0 }).perform();
                  browser.sleep(shortWaitTime);

                  element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).isPresent().then(function (isVisible) {
                    if (isVisible) {
                      element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).click();
                      browser.sleep(shortWaitTime);
                      browser.sleep(5000);
                    }
                  });
                  browser.sleep(longWaitTime);
                });
              }
            })
          }
        });
      });
    }
    var validateCountryData = () => {
      var totalColCount;
      var currentAvgIndex, currentMedIndex, currentStuIndex;
      var avgElement, medElement, stuElement;
      element.all(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g')).count().then(function (totalElement) {
        totalColCount = ((totalElement - 1) / 4);
        console.log("total country count - ", totalColCount);
        element.all(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + totalElement + ']/svg:g')).each((currentCountryElement, currentCountryIndex) => {
          currentCountryElement.getText().then((countryText) => {
            currentAvgIndex = (currentCountryIndex + 1);
            currentMedIndex = (totalColCount * 1) + currentAvgIndex;
            currentStuIndex = (totalColCount * 2) + currentAvgIndex;
            avgElement = element(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + currentAvgIndex + ']'));
            medElement = element(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + currentMedIndex + ']'));
            stuElement = element(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + currentStuIndex + ']'));
            protractor.promise.all([
              avgElement.getText(),
              medElement.getText(),
              stuElement.getText()
            ]).then((result) => {
              databaseConnect(countryText.replace("...", "")).then(dbResult => {


                console.log((currentCountryIndex + 1), countryText, result[0], result[1], result[2], dbResult);

                if (dbResult == 0 || dbResult == null || dbResult== 'No record') {
                  console.log("dbResult", dbResult);
                  since(function () {
                    return 'For the country ' + countryText + ' medians are not matched with the database' + ': ' + 'Actual-' + result[1] + ' =/= ' + 'Expected-' + dbResult;
                  }).
                    expect(result[1] == 'NA').toBe(true);

                } else {
                  console.log("dbResult", dbResult);
                  since(function () {
                    return 'For the country ' + countryText + ' medians are not matched with the database' + ': ' + 'Actual-' + result[1] + ' =/= ' + 'Expected-' + dbResult;
                  }).
                    expect(result[1] == dbResult).toBe(true);
                }

              });
              browser.sleep(5000);
            })
          });
        });
      });
    }

    filterMenuList();
    validateCountryData();


  });

//For Competition

it('should be matched Studies Box Plots value of Competition with the database value for the given filter options', function () {

    browser.sleep(3000);
    myPO.setSitePercentZero();
    browser.sleep(500);

    var subMenuValues = {
      "Therapeutic Area": "ONCOLOGY",
      "Clinical Indication": "BREAST CANCER",
      "Subindication": "EBC, HER2+",
      "Phase": "PHASE 2",
      "Enrollment Status": "COMPLETED",
      "Patients Randomized": "201 - 500",
      "Site Count": "51 - 100"
    }
    var databaseConnect = (countryText) => {
      return new Promise((resolve, reject) => {
        connectionPool.request().query(`select count(distinct a.protocolid) as Studies from protocol a inner join pftosa pf on a.protocolid =pf.protocolid inner JOIN TherapeuticArea F1 ON a.TherapeuticAreaId=F1.TherapeuticAreaId inner JOIN SubIndication F3 ON a.SubIndicationId=F3.SubIndicationId and a.ClinicalIndicationId = F3.ClinicalIndicationId inner join clinicalindication b on a.clinicalindicationid = b.clinicalindicationid inner join Therapy th on a.TherapyId = th.TherapyId left join ProtocolDiseaseStage pds on a.Protocolid = pds.ProtocolId inner join diseasestage ds on ds.diseasestageid = pds.diseasestageid inner join Phase ph on a.phaseid = ph.phaseid inner join LineOfTherapy lp on a.LineOfTherapyId = lp.LineOfTherapyId inner JOIN Country Co ON Co.CountryId = pf.CountryId inner JOIN Sponsor c ON a.SponsorId = c.SponsorId where a.ClinicalIndicationId != 43 and SponsorDisplayName='Competition' and TherapeuticAreaName = 'ONCOLOGY' and PhaseName = 'PHASE 2' and SubIndicationName='EBC, HER2+' and ClinicalIndicationName = 'BREAST CANCER' and HasCancerImmunotherapy = '0' and DiseaseStageName = 'EARLY' and AdultPediatric ='1' and a.Protocolid not in(select protocolid from ProtocolExclusionList) and PhaseName = 'PHASE 2' and LineOfTherapyName ='ADJUVANT' and th.TherapyName='MONOTHERAPY' and SiteCount = '51 - 100' and	PatientRandomized='201 - 500' and CountryName LIKE '${countryText}%'`).then((result) => {
          if (result.recordset.length > 0)
            resolve(result.recordset[0].Studies);
          else
            resolve(`No record`);
          sql.close();
        }).catch((err) => {
          reject("reject for", countryText, err);
          sql.close();
        })
      })
    };


    var filterMenuList = () => {
      element.all(by.repeater('i in filterComponents')).filter((parentFilter, index) => {
        return parentFilter.element(by.css('.panel-heading')).getText().then((text) => {
          return (text === text);
        });
      }).each((parentElement, parentIndex) => {
        parentElement.click();
        browser.sleep(shortWaitTime);
        
        parentElement.all(by.repeater('listItem in initValues')).count().then((count) => {
          if (count > 1) {
            parentElement.element(by.css('.panel-heading')).getText().then((menuText) => {
              if (subMenuValues[menuText] != null) {
                
                console.log("menu click for", menuText);
                parentElement.element(by.css('[ng-click="toggleAll()"]')).click();
                browser.sleep(shortWaitTime);

                parentElement.all(by.repeater('listItem in initValues')).filter((parentFilter, index) => {
                  return parentFilter.element(by.css('.md-label')).getText().then((text) => {
                    console.log(text === subMenuValues[menuText], text);
                    return (text === subMenuValues[menuText]);
                  });
                }).each((childElement, childIndex) => {

                  browser.sleep(2000);
                  childElement.click();
                  browser.actions().mouseMove(childElement, { x: 500, y: 0 }).perform();

                  parentElement.element(by.css('[ng-click="applyFilter()"]')).click();
                  browser.actions().mouseMove(parentElement.element(by.css('[ng-click="applyFilter()"]')), { x: 500, y: 0 }).perform();
                  browser.sleep(shortWaitTime);

                  element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).isPresent().then(function (isVisible) {
                    if (isVisible) {
                      element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).click();
                      browser.sleep(shortWaitTime);
                      browser.sleep(5000);
                    }
                  });
                  browser.sleep(longWaitTime);
                });
              }
            })
          }
        });
      });
    }
    var validateCountryData = () => {
      var totalColCount;
      var currentAvgIndex, currentMedIndex, currentStuIndex;
      var avgElement, medElement, stuElement;
      element.all(by.xpath('//*[@id="boxplotpftosac"]/div[2]/svg:svg/svg:g/svg:g')).count().then(function (totalElement) {
        totalColCount = ((totalElement - 1) / 4);
        console.log("total country count - ", totalColCount);
        element.all(by.xpath('//*[@id="boxplotpftosac"]/div[2]/svg:svg/svg:g/svg:g[' + totalElement + ']/svg:g')).each((currentCountryElement, currentCountryIndex) => {
          currentCountryElement.getText().then((countryText) => {
            currentAvgIndex = (currentCountryIndex + 1);
            currentMedIndex = (totalColCount * 1) + currentAvgIndex;
            currentStuIndex = (totalColCount * 2) + currentAvgIndex;
            avgElement = element(by.xpath('//*[@id="boxplotpftosac"]/div[2]/svg:svg/svg:g/svg:g[' + currentAvgIndex + ']'));
            medElement = element(by.xpath('//*[@id="boxplotpftosac"]/div[2]/svg:svg/svg:g/svg:g[' + currentMedIndex + ']'));
            stuElement = element(by.xpath('//*[@id="boxplotpftosac"]/div[2]/svg:svg/svg:g/svg:g[' + currentStuIndex + ']'));
            protractor.promise.all([
              avgElement.getText(),
              medElement.getText(),
              stuElement.getText()
            ]).then((result) => {
              databaseConnect(countryText.replace("...", "")).then(dbResult => {


                console.log((currentCountryIndex + 1), countryText, result[0], result[1], result[2], dbResult);

                if (dbResult == 0 || dbResult == null || dbResult== 'No record') {
                  console.log("dbResult", dbResult);
                  since(function () {
                    return 'For the country ' + countryText + ' studies are not matched with the database' + ': ' + 'Actual-' + result[2] + ' =/= ' + 'Expected-' + dbResult;
                  }).
                    expect(result[2] == 'NA').toBe(true);

                } else {
                  console.log("dbResult", dbResult);
                  since(function () {
                    return 'For the country ' + countryText + ' studies are not matched with the database' + ': ' + 'Actual-' + result[2] + ' =/= ' + 'Expected-' + dbResult;
                  }).
                    expect(result[2] == dbResult).toBe(true);
                }

              });
              browser.sleep(5000);
            })
          });
        });
      });
    }
    //Callback
    filterMenuList();
    validateCountryData();


  });


  it('should be matched Average Box Plots value of Competition with the database value for the given filter options', function () {

    browser.sleep(3000);
    myPO.setSitePercentZero();
    browser.sleep(500);

    var subMenuValues = {
      "Therapeutic Area": "ONCOLOGY",
      "Clinical Indication": "BREAST CANCER",
      "Subindication": "EBC, HER2+",
      "Phase": "PHASE 2",
      "Enrollment Status": "COMPLETED",
      "Patients Randomized": "201 - 500",
      "Site Count": "51 - 100"
    }
    var databaseConnect = (countryText) => {
      return new Promise((resolve, reject) => {
        connectionPool.request().query(`select cast(sum(SitePFtoSACycleTimeInWeeks)/count(*) as decimal(18,1)) as 'Avg' from (select  a.ProtocolId, min(cast(pf."Weeks to Activate First Site" as decimal(18,1))) as 'SitePFtoSACycleTimeInWeeks' from protocol a inner join pftosa pf on a.protocolid =pf.protocolid inner JOIN TherapeuticArea F1 ON a.TherapeuticAreaId=F1.TherapeuticAreaId inner JOIN SubIndication F3 ON a.SubIndicationId=F3.SubIndicationId and a.ClinicalIndicationId = F3.ClinicalIndicationId inner join clinicalindication b on a.clinicalindicationid = b.clinicalindicationid inner join Therapy th on a.TherapyId = th.TherapyId left join ProtocolDiseaseStage pds on a.Protocolid = pds.ProtocolId inner join diseasestage ds on ds.diseasestageid = pds.diseasestageid inner join Phase ph on a.phaseid = ph.phaseid inner join LineOfTherapy lp on a.LineOfTherapyId = lp.LineOfTherapyId inner JOIN Country Co ON Co.CountryId = pf.CountryId inner JOIN Sponsor c ON a.SponsorId = c.SponsorId where a.ClinicalIndicationId != 43 and SponsorDisplayName='Competition' and TherapeuticAreaName = 'ONCOLOGY' and PhaseName = 'PHASE 2' and SubIndicationName='EBC, HER2+' and ClinicalIndicationName = 'BREAST CANCER' and EnrollmentStatus ='COMPLETED' and HasCancerImmunotherapy = '0' and DiseaseStageName = 'EARLY' and AdultPediatric ='1' and a.Protocolid not in(select protocolid from ProtocolExclusionList) and PhaseName = 'PHASE 2' and LineOfTherapyName ='ADJUVANT' and th.TherapyName='MONOTHERAPY' and SiteCount = '51 - 100' and	PatientRandomized='201 - 500' and CountryName LIKE '${countryText}%' group by a.ProtocolId) as result`).then((result) => {
          if (result.recordset.length > 0)
            resolve(result.recordset[0].Avg);
          else
            resolve(`No record`);
          sql.close();
        }).catch((err) => {
          reject("reject for", countryText, err);
          sql.close();
        })
      })
    };


    var filterMenuList = () => {
      element.all(by.repeater('i in filterComponents')).filter((parentFilter, index) => {
        return parentFilter.element(by.css('.panel-heading')).getText().then((text) => {
          return (text === text);
        });
      }).each((parentElement, parentIndex) => {
        parentElement.click();
        browser.sleep(shortWaitTime);
        parentElement.all(by.repeater('listItem in initValues')).count().then((count) => {
          if (count > 1) {
            parentElement.element(by.css('.panel-heading')).getText().then((menuText) => {
              if (menuText != "Country" && subMenuValues[menuText] != null) {
                console.log("menu click for", menuText);
                parentElement.element(by.css('[ng-click="toggleAll()"]')).click();
                browser.sleep(shortWaitTime);

                parentElement.all(by.repeater('listItem in initValues')).filter((parentFilter, index) => {
                  return parentFilter.element(by.css('.md-label')).getText().then((text) => {
                    return (text === subMenuValues[menuText]);
                  });
                }).each((childElement, childIndex) => {

                  childElement.click();
                  browser.actions().mouseMove(childElement, { x: 500, y: 0 }).perform();

                  parentElement.element(by.css('[ng-click="applyFilter()"]')).click();
                  browser.actions().mouseMove(parentElement.element(by.css('[ng-click="applyFilter()"]')), { x: 500, y: 0 }).perform();
                  browser.sleep(shortWaitTime);

                  element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).isPresent().then(function (isVisible) {
                    if (isVisible) {
                      element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).click();
                      browser.sleep(shortWaitTime);
                      browser.sleep(5000);
                    }
                  });
                  browser.sleep(longWaitTime);
                });
              }
            })
          }
        });
      });
    }
    var validateCountryData = () => {
      var totalColCount;
      var currentAvgIndex, currentMedIndex, currentStuIndex;
      var avgElement, medElement, stuElement;
      element.all(by.xpath('//*[@id="boxplotpftosac"]/div[2]/svg:svg/svg:g/svg:g')).count().then(function (totalElement) {
        totalColCount = ((totalElement - 1) / 4);
        console.log("total country count - ", totalColCount);
        element.all(by.xpath('//*[@id="boxplotpftosac"]/div[2]/svg:svg/svg:g/svg:g[' + totalElement + ']/svg:g')).each((currentCountryElement, currentCountryIndex) => {
          currentCountryElement.getText().then((countryText) => {
            currentAvgIndex = (currentCountryIndex + 1);
            currentMedIndex = (totalColCount * 1) + currentAvgIndex;
            currentStuIndex = (totalColCount * 2) + currentAvgIndex;
            avgElement = element(by.xpath('//*[@id="boxplotpftosac"]/div[2]/svg:svg/svg:g/svg:g[' + currentAvgIndex + ']'));
            medElement = element(by.xpath('//*[@id="boxplotpftosac"]/div[2]/svg:svg/svg:g/svg:g[' + currentMedIndex + ']'));
            stuElement = element(by.xpath('//*[@id="boxplotpftosac"]/div[2]/svg:svg/svg:g/svg:g[' + currentStuIndex + ']'));
            protractor.promise.all([
              avgElement.getText(),
              medElement.getText(),
              stuElement.getText()
            ]).then((result) => {
              databaseConnect(countryText.replace("...", "")).then(dbResult => {


                console.log((currentCountryIndex + 1), countryText, result[0], result[1], result[2], dbResult);

                if (dbResult == 0 || dbResult == null || dbResult== 'No record') {
                  console.log("dbResult", dbResult);
                  since(function () {
                    return 'For the country ' + countryText + ' averages are not matched with the database' + ': ' + 'Actual-' + result[0] + ' =/= ' + 'Expected-' + dbResult;
                  }).
                    expect(result[0] == 'NA').toBe(true);

                } else {
                  console.log("dbResult", dbResult);
                  since(function () {
                    return 'For the country ' + countryText + ' averages are not matched with the database' + ': ' + 'Actual-' + result[0] + ' =/= ' + 'Expected-' + dbResult;
                  }).
                    expect(result[0] == dbResult).toBe(true);
                }

              });
              browser.sleep(5000);
            })
          });
        });
      });
    }

    filterMenuList();
    validateCountryData();


  });


  it('should be matched Median Box Plots value of Competition with the database value for the given filter options', function () {

    browser.sleep(3000);
    myPO.setSitePercentZero();
    browser.sleep(500);

    var subMenuValues = {
      "Therapeutic Area": "ONCOLOGY",
      "Clinical Indication": "BREAST CANCER",
      "Subindication": "EBC, HER2+",
      "Phase": "PHASE 2",
      "Enrollment Status": "COMPLETED",
      "Patients Randomized": "201 - 500",
      "Site Count": "51 - 100"
    }
    var databaseConnect = (countryText) => {
      return new Promise((resolve, reject) => {
       connectionPool.request().query(`SELECT cast(SitePFtoSACycleTimeInWeeks AS DECIMAL(18, 1)) as Median FROM (SELECT a.ProtocolId,CAST(MIN(pf."Weeks to Activate First Site") AS DECIMAL(18,2)) AS 'SitePFtoSACycleTimeInWeeks',row_number() over(order by MIN(pf."Weeks to Activate First Site")) - row_number() over(order by MIN(pf."Weeks to Activate First Site") DESC) as CN from protocol a inner join pftosa pf on a.protocolid =pf.protocolid inner JOIN TherapeuticArea F1 ON a.TherapeuticAreaId=F1.TherapeuticAreaId inner JOIN SubIndication F3 ON a.SubIndicationId=F3.SubIndicationId and a.ClinicalIndicationId = F3.ClinicalIndicationId inner join clinicalindication b on a.clinicalindicationid = b.clinicalindicationid inner join Therapy th on a.TherapyId = th.TherapyId left join ProtocolDiseaseStage pds on a.Protocolid = pds.ProtocolId inner join diseasestage ds on ds.diseasestageid = pds.diseasestageid inner join Phase ph on a.phaseid = ph.phaseid inner join LineOfTherapy lp on a.LineOfTherapyId = lp.LineOfTherapyId inner JOIN Country Co ON Co.CountryId = pf.CountryId inner JOIN Sponsor c ON a.SponsorId = c.SponsorId where a.ClinicalIndicationId != 43 and SponsorDisplayName='Competition' and TherapeuticAreaName = 'ONCOLOGY' and PhaseName = 'PHASE 2' and SubIndicationName='EBC, HER2+' and ClinicalIndicationName = 'BREAST CANCER' and EnrollmentStatus ='COMPLETED' and HasCancerImmunotherapy = '0' and DiseaseStageName = 'EARLY' and AdultPediatric ='1' and a.Protocolid not in(select protocolid from ProtocolExclusionList) and PhaseName = 'PHASE 2' and LineOfTherapyName ='ADJUVANT' and th.TherapyName='MONOTHERAPY' and SiteCount = '51 - 100'and	PatientRandomized='201 - 500' and CountryName LIKE '${countryText}%' GROUP BY a.ProtocolId)A WHERE CN BETWEEN -1 AND 1`).then((result) => {
          if (result.recordset.length > 0)
            resolve(result.recordset[0].Median);
          else
            resolve(`No record`);
          sql.close();
        }).catch((err) => {
          reject("reject for", countryText, err);
          sql.close();
        })
      })
    };


    var filterMenuList = () => {
      element.all(by.repeater('i in filterComponents')).filter((parentFilter, index) => {
        return parentFilter.element(by.css('.panel-heading')).getText().then((text) => {
          return (text === text);
        });
      }).each((parentElement, parentIndex) => {
        parentElement.click();
        browser.sleep(shortWaitTime);
        parentElement.all(by.repeater('listItem in initValues')).count().then((count) => {
          if (count > 1) {
            parentElement.element(by.css('.panel-heading')).getText().then((menuText) => {
              if (menuText != "Country" && subMenuValues[menuText] != null) {
                console.log("menu click for", menuText);
                parentElement.element(by.css('[ng-click="toggleAll()"]')).click();
                browser.sleep(shortWaitTime);

                parentElement.all(by.repeater('listItem in initValues')).filter((parentFilter, index) => {
                  return parentFilter.element(by.css('.md-label')).getText().then((text) => {
                    return (text === subMenuValues[menuText]);
                  });
                }).each((childElement, childIndex) => {

                  childElement.click();
                  browser.actions().mouseMove(childElement, { x: 500, y: 0 }).perform();

                  parentElement.element(by.css('[ng-click="applyFilter()"]')).click();
                  browser.actions().mouseMove(parentElement.element(by.css('[ng-click="applyFilter()"]')), { x: 500, y: 0 }).perform();
                  browser.sleep(shortWaitTime);

                  element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).isPresent().then(function (isVisible) {
                    if (isVisible) {
                      element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).click();
                      browser.sleep(shortWaitTime);
                      browser.sleep(5000);
                    }
                  });
                  browser.sleep(longWaitTime);
                });
              }
            })
          }
        });
      });
    }
    var validateCountryData = () => {
      var totalColCount;
      var currentAvgIndex, currentMedIndex, currentStuIndex;
      var avgElement, medElement, stuElement;
      element.all(by.xpath('//*[@id="boxplotpftosac"]/div[2]/svg:svg/svg:g/svg:g')).count().then(function (totalElement) {
        totalColCount = ((totalElement - 1) / 4);
        console.log("total country count - ", totalColCount);
        element.all(by.xpath('//*[@id="boxplotpftosac"]/div[2]/svg:svg/svg:g/svg:g[' + totalElement + ']/svg:g')).each((currentCountryElement, currentCountryIndex) => {
          currentCountryElement.getText().then((countryText) => {
            currentAvgIndex = (currentCountryIndex + 1);
            currentMedIndex = (totalColCount * 1) + currentAvgIndex;
            currentStuIndex = (totalColCount * 2) + currentAvgIndex;
            avgElement = element(by.xpath('//*[@id="boxplotpftosac"]/div[2]/svg:svg/svg:g/svg:g[' + currentAvgIndex + ']'));
            medElement = element(by.xpath('//*[@id="boxplotpftosac"]/div[2]/svg:svg/svg:g/svg:g[' + currentMedIndex + ']'));
            stuElement = element(by.xpath('//*[@id="boxplotpftosac"]/div[2]/svg:svg/svg:g/svg:g[' + currentStuIndex + ']'));
            protractor.promise.all([
              avgElement.getText(),
              medElement.getText(),
              stuElement.getText()
            ]).then((result) => {
              databaseConnect(countryText.replace("...", "")).then(dbResult => {


                console.log((currentCountryIndex + 1), countryText, result[0], result[1], result[2], dbResult);

                if (dbResult == 0 || dbResult == null || dbResult== 'No record') {
                  console.log("dbResult", dbResult);
                  since(function () {
                    return 'For the country ' + countryText + ' medians are not matched with the database' + ': ' + 'Actual-' + result[1] + ' =/= ' + 'Expected-' + dbResult;
                  }).
                    expect(result[1] == 'NA').toBe(true);

                } else {
                  console.log("dbResult", dbResult);
                  since(function () {
                    return 'For the country ' + countryText + ' medians are not matched with the database' + ': ' + 'Actual-' + result[1] + ' =/= ' + 'Expected-' + dbResult;
                  }).
                    expect(result[1] == dbResult).toBe(true);
                }

              });
              browser.sleep(5000);
            })
          });
        });
      });
    }

    filterMenuList();
    validateCountryData();


  });



})