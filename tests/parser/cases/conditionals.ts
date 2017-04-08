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
function test<TNodes extends ast.BaseNode[]>(
	sourceCode: string,
	...expectation: Array<(node: TNodes) => boolean>
): void {
	const testName = sourceCode
	cases.push(ParserTestCase.create(testName, sourceCode, ...expectation))
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

test<[ast.IfStatement]>(
	`if variable { }`,
	([$]) => isInstanceOf($, ast.IfStatement)
)

test<[ast.IfStatement, ast.ElseIfStatement]>(
	`if variable { } else if variable2 { }`,
	([ifStm]) => isInstanceOf(ifStm, ast.IfStatement),
	([, elseIfStm]) => isInstanceOf(elseIfStm, ast.ElseIfStatement)
)

test<[ast.IfStatement, ast.ElseIfStatement, ast.ElseStatement]>(
	`if variable { } else if variable2 { } else { }`,
	([ifStm]) => isInstanceOf(ifStm, ast.IfStatement),
	([, elseIfStm]) => isInstanceOf(elseIfStm, ast.ElseIfStatement),
	([, , elseStm]) => isInstanceOf(elseStm, ast.ElseIfStatement)
)

test<[ast.IfStatement, ast.ElseStatement]>(
	`if variable { } else { }`,
	([ifStm]) => isInstanceOf(ifStm, ast.IfStatement),
	([, elseStm]) => isInstanceOf(elseStm, ast.ElseIfStatement)
)
