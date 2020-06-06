const puppeteer = require('puppeteer')

// for configuration, compare https://github.com/Zenika/alpine-chrome/blob/master/with-puppeteer/src/screenshot-asia.js

async function printPdf(url, options) {
	let displayHeaderFooter = false
	let headerTemplate = ''
	let footerTemplate = ''

	if (options.footerTemplate || options.headerTemplate) {
		displayHeaderFooter = true
		headerTemplate = options.headerTemplate || headerTemplate
		footerTemplate = options.footerTemplate || footerTemplate
	}

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
		displayHeaderFooter,
		headerTemplate,
		footerTemplate,
	})

	await browser.close()

	return buffer
}

module.exports = printPdf
