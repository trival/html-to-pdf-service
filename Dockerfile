# see https://github.com/puppeteer/puppeteer/blob/master/docs/troubleshooting.md#running-puppeteer-in-docker
FROM node:14-slim

# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
# installs, work.
RUN apt-get update \
	&& apt-get install -y wget gnupg \
	&& wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
	&& sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
	&& apt-get update \
	&& apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf fonts-lato \
	--no-install-recommends \
	&& rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

ENV NODE_ENV=production

RUN npm i \
	# Add user so we don't need --no-sandbox.
	&& groupadd -r pdfuser && useradd -r -g pdfuser -G audio,video pdfuser \
	&& mkdir -p /home/pdfuser/Downloads \
	&& chown -R pdfuser:pdfuser /home/pdfuser \
	&& chown -R pdfuser:pdfuser /app

# Run everything after as non-privileged user.
USER pdfuser

CMD [ "npm", "start" ]
