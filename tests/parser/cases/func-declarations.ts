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
	const name = sourceCode
	cases.push(ParserTestCase.create(name, sourceCode, ...expectation))
}


///
/// Test Cases:
///


test<ast.FuncDecl>(
	'func alpha()',
	$ => $ instanceof ast.FuncDecl,
	$ => $.name.rawValue === 'alpha',
	$ => $.returnTypeDecl === ast.TypeExpr.Empty,
	// Is the body the Empty Statement?
	$ => $.body === ast.Statement.Empty
)

test<ast.FuncDecl>(
	'func alpha() { }',
	$ => $ instanceof ast.FuncDecl,
	$ => $.name.rawValue === 'alpha',
	$ => $.returnTypeDecl === ast.TypeExpr.Empty,
	// Is the body a Statement, but not the Empty Statement?
	$ => $.body instanceof ast.Statement,
	$ => $.body !== ast.Statement.Empty
)

test<ast.FuncDecl>(
	'func alpha(): typename',
	$ => $ instanceof ast.FuncDecl,
	$ => $.name.rawValue === 'alpha',
	// Is the return type name a TypeExpr, but not the Empty TypeExpr?
	$ => $.returnTypeDecl instanceof ast.TypeExpr,
	$ => $.returnTypeDecl !== ast.TypeExpr.Empty,
	// Is the body the Empty Statement?
	$ => $.body === ast.Statement.Empty
)

test<ast.FuncDecl>(
	'func alpha(): typename { }',
	$ => $ instanceof ast.FuncDecl,
	$ => $.name.rawValue === 'alpha',
	// Is the return type name a TypeExpr, but not the Empty TypeExpr?
	$ => $.returnTypeDecl instanceof ast.TypeExpr,
	$ => $.returnTypeDecl !== ast.TypeExpr.Empty,
	// Is the body a Statement, but not the Empty Statement?
	$ => $.body instanceof ast.Statement,
	$ => $.body !== ast.Statement.Empty
)
