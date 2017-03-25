import '../common'

import * as parser from '@/compiler/parser'
import * as ast from '@/compiler/ast'

import ParserTestCase from './ParserTestCase'

import { readdirSync, statSync } from 'fs'

describe('Parser', () => {
	const files = readdirSync(`${__dirname}/cases/`)
		.map(filename => `${__dirname}/cases/${filename}`)
		.filter(filename => statSync(filename).isFile());

	for (const filename of files) {
		const cases: ParserTestCase[] = require(filename).default

		describe(filename, () => {
			for (const testCase of cases) {
				let parserResult: ast.BaseNode

				// parse source code to AST
				describe('parse', () => {
					it('should not throw an error', () => {
						parserResult = parser.parse(testCase.sourceCode)
					})
				})

				// validate AST node sequence
				describe('result', () => {
					it('should match the expected AST', () => {
						if (!(parserResult instanceof testCase.expectation[0])) {
							throw new Error('AST node type expectation not met')
						}
					})
				})
			}
		})
	}
})

