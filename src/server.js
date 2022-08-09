import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import { bearerToken } from 'koa-bearer-token'
import printPdf from './printPdf.js'
import { logRequest } from './debug.js'

const app = new Koa()

app.use(bodyparser())
app.use(bearerToken())

// app.use(logRequest)

app.use(async (ctx) => {
	if (
		ctx.method === 'POST' &&
		// @ts-ignore
		ctx.request.token === process.env.PDF_SECRET &&
		ctx.request.body &&
		ctx.request.body.url
	) {
		ctx.type = 'pdf'
		const { url, ...options } = ctx.request.body
		console.log('converting url to pdf: ', url)
		ctx.body = await printPdf(url, options)
	} else {
		ctx.throw(404)
	}
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log('app is listening on port ' + port))
