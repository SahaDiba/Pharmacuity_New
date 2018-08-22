'use strict';
var myPOLogin = require('../Login/LoginPage.po.js');
var myPOLandingPage = require('../LandingPage/LandingPage.po.js');
var myPO_MAndB = require('../MetricsAndBenchmarking/MetricsAndBenchmarking.po.js');
var dataObj = require('../TestData.json');
var utility = require('../Utility.js');
var myPO = require('./PF_To_SA.po.js');
//var db = require('../db/db.js');

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

var sortWaitTime = 500;
var longWaitTime = 3000;
const connectionPool = new sql.ConnectionPool(config, err => { });


describe('PF-SA Page', function () {

  beforeEach(function () {

    myPOLogin.login(dataObj.LoginData.Users[4].username, dataObj.LoginData.Users[4].passwordField);

    browser.driver.sleep(1000);
    myPOLandingPage.clickOnSelectAnApplication();
    myPO_MAndB.clickMandB();
    myPO.clickOnPFtoSA();
    //utility.SelectOptionFromAcordian("Therapeutic Area;Clinical Indication;Subindication;Phase", "ONCOLOGY;BREAST CANCER;EBC, HER2+;PHASE 2");
    browser.driver.sleep(2000);
  });





  it('should be matched Studies Box Plots value of Sponsor with the database value for the given filter options', function () {

   // utility.SelectOptionFromAcordian("Therapeutic Area;Clinical Indication;Subindication;Phase","ONCOLOGY;BREAST CANCER;EBC, HER2+;PHASE 2");
    browser.sleep(3000);
  //   var percentage = element(by.xpath('//*[@id="content"]/div/div/div/div/div/div[2]/header/div[1]/input'));
  //   utility.highlightElement(percentage);
  //   percentage.clear();
  //   percentage.sendKeys(0);

  //   element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).isPresent().then(function (isVisible) {
  //     if (isVisible) {
  //       element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).click();
  //       browser.sleep(sortWaitTime);
  //       browser.sleep(5000);
     
  //   }
  // })
    utility.setSitePercentZero();
  
    browser.sleep(500);
  
    var subMenuValues = {
      "Therapeutic Area": "CARDIOVASCULAR",
      
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
        browser.sleep(sortWaitTime);
        parentElement.all(by.repeater('listItem in initValues')).count().then((count) => {
          if (count > 1) {
            parentElement.element(by.css('.panel-heading')).getText().then((menuText) => {
              if (menuText != "Country" && subMenuValues[menuText] != null) {
                console.log("menu click for", menuText);
                parentElement.element(by.css('[ng-click="toggleAll()"]')).click();
                browser.sleep(sortWaitTime);

                parentElement.all(by.repeater('listItem in initValues')).filter((parentFilter, index) => {
                  return parentFilter.element(by.css('.md-label')).getText().then((text) => {
                    return (text === subMenuValues[menuText]);
                  });
                }).each((childElement, childIndex) => {

                  childElement.click();
                  browser.actions().mouseMove(childElement, { x: 500, y: 0 }).perform();

                  parentElement.element(by.css('[ng-click="applyFilter()"]')).click();
                  browser.actions().mouseMove(parentElement.element(by.css('[ng-click="applyFilter()"]')), { x: 500, y: 0 }).perform();
                  browser.sleep(sortWaitTime);

                  element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).isPresent().then(function (isVisible) {
                    if (isVisible) {
                      element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).click();
                      browser.sleep(sortWaitTime);
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
              databaseConnect(countryText.replace("...","")).then(dbResult => {


                console.log((currentCountryIndex + 1), countryText, result[0], result[1], result[2], dbResult);

                if (dbResult == 0 || dbResult == null) {
                  console.log("dbResult",dbResult);
                  since(function () {
                    return 'For the country ' + countryText + ' studies are not matched with the database' + ': ' + 'Actual-' + result[2] + ' =/= ' + 'Expected-' + dbResult;
                  }).
                    expect(result[2] == 'NA').toBe(true);
  
                } else {
                  console.log("dbResult",dbResult);
                  since(function () {
                    return 'For the country ' + countryText + ' studies are not matched with the database' + ': ' + 'Actual-' + result[2] + ' =/= ' + 'Expected-' + dbResult;
                  }).
                    expect(result[2] == dbResult).toBe(true);
                }

                //expect(dbResult).toBe(expectValues[countryText]);
                //console.log((currentCountryIndex + 1), countryText, result[0], result[1], result[2], dbResult);
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
});



//     var validateCountryData = () => {
//       var totalColCount;
//       var currentAvgIndex, currentMedIndex, currentStuIndex;
//       var avgElement, medElement, stuElement;
//       element.all(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g')).count().then(function (totalElement) {
//         totalColCount = ((totalElement - 1) / 4);
//         console.log("total country count - ", totalColCount);
//         element.all(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + totalElement + ']/svg:g')).each((currentCountryElement, currentCountryIndex) => {
//           currentCountryElement.getText().then((countryText) => {
//             console.log("Country", countryText);
//             currentAvgIndex = (currentCountryIndex + 1);
//             currentMedIndex = (totalColCount * 1) + currentAvgIndex;
//             currentStuIndex = (totalColCount * 2) + currentAvgIndex;
//             avgElement = element(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + currentAvgIndex + ']'));
//             medElement = element(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + currentMedIndex + ']'));
//             stuElement = element(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + currentStuIndex + ']'));
//             protractor.promise.all([
//               avgElement.getText(),
//               medElement.getText(),
//               stuElement.getText()

//             ]).then((result) => {

//               databaseConnect(countryText.replace("...", "")).then(() => {
//                 console.log((currentCountryIndex + 1), countryText, result[0], result[1], result[2], result[3]);

//                 if (result[3] == 0 || result[3] == null) {
//                   since(function () {
//                     return 'For the country ' + countryText + ' studies are not matched with the database' + ': ' + 'Actual-' + result[2] + ' =/= ' + 'Expected-' + result[3];
//                   }).
//                     expect(result[2] == 'NA').toBe(true);
  
//                 } else {
//                   since(function () {
//                     return 'For the country ' + countryText + ' studies are not matched with the database' + ': ' + 'Actual-' + result[2] + ' =/= ' + 'Expected-' + result[3];
//                   }).
//                     expect(result[2] == result[3]).toBe(true);
//                 }

//               })
//               browser.sleep(5000);
       
             
//             })
//           });
//         });
//       });
//     }


//     browser.wait(() => {
//       validateCountryData();
//       return true;
//     }, 1);

//   }, 18000000);



// })



// it('should be matched Studies Box Plots value of Sponsor with the database value for the given filter options', function () {

  //  //utility.SelectOptionFromAcordian("Therapeutic Area;Clinical Indication;Subindication;Phase;Enrollment Status;Cancer Immunotherapy;Therapy;Disease Stage;Patients Randomized;Line of Therapy;Adult or Pediatric;Site Count","ONCOLOGY;BREAST CANCER;EBC, HER2+;PHASE 2;COMPLETED;NO;MONOTHERAPY;EARLY;201 - 500;ADJUVANT;ADULT;51 - 100");
  // //utility.SelectOptionFromAcordian("Therapeutic Area;Clinical Indication;Subindication;Phase","ONCOLOGY;BREAST CANCER;EBC, HER2+;PHASE 2");

  //   browser.sleep(5000);
  //   element.all(by.repeater('i in filterComponents')).get(0).click();
  //   browser.waitForAngular();
  //   browser.sleep(5000);



  //     element.all(by.repeater('listItem in initValues')).get(0).click();
  //     browser.waitForAngular();
  //     browser.sleep(5000);

  //       element(by.css('[ng-click="applyFilter()"]')).click();

  //       browser.waitForAngular();
  //       browser.sleep(5000);


  //       element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).isPresent().then(function (isVisible) {
  //         if (isVisible) {
  //           element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).click();
  //           browser.waitForAngular();
  //           browser.sleep(5000);
  //         }
  //       })


  //   browser.sleep(8000);
  //   var percentage = element(by.xpath('//*[@id="content"]/div/div/div/div/div/div[2]/header/div[1]/input'));
  //   utility.highlightElement(percentage);
  //   percentage.clear();
  //   percentage.sendKeys(0);
  //   browser.sleep(5000);

  //   element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).isPresent().then(function (isVisible) {
  //   if (isVisible) {
  //     element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).click();
  //     browser.waitForAngular();
  //     browser.sleep(5000);
  //   }
  // })


  //   var databaseConnect = (countryText) => {
  //     return new Promise((resolve, reject) => {
  //        connectionPool.request().query(`select count(distinct a.protocolid) as Studies from protocol a inner join pftosa pf on a.protocolid =pf.protocolid inner JOIN TherapeuticArea F1 ON a.TherapeuticAreaId=F1.TherapeuticAreaId inner JOIN SubIndication F3 ON a.SubIndicationId=F3.SubIndicationId and a.ClinicalIndicationId = F3.ClinicalIndicationId inner join clinicalindication b on a.clinicalindicationid = b.clinicalindicationid inner join Therapy th on a.TherapyId = th.TherapyId left join ProtocolDiseaseStage pds on a.Protocolid = pds.ProtocolId inner join diseasestage ds on ds.diseasestageid = pds.diseasestageid inner join Phase ph on a.phaseid = ph.phaseid inner join LineOfTherapy lp on a.LineOfTherapyId = lp.LineOfTherapyId inner JOIN Country Co ON Co.CountryId = pf.CountryId inner JOIN Sponsor c ON a.SponsorId = c.SponsorId where a.ClinicalIndicationId != 43 and SponsorDisplayName='SPONSOR' and TherapeuticAreaName = 'ONCOLOGY' and PhaseName = 'PHASE 2' and SubIndicationName='EBC, HER2+' and ClinicalIndicationName = 'BREAST CANCER' and HasCancerImmunotherapy = '0' and DiseaseStageName = 'EARLY' and AdultPediatric ='1' and a.Protocolid not in(select protocolid from ProtocolExclusionList) and PhaseName = 'PHASE 2' and LineOfTherapyName ='ADJUVANT' and th.TherapyName='MONOTHERAPY' and SiteCount = '51 - 100' and	PatientRandomized='201 - 500' and CountryName LIKE '${countryText}%'`).then((result) => {
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



  //         console.log("Country",countryText);
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
  //         ]) .then((result) => {
  //           console.log((currentCountryIndex + 1), countryText, result[0], result[1], result[2], result[3]);

  //           if(result[3]==0 || result[3]==null){
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



  // it('should be matched Studies Box Plots value of Sponsor with the database value for the given filter options', function () {



  //   var subMenuValues = {
  //     "Therapeutic Area": "CARDIOVASCULAR",
  //     "Phase": "PHASE 2",
  //     "Enrollment Status": "COMPLETED",
  //     "Protocol": "SPONSOR-2079",
  //     // "Country": "CANADA",
  //   }
  //   var databaseConnect = (countryText) => {
  //     return new Promise((resolve, reject) => {
  //       var pool = new sql.ConnectionPool(config);
  //       pool.connect().then(function () {
  //         var request = new sql.Request(pool);
  //         request.query("select count(distinct a.protocolid) as Studies from protocol a inner join pftosa pf on a.protocolid =pf.protocolid inner JOIN TherapeuticArea F1 ON a.TherapeuticAreaId=F1.TherapeuticAreaId inner JOIN SubIndication F3 ON a.SubIndicationId=F3.SubIndicationId and a.ClinicalIndicationId = F3.ClinicalIndicationId inner join clinicalindication b on a.clinicalindicationid = b.clinicalindicationid inner join Therapy th on a.TherapyId = th.TherapyId left join ProtocolDiseaseStage pds on a.Protocolid = pds.ProtocolId inner join diseasestage ds on ds.diseasestageid = pds.diseasestageid inner join Phase ph on a.phaseid = ph.phaseid inner join LineOfTherapy lp on a.LineOfTherapyId = lp.LineOfTherapyId inner JOIN Country Co ON Co.CountryId = pf.CountryId inner JOIN Sponsor c ON a.SponsorId = c.SponsorId where a.ClinicalIndicationId != 43 and SponsorDisplayName='SPONSOR' and TherapeuticAreaName = 'ONCOLOGY' and PhaseName = 'PHASE 2' and SubIndicationName='EBC, HER2+' and ClinicalIndicationName = 'BREAST CANCER' and HasCancerImmunotherapy = '0' and DiseaseStageName = 'EARLY' and AdultPediatric ='1' and a.Protocolid not in(select protocolid from ProtocolExclusionList) and PhaseName = 'PHASE 2' and LineOfTherapyName ='ADJUVANT' and th.TherapyName='MONOTHERAPY' and SiteCount = '51 - 100' and  PatientRandomized='201 - 500' and CountryName LIKE '" + countryText + "%'").then(function (result) {
  //           if (result.recordset.length > 0)
  //             resolve(result.recordset[0].Studies);
  //           else
  //             resolve(`No record`);
  //           pool.close();
  //         }).catch(function (err) {
  //           reject("reject for " + err);
  //           pool.close();
  //         });
  //       }).catch(function (err) {
  //         console.log(err);
  //       });
  //     })
  //   }
  //       //    connectionPool.request().query(`select count(distinct a.protocolid) as Studies from protocol a inner join pftosa pf on a.protocolid =pf.protocolid inner JOIN TherapeuticArea F1 ON a.TherapeuticAreaId=F1.TherapeuticAreaId inner JOIN SubIndication F3 ON a.SubIndicationId=F3.SubIndicationId and a.ClinicalIndicationId = F3.ClinicalIndicationId inner join clinicalindication b on a.clinicalindicationid = b.clinicalindicationid inner join Therapy th on a.TherapyId = th.TherapyId left join ProtocolDiseaseStage pds on a.Protocolid = pds.ProtocolId inner join diseasestage ds on ds.diseasestageid = pds.diseasestageid inner join Phase ph on a.phaseid = ph.phaseid inner join LineOfTherapy lp on a.LineOfTherapyId = lp.LineOfTherapyId inner JOIN Country Co ON Co.CountryId = pf.CountryId inner JOIN Sponsor c ON a.SponsorId = c.SponsorId where a.ClinicalIndicationId != 43 and SponsorDisplayName='SPONSOR' and TherapeuticAreaName = 'ONCOLOGY' and PhaseName = 'PHASE 2' and SubIndicationName='EBC, HER2+' and ClinicalIndicationName = 'BREAST CANCER' and HasCancerImmunotherapy = '0' and DiseaseStageName = 'EARLY' and AdultPediatric ='1' and a.Protocolid not in(select protocolid from ProtocolExclusionList) and PhaseName = 'PHASE 2' and LineOfTherapyName ='ADJUVANT' and th.TherapyName='MONOTHERAPY' and SiteCount = '51 - 100' and	PatientRandomized='201 - 500' and CountryName LIKE '${countryText}%'`).then((result) => {
  //       //     if (result.recordset.length > 0)
  //       //       resolve(result.recordset[0].Studies);
  //       //     else
  //       //       resolve(`No record`);
  //       //     sql.close();
  //       //   }).catch((result) => {
  //       //     reject("reject for " + result);
  //       //     sql.close();
  //       //     })
  //       // })
  //    // };


  //     var validateCountryData = () => {
  //       var totalColCount;
  //       var currentAvgIndex, currentMedIndex, currentStuIndex;
  //       var avgElement, medElement, stuElement;
  //       element.all(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g')).count().then(function (totalElement) {
  //         totalColCount = ((totalElement - 1) / 4);
  //         console.log("total country count - ", totalColCount);
  //         element.all(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + totalElement + ']/svg:g')).each((currentCountryElement, currentCountryIndex) => {
  //           currentCountryElement.getText().then((countryText) => {
  //             currentAvgIndex = (currentCountryIndex + 1);
  //             currentMedIndex = (totalColCount * 1) + currentAvgIndex;
  //             currentStuIndex = (totalColCount * 2) + currentAvgIndex;
  //             avgElement = element(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + currentAvgIndex + ']'));
  //             medElement = element(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + currentMedIndex + ']'));
  //             stuElement = element(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g[' + currentStuIndex + ']'));
  //             protractor.promise.all([
  //               avgElement.getText(),
  //               medElement.getText(),
  //               stuElement.getText(),
  //               databaseConnect(countryText)
  //             ]).then((result) => {
  //               console.log((currentCountryIndex + 1), countryText, result[0], result[1], result[2], result[3]);
  //             })
  //           });
  //         });
  //       });
  //     }
  //     //utility.SelectOptionFromAcordian("Therapeutic Area;Clinical Indication;Subindication;Phase","ONCOLOGY;BREAST CANCER;EBC, HER2+;PHASE 2");
  //     element.all(by.repeater('i in filterComponents')).filter((parentFilter, index) => {
  //       return parentFilter.element(by.css('.panel-heading')).getText().then((text) => {
  //         return (text === text);
  //       });
  //     }).each((parentElement, parentIndex) => {

  //       parentElement.click();
  //       browser.waitForAngular();
  //       browser.sleep(5000);

  //       parentElement.all(by.repeater('listItem in initValues')).count().then((count) => {
  //         if (count > 1) {


  //           parentElement.element(by.css('.panel-heading')).getText().then((menuText) => {
  //             if (menuText != "Country") {

  //               parentElement.element(by.css('[ng-click="toggleAll()"]')).click()
  //               browser.waitForAngular();
  //               browser.sleep(5000);
  //               parentElement.all(by.repeater('listItem in initValues')).filter((parentFilter, index) => {
  //                 return parentFilter.element(by.css('.md-label')).getText().then((text) => {
  //                   return (text === subMenuValues[menuText]);
  //                 });
  //               }).each((childElement, childIndex) => {

  //                 childElement.click();
  //                 browser.actions().mouseMove(childElement, { x: 500, y: 0 }).perform();
  //                 browser.waitForAngular();
  //                 browser.sleep(5000);

  //                 parentElement.element(by.css('[ng-click="applyFilter()"]')).click();
  //                 browser.actions().mouseMove(parentElement.element(by.css('[ng-click="applyFilter()"]')), { x: 500, y: 0 }).perform();
  //                 browser.waitForAngular();
  //                 browser.sleep(5000);

  //                 element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).isPresent().then(function (isVisible) {
  //                   if (isVisible) {
  //                     element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).click();
  //                     browser.waitForAngular();
  //                     browser.sleep(5000);
  //                   }
  //                 });
  //               });
  //             }
  //           })
  //         }
  //       });
  //     });

  //     browser.wait(() => {
  //       validateCountryData();
  //       return true;
  //     }, 1);
  //   }, 500000);