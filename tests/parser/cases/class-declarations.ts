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

// tslint:disable:variable-name

test<ast.ClassDecl>(
	`class Alpha { }`,
	([Alpha]) => isInstanceOf(Alpha, ast.ClassDecl),
	([Alpha]) => Alpha.name.rawValue === 'Alpha'
)


test<ast.ClassDecl>(
	`
	class Alpha { }
	class Beta { }
	`,
	([Alpha]) => isInstanceOf(Alpha, ast.ClassDecl),
	([, Beta]) => isInstanceOf(Beta, ast.ClassDecl),
	([Alpha]) => Alpha.name.rawValue === 'Alpha',
	([, Beta]) => Beta.name.rawValue === 'Beta'
)

test<ast.ClassDecl>(
	`
	class Alpha {
		let foo
		const bar = 1
	}
	`,
	([Alpha]) => isInstanceOf(Alpha, ast.ClassDecl),
	([Alpha]) => Alpha.name.rawValue === 'Alpha',
	([Alpha]) => (
		isInstanceOf(Alpha.body.getNodeAtIndex(0), ast.VarDecl) &&
		(<ast.VarDecl>Alpha.body.getNodeAtIndex(0)).name.rawValue === 'foo'
	),
	([Alpha]) => (
		isInstanceOf(Alpha.body.getNodeAtIndex(1), ast.VarDecl) &&
		(<ast.VarDecl>Alpha.body.getNodeAtIndex(1)).name.rawValue === 'bar'
	)
)
