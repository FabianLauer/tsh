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


function isEmptyStatement(statement: ast.Statement): boolean {
	if (
		statement === ast.Statement.Empty || (
			statement instanceof ast.Statement &&
			statement.nodes.length === 0
		)
	) {
		return true
	}
	const firstNonEmptyStatementOrNodeIndex = statement.nodes.findIndex(
		node => {
			if (node instanceof ast.Statement) {
				return isEmptyStatement(node)
			}
			return true
		}
	)
	return firstNonEmptyStatementOrNodeIndex !== -1
}


function hasEmptyFuncBody([funcDecl]: ast.FuncDecl[]) {
	return isEmptyStatement(funcDecl.body)
}


function hasOwnParamDeclList([funcDecl]: ast.FuncDecl[]) {
	return (
		funcDecl.runtimeParamDecls instanceof ast.ParamDeclList &&
		funcDecl.runtimeParamDecls !== ast.ParamDeclList.Empty
	)
}


function getRuntimeParamAtIndex(funcDecl: ast.FuncDecl, paramIndex: number) {
	return funcDecl.runtimeParamDecls.getParamAtIndex(paramIndex)
}


function assertRuntimeParam(
	funcDecl: ast.FuncDecl,
	paramIndex: number,
	name: string,
	hasTypeDecl: boolean
) {
	const decl = getRuntimeParamAtIndex(funcDecl, paramIndex)
	if (decl.name.rawValue !== name) {
		return false
	}
	if (hasTypeDecl) {
		return (
			decl.typeDecl instanceof ast.TypeExpr &&
			decl.typeDecl !== ast.TypeExpr.Empty
		)
	} else {
		return decl.typeDecl === ast.TypeExpr.Empty
	}
}


function hasEmptyReturnTypeDecl([funcDecl]: ast.FuncDecl[]) {
	return funcDecl.returnTypeDecl === ast.TypeExpr.Empty
}


function hasOwnReturnTypeDecl([funcDecl]: ast.FuncDecl[]) {
	return (
		funcDecl.returnTypeDecl instanceof ast.TypeExpr &&
		funcDecl.returnTypeDecl !== ast.TypeExpr.Empty
	)
}



///
/// Test Cases:
///


// Named Function "Headers":
// Test named functions without a significant body.

test<ast.FuncDecl>(
	'func alpha()',
	([$]) => $ instanceof ast.FuncDecl,
	([$]) => $.name.rawValue === 'alpha',
	([$]) => $.returnTypeDecl === ast.TypeExpr.Empty,
	hasEmptyFuncBody
)

test<ast.FuncDecl>(
	'func alpha() { }',
	([$]) => $ instanceof ast.FuncDecl,
	([$]) => $.name.rawValue === 'alpha',
	([$]) => $.returnTypeDecl === ast.TypeExpr.Empty,
	hasEmptyFuncBody
)

test<ast.FuncDecl>(
	'func alpha() -> Type',
	([$]) => $ instanceof ast.FuncDecl,
	([$]) => $.name.rawValue === 'alpha',
	// Is the return type name a TypeExpr, but not the Empty TypeExpr?
	([$]) => $.returnTypeDecl instanceof ast.TypeExpr,
	([$]) => $.returnTypeDecl !== ast.TypeExpr.Empty,
	hasEmptyFuncBody
)

test<ast.FuncDecl>(
	'func alpha() -> Type { }',
	([$]) => $ instanceof ast.FuncDecl,
	([$]) => $.name.rawValue === 'alpha',
	// Is the return type name a TypeExpr, but not the Empty TypeExpr?
	([$]) => $.returnTypeDecl instanceof ast.TypeExpr,
	([$]) => $.returnTypeDecl !== ast.TypeExpr.Empty,
	hasEmptyFuncBody
)

test<ast.FuncDecl>(
	'func alpha(a)',
	([$]) => $ instanceof ast.FuncDecl,
	([$]) => $.name.rawValue === 'alpha',
	hasEmptyReturnTypeDecl,
	hasEmptyFuncBody,
	hasOwnParamDeclList,
	([$]) => assertRuntimeParam($, 0, 'a', false)
)

test<ast.FuncDecl>(
	'func alpha(a, b)',
	([$]) => $ instanceof ast.FuncDecl,
	([$]) => $.name.rawValue === 'alpha',
	hasEmptyReturnTypeDecl,
	hasEmptyFuncBody,
	hasOwnParamDeclList,
	([$]) => assertRuntimeParam($, 0, 'a', false),
	([$]) => assertRuntimeParam($, 1, 'b', false)
)

test<ast.FuncDecl>(
	'func alpha(a: Type)',
	([$]) => $ instanceof ast.FuncDecl,
	([$]) => $.name.rawValue === 'alpha',
	hasEmptyReturnTypeDecl,
	hasEmptyFuncBody,
	hasOwnParamDeclList,
	([$]) => assertRuntimeParam($, 0, 'a', true)
)

test<ast.FuncDecl>(
	'func alpha(a: Type, b: Type)',
	([$]) => $ instanceof ast.FuncDecl,
	([$]) => $.name.rawValue === 'alpha',
	hasEmptyReturnTypeDecl,
	hasEmptyFuncBody,
	hasOwnParamDeclList,
	([$]) => assertRuntimeParam($, 0, 'a', true),
	([$]) => assertRuntimeParam($, 1, 'b', true)
)

