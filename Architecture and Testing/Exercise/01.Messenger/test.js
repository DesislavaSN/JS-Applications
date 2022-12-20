const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const host = 'http://localhost:5500/12.Exercise Architecture and Testing/01.Messenger';

describe('E2E tests', async function() {
    this.timeout(6000);
    let browser, page;
  
    before(async () => { browser = await chromium.launch({ headless: false, slowMo: 2000 }); });
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); }); 

    it('has loaded all messages', async () => {
        await page.goto(host);
        // await browser.close();
        
        await page.click('text=Refresh');
        await page.screenshot({ path: 'site.png'});
        // const content = await page.fill(textarea, string);
        // expect(content).to.be.true;
    })
});