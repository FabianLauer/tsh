import '../common'

import * as parser from '@/compiler/parser'
import * as ast from '@/compiler/ast'

import ParserTestCase from './ParserTestCase'

import { readdirSync, statSync } from 'fs'

describe('Parser:', () => {
	const files = readdirSync(`${__dirname}/cases/`)
		.map(filename => `${__dirname}/cases/${filename}`)
		.filter(filename => statSync(filename).isFile())

	for (const filename of files) {
		const cases: ParserTestCase[] = require(filename).default

		describe(filename.replace(/^.*\//, '') + ':', () => {
			for (const testCase of cases) {
				let parserResult: ast.BaseNode[]

				// run the actual tests
				describe(testCase.name, () => {
					// parse source code to AST
					it('parsing should work', () => {
						parserResult = parser.parse(testCase.sourceCode)
					})

					// validate AST node sequence
					it('AST should match expectation', () => {
						for (const expectation of testCase.expectation) {
							if (!expectation(parserResult)) {
								throw new Error(
									`AST node type expectation not met: '${expectation.toString()}'`
								)
							}
						}
					})
				})
			}
		})
	}
})

