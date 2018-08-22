describe('Login Page', function() {

    it('should display incorrect userid error message when entering incorrect userid', function() {
        browser.get("https://demo1.pharmacuity.com/");
        browser.waitForAngular();   
            var username=element(by.id('username'));
            var password=element(by.id('password'));
            var submit=element(by.xpath('//*[@id="submit"]'));
            username.clear();
            password.clear();
            
            username.sendKeys("Sahad1");
            //highlightEle.highlightElement(password);
            password.sendKeys("Password1");
            
            submit.click();
            browser.waitForAngular();
            browser.driver.sleep(1000);
            var selApp = element(by.xpath('//*[@id="ng-app"]/body/header/div[1]/div/md-menu-bar/md-menu/button/span'));
        
        selApp.click();
        var mAndB = element(by.xpath('//*[@id="menu_container_12"]/md-menu-content/md-menu-item[2]/md-menu/div[1]/button/span'));
        
        mAndB.click();
        browser.waitForAngular();
        var pF_SA = element(by.xpath('//*[@id="pharmAcquity"]/div[2]/div[1]/div/md-tabs/md-tabs-wrapper/md-tabs-canvas/md-pagination-wrapper/md-tab-item[2]/span'));
        pF_SA.click();
        browser.waitForAngular();


      });
    });