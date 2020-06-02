FROM node:14-alpine

RUN apk add --no-cache \
	chromium \
	nss \
	freetype \
	freetype-dev \
	harfbuzz \
	ca-certificates \
	ttf-freefont

WORKDIR /app

COPY . .

ENV NODE_ENV=production

RUN npm i \
	# Add user so we don't need --no-sandbox.
	&& addgroup -S pdfuser && adduser -S -g pdfuser pdfuser \
	&& mkdir -p /home/pdfuser/Downloads /app \
	&& chown -R pdfuser:pdfuser /home/pdfuser \
	&& chown -R pdfuser:pdfuser /app


# Run everything after as non-privileged user.
USER pdfuser

CMD [ "npm", "start" ]
