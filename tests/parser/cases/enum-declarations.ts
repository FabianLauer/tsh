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

test<ast.EnumDecl>(
	`enum Alpha { }`,
	([Alpha]) => isInstanceOf(Alpha, ast.EnumDecl),
	([Alpha]) => Alpha.name.rawValue === 'Alpha',
	([Alpha]) => isInstanceOf(Alpha.body, ast.Statement),
	([Alpha]) => Alpha.body.getChildNodes().length === 0
)

test<ast.EnumDecl>(
	`enum Alpha {
	}`,
	([Alpha]) => isInstanceOf(Alpha, ast.EnumDecl),
	([Alpha]) => Alpha.name.rawValue === 'Alpha',
	([Alpha]) => isInstanceOf(Alpha.body, ast.Statement),
	([Alpha]) => Alpha.body.getChildNodes().length === 0
)

test<ast.EnumDecl>(
	`
	enum Alpha { }
	enum Beta { }
	`,
	([Alpha]) => isInstanceOf(Alpha, ast.EnumDecl),
	([, Beta]) => isInstanceOf(Beta, ast.EnumDecl),
	([Alpha]) => Alpha.name.rawValue === 'Alpha',
	([, Beta]) => Beta.name.rawValue === 'Beta',
	([Alpha]) => isInstanceOf(Alpha.body, ast.Statement),
	([, Beta]) => isInstanceOf(Beta.body, ast.Statement),
	([Alpha]) => Alpha.body.getChildNodes().length === 0,
	([, Beta]) => Beta.body.getChildNodes().length === 0
)

test<ast.EnumDecl>(
	`enum A {
		B
	}`,
	([A]) => isInstanceOf(A, ast.EnumDecl),
	([A]) => A.name.rawValue === 'A',
	([A]) => isInstanceOf(A.body, ast.Statement),
	([A]) => A.body.getChildNodes().length === 1,
	([A]) => -1 === A.body.getChildNodes()
					.findIndex(child => !(child instanceof ast.EnumMemberDecl))
)

test<ast.EnumDecl>(
	`enum A {
		B,
		C
	}`,
	([A]) => isInstanceOf(A, ast.EnumDecl),
	([A]) => A.name.rawValue === 'A',
	([A]) => isInstanceOf(A.body, ast.Statement),
	([A]) => A.body.getChildNodes().length === 2,
	([A]) => -1 === A.body.getChildNodes()
					.findIndex(child => !(child instanceof ast.EnumMemberDecl))
)

test<ast.EnumDecl>(
	`enum A {
		B,
		C,
		D
	}`,
	([A]) => isInstanceOf(A, ast.EnumDecl),
	([A]) => A.name.rawValue === 'A',
	([A]) => isInstanceOf(A.body, ast.Statement),
	([A]) => A.body.getChildNodes().length === 3,
	([A]) => -1 === A.body.getChildNodes()
					.findIndex(child => !(child instanceof ast.EnumMemberDecl))
)
