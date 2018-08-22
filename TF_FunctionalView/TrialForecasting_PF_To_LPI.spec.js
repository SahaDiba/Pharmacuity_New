'use strict';
var myPOLogin = require('../Login/LoginPage.po.js');
var myPOLandingPage = require('../LandingPage/LandingPage.po.js');
var myPO_MAndB = require('../MetricsAndBenchmarking/MetricsAndBenchmarking.po.js');
var myPO = require('./TrialForecasting.po.js');
var dataObj = require('../TestData.json');
var utility = require('../Utility.js');
var Excel = require('exceljs');


describe('Trial Forecasting Page', function () {
  var originalTimeout;
  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000000;

    browser.get(dataObj.LoginData.url);
    browser.waitForAngular();
    
    myPOLogin.login(dataObj.LoginData.Users[4].username, dataObj.LoginData.Users[4].passwordField);
    browser.driver.sleep(1000);
    myPOLandingPage.clickOnSelectAnApplication();
    myPO.clickTrialForecastng();
    browser.driver.sleep(2000);
    myPO.clickOnFuncView();
    browser.sleep(5000);
  });


  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });


  it('Functional View PF-LPI Graph: Actuals Vs Q1,Q3', function () {

    var workbook = new Excel.Workbook();
    var worksheet = workbook.addWorksheet('Trial Forecasting_Functional View_PF to LPI Validation');

    worksheet.mergeCells('D1', 'I1');
    worksheet.mergeCells('J1', 'P1');
    worksheet.getCell('D1').value = 'Percent Actuals(0%)';
    worksheet.getCell('J1').value = 'Percent Actuals(50%)';
    worksheet.getRow(2).values = ['TherapeuticArea', 'ClinicalIndication', 'Protocol', 'Predicted Q1', 'Predicted Q2', 'Predicted Q3', 'Actual Value',
      'Deviation', 'Percent deviation', 'Predicted Q1', 'Predicted Q2', 'Predicted Q3', 'Actual Value at 100% sites activated', 'Actual Value at  50% sites activated',
      'Deviation of Actuals at 100% sites activated', 'Percent deviation'];
    worksheet.columns = [
      { key: 'TA' },
      { key: 'CI' },
      { key: 'Pr' },
      { key: 'Q1' },
      { key: 'Q2' },
      { key: 'Q3' },
      { key: 'AV' },
      { key: 'DE' },
      { key: 'PD' },
      { key: 'predictedQ1' },
      { key: 'predictedQ2' },
      { key: 'predictedQ3' },
      { key: 'predicted100AV' },
      { key: 'predicted50AV' },
      { key: 'predicted100DE' },
      { key: 'predictedPD' },
    ];

    var subMenuSelector = 'radioItem in initValues';
    var tempvalues = [];

    var subMenuNames = [];
    var ProcessMenu = (totalSubMenuCount, currentSubMenuCount, menuIndex) => {
      browser.sleep(5000);
      var menu = element.all(by.repeater('i in filterComponents')).get(menuIndex);
      menu.click();
      browser.sleep(5000);
      menu.all(by.repeater(subMenuSelector)).count().then(count => {
        totalSubMenuCount = --count;
      });

      if (menuIndex == 2 && currentSubMenuCount == 0) {
        menu.all(by.repeater(subMenuSelector)).map(function (elm) {
          return elm.getText();
        }).then(function (texts) {
          subMenuNames = texts;
        });
      }

    var sumMenu;
      if (menuIndex == 2) {
        sumMenu = menu.all(by.repeater(subMenuSelector)).filter((filterSubMenu) => {
          return filterSubMenu.element(by.tagName('span')).getText().then((text) => {
            return (text == subMenuNames[currentSubMenuCount]);
          });
        }).get(0);
      }
      else {
        sumMenu = menu.all(by.repeater(subMenuSelector)).get(currentSubMenuCount);
      }

      sumMenu.getText().then(text => {
        tempvalues[menuIndex] = text;
      });
      browser.sleep(8000);
      sumMenu.click();
      menu.element(by.css('[ng-click="applyFilter()"]')).click();
      if (menuIndex < 2) {
        ProcessMenu(0, 0, menuIndex + 1);
      }
      element(by.xpath('//*[@id="tf-pf-lpi"]/div/multi-line-chart/svg:svg')).isPresent().then(function (isVisible) {
        if (isVisible) {
          if (menuIndex == 2 && currentSubMenuCount == 0) {
            browser.sleep(10000);
            myPO.moveSlider("tf-pf-lpi");
            browser.sleep(5000);
            myPO.clickOnLegendBox("tf-pf-lpi");

          }

          if (menuIndex == 2) {
            myPO.setPercentActuals("PF-LPI-pane", 0);
            var promisearray = [];
            var bool = false;
            var Q1, Q2, Q3, A;
            var result0, result1, result2, result3, result4, result5, result6, result, result50;
            result0 = { TA: tempvalues[0], CI: tempvalues[1], Pr: tempvalues[2] };
//change

// element(by.xpath('//*[@id="tf-pf-lpi"]/div/multi-line-chart/svg:svg')).isPresent().then(function (isVisible) {
//         if (isVisible) {
  browser.wait(() =>{ 
            element(by.xpath('//*[@id="tf-pf-lpi"]/div/multi-line-chart/div/div[1]/status-board/div/div[1]/div[4]/span[3]')).isPresent().then(function (isvisible) {
              if (isvisible) {
                var q1 = element(by.xpath('//*[@id="tf-pf-lpi"]/div/multi-line-chart/div/div[1]/status-board/div/div[1]/div[4]/span[3]'));
                utility.highlightElement(q1);
                promisearray.push(q1.getText());

              }
              else {
                promisearray.push(Promise.resolve("NA"));
                
              }
            })
            return true;
          },1);

            browser.wait(() =>{ 
            element(by.xpath('//*[@id="tf-pf-lpi"]/div/multi-line-chart/div/div[1]/status-board/div/div[1]/div[6]/span[3]')).isPresent().then(function (isvisible) {
              if (isvisible) {
                var q2 = element(by.xpath('//*[@id="tf-pf-lpi"]/div/multi-line-chart/div/div[1]/status-board/div/div[1]/div[6]/span[3]'));
                utility.highlightElement(q2);
                promisearray.push(q2.getText());

              }
              else {
                promisearray.push(Promise.resolve("NA"));
                
              }
            })
            return true;
          },1);

            browser.wait(() =>{ 
            element(by.xpath('//*[@id="tf-pf-lpi"]/div/multi-line-chart/div/div[1]/status-board/div/div[1]/div[8]/span[3]')).isPresent().then(function (isvisible) {
              if (isvisible) {
                var q3 = element(by.xpath('//*[@id="tf-pf-lpi"]/div/multi-line-chart/div/div[1]/status-board/div/div[1]/div[8]/span[3]'));
                utility.highlightElement(q3);
                promisearray.push(q3.getText());

              }
              else {
                promisearray.push(Promise.resolve("NA"));
                
              }
            })
            return true;
          },1);
            browser.wait(() =>{ 
            element(by.xpath('//*[@id="tf-pf-lpi"]/div/multi-line-chart/div/div[1]/status-board/div/div[1]/div[9]/span[3]')).isPresent().then(function (isvisible) {
              if (isvisible) {
                var actualValue = element(by.xpath('//*[@id="tf-pf-lpi"]/div/multi-line-chart/div/div[1]/status-board/div/div[1]/div[9]/span[3]'));
                utility.highlightElement(actualValue);
                promisearray.push(actualValue.getText());

              }
              else {
                element(by.xpath('//*[@id="tf-pf-lpi"]/div/multi-line-chart/div/div[1]/status-board/div/div[1]/div[5]/span[3]')).isPresent().then(function (isdisplayed) {
                  if (isdisplayed) {
                    var actualValue = element(by.xpath('//*[@id="tf-pf-lpi"]/div/multi-line-chart/div/div[1]/status-board/div/div[1]/div[5]/span[3]'));
                    utility.highlightElement(actualValue);
                    promisearray.push(actualValue.getText());

                  }
                  else {
                    promisearray.push(Promise.resolve("NA"));
                  }
                })


              }
            })
            return true;
          },1);
            //For 0% percent actuals
            browser.wait(() => {

              protractor.promise.all(promisearray).then(function (texts) {
                console.log("Values 0%", texts[0], texts[1], texts[2], texts[3]);
                
                if (!isNaN(texts[0]) && !isNaN(texts[1]) && !isNaN(texts[2]) && !isNaN(texts[3])) {
                  //do some thing if it's a number
                  Q1 = parseInt(texts[0]);
                  Q2 = parseInt(texts[1]);
                  Q3 = parseInt(texts[2]);
                  A = parseInt(texts[3]);

                } else {
                  //do some thing if it's NOT a number
                  Q1 = texts[0];
                  Q2 = texts[1];
                  Q3 = texts[2];
                  A = texts[3];
                }

                console.log("Values 0%", Q1, Q2, Q3, A);
                if (Q1 !== "NA" && Q3 !== "NA" && A !== "NA") {
                  
                  if ((Q1 < A || Q1 == A) && (A < Q3 || A == Q3)) {
                    bool = 0;
                    since(function () {
                      return 'Test is passed at 100% sites activated';
                    }).
                      expect(bool == 0).toBe(false);

                    result1 = { Q1: Q1, Q2: Q2, Q3: Q3, AV: A, DE: 'Within Range', PD: 'NA' };
                  }
                  else if (A > Q3) {
                    var positiveDeviationfor0 = ((A - Q3) / A) * 100;
                    console.log("PositiveDeviation", positiveDeviationfor0);
                    bool = 1;

                    since(function () {
                      return 'Positive Deviation from Q3 = ' + positiveDeviationfor0;
                    }).
                      expect(bool == 1).toBe(false);
                    positiveDeviationfor0 = parseFloat((positiveDeviationfor0).toFixed(2));

                    result2 = { Q1: Q1, Q2: Q2, Q3: Q3, AV: A, DE: 'Actual Above Q3', PD: positiveDeviationfor0 + '%' };

                  }
                  else if (A < Q1) {
                    var negativeDeviationfor0 = ((A - Q1) / A) * 100;
                    console.log("NegativeDeviation", negativeDeviationfor0);
                    bool = 3;
                    since(function () {
                      return 'Negative Deviation from Q1 = ' + negativeDeviationfor0;
                    }).
                      expect(bool == 3).toBe(false);
                    negativeDeviationfor0 = parseFloat((negativeDeviationfor0).toFixed(2));
                    result3 = { Q1: Q1, Q2: Q2, Q3: Q3, AV: A, DE: 'Actual Below Q1', PD: negativeDeviationfor0 + '%' };

                  }
                }
                else {
                 
                  result = { Q1: Q1, Q2: Q2, Q3: Q3, AV: A, DE: 'NA', PD: 'NA' };
                }
              });
              return true;

            }, 1);

        //   }
        //   //Change
        //   else{
            
        //   worksheet.addRow({
        //     TA: tempvalues[0], CI: tempvalues[1], Pr: tempvalues[2], Q1: 'NA', Q2: 'NA', Q3: 'NA', AV: 'NA', DE: 'NA', PD: 'NA', predictedQ1: 'NA', predictedQ2: 'NA', predictedQ3: 'NA',
        //     predicted100AV: 'NA', predicted50AV: 'NA', predicted100DE: 'NA', predictedPD: 'NA'
        //   });

        //   }
        // })
            //For 50% percent actuals   
            var promisearray1 = [];
            var bool = false;
            var pQ1, pQ2, pQ3, hundredA, fiftyA, AV50percentsitesactivated;

            myPO.setPercentActuals("PF-LPI-pane", 50);
            myPO.moveSlider50("tf-pf-lpi");
// //Change
// element(by.xpath('//*[@id="tf-pf-lpi"]/div/multi-line-chart/svg:svg')).isPresent().then(function (isVisible) {
//   if (isVisible) {           
            //Need to change here
            browser.wait(() =>{ 
            element(by.xpath('//*[@id="tf-pf-lpi"]/div/multi-line-chart/div/div[1]/status-board/div/div[1]/div[9]/span[3]')).isPresent().then(function (isvisible) {
              if (isvisible) {
                var actualValue = element(by.xpath('//*[@id="tf-pf-lpi"]/div/multi-line-chart/div/div[1]/status-board/div/div[1]/div[9]/span[3]'));
                utility.highlightElement(actualValue);
                promisearray1.push(actualValue.getText());

              }
              else {
                 
                element(by.xpath('//*[@id="tf-pf-lpi"]/div/multi-line-chart/div/div[1]/status-board/div/div[1]/div[5]/span[3]')).isPresent().then(function (isdisplayed) {
                  if (isdisplayed) {
                    var actualValue = element(by.xpath('//*[@id="tf-pf-lpi"]/div/multi-line-chart/div/div[1]/status-board/div/div[1]/div[5]/span[3]'));
                    utility.highlightElement(actualValue);
                    promisearray1.push(actualValue.getText());

                  }
                  else {
                    promisearray1.push(Promise.resolve("NA"));
                  }
                })


              }
            })
            return true;
          },1);
            browser.wait(() => {
              protractor.promise.all(promisearray1).then(function (texts) {

                if (!isNaN(texts[0])) {
                  //do some thing if it's a number
                  AV50percentsitesactivated = parseInt(texts[0]);

                } else {
                  //do some thing if it's NOT a number
                  AV50percentsitesactivated = texts[0];
                }
                
                console.log("AV50percentsitesactivated", AV50percentsitesactivated);
              })
              return true;
            }, 1);
            var promisearray2 = [];
            myPO.moveSlider("tf-pf-lpi");
            browser.wait(() =>{
            element(by.xpath('//*[@id="tf-pf-lpi"]/div/multi-line-chart/div/div[1]/status-board/div/div[1]/div[4]/span[3]')).isPresent().then(function (isvisible) {
              if (isvisible) {
                var pq1 = element(by.xpath('//*[@id="tf-pf-lpi"]/div/multi-line-chart/div/div[1]/status-board/div/div[1]/div[4]/span[3]'));
                utility.highlightElement(pq1);
                promisearray2.push(pq1.getText());

              }
              else {
                promisearray2.push(Promise.resolve("NA"));
                
              }
            })
            return true;
          },1);

            browser.wait(() =>{
            element(by.xpath('//*[@id="tf-pf-lpi"]/div/multi-line-chart/div/div[1]/status-board/div/div[1]/div[6]/span[3]')).isPresent().then(function (isvisible) {
              if (isvisible) {
                var pq2 = element(by.xpath('//*[@id="tf-pf-lpi"]/div/multi-line-chart/div/div[1]/status-board/div/div[1]/div[6]/span[3]'));
                utility.highlightElement(pq2);
                promisearray2.push(pq2.getText());

              }
              else {
                promisearray2.push(Promise.resolve("NA"));
                }
            })
            return true;
          },1)

browser.wait(() =>{
            element(by.xpath('//*[@id="tf-pf-lpi"]/div/multi-line-chart/div/div[1]/status-board/div/div[1]/div[8]/span[3]')).isPresent().then(function (isvisible) {
              if (isvisible) {
                var pq3 = element(by.xpath('//*[@id="tf-pf-lpi"]/div/multi-line-chart/div/div[1]/status-board/div/div[1]/div[8]/span[3]'));
                utility.highlightElement(pq3);
                promisearray2.push(pq3.getText());

              }
              else {
                promisearray2.push(Promise.resolve("NA"));
               
              }
            })
            return true;
          },1);

//test
            browser.wait(() => {
            element(by.xpath('//*[@id="tf-pf-lpi"]/div/multi-line-chart/div/div[1]/status-board/div/div[1]/div[9]/span[3]')).isPresent().then(function (isvisible) {
              if (isvisible) {
                var pactualValue = element(by.xpath('//*[@id="tf-pf-lpi"]/div/multi-line-chart/div/div[1]/status-board/div/div[1]/div[9]/span[3]'));
                utility.highlightElement(pactualValue);
                promisearray2.push(pactualValue.getText());

              }
              else {
                element(by.xpath('//*[@id="tf-pf-lpi"]/div/multi-line-chart/div/div[1]/status-board/div/div[1]/div[5]/span[3]')).isPresent().then(function (isdisplayed) {
                  if (isdisplayed) {
                    var pactualValue = element(by.xpath('//*[@id="tf-pf-lpi"]/div/multi-line-chart/div/div[1]/status-board/div/div[1]/div[5]/span[3]'));
                    utility.highlightElement(pactualValue);
                    promisearray2.push(pactualValue.getText());

                  }
                  else {
                    promisearray2.push(Promise.resolve("NA"));
                  }
                })
             


              }
            })
          return true;
        }, 1);
            //For 50% percent actuals
            browser.wait(() => {
              protractor.promise.all(promisearray2).then(function (texts) {
                console.log("Values 50%", texts[0], texts[1], texts[2], texts[3]);
                

                if (!isNaN(texts[0]) && !isNaN(texts[1]) && !isNaN(texts[2]) && !isNaN(texts[3])) {
                  //do some thing if it's a number
                  pQ1 = parseInt(texts[0]);
                  pQ2 = parseInt(texts[1]);
                  pQ3 = parseInt(texts[2]);
                  hundredA = parseInt(texts[3]);

                } else {
                  //do some thing if it's NOT a number
                  pQ1 = texts[0];
                  pQ2 = texts[1];
                  pQ3 = texts[2];
                  hundredA = texts[3];
                }
                console.log("Values 50%", pQ1, pQ2, pQ3, hundredA);
                if (pQ1 !== "NA" && pQ3 !== "NA" && hundredA !== "NA") {
                  
                  if ((pQ1 < hundredA || pQ1 == hundredA) && (hundredA < pQ3 || hundredA == pQ3)) {
                    bool = 0;
                    since(function () {
                      return 'Test is passed at 100% sites activated';
                    }).
                      expect(bool == 0).toBe(false);

                    result4 = { predictedQ1: pQ1, predictedQ2: pQ2, predictedQ3: pQ3, predicted100AV: hundredA, predicted50AV: AV50percentsitesactivated, predicted100DE: 'Within Range', predictedPD: 'NA' };

                  }
                  else if (hundredA > pQ3) {
                    var positiveDeviation = ((hundredA - pQ3) / hundredA) * 100;
                    console.log("PositiveDeviation", positiveDeviation);
                    bool = 1;

                    since(function () {
                      return 'Positive Deviation from Q3 = ' + positiveDeviation;
                    }).
                      expect(bool == 1).toBe(false);
                    positiveDeviation = parseFloat((positiveDeviation).toFixed(2));
                    result5 = { predictedQ1: pQ1, predictedQ2: pQ2, predictedQ3: pQ3, predicted100AV: hundredA, predicted50AV: AV50percentsitesactivated, predicted100DE: 'Actual Above Q3', predictedPD: positiveDeviation + '%' };


                  }
                  else if (hundredA < pQ1) {
                    var negativeDeviation = ((hundredA - pQ1) / hundredA) * 100;
                    console.log("NegativeDeviation", negativeDeviation);
                    bool = 3;
                    since(function () {
                      return 'Negative Deviation from Q1 = ' + negativeDeviation;
                    }).
                      expect(bool == 3).toBe(false);
                    negativeDeviation = parseFloat((negativeDeviation).toFixed(2));
                    result6 = { predictedQ1: pQ1, predictedQ2: pQ2, predictedQ3: pQ3, predicted100AV: hundredA, predicted50AV: AV50percentsitesactivated, predicted100DE: 'Actual Below Q1', predictedPD: negativeDeviation + '%' };


                  }
                }


                else {
                 
                  result50 = { predictedQ1: pQ1, predictedQ2: pQ2, predictedQ3: pQ3, predicted100AV: hundredA, predicted50AV: AV50percentsitesactivated, predicted100DE: 'NA', predictedPD: 'NA' };
                }

                var finalResult = Object.assign(result0, result1, result2, result3, result4, result5, result6, result, result50);
                worksheet.addRow(finalResult);

              });
              return true;
            }, 1);
        //   }
        //   else{

        //     worksheet.addRow({
        //       TA: tempvalues[0], CI: tempvalues[1], Pr: tempvalues[2], Q1: 'NA', Q2: 'NA', Q3: 'NA', AV: 'NA', DE: 'NA', PD: 'NA', predictedQ1: 'NA', predictedQ2: 'NA', predictedQ3: 'NA',
        //       predicted100AV: 'NA', predicted50AV: 'NA', predicted100DE: 'NA', predictedPD: 'NA'
        //     });

        //   }
        // })

            workbook.xlsx.writeFile("./reports/Trial Forecasting_Functional View_PF to LPI Validation.xlsx");

          }
        }
        else {
          worksheet.addRow({
            TA: tempvalues[0], CI: tempvalues[1], Pr: tempvalues[2], Q1: 'NA', Q2: 'NA', Q3: 'NA', AV: 'NA', DE: 'NA', PD: 'NA', predictedQ1: 'NA', predictedQ2: 'NA', predictedQ3: 'NA',
            predicted100AV: 'NA', predicted50AV: 'NA', predicted100DE: 'NA', predictedPD: 'NA'
          });
        }
      })


      if (menuIndex == 2)
        browser.sleep(15000);

      menu.click();
      browser.sleep(5000);
      menu.element(by.css('[ng-click="resetFilter()"]')).click();

      // if (menuIndex == 2) {

      //   sumMenu.click();
      //   browser.sleep(5000);

      // }

      browser.wait(() => {
        if (currentSubMenuCount < totalSubMenuCount) {
          ProcessMenu(totalSubMenuCount, currentSubMenuCount + 1, menuIndex);
        }
        return true
      }, 1);
    }
    ProcessMenu(0, 0, 0);
    browser.sleep(5000);
  }, 1000000);

});

