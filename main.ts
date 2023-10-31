import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import fs from 'fs';
import chalk from 'chalk';
import path from 'path';


let sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let vectorizeImages = async () => {
    console.log(chalk.green('Loading images...'));

    // load all images from the assets folder
    const images = fs.readdirSync('./assets');

    console.log(chalk.green('Images loaded...'));
    console.log(chalk.green('Starting vectorization...'));

    // load the browser
    puppeteer.use(StealthPlugin())

    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: "new"
    });

    console.log(chalk.green('-----------------------'));

    // loop through all images
    for (const image of images) {
        try {
            console.log(chalk.green(`Vectorizing ${image}...`));
            const page = await browser.newPage();

            const downloadPath = path.resolve('./vector_images');

            const client = await page.target().createCDPSession()
            await client.send('Page.setDownloadBehavior', {
                behavior: 'allow',
                downloadPath: downloadPath,
            })

            await page.goto('https://vectorizer.ai/');
            const fileUploadButton = await page.$("input[type=file]");
        
            if (!fileUploadButton) {
                console.log('File upload button not found');
                return;
            }

            await fileUploadButton.uploadFile(`./assets/${image}`);

            await sleep(10000);

            // Check if confirm button is visible
            let confirmButtonSelector = '#PreCrop-Sidebar-ButtonBar > button.PreCrop-Sidebar-crop_button.bttn.bttn_dark';
            let confirmButton = await page.$(confirmButtonSelector);

            if (confirmButton) {
                try {
                    await confirmButton.click();
                    console.log(chalk.green(`Cropping ${image}...`));
                }
                catch (e) {
                    console.log(chalk.yellow("No need to crop..."));
                }
            }

            // wait for the image to be uploaded
            await sleep(15000);

            let loadingModalSelector = "#App-Progress-Upload-Pane > td:nth-child(1)"
            // wait for the loading modal to is display: none
            await page.waitForSelector(loadingModalSelector, { hidden: true });
            
            let downloadButtonSelector = 'a[title="Download"]';
            // Wait till the download button is visible
            await page.waitForSelector(downloadButtonSelector);

            // Click the download button
            let downloadButton = await page.$(downloadButtonSelector);
            await downloadButton?.click();
            // wait for page load
            await sleep(5000);

            let downloadButtonSelector3 = 'button[type="submit"]';
            // Wait till the download button is visible
            await page.waitForSelector(downloadButtonSelector3);

            // Click the download button
            let downloadButton3 = await page.$(downloadButtonSelector3);
            await downloadButton3?.click();

            // wait for download to complete
            await sleep(3000);

            // close the page
            await page.close();
            console.log(chalk.green(`Vectorized ${image}...`));
            console.log(chalk.green('-----------------------'));
        }
        catch (e) {
            console.log(chalk.red(`Error vectorizing ${image}...`));
            console.log(e);
        }
    }

    // close the browser
    await browser.close();
    console.log(chalk.green('Vectorization complete...'));
}

console.log(chalk.green('Starting vectorization...'));
vectorizeImages();