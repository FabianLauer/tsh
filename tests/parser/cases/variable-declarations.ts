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
	...expectation: Array<(node: TNode) => boolean>
): void {
	const testName = sourceCode
	// wrap the source code in a func decl so we can parse it
	sourceCode = `func __wrapper__() { ${sourceCode} }`
	// wrap the assertion functions so that they receive the first node of the wrapper function's
	// body as their parameter
	const assertions = expectation.map(fn => {
		return (decl: ast.FuncDecl) => {
			const firstChild = <TNode>decl.body.getNodeAtIndex(0)
			if (fn(firstChild)) {
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

const isVarDecl = (decl: any): decl is ast.VarDecl => decl instanceof ast.VarDecl

function hasName(varDecl: ast.VarDecl, name: string) {
	return varDecl.name.rawValue === name
}

function expectModifier(modifier: ast.VarDeclModifier) {
	return (varDecl: ast.VarDecl) => varDecl.modifier === modifier
}

function hasEmptyAssignment(varDecl: ast.VarDecl) {
	return varDecl.assignment === ast.Expr.Empty
}

function hasOwnAssignment(varDecl: ast.VarDecl) {
	return (
		varDecl.assignment instanceof ast.Expr &&
		varDecl.assignment !== ast.Expr.Empty
	)
}


///
/// Test Cases:
///

for (const keyword of ['let', 'const']) {
	test<ast.VarDecl>(
		`${keyword} a`,
		isVarDecl,
		$ => hasName($, 'a'),
		expectModifier(ast.VarDeclModifier.Let),
		hasEmptyAssignment
	)

	test<ast.VarDecl>(
		`${keyword} a: Type`,
		isVarDecl,
		$ => hasName($, 'a'),
		expectModifier(ast.VarDeclModifier.Let),
		hasOwnAssignment
	)

	test<ast.VarDecl>(
		`${keyword} a = 123`,
		isVarDecl,
		$ => hasName($, 'a'),
		expectModifier(ast.VarDeclModifier.Let),
		hasOwnAssignment
	)


	test<ast.VarDecl>(
		`${keyword} longVarName: Type = 123`,
		isVarDecl,
		$ => hasName($, 'longVarName'),
		expectModifier(ast.VarDeclModifier.Let),
		hasOwnAssignment
	)
}

