import { defineConfig } from 'vite'
const path = require('path')

module.exports = defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, './tool.js'),
			name: 'MyLib',
			fileName: (format) => `jpg-app-tool.${format}.js`
		}
	},
})