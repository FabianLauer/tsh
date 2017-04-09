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
 * @param testName The name of the test case.
 * @param sourceCode The source code to parse.
 * @param expectation Assertion functions. Return `true` for "test passed", `false` "for failed".
 */
function testWithName<TNode extends ast.BaseNode>(
	testName: string,
	sourceCode: string,
	...expectation: Array<(node: TNode[]) => boolean>
): void {
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
	testWithName(testName, sourceCode, ...expectation)
}



///
/// Assertions:
///

const isVarDecl = ([decl]: any[]) => decl instanceof ast.VarDecl

function hasName(varDecl: ast.VarDecl, name: string) {
	return varDecl.name.rawValue === name
}

function expectModifier(modifier: ast.VarDeclModifier) {
	return ([varDecl]: ast.VarDecl[]) => varDecl.modifier === modifier
}

function hasEmptyAssignment([varDecl]: ast.VarDecl[]) {
	return varDecl.assignment === ast.Expr.Empty
}

function hasOwnAssignment([varDecl]: ast.VarDecl[]) {
	return (
		varDecl.assignment instanceof ast.Expr &&
		varDecl.assignment !== ast.Expr.Empty
	)
}


///
/// Test Cases:
///

for (const keyword of ['let', 'const']) {
	const modifier = keyword === 'let'
		? ast.VarDeclModifier.Let
		: ast.VarDeclModifier.Const

	test<ast.VarDecl>(
		`${keyword} a`,
		isVarDecl,
		([$]) => hasName($, 'a'),
		expectModifier(modifier),
		hasEmptyAssignment
	)

	test<ast.VarDecl>(
		`${keyword} a: Type`,
		isVarDecl,
		([$]) => hasName($, 'a'),
		expectModifier(modifier),
		hasEmptyAssignment
	)

	test<ast.VarDecl>(
		`${keyword} a = 123`,
		isVarDecl,
		([$]) => hasName($, 'a'),
		expectModifier(modifier),
		hasOwnAssignment
	)


	test<ast.VarDecl>(
		`${keyword} longVarName: Type = 123`,
		isVarDecl,
		([$]) => hasName($, 'longVarName'),
		expectModifier(modifier),
		hasOwnAssignment
	)


	for (let i = 0; i <= 10; i++) {
		const newlines = '\n'.repeat(i)
		testWithName<ast.VarDecl>(
			`var decls with ${keyword} separated by ${i} newlines each`,

			`
			${newlines}
			${keyword} a${newlines}
			${keyword} b: Type${newlines}
			${keyword} c = 123${newlines}
			${keyword} d: Type = 123${newlines}
			`,

			([a]) => isVarDecl([a]),
			([a]) => hasName(a, 'a'),
			([a]) => expectModifier(modifier)([a]),
			([a]) => hasEmptyAssignment([a]),

			([, b]) => isVarDecl([b]),
			([, b]) => hasName(b, 'b'),
			([, b]) => expectModifier(modifier)([b]),
			([, b]) => hasEmptyAssignment([b]),

			([, , c]) => isVarDecl([c]),
			([, , c]) => hasName(c, 'c'),
			([, , c]) => expectModifier(modifier)([c]),
			([, , c]) => hasOwnAssignment([c]),

			([, , , d]) => isVarDecl([d]),
			([, , , d]) => hasName(d, 'd'),
			([, , , d]) => expectModifier(modifier)([d]),
			([, , , d]) => hasOwnAssignment([d])
		)
	}
}

