'use strict';
var myPO = require('./PF_To_SA/PF_To_SA.po.js');
const sql = require('mssql');
var since = require('jasmine2-custom-message');

// const config = {
//   user: 'tcg_dev',
//   password: 'LcABurlIn9t0n',
//   server: '52.11.255.238',
//   port: '1433',
//   database: 'Refined',
//   options: {
//     encrypt: true // Use this if you're on Windows Azure
//   }
// };

// const connectionPool = new sql.ConnectionPool(config, err => { });
module.exports = {
  highlightElement: function (el) {

    return browser.driver.executeScript("arguments[0].setAttribute('style', arguments[1]);", el.getWebElement(), "color: Red; border: 2px solid red;").
      then(function (resp) {
        browser.sleep(1000);
        return el;
      }, function (err) {
        console.log("error is :" + err);
      });
  },
  sCurveValidation: function (id) {
    debugger;
    var svgCurve = element.all(by.xpath("//*[@id='" + id + "']/svg:svg/svg:path"));
    var graphPath;
    svgCurve.count().then(function (pathCount) {
      console.log("curve path count:" + pathCount);

      for (var i = 1; i <= pathCount; i++) {
        graphPath = element(by.xpath("//*[@id='" + id + "']/svg:svg/svg:path[" + i + "]"));
        expect(graphPath.getAttribute('d')).toContain('M');
        expect(graphPath.getAttribute('d')).toContain('C');

      }
    })

  },


  //For each filter curves are present
  validateCurveIsPresent: function (acordian) {


    var actionFunction = (parentElement, totalCount, currentIndex) => {
     

      parentElement.all(by.repeater('listItem in initValues')).get(currentIndex).click();
      browser.actions().mouseMove(parentElement.all(by.repeater('listItem in initValues')).get(currentIndex), { x: 500, y: 0 }).perform();
      browser.waitForAngular();
      browser.sleep(5000);

      parentElement.element(by.css('[ng-click="applyFilter()"]')).click();
      browser.actions().mouseMove(parentElement.element(by.css('[ng-click="applyFilter()"]')), { x: 500, y: 0 }).perform();
      browser.waitForAngular();
      browser.sleep(5000);

      element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).isPresent().then(function (isVisible) {
        if (isVisible) {
          element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).click();
          browser.waitForAngular();
          browser.sleep(5000);

          parentElement.click();
          browser.waitForAngular();
          browser.sleep(5000);

          myPO.validateCurveSponsor();
          myPO.validateCurveCompetition();


          // browser.wait(() => {
          //   currentIndex++;
          //   if (currentIndex < totalCount)
          //     actionFunction(parentElement, totalCount, currentIndex);
          // }, 5000);

        }
        else {
          myPO.validateCurveSponsor();
          myPO.validateCurveCompetition();
          parentElement.click();
          browser.waitForAngular();
          browser.sleep(5000);
          // parentElement.all(by.repeater('listItem in initValues')).get(currentIndex).getText().then((text) =>{
          //      Console.log(text[currentIndex]);

          //  });
          parentElement.all(by.repeater('listItem in initValues')).get(currentIndex).click();

          browser.actions().mouseMove(parentElement.all(by.repeater('listItem in initValues')).get(currentIndex), { x: 500, y: 0 }).perform();
          browser.waitForAngular();
          browser.sleep(5000);
          // }
          browser.wait(() => {
            currentIndex++;
            //console.log(currentIndex < totalCount);
            if (currentIndex < totalCount)
              actionFunction(parentElement, totalCount, currentIndex);
            return "Test";
          }, 1);
        }
      });
    }
    element.all(by.repeater('i in filterComponents')).filter((parentFilter, index) => {
      return parentFilter.element(by.css('.panel-heading')).getText().then((text) => {
        return (text === acordian);
      });
    }).each((parentElement, parentIndex) => {
      parentElement.click();
      browser.waitForAngular();
      browser.sleep(5000);

      parentElement.element(by.css('[ng-click="toggleAll()"]')).click()
      browser.waitForAngular();
      browser.sleep(5000);

      parentElement.all(by.repeater('listItem in initValues')).count().then((count) => {
        var totalCount = count;
        actionFunction(parentElement, totalCount, 0);
      });


    });
  },

  //Select 1 option from each filter
 SelectOptionFromAcordian: function (acordian, filter) {

 
  element.all(by.repeater('i in filterComponents')).filter((parentFilter, index) => {
    return parentFilter.element(by.css('.panel-heading')).getText().then((text) => {
      return (acordian.split(';').indexOf(text) >= 0);

    });
  }).each((parentElement, parentIndex) => {

    parentElement.click();
    browser.waitForAngular();
    browser.sleep(5000);



    parentElement.all(by.repeater('listItem in initValues')).count().then((count) => {
      if (count > 1) {
       parentElement.element(by.css('[ng-click="toggleAll()"]')).click()
          browser.waitForAngular();
          browser.sleep(5000);

      parentElement.all(by.repeater('listItem in initValues')).filter((childFilter, childindex) => {
        return childFilter.element(by.tagName('span')).getText().then((text) => {
          return (filter.split(';').indexOf(text) >= 0);
    
        });
      }).each((childElement, Index)=> {
          childElement.click();
          browser.waitForAngular();
          browser.sleep(5000);
        })

        parentElement.element(by.css('[ng-click="applyFilter()"]')).click();
        browser.actions().mouseMove(parentElement.element(by.css('[ng-click="applyFilter()"]')), { x: 500, y: 0 }).perform();
        browser.waitForAngular();
        browser.sleep(5000);


        element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).isPresent().then(function (isVisible) {
          if (isVisible) {
            element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).click();
            browser.waitForAngular();
            browser.sleep(5000);
          
            if(isVisible) {
              element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).click();
              browser.waitForAngular();
              browser.sleep(5000);
          }
        }
        })

    
      }
    

    });


  });
 },

 SelectChkboxForTrialFC: function (acordian, filter) {

 
  element.all(by.repeater('i in filterComponents')).filter((parentFilter, index) => {
    return parentFilter.element(by.css('.panel-heading')).getText().then((text) => {
      return (acordian.split(';').indexOf(text) >= 0);

    });
  }).each((parentElement, parentIndex) => {

    parentElement.click();
    browser.waitForAngular();
    browser.sleep(5000);



    parentElement.all(by.repeater('listItem in initValues')).count().then((count) => {
      if (count > 1) {
       //parentElement.element(by.css('[ng-click="toggleAll()"]')).click()
          browser.waitForAngular();
          browser.sleep(5000);

      parentElement.all(by.repeater('listItem in initValues')).filter((childFilter, childindex) => {
        return childFilter.element(by.tagName('span')).getText().then((text) => {
          return (filter.split(';').indexOf(text) >= 0);
    
        });
      }).each((childElement, Index)=> {
          childElement.click();
          browser.waitForAngular();
          browser.sleep(5000);
        })

        parentElement.element(by.css('[ng-click="applyFilter()"]')).click();
        browser.actions().mouseMove(parentElement.element(by.css('[ng-click="applyFilter()"]')), { x: 500, y: 0 }).perform();
        browser.waitForAngular();
        browser.sleep(5000);


        element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).isPresent().then(function (isVisible) {
          if (isVisible) {
            element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).click();
            browser.waitForAngular();
            browser.sleep(5000);
          
            if(isVisible) {
              element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).click();
              browser.waitForAngular();
              browser.sleep(5000);
          }
        }
        })

    
      }
    

    });


  });
 },
  SelectOptionFromAcordianTrialFC: function (acordian, filter) {

 
    element.all(by.repeater('i in filterComponents')).filter((parentFilter, index) => {
      return parentFilter.element(by.css('.panel-heading')).getText().then((text) => {
        return (acordian.split(';').indexOf(text) >= 0);
  
      });
    }).each((parentElement, parentIndex) => {
  
      parentElement.click();
      browser.waitForAngular();
      browser.sleep(5000);
  
  
  
      parentElement.all(by.repeater('radioItem in initValues')).count().then((count) => {
        //if (count > 1) {
          
  
        parentElement.all(by.repeater('radioItem in initValues')).filter((childFilter, childindex) => {
          return childFilter.element(by.tagName('span')).getText().then((text) => {
            return (filter.split(';').indexOf(text) >= 0);
      
          });
        }).each((childElement, Index)=> {
            childElement.click();
            browser.waitForAngular();
            browser.sleep(5000);
          })
  
          parentElement.element(by.css('[ng-click="applyFilter()"]')).click();
          browser.actions().mouseMove(parentElement.element(by.css('[ng-click="applyFilter()"]')), { x: 500, y: 0 }).perform();
          browser.waitForAngular();
          browser.sleep(5000);
  
  
          element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).isPresent().then(function (isVisible) {
            if (isVisible) {
              element(by.xpath('//*[@id="ng-app"]/body/div[5]/md-dialog/md-dialog-actions/button')).click();
              browser.waitForAngular();
              browser.sleep(5000);
            }
          })
  
      
       // }
      
  
      });
  
      
    });
},




  boxPlotValidation: function (id) {
    console.log("id", id);
    var svgElementList = element.all(by.xpath('//*[@id="tf-cp"]/div/cp-bar-chart/*[name()=\"svg\"][1]/*[name()=\"g\"]/*[name()=\"g\"][3]/*[name()=\"rect\"]'));
    svgElementList.count().then(function (rowCount) {
      console.log("Total Row Count:" + rowCount);
      var count = rowCount / 4;
      count = Math.round(count);
      var count1 = count * 2 + 1;


      var average, boxPlot;
      for (var i = count1; i <= rowCount - (count + 1); i++) {

        var svgElement = element(by.xpath("//*[@id='" + id + "']/div[2]/*[name()=\"svg\"]/*[name()=\"g\"]/*[name()=\"g\"][" + i + "]/*[name()=\"text\"]"));
        var lastColCount = (count + i);
        var svgElement1 = element(by.xpath("//*[@id='" + id + "']/div[2]/*[name()=\"svg\"]/*[name()=\"g\"]/*[name()=\"g\"][" + lastColCount + "]/*[name()=\"rect\"][1]"));
        Promise.all([
          svgElement.getText(),
          svgElement1.getAttribute('width')
        ]).then(function (texts) {
          average = texts[0];
          boxPlot = texts[1];
          if (average === "NA" || average == 1) {
            expect(boxPlot == 0).toBe(true);
          }
          else {
            expect(boxPlot == 0).toBe(false);
          }
        })

      }


    })

  },



  studiesValidation: function (id) {

    var svgElementList = element.all(by.xpath("//*[@id='" + id + "']/div[2]/*[name()=\"svg\"]/*[name()=\"g\"]/*[name()=\"g\"]"));
    svgElementList.count().then(function (rowCount) {
      console.log("Total Row Count:" + rowCount);
      var count = rowCount / 4;
      count = Math.round(count);
      var count1 = count * 2 + 1;


      var average, boxPlot;
      for (var i = count1; i <= rowCount - (count + 1); i++) {

        var svgElement = element(by.xpath("//*[@id='" + id + "']/div[2]/*[name()=\"svg\"]/*[name()=\"g\"]/*[name()=\"g\"][" + i + "]/*[name()=\"text\"]"));
        svgElement.getText().then(function (Text) {
          console.log("studies:", Text);
        })

      }
      for (var i = count + 1; i <= count * 2; i++) {
        var svgElement = element(by.xpath("//*[@id='" + id + "']/div[2]/*[name()=\"svg\"]/*[name()=\"g\"]/*[name()=\"g\"][" + i + "]/*[name()=\"text\"]"));
        svgElement.getText().then(function (Text) {
          console.log("med:", Text);
        })

      }

      for (var i = 1; i <= count; i++) {
        var svgElement = element(by.xpath("//*[@id='" + id + "']/div[2]/*[name()=\"svg\"]/*[name()=\"g\"]/*[name()=\"g\"][" + i + "]/*[name()=\"text\"]"));
        svgElement.getText().then(function (Text) {
          console.log("avg:", Text);

        })

      }

    })

  },


  countryValidation: function (id) {
    var svgElementList = element.all(by.xpath("//*[@id='" + id + "']/div[2]/*[name()=\"svg\"]/*[name()=\"g\"]/*[name()=\"g\"]"));
    svgElementList.count().then(function (rowCount) {
      var count = rowCount;
      console.log("Total Row Count:" + rowCount);
      // var deferred = protractor.promise.defer();
      var countdiv = rowCount / 4;
      countdiv = Math.round(countdiv);

      for (var i = 1; i <= countdiv; i++) {

        var svgElement = element(by.xpath("//*[@id='" + id + "']/div[2]/*[name()=\"svg\"]/*[name()=\"g\"]/*[name()=\"g\"][" + count + "]/*[name()=\"g\"][" + i + "]/*[name()=\"text\"]"));

        svgElement.getText().then(function (Text) {
          console.log("Country:", Text);
          // deferred.fulfill("select * from [dbo].[Country] where CountryName = '"+Text+"'");
          // console.log("Query", query);

        })


      }


    })

  },
  

}