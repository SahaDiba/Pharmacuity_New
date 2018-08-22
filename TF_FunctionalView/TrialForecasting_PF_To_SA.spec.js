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


  it('Functional View PF-SA Graph: Actuals Vs Q1,Q3', function () {
   
    var workbook = new Excel.Workbook();
    var worksheet = workbook.addWorksheet('Trial Forecasting_Functional View_PF to SA Validation');

    worksheet.mergeCells('D1', 'I1');
    worksheet.mergeCells('J1', 'P1');
    worksheet.getCell('D1').value = 'Percent Actuals(0%)';
    worksheet.getCell('J1').value = 'Percent Actuals(50%)';
    worksheet.getRow(2).values = ['TherapeuticArea', 'ClinicalIndication', 'Protocol', 'Predicted Q1','Predicted Q2','Predicted Q3','Actual Value',
    'Deviation','Percent deviation','Predicted Q1','Predicted Q2','Predicted Q3','Actual Value at 100% sites activated','Actual Value at  50% sites activated',
    'Deviation of Actuals at 100% sites activated','Percent deviation'];
    worksheet.columns = [
      { key: 'TA'},
      { key: 'CI'},
      { key: 'Pr'},
      { key: 'Q1'},
      { key: 'Q2'},
      { key: 'Q3'},
      { key: 'AV'},
      { key: 'DE'},
      { key: 'PD'},
      { key: 'predictedQ1'},
      { key: 'predictedQ2'},
      { key: 'predictedQ3'},
      { key: 'predicted100AV'},
      { key: 'predicted50AV'},
      { key: 'predicted100DE'},
      { key: 'predictedPD'},
  ];
 
    var subMenuSelector = 'radioItem in initValues';
    var tempvalues = [];
    
    var subMenuNames = [];
    var ProcessMenu = (totalSubMenuCount, currentSubMenuCount, menuIndex) => {
      browser.sleep(5000);
      var menu = element.all(by.repeater('i in filterComponents')).get(menuIndex);
      menu.click();
      browser.sleep(5000);
//   menu.all(by.repeater(subMenuSelector)).isDisplayed().then(function(isVisible){

// if(isVisible){


  console.log("IF BLOCK");
      
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
      element(by.xpath('//*[@id="tf-pf-sa"]/div/multi-line-chart/svg:svg')).isPresent().then(function (isVisible) {
      if (isVisible) {
      if (menuIndex == 2 && currentSubMenuCount == 0) {
        browser.sleep(10000);
        myPO.moveSlider("tf-pf-sa");
        browser.sleep(5000);
        myPO.clickOnLegendBox("tf-pf-sa");
        
      }

      if (menuIndex == 2) {
        myPO.setPercentActuals("PF-SA-pane",0);
        
        var bool = false;
        var Q1, Q2, Q3, A;
        var result0,result1,result2,result3,result4,result5,result6;
        result0 = {TA: tempvalues[0], CI: tempvalues[1], Pr: tempvalues[2]};

        var q1 = element(by.xpath('//*[@id="tf-pf-sa"]/div/multi-line-chart/div/div[1]/status-board/div/div[1]/div[4]/span[3]'));
        utility.highlightElement(q1);
        var q2 = element(by.xpath('//*[@id="tf-pf-sa"]/div/multi-line-chart/div/div[1]/status-board/div/div[1]/div[6]/span[3]'));
        utility.highlightElement(q2);
        var q3 = element(by.xpath('//*[@id="tf-pf-sa"]/div/multi-line-chart/div/div[1]/status-board/div/div[1]/div[8]/span[3]'));
        utility.highlightElement(q3);
        var actualValue = element(by.xpath('//*[@id="tf-pf-sa"]/div/multi-line-chart/div/div[1]/status-board/div/div[1]/div[9]/span[3]'));
        utility.highlightElement(actualValue);
        //For 0% percent actuals
        Promise.all([
          q1.getText(),
          q2.getText(),
          q3.getText(),
          actualValue.getText()
        ]).then(function (texts) {
          Q1 = parseInt(texts[0]);
          Q2 = parseInt(texts[1]);
          Q3 = parseInt(texts[2]);
          A = parseInt(texts[3]);
          console.log("Values 0%", Q1,Q2,Q3, A);

          if ((Q1 < A || Q1 == A) && (A < Q3 || A == Q3)) {
            bool = 0;
            since(function () {
              return 'Test is passed at 100% sites activated';
            }).
              expect(bool == 0).toBe(false);
              
              result1 = {Q1:Q1,Q2:Q2,Q3:Q3,AV:A,DE:'Within Range',PD:'NA'};
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

            result2 = {Q1:Q1,Q2:Q2,Q3:Q3,AV:A,DE:'Actual Above Q3',PD:positiveDeviationfor0 + '%'};
          
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
            result3 = {Q1:Q1,Q2:Q2,Q3:Q3,AV:A,DE:'Actual Below Q1',PD:negativeDeviationfor0 + '%'};

          }
    
        });


        //For 50% percent actuals    
        var bool = false;
        var pQ1, pQ2, pQ3, hundredA,fiftyA,AV50percentsitesactivated;
       
        myPO.setPercentActuals("PF-SA-pane",50);
        myPO.moveSlider50("tf-pf-sa");
        utility.highlightElement(actualValue);
        actualValue.getText().then(function(ActualValue){
          AV50percentsitesactivated = ActualValue;
          console.log("AV50percentsitesactivated",AV50percentsitesactivated);
        })

        myPO.moveSlider("tf-pf-sa");
        utility.highlightElement(q1);
        utility.highlightElement(q2);
        utility.highlightElement(q3);
        utility.highlightElement(actualValue);
        Promise.all([
          q1.getText(),
          q2.getText(),
          q3.getText(),
          actualValue.getText()
        ]).then(function (texts) {
          pQ1 = parseInt(texts[0]);
          pQ2 = parseInt(texts[1]);
          pQ3 = parseInt(texts[2]);
          hundredA = parseInt(texts[3]);
          console.log("Values 50%", pQ1,pQ2,pQ3, hundredA);

          if ((pQ1 < hundredA || pQ1 == hundredA) && (hundredA < pQ3 || hundredA == pQ3)) {
            bool = 0;
            since(function () {
              return 'Test is passed at 100% sites activated';
            }).
              expect(bool == 0).toBe(false);

              result4 = {predictedQ1:pQ1,predictedQ2:pQ2,predictedQ3:pQ3,predicted100AV:hundredA,predicted50AV:AV50percentsitesactivated,predicted100DE:'Within Range',predictedPD:'NA'};
            
          }
          else if (hundredA > pQ3) {
            var positiveDeviation = ((hundredA - pQ3) /hundredA) * 100;
            console.log("PositiveDeviation", positiveDeviation);
            bool = 1;

            since(function () {
              return 'Positive Deviation from Q3 = ' + positiveDeviation;
            }).
              expect(bool == 1).toBe(false);
            positiveDeviation = parseFloat((positiveDeviation).toFixed(2));
            result5 = {predictedQ1:pQ1,predictedQ2:pQ2,predictedQ3:pQ3,predicted100AV:hundredA,predicted50AV:AV50percentsitesactivated,predicted100DE:'Actual Above Q3',predictedPD:positiveDeviation + '%'};
            
        
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
            result6 = {predictedQ1:pQ1,predictedQ2:pQ2,predictedQ3:pQ3,predicted100AV:hundredA,predicted50AV:AV50percentsitesactivated,predicted100DE:'Actual Below Q1',predictedPD:negativeDeviation + '%'};
           
          }

          var finalResult = Object.assign(result0,result1,result2,result3,result4,result5,result6);
          worksheet.addRow(finalResult);

        });

        workbook.xlsx.writeFile("./reports/Trial Forecasting_Functional View_PF to SA Validation.xlsx");

      }
    }
    else{
      worksheet.addRow({TA: tempvalues[0], CI: tempvalues[1], Pr: tempvalues[2],Q1:'NA',Q2:'NA',Q3:'NA',AV:'NA',DE:'NA',PD:'NA',predictedQ1:'NA',predictedQ2:'NA',predictedQ3:'NA',
      predicted100AV:'NA',predicted50AV:'NA',predicted100DE:'NA',predictedPD:'NA'});
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
    //}
    // else{
    //   console.log("ELSE BLOCK");
    //   worksheet.addRow({TA: tempvalues[0], CI: 'NA', Pr: 'NA',Q1:'NA',Q2:'NA',Q3:'NA',AV:'NA',DE:'NA',PD:'NA',predictedQ1:'NA',predictedQ2:'NA',predictedQ3:'NA',
    //   predicted100AV:'NA',predicted50AV:'NA',predicted100DE:'NA',predictedPD:'NA'});
    // }
    // })


    }
    ProcessMenu(0, 0, 0);
    browser.sleep(5000);
  }, 1000000);
 

  

});

