import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe('html-to-pdf-service e2e test', () => {
	it('generates a pdf for a homepage', async () => {
		const res = await fetch('http://localhost:5000', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: 'Bearer my_private_test_secret',
			},
			body: JSON.stringify({ url: 'https://wikipedia.org' }),
		})

		expect(res.status).toBe(200)
		expect(res.headers.get('content-type')).toBe('application/pdf')

		const pdf = await res.arrayBuffer()

		return writeFile(resolve(__dirname, 'test.pdf'), Buffer.from(pdf))
	})

	it('returns 404 for wrong input', async () => {
		const wrongToken = await fetch('http://localhost:5000', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: 'Bearer fufu',
			},
			body: JSON.stringify({ url: 'https://wikipedia.org' }),
		})
		expect(wrongToken.status).toBe(404)

		const noToken = await fetch('http://localhost:5000', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({ url: 'https://wikipedia.org' }),
		})
		expect(noToken.status).toBe(404)

		const notPost = await fetch('http://localhost:5000', {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				authorization: 'Bearer my_private_test_secret',
			},
		})
		expect(notPost.status).toBe(404)

		const wrongBody = await fetch('http://localhost:5000', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: 'Bearer my_private_test_secret',
			},
			body: JSON.stringify({ urll: 'https://wikipedia.org' }),
		})
		expect(wrongBody.status).toBe(404)

		const notJSON = await fetch('http://localhost:5000', {
			method: 'POST',
			headers: {
				authorization: 'Bearer my_private_test_secret',
			},
			body: JSON.stringify({ url: 'https://wikipedia.org' }),
		})
		expect(notJSON.status).toBe(404)
	})
})
