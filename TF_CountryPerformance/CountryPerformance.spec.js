'use strict';
var myPOLogin = require('../Login/LoginPage.po.js');
var myPOLandingPage = require('../LandingPage/LandingPage.po.js');
var myPO_MAndB = require('../MetricsAndBenchmarking/MetricsAndBenchmarking.po.js');
var myPO = require('./CountryPerformance.po.js');
var dataObj = require('../TestData.json');
var utility = require('../Utility.js');
var Excel = require('exceljs');

const createCSVFile = require('csv-file-creator');

describe('Trial Forecasting Page', function () {
  var originalTimeout;
  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000000;


    myPOLogin.login(dataObj.LoginData.Users[4].username, dataObj.LoginData.Users[4].passwordField);
    browser.driver.sleep(1000);
    myPOLandingPage.clickOnSelectAnApplication();
    myPO.clickTrialForecastng();
    browser.driver.sleep(2000);
    myPO.clickOnCountryPerf();
    browser.sleep(5000);
  });


  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });


  it('Country Performance : Enrollment Rate Comparison', function () {

    var workbook = new Excel.Workbook();
    var worksheet = workbook.addWorksheet('Trial Forecasting_CountryPerformance_EnrollmentRate Validation');

    worksheet.mergeCells('D1', 'I1');
    worksheet.mergeCells('J1', 'P1');
    worksheet.getCell('D1').value = 'Percent Actuals(0%)';
    worksheet.getCell('J1').value = 'Percent Actuals(50%)';
    worksheet.getRow(2).values = ['TherapeuticArea', 'ClinicalIndication', 'Protocol', 'Country', 'Country Status', 'Country ER', 'Site',
      'Site Status', 'Site ER'];
    worksheet.columns = [
      { key: 'TA' },
      { key: 'CI' },
      { key: 'Pr' },
      { key: 'C' },
      { key: 'CS' },
      { key: 'CE' },
      { key: 'S' },
      { key: 'SS' },
      { key: 'SE' }
    ];

    var subMenuSelector = 'radioItem in initValues';
    var tempvalues = [];

    var subMenuNames = [];
    var ProcessMenu = (totalSubMenuCount, currentSubMenuCount, menuIndex) => {
      browser.sleep(5000);
      var menu = element.all(by.repeater('i in filterComponents')).get(menuIndex);
      
      //console.log("menuIndex",menuIndex);
      menu.click();
      browser.sleep(5000);
      menu.all(by.repeater(subMenuSelector)).count().then(count => {
        totalSubMenuCount = --count;
        //console.log("totalSubMenuCount",totalSubMenuCount);
      });

      if (menuIndex == 2 && currentSubMenuCount == 0) {
        menu.all(by.repeater(subMenuSelector)).map(function (elm) {
          return elm.getText();
        }).then(function (texts) {
          subMenuNames = texts;
        });
      }

      var subMenu;
      if (menuIndex == 2) {
        subMenu = menu.all(by.repeater(subMenuSelector)).filter((filterSubMenu) => {
          return filterSubMenu.element(by.tagName('span')).getText().then((text) => {
            return (text == subMenuNames[currentSubMenuCount]);
          });
        }).get(0);
      }
      else {
        subMenu = menu.all(by.repeater(subMenuSelector)).get(currentSubMenuCount);
      }

      subMenu.getText().then(text => {
        tempvalues[menuIndex] = text;
      });
      browser.sleep(8000);
      subMenu.click();
      menu.element(by.css('[ng-click="applyFilter()"]')).click();
      if (menuIndex < 2) {
        ProcessMenu(0, 0, menuIndex + 1);
      }
      var index = 1;
      var svgElementList = element.all(by.xpath('//*[@id="tf-cp"]/div/cp-bar-chart/*[name()=\"svg\"][1]/*[name()=\"g\"]/*[name()=\"g\"][3]/*[name()=\"rect\"]'));
      svgElementList.count().then(function (rowCount) {
      console.log("Total Row Count:" + rowCount);
      svgElementList.each(function (item) {
  
        var svgElement = element(by.xpath("//*[@id='tf-cp']/div/cp-bar-chart/*[name()=\"svg\"][1]/*[name()=\"g\"]/*[name()=\"g\"][3]/*[name()=\"rect\"][" + index + "]"));
        utility.highlightElement(svgElement);
      
        if(index==1){
              svgElement.click();
              element(by.xpath("//div[contains(@class,'tooltip')]")).getText().then(function(text){
              console.log("Text",text);
            })
          }
            else{
              browser.actions().mouseMove(svgElement).perform();
              element(by.xpath("//div[contains(@class,'tooltip')]")).getText().then(function(text){
              console.log("Text",text);
            })
          }
          index++;
      })
    })





















      if (menuIndex == 2)
      browser.sleep(15000);

      menu.click();
      browser.sleep(5000);
      menu.element(by.css('[ng-click="resetFilter()"]')).click();

     
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


