'use strict';  

var dataObj = require('../TestData.json');
var utility = require('../Utility.js');

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

const connectionPool = new sql.ConnectionPool(config, err => { });

module.exports = {  
    clickOnFPItoLPI: function()
    {
        // var fPI_LPI = element(by.xpath('//*[@id="pharmAcquity"]/div[2]/div[1]/div/md-tabs/md-tabs-wrapper/md-tabs-canvas/md-pagination-wrapper/md-tab-item[6]/span'));
        // utility.highlightElement(fPI_LPI);
        // fPI_LPI.click();
        // browser.waitForAngular();
        // browser.driver.sleep(1000);
        element.all(by.repeater('tab in $mdTabsCtrl.tabs')).then(function(item) {
          utility.highlightElement(item[5]);
             item[5].click();
             browser.waitForAngular();
             browser.driver.sleep(8000);
         })



      //    var items =  element.all(by.repeater('tab in $mdTabsCtrl.tabs')).then(function(item) {
      //     return items.element(by.tagName('span')).getText().then(function(text) {
      //           return text == 'FPI-LPI';
      //     });
      //  }).get(0);
      //  items.click();
      },

    setSitePercentage: function (value) {
        var percentage = element(by.xpath('//*[@id="content"]/div/div/div/div/div/div[2]/header/div[3]/input'));
        //utility.highlightElement(percentage);
        percentage.clear();
        percentage.sendKeys(value);
    
        element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).isPresent().then(function (isVisible) {
          if (isVisible) {
            element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).click();
            browser.sleep(5000);
         
        }
      })
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
   
    getTotalFilter: function(){
        return element.all(by.repeater('listItem in initValues | filter:searchTxt.txt | limitTo : limit : limitFrom'));
    },
    validateCurveSponsor: function(){
        var svgCurve = element.all(by.xpath('//*[@id="scurveSponsor"]/svg:svg/svg:path'));
        var graphPath;
        svgCurve.count().then(function (pathCount) {
        console.log("curve path count:" + pathCount);
        expect(pathCount).not.toEqual(0);
        
        if(pathCount===0){

            console.log("Sponsor Curve is not present");
            
        }

        for (var i = 1; i <= pathCount; i++) {
            graphPath = element(by.xpath('//*[@id="scurveSponsor"]/svg:svg/svg:path[' + i + ']'));
            expect(graphPath.getAttribute('d')).toContain('M');
            expect(graphPath.getAttribute('d')).toContain('C');

            
            }       
            })
    },
    validateCurveCompetition: function(){
        var svgCurve = element.all(by.xpath('//*[@id="scurveCompetition"]/svg:svg/svg:path'));
        var graphPath;
        svgCurve.count().then(function (pathCount) {
        console.log("curve path count:" + pathCount);
        expect(pathCount).not.toEqual(0);
        if(pathCount===0){

            console.log("Competition Curve is not present");
        }
        for (var i = 1; i <= pathCount; i++) {
            graphPath = element(by.xpath('//*[@id="scurveCompetition"]/svg:svg/svg:path[' + i + ']'));
            expect(graphPath.getAttribute('d')).toContain('M');
            expect(graphPath.getAttribute('d')).toContain('C');

            
            }       
            })
    },


    StudiesCountValidation: function (id) {
        console.log("compare");
        browser.sleep(3000);
          var percentage = element(by.xpath('//*[@id="content"]/div/div/div/div/div/div[2]/header/div[1]/input'));
          utility.highlightElement(percentage);
          percentage.clear();
          percentage.sendKeys(0);
          browser.sleep(1000);
        
        
          var databaseConnect = (countryText) => {
            return new Promise((resolve, reject) => {
               connectionPool.request().query(`select  count(distinct a.ProtocolId) as Studies from [dbo].[CLSPerformanceData] as a INNER JOIN [dbo].[Protocol] as b ON a.ProtocolId = b.ProtocolId  INNER JOIN [dbo].[Sponsor] as c ON b.SponsorId = c.SponsorId   INNER JOIN [dbo].[ProtocolExclusionList] as d ON not exists (select d.ProtocolId FROM [dbo].[ProtocolExclusionList] as d where a.ProtocolId = d.ProtocolId) INNER JOIN [dbo].[Country] as e ON a.CountryId = e.CountryId where b.ClinicalIndicationId != 43 and e.CountryName LIKE '${countryText}%' and c.SponsorDisplayName='Sponsor'`).then((result) => {
                if (result.recordset.length > 0)
                  resolve(result.recordset[0].Studies);
                else
                  resolve(`No record`);
                sql.close();
              }).catch(() => {
                reject("reject for " + countryText);
                sql.close();
              })
            })
          };
        
          var totalColCount;
          var currentAvgIndex, currentMedIndex, currentStuIndex;
          var avgElement, medElement, stuElement;
          element.all(by.xpath("//*[@id='" + id + "']/div[2]/svg:svg/svg:g/svg:g")).count().then(function (totalElement) {
            totalColCount = ((totalElement - 1) / 4);
            element.all(by.xpath("//*[@id='" + id + "']/div[2]/svg:svg/svg:g/svg:g[' + totalElement + ']/svg:g")).each((currentCountryElement, currentCountryIndex) => {
              currentCountryElement.getText().then((countryText) => {
                currentAvgIndex = (currentCountryIndex + 1);
                currentMedIndex = (totalColCount * 1) + currentAvgIndex;
                currentStuIndex = (totalColCount * 2) + currentAvgIndex;
                avgElement = element(by.xpath("//*[@id='" + id + "']/div[2]/svg:svg/svg:g/svg:g[' + currentAvgIndex + ']"));
                medElement = element(by.xpath("//*[@id='" + id + "']/div[2]/svg:svg/svg:g/svg:g[' + currentMedIndex + ']"));
                stuElement = element(by.xpath("//*[@id='" + id + "']/div[2]/svg:svg/svg:g/svg:g[' + currentStuIndex + ']"));
                protractor.promise.all([
                  avgElement.getText(),
                  medElement.getText(),
                  stuElement.getText(),
                  databaseConnect(countryText.replace("...",""))
                ]).then((result) => {
                  console.log((currentCountryIndex + 1), countryText, result[0], result[1], result[2], result[3]);
                 
                  if(result[3]==0 || result[3]==null){
                    since(function() {
                      return 'For the country ' + countryText +' studies are not matched with the database'+': ' +'Actual-'+ result[2] + ' =/= ' + 'Expected-'+result[3];
                    }).
                    expect(result[2] == 'NA').toBe(true);
                    
                    }else{
                      since(function() {
                        return 'For the country ' + countryText +' studies are not matched with the database'+': ' +'Actual-'+ result[2] + ' =/= ' + 'Expected-'+result[3];
                      }).
                      expect(result[2] == result[3]).toBe(true);
                    }
                 
                })
              });
            });
          },1000000);
        },
        // },1000000);
    
    
}