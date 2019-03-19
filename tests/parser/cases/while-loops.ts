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
	const testName = sourceCode
	// wrap the source code in a func decl so we can parse it
	sourceCode = `func __wrapper__() { ${sourceCode} }`
	// wrap the assertion functions so that they receive the first node of the wrapper function's
	// body as their parameter
	const assertions = expectation.map(fn => {
		return ([decl]: ast.FuncDecl[]) => {
			if (fn(<TNode[]>decl.body.nodes)) {
				return true
			} else {
				throw new Error(fn.toString())
			}
		}
	})
	cases.push(ParserTestCase.create(testName, sourceCode, ...assertions))
}



///
/// Assertions:
///


function isInstanceOf<T>(obj: T, constructor: Function | ({ new(...args: any[]): T; name?: string })) {
	if (obj instanceof (<Function>constructor)) {
		return true
	}
	throw new Error(`instanceof assertion failed: expected ${constructor.name}, got ${obj.constructor.name}`)
}


///
/// Test Cases:
///

test<ast.WhileStatement>(
	`while true { }`,
	([$]) => isInstanceOf($, ast.WhileStatement),
	([$]) => $.condition.expressions.length === 1
)

test<ast.WhileStatement>(
	`while (true) { }`,
	([$]) => isInstanceOf($, ast.WhileStatement),
	([$]) => $.condition.expressions.length === 1
)

test<ast.WhileStatement>(
	`while 1 { }`,
	([$]) => isInstanceOf($, ast.WhileStatement),
	([$]) => $.condition.expressions.length === 1
)

test<ast.WhileStatement>(
	`while identifier { }`,
	([$]) => isInstanceOf($, ast.WhileStatement),
	([$]) => $.condition.expressions.length === 1
)

test<ast.WhileStatement>(
	`while callFunc() { }`,
	([$]) => isInstanceOf($, ast.WhileStatement),
	([$]) => $.condition.expressions.length === 1
)

test<ast.WhileStatement>(
	`while true if true { }`,
	([$]) => isInstanceOf($, ast.WhileStatement),
	([$]) => isInstanceOf($.body, ast.Statement),
	([$]) => $.condition.expressions.length === 1
)
