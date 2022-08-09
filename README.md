# html-to-pdf-service

A service converting a html page to pdf using puppeteer and headless chromium

## Usage

1. Build and deploy the docker container.
2. Set the environment variable `PDF_SECRET` to a strong secret token. Use
   bearer authorization with the expected token for the endpoint to work.
3. Send a POST request with `'content-type': 'application/json'` and a body with
   the url of the page that you want to turn into a pdf, i.e.
   `{ url: 'https://wikipedia.org' }`
4. The endpoint returns the buffer with the generated pdf and a content type of
   `application/pdf`

### Header and footer templates

Optionally you can send the properties `footerTemplate` and `headerTemplate`
within your POST request body. If any of them is set, the generated PDF will
have a header and/or footer. The the service will then set the
`displayHeaderFooter` property in the call to `pdf()` on the puppeteer `Page`
object automatically.

For more information on the templates see the [puppeteer docs](https://pptr.dev/api/puppeteer.pdfoptions).

## Test

Build and run the local container with `docker compose up`. In another terminal,
run `npm test` to run end-2-end tests against the local service entpoint.

## Contributing

Your contributions and suggestions are greatly appreciated. Submit your issues
and PRs on [github](https://github.com/trival/jss-style-helpers). Please add
unit tests for any new or changed functionality. Format, lint and test your code
with the provided configurations.

## License

Distributed under the MIT License. See LICENSE for more information.
