// tslint:disable:no-reference

/// <reference path="../node_modules/@types/jake/index.d.ts" />

import { sh, jake } from './buildUtils'

namespace('build', function () {

	desc('Removes the built compiler.')
	task('clean', () => {
		sh `rm -rf ./build/`
	})

	desc('Compiles the parser.')
	task('parser', () => {
		sh `jison -o ./src/compiler/generatedParser.js ./src/compiler/grammar.bison ./src/compiler/grammar.lex`
	})


	desc('Compiles the compiler except for the parser.')
	task('compiler', () => {
		jake('build', 'clean')
		sh `tsc`
	})

})


namespace('test', function () {

	desc('Runs all tests.')
	task('all', () => {
		sh `mocha build/tests/all.js`
	})


	desc('Runs all parser tests.')
	task('parser', () => {
		sh `mocha build/tests/all.js --grep Parser`
	})


	desc('Runs all end to end tests.')
	task('e2e', () => {
		sh `mocha build/tests/all.js --grep E2E`
	})


	desc('Runs all API tests.')
	task('api', () => {
		sh `mocha build/tests/all.js --grep api`
	})

})


namespace('dev', function () {

	desc('Compiles the parser, then runs tests for it. Useful when working on the grammar definitions.')
	task('parser', () => {
		jake('build', 'clean')
		jake('build', 'parser')
		jake('build', 'compiler')
		sh `mocha build/tests/all.js --grep Parser`
	})


	desc('Compiles the compiler, then runs end to end tests. Useful when working on code generators.')
	task('codegen', () => {
		jake('build', 'compiler')
		sh `mocha build/tests/all.js --grep E2E`
	})


	desc('Compiles the compiler, then runs API tests.')
	task('api', () => {
		jake('build', 'compiler')
		jake('test', 'api')
	})

})