test<ast.FuncDecl>(
	'func alpha(a, b: Type)',
	([$]) => $ instanceof ast.FuncDecl,
	([$]) => $.name.rawValue === 'alpha',
	hasEmptyReturnTypeDecl,
	hasEmptyFuncBody,
	hasOwnParamDeclList,
	([$]) => assertRuntimeParam($, 0, 'a', false),
	([$]) => assertRuntimeParam($, 1, 'b', true)
)

test<ast.FuncDecl>(
	'func alpha(a: Type, b)',
	([$]) => $ instanceof ast.FuncDecl,
	([$]) => $.name.rawValue === 'alpha',
	hasEmptyReturnTypeDecl,
	hasEmptyFuncBody,
	hasOwnParamDeclList,
	([$]) => assertRuntimeParam($, 0, 'a', true),
	([$]) => assertRuntimeParam($, 1, 'b', false)
)

test<ast.FuncDecl>(
	'func alpha(a: Type, b: Type, abc)',
	([$]) => $ instanceof ast.FuncDecl,
	([$]) => $.name.rawValue === 'alpha',
	hasEmptyReturnTypeDecl,
	hasEmptyFuncBody,
	hasOwnParamDeclList,
	([$]) => assertRuntimeParam($, 0, 'a', true),
	([$]) => assertRuntimeParam($, 1, 'b', true),
	([$]) => assertRuntimeParam($, 2, 'abc', false)
)

test<ast.FuncDecl>(
	'func alpha(a: Type, b, abc: Type)',
	([$]) => $ instanceof ast.FuncDecl,
	([$]) => $.name.rawValue === 'alpha',
	hasEmptyReturnTypeDecl,
	hasEmptyFuncBody,
	hasOwnParamDeclList,
	([$]) => assertRuntimeParam($, 0, 'a', true),
	([$]) => assertRuntimeParam($, 1, 'b', false),
	([$]) => assertRuntimeParam($, 2, 'abc', true)
)


test<ast.FuncDecl>(
	[
		'func alpha(a: Type, b, abc: Type)',
		'func beta(a: Type, b, abc: Type)'
	].join('\n'),
	// 1st func
	([$]) => $ instanceof ast.FuncDecl,
	([$]) => $.name.rawValue === 'alpha',
	hasEmptyReturnTypeDecl,
	hasEmptyFuncBody,
	hasOwnParamDeclList,
	([$]) => assertRuntimeParam($, 0, 'a', true),
	([$]) => assertRuntimeParam($, 1, 'b', false),
	([$]) => assertRuntimeParam($, 2, 'abc', true),
	// 2nd func
	([, $]) => $ instanceof ast.FuncDecl,
	([, $]) => $.name.rawValue === 'beta',
	([, $]) => hasEmptyReturnTypeDecl([$]),
	([, $]) => hasEmptyFuncBody([$]),
	([, $]) => hasOwnParamDeclList([$]),
	([, $]) => assertRuntimeParam($, 0, 'a', true),
	([, $]) => assertRuntimeParam($, 1, 'b', false),
	([, $]) => assertRuntimeParam($, 2, 'abc', true)
)


test<ast.FuncDecl>(
	[
		'func alpha(a: Type, b, abc: Type) {}',
		'func beta(a: Type, b, abc: Type) { }'
	].join('\n'),
	// 1st func
	([$]) => $ instanceof ast.FuncDecl,
	([$]) => $.name.rawValue === 'alpha',
	hasEmptyReturnTypeDecl,
	hasEmptyFuncBody,
	hasOwnParamDeclList,
	([$]) => assertRuntimeParam($, 0, 'a', true),
	([$]) => assertRuntimeParam($, 1, 'b', false),
	([$]) => assertRuntimeParam($, 2, 'abc', true),
	// 2nd func
	([, $]) => $ instanceof ast.FuncDecl,
	([, $]) => $.name.rawValue === 'beta',
	([, $]) => hasEmptyReturnTypeDecl([$]),
	([, $]) => hasEmptyFuncBody([$]),
	([, $]) => hasOwnParamDeclList([$]),
	([, $]) => assertRuntimeParam($, 0, 'a', true),
	([, $]) => assertRuntimeParam($, 1, 'b', false),
	([, $]) => assertRuntimeParam($, 2, 'abc', true)
)


test<ast.FuncDecl>(
	[
		'func alpha(a: Type, b, abc: Type) -> Type',
		'func beta(a: Type, b, abc: Type) -> Type'
	].join('\n'),
	// 1st func
	([$]) => $ instanceof ast.FuncDecl,
	([$]) => $.name.rawValue === 'alpha',
	hasOwnReturnTypeDecl,
	hasEmptyFuncBody,
	hasOwnParamDeclList,
	([$]) => assertRuntimeParam($, 0, 'a', true),
	([$]) => assertRuntimeParam($, 1, 'b', false),
	([$]) => assertRuntimeParam($, 2, 'abc', true),
	// 2nd func
	([, $]) => $ instanceof ast.FuncDecl,
	([, $]) => $.name.rawValue === 'beta',
	([, $]) => hasOwnReturnTypeDecl([$]),
	([, $]) => hasEmptyFuncBody([$]),
	([, $]) => hasOwnParamDeclList([$]),
	([, $]) => assertRuntimeParam($, 0, 'a', true),
	([, $]) => assertRuntimeParam($, 1, 'b', false),
	([, $]) => assertRuntimeParam($, 2, 'abc', true)
)
