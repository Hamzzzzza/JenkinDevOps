import chrome from 'selenium-webdriver/chrome.js'; // Explicitly use .js extension
import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';

describe('Express App Test', function() {
    this.timeout(30000); // Set a timeout for the test

    let driver;

    before(async function() {
        // Configure Chrome to run headlessly
        let options = new chrome.Options();
        options.addArguments('--headless'); // Run in headless mode
        options.addArguments('--no-sandbox');
        options.addArguments('--disable-dev-shm-usage');

        driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        await driver.get('http://localhost:3000'); // Access the local app
    });

    after(async function() {
        if (driver) {
            await driver.quit(); // Quit the browser after the tests
        }
    });

    it('should load the homepage', async function() {
        const title = await driver.getTitle();
        expect(title).to.equal('Your Expected Page Title'); // Replace with actual title

        const element = await driver.findElement(By.tagName('body'));
        expect(await element.isDisplayed()).to.be.true; // Check if the body is displayed
    });
});
