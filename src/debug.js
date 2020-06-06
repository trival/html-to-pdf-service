module.exports = {
	logRequest(ctx, next) {
		console.log('=== request ===')
		console.log(ctx.method)
		console.log(ctx.request.token)
		console.log(ctx.request.body)
		return next()
	},
}
