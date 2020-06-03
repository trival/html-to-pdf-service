const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const token = require('koa-bearer-token')
const printPdf = require('./printPdf')

const app = new Koa()

app.use(bodyparser())
app.use(token())

// app.use(function logRequest(ctx, next) {
// 	console.log('=== request ===')
// 	console.log(ctx.method)
// 	// @ts-ignore
// 	console.log(ctx.request.token)
// 	console.log(ctx.request.body)
// 	return next()
// })

app.use(async (ctx) => {
	if (
		ctx.method === 'POST' &&
		// @ts-ignore
		ctx.request.token === process.env.PDF_SECRET &&
		ctx.request.body &&
		ctx.request.body.url
	) {
		ctx.type = 'pdf'
		ctx.body = await printPdf(ctx.request.body.url)
	} else {
		ctx.throw(404)
	}
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log('app is listening on port ' + port))
