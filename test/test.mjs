import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js'; // Adjusting for proper import in ESM

describe('Express App Test', function() {
    this.timeout(30000); // Set a timeout for the test

    let driver;

    before(async function() {
        driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();
        await driver.get('http://localhost:3000'); // Access the local app
    });

    after(async function() {
        await driver.quit(); // Quit the browser after the tests
    });

    it('should load the homepage', async function() {
        const title = await driver.getTitle();
        expect(title).to.equal('Your Expected Page Title'); // Replace with actual title from index.html

        const element = await driver.findElement(By.tagName('body'));
        expect(await element.isDisplayed()).to.be.true; // Check if the body is displayed
    });
});
