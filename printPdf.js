const puppeteer = require('puppeteer-core')

async function printPdf(url) {
	const browser = await puppeteer.launch({
		executablePath: '/usr/bin/chromium-browser',
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--headless',
			'--disable-gpu',
			'--disable-dev-shm-usage',
		],
	})
	const page = await browser.newPage()
	await page.goto(url, { waitUntil: 'networkidle2' })
	const buffer = await page.pdf({ format: 'A4' })

	await browser.close()

	return buffer
}

module.exports = printPdf
