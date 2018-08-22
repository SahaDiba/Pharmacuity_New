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

describe('Login Page 2 Menu', function () {
  it('Login Page To Menu Check', function () {

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
        //connectionPool.request().query(`SELECT CountryCode FROM  [dbo].[Country] WHERE CountryName LIKE '${countryText}%'`).then((result) => {
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
    element.all(by.xpath('//*[@id="boxplotpftosacp"]/div[2]/svg:svg/svg:g/svg:g')).count().then(function (totalElement) {
      totalColCount = ((totalElement - 1) / 4);
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
            databaseConnect(countryText.replace("...",""))
          ]).then((result) => {
            console.log((currentCountryIndex + 1), countryText, result[0], result[1], result[2], result[3]);
            // if(!(result[2] == result[3])){
            //   console.log(countryText," Failed");
            // }
            if(result[3]==0 ){
              since(function() {
                return 'For the country ' + countryText +' studies are not matched with the database'+': ' + result[2] + ' =/= ' + result[3];
              }).
              expect(result[2] == 'NA').toBe(true);
              
              }else{
                since(function() {
                  return 'For the country ' + countryText +' studies are not matched with the database '+': ' + result[2] + ' =/= ' + result[3];
                }).
                expect(result[2] == result[3]).toBe(true);
              }
           
          })
        });
      });
    });
  },1000000);
});



