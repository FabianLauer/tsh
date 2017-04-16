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

// We run tests for every path in this array.
const testPaths = [
	'./',
	'/test',
	'/test.suffix',
	'./test.abc',
	'test',
	'test.a',
	'../../fileName.1.ab'
]

for (const path of testPaths) {
	test<ast.ImportStatement>(
		`import "${path}"`,
		([$]) => isInstanceOf($, ast.ImportStatement),
		([$]) => isInstanceOf($.importPath, ast.StringLiteral),
		([$]) => $.importPath.contentToken.rawValue === path
	)
}
