const puppeteer = require('puppeteer')

// for configuration, compare https://github.com/Zenika/alpine-chrome/blob/master/with-puppeteer/src/screenshot-asia.js

async function printPdf(url) {
	const browser = await puppeteer.launch({
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--headless',
			'--disable-gpu',
			'--disable-dev-shm-usage',
		],
	})
	const page = await browser.newPage()
	await page.goto(url, { waitUntil: 'networkidle0' })
	const buffer = await page.pdf({
		format: 'A4',
		displayHeaderFooter: true,
		headerTemplate: `<div style="font-size: 12px; font-family: Lato;">Störfestigkeit<div class="pageNumber"></div> <div>/</div><div class="totalPages"></div></div>`,
		footerTemplate: `<div style="font-size: 12px;"><div class="pageNumber"></div> <div>/</div><div class="totalPages"></div></div>`,
	})

	await browser.close()

	return buffer
}

module.exports = printPdf
