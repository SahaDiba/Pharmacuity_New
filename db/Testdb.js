// var db = require('./db.js');


// describe('test db connection', function () {

// it('tests db connection', function (done) {

//   var query = "select cast(sum(SitePFtoSACycleTimeInWeeks)/count(*) as decimal(18,1)) as 'Avg' from (select a.ProtocolId, min(cast(a.SitePFtoSACycleTimeInDays as decimal(18,1)))/7 as 'SitePFtoSACycleTimeInWeeks' from [dbo].[CLSPerformanceData] as a INNER JOIN [dbo].[Protocol] as b ON a.ProtocolId = b.ProtocolId INNER JOIN [dbo].[Sponsor] as c ON b.SponsorId = c.SponsorId INNER JOIN [dbo].[ProtocolExclusionList] as d on not exists (select d.ProtocolId FROM [dbo].[ProtocolExclusionList] as d where a.ProtocolId = d.ProtocolId) INNER JOIN [dbo].[Country] as e ON a.CountryId = e.CountryId and e.CountryName = 'ECUADOR' and c.SponsorDisplayName='SPONSOR' group by a.ProtocolId) as result" 

//   db.ConnectDB(query).then(function _onSuccess(_returned){

//     console.log(_returned.recordset[0].Avg);
//     var data =_returned.recordset[0].Avg;
//     console.log("Average:"+ data);

//     done();
// }).catch(function _onFailure(err){
//     done.fail(err);
// })
// })
// })


const sql = require('mssql');

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

describe('Login Page 2 Menu', function () {
  it('Login Page To Menu Check', function () {

    var subMenuValues = {
      "Therapeutic Area": "CARDIOVASCULAR",
      "Phase": "PHASE 2",
      "Enrollment Status": "COMPLETED",
      "Protocol": "SPONSOR-2079",
      "Country": "CANADA",
    }
    browser.get("http://qa.pharmacuity.healthcare/EH/#/login");
    browser.waitForAngular();

    element(by.id('username')).sendKeys("Sahad1");
    element(by.id('password')).sendKeys("2SouthCarolina");
    element(by.xpath('//*[@id="submit"]')).click();
    browser.waitForAngular();

    element(by.xpath('//*[@id="ng-app"]/body/header/div[1]/div/md-menu-bar/md-menu/button/span')).click();
    browser.waitForAngular();

    element(by.xpath('//*[@id="menu_container_6"]/md-menu-content/md-menu-item[2]/md-menu/div/button')).click();
    browser.waitForAngular();
    browser.sleep(5000);

    element(by.xpath('//*[@id="pharmAcquity"]/div[2]/div[1]/div/md-tabs/md-tabs-wrapper/md-tabs-canvas/md-pagination-wrapper/md-tab-item[2]/span')).click();
    browser.waitForAngular();
    browser.sleep(5000);

    var databaseConnect = (countryText) => {
      return new Promise((resolve, reject) => {
        connectionPool.request().query("SELECT CountryCode FROM  [dbo].[Country] WHERE CountryName LIKE '" + countryText + "%'").then((result) => {
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
              stuElement.getText(),
              databaseConnect(countryText)
            ]).then((result) => {
              console.log((currentCountryIndex + 1), countryText, result[0], result[1], result[2], result[3]);
            })
          });
        });
      });
    }

    element.all(by.repeater('i in filterComponents')).filter((parentFilter, index) => {
      return parentFilter.element(by.css('.panel-heading')).getText().then((text) => {
        return (text === text);
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

          parentElement.element(by.css('.panel-heading')).getText().then((menuText) => {
            if (menuText != "Country") {
              parentElement.all(by.repeater('listItem in initValues')).filter((parentFilter, index) => {
                return parentFilter.element(by.css('.md-label')).getText().then((text) => {
                  return (text === subMenuValues[menuText]);
                });
              }).each((childElement, childIndex) => {

                childElement.click();
                browser.actions().mouseMove(childElement, { x: 500, y: 0 }).perform();
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
                  }
                });
              });
            }
          })
        }
      });
    });

    browser.wait(() => {
      validateCountryData();
      return true;
    }, 1);

  }, 1000000);
});