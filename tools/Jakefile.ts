// tslint:disable:no-reference

/// <reference path="../node_modules/@types/jake/index.d.ts" />

import { _, sh } from './buildUtils'

namespace('build', function () {

	desc('Compiles the parser.')
	task('parser', () => {
		sh `jison -o ./src/compiler/generatedParser.js ./src/compiler/grammar.bison ./src/compiler/grammar.lex`
	})

})
