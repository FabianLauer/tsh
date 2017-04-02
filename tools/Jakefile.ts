// tslint:disable:no-reference

/// <reference path="../node_modules/@types/jake/index.d.ts" />

import { sh, jake } from './buildUtils'

namespace('build', function () {

	desc('Compiles the parser.')
	task('parser', () => {
		sh `jison -o ./src/compiler/generatedParser.js ./src/compiler/grammar.bison ./src/compiler/grammar.lex`
	})

})


namespace('test', function () {

	desc('Runs all tests.')
	task('all', () => {
		sh `tsc`
		sh `mocha build/tests/all.js`
	})

})


namespace('dev', function () {

	desc('Compiles the parser, then runs tests for it. Useful when working on the grammar definitions.')
	task('parser', () => {
		sh `rm -rf ./build/`
		jake('build', 'parser')
		sh `tsc`
		sh `mocha build/tests/all.js --grep Parser`
	})


	desc('Compiles the compiler, then runs end to end tests. Useful when working on code generators.')
	task('codegen', () => {
		sh `rm -rf ./build/`
		sh `tsc`
		sh `mocha build/tests/all.js --grep E2E`
	})

})
