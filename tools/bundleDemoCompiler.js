const browserify = require('browserify')

browserify(
	'./api/CompilerApi.js',
	{
		basedir: './build/src/',
		paths: ['./'],
		standalone: 'compiler'
	}
).bundle().pipe(require('fs').createWriteStream('./docs/static/compiler.js'))
