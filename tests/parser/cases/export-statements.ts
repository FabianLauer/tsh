///
/// Imports:
///

import * as ast from '@/compiler/ast'
import ParserTestCase from '../ParserTestCase'


///
/// Test Preparation:
///


// This array contains all test cases we'll export from this file.
export const cases: ParserTestCase[] = []
export default cases

/**
 * Create a test case and export it from this file.
 * @param sourceCode The source code to parse.
 * @param expectation Assertion functions. Return `true` for "test passed", `false` "for failed".
 */
function test<TNode extends ast.BaseNode>(
	sourceCode: string,
	...expectation: Array<(node: TNode[]) => boolean>
): void {
	const name = sourceCode
	cases.push(ParserTestCase.create(name, sourceCode, ...expectation))
}



///
/// Assertions:
///


function isInstanceOf<T>(obj: T, constructor: Function | ({ new (...args: any[]): T; name?: string })) {
	if (obj instanceof (<Function>constructor)) {
		return true
	}
	throw new Error(`instanceof assertion failed: expected ${constructor.name}, got ${obj.constructor.name}`)
}


///
/// Test Cases:
///

// We run tests for every identifier name in this array.
const identifiers = [
	'a',
	'abc',
	'A',
	'ABC',
	'a0',
	'a_'
]

for (const identifierName of identifiers) {
	test<ast.ExportStatement>(
		`export ${identifierName}`,
		([$]) => isInstanceOf($, ast.ExportStatement),
		([$]) => isInstanceOf($.exportedIdentifier, ast.Identifier),
		([$]) => $.exportedIdentifier.name.rawValue === identifierName
	)
}
