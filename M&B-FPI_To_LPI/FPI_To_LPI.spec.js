'use strict';
var myPOLogin = require('../Login/LoginPage.po.js');
var myPOLandingPage = require('../LandingPage/LandingPage.po.js');
var myPO_MAndB = require('../MetricsAndBenchmarking/MetricsAndBenchmarking.po.js');
var dataObj = require('../TestData.json');
var utility = require('../Utility.js');
var myPO = require('./FPI_To_LPI.po.js');

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


describe('M&B FPI-LPI Page', function () {
  var originalTimeout;
  var filterMenuList;
  //beforeEach(function () {


    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000000;
    // browser.get("http://qa.pharmacuity.healthcare/EH/");
		// browser.waitForAngular();

    // myPOLogin.login(dataObj.LoginData.Users[4].username, dataObj.LoginData.Users[4].passwordField);
    // browser.driver.sleep(1000);
    // myPOLandingPage.clickOnSelectAnApplication();
    // myPO_MAndB.clickMandB();
    // myPO.clickOnFPItoLPI();
  //});

  it('should be matched Studies Box Plots value of Sponsor with the database value for the given filter options', function (done) {


    browser.get(dataObj.LoginData.url);
		browser.waitForAngular();

    myPOLogin.login(dataObj.LoginData.Users[4].username, dataObj.LoginData.Users[4].passwordField);
    browser.driver.sleep(1000);
    myPOLandingPage.clickOnSelectAnApplication();
    myPO_MAndB.clickMandB();
    myPO.clickOnFPItoLPI();



      browser.sleep(3000);
      myPO.setSitePercentage(50);
      browser.sleep(500);

      var subMenuValues = {
        "Therapeutic Area": "ONCOLOGY",
        "Enrollment Status": "COMPLETED",
        "Cancer Immunotherapy": "NO"         

      }
      var databaseConnect = (countryText) => {
        return new Promise((resolve, reject) => {
          
          // connectionPool.request().query(`select count(distinct a.ProtocolId) as Studies from protocol a inner join CLSPerformanceData pf on a.protocolid =pf.protocolid inner JOIN TherapeuticArea F1 ON a.TherapeuticAreaId=F1.TherapeuticAreaId left JOIN SubIndication F3 ON a.SubIndicationId=F3.SubIndicationId and a.ClinicalIndicationId = F3.ClinicalIndicationId inner join clinicalindication b on a.clinicalindicationid = b.clinicalindicationid left join Therapy th on a.TherapyId = th.TherapyId left join ProtocolDiseaseStage pds on a.Protocolid = pds.ProtocolId left join diseasestage ds on ds.diseasestageid = pds.diseasestageid inner join Phase ph on a.phaseid = ph.phaseid left join LineOfTherapy lp on a.LineOfTherapyId = lp.LineOfTherapyId left join CountryPatientRandomized CPR on a.ProtocolId=CPR.ProtocolId and pf.CountryId=CPR.CountryId inner JOIN Country Co ON Co.CountryId = pf.CountryId inner JOIN Sponsor c ON a.SponsorId = c.SponsorId where  SponsorDisplayName='Sponsor' and TherapeuticAreaName = 'ONCOLOGY'  and HasCancerImmunotherapy = '0'  and a.EnrollmentStatus ='COMPLETED' and a.Protocolid not in(select protocolid from ManualOverride) and a.Protocolid not in(select protocolid from ProtocolExclusionList) and pf.AccessionId IS NOT NULL and CountryName LIKE replace(replace('${countryText}%','[','_'),']','_')`).then((result) => {
            connectionPool.request().query(`select count(distinct a.ProtocolId) as Studies from protocol a inner join CLSPerformanceData pf on a.protocolid =pf.protocolid inner JOIN TherapeuticArea F1 ON a.TherapeuticAreaId=F1.TherapeuticAreaId left JOIN SubIndication F3 ON a.SubIndicationId=F3.SubIndicationId and a.ClinicalIndicationId = F3.ClinicalIndicationId inner join clinicalindication b on a.clinicalindicationid = b.clinicalindicationid left join Therapy th on a.TherapyId = th.TherapyId left join ProtocolDiseaseStage pds on a.Protocolid = pds.ProtocolId left join diseasestage ds on ds.diseasestageid = pds.diseasestageid inner join Phase ph on a.phaseid = ph.phaseid left join LineOfTherapy lp on a.LineOfTherapyId = lp.LineOfTherapyId left join CountryPatientRandomized CPR on a.ProtocolId=CPR.ProtocolId and pf.CountryId=CPR.CountryId inner JOIN Country Co ON Co.CountryId = pf.CountryId inner JOIN Sponsor c ON a.SponsorId = c.SponsorId where  SponsorDisplayName='Sponsor' and TherapeuticAreaName = 'ONCOLOGY'  and HasCancerImmunotherapy = '0'  and a.EnrollmentStatus ='COMPLETED' and pf.AccessionId IS NOT NULL and CountryName LIKE replace(replace('${countryText}%','[','_'),']','_')`).then((result) => {
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


      filterMenuList = () => {
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
      done();


    });




})
