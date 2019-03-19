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
function test<TNode extends ast.Expr>(
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
			// unwrap the function body's root level AST nodes, which, in this file, are solely
			// expression statements
			const statements = <Array<ast.ExprStatement<TNode>>>decl.body.nodes
			const nodes = statements.map(_ => _.expression)
			if (fn(nodes)) {
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


function hasEmptyFuncBody([funcDecl]: ast.AnonFuncDecl[]) {
	return isEmptyStatement(funcDecl.body)
}


function hasOwnParamDeclList([funcDecl]: ast.AnonFuncDecl[]) {
	return (
		funcDecl.runtimeParamDecls instanceof ast.ParamDeclList &&
		funcDecl.runtimeParamDecls !== ast.ParamDeclList.Empty
	)
}


function getRuntimeParamAtIndex(funcDecl: ast.AnonFuncDecl, paramIndex: number) {
	return funcDecl.runtimeParamDecls.getParamAtIndex(paramIndex)
}


function assertRuntimeParam(
	funcDecl: ast.AnonFuncDecl,
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


function hasEmptyReturnTypeDecl([funcDecl]: ast.AnonFuncDecl[]) {
	return funcDecl.returnTypeDecl === ast.TypeExpr.Empty
}



///
/// Test Cases:
///

test<ast.AnonFuncDecl>(
	'func()',
	([$]) => $ instanceof ast.AnonFuncDecl,
	([$]) => $.returnTypeDecl === ast.TypeExpr.Empty,
	hasEmptyFuncBody
)

test<ast.AnonFuncDecl>(
	'func() { }',
	([$]) => $ instanceof ast.AnonFuncDecl,
	([$]) => $.returnTypeDecl === ast.TypeExpr.Empty,
	hasEmptyFuncBody
)

test<ast.AnonFuncDecl>(
	'func() -> Type',
	([$]) => $ instanceof ast.AnonFuncDecl,
	// Is the return type name a TypeExpr, but not the Empty TypeExpr?
	([$]) => $.returnTypeDecl instanceof ast.TypeExpr,
	([$]) => $.returnTypeDecl !== ast.TypeExpr.Empty,
	hasEmptyFuncBody
)

test<ast.AnonFuncDecl>(
	'func() -> Type { }',
	([$]) => $ instanceof ast.AnonFuncDecl,
	// Is the return type name a TypeExpr, but not the Empty TypeExpr?
	([$]) => $.returnTypeDecl instanceof ast.TypeExpr,
	([$]) => $.returnTypeDecl !== ast.TypeExpr.Empty,
	hasEmptyFuncBody
)

test<ast.AnonFuncDecl>(
	'func(a)',
	([$]) => $ instanceof ast.AnonFuncDecl,
	hasEmptyReturnTypeDecl,
	hasEmptyFuncBody,
	hasOwnParamDeclList,
	([$]) => assertRuntimeParam($, 0, 'a', false)
)

test<ast.AnonFuncDecl>(
	'func(a, b)',
	([$]) => $ instanceof ast.AnonFuncDecl,
	hasEmptyReturnTypeDecl,
	hasEmptyFuncBody,
	hasOwnParamDeclList,
	([$]) => assertRuntimeParam($, 0, 'a', false),
	([$]) => assertRuntimeParam($, 1, 'b', false)
)

test<ast.AnonFuncDecl>(
	'func (a: Type)',
	([$]) => $ instanceof ast.AnonFuncDecl,
	hasEmptyReturnTypeDecl,
	hasEmptyFuncBody,
	hasOwnParamDeclList,
	([$]) => assertRuntimeParam($, 0, 'a', true)
)

test<ast.AnonFuncDecl>(
	'func (a: Type, b: Type)',
	([$]) => $ instanceof ast.AnonFuncDecl,
	hasEmptyReturnTypeDecl,
	hasEmptyFuncBody,
	hasOwnParamDeclList,
	([$]) => assertRuntimeParam($, 0, 'a', true),
	([$]) => assertRuntimeParam($, 1, 'b', true)
)

test<ast.AnonFuncDecl>(
	'func(a, b: Type)',
	([$]) => $ instanceof ast.AnonFuncDecl,
	hasEmptyReturnTypeDecl,
	hasEmptyFuncBody,
	hasOwnParamDeclList,
	([$]) => assertRuntimeParam($, 0, 'a', false),
	([$]) => assertRuntimeParam($, 1, 'b', true)
)

test<ast.AnonFuncDecl>(
	'func (a: Type, b)',
	([$]) => $ instanceof ast.AnonFuncDecl,
	hasEmptyReturnTypeDecl,
	hasEmptyFuncBody,
	hasOwnParamDeclList,
	([$]) => assertRuntimeParam($, 0, 'a', true),
	([$]) => assertRuntimeParam($, 1, 'b', false)
)

test<ast.AnonFuncDecl>(
	'func (a: Type, b: Type, abc)',
	([$]) => $ instanceof ast.AnonFuncDecl,
	hasEmptyReturnTypeDecl,
	hasEmptyFuncBody,
	hasOwnParamDeclList,
	([$]) => assertRuntimeParam($, 0, 'a', true),
	([$]) => assertRuntimeParam($, 1, 'b', true),
	([$]) => assertRuntimeParam($, 2, 'abc', false)
)

test<ast.AnonFuncDecl>(
	'func(a: Type, b, abc: Type)',
	([$]) => $ instanceof ast.AnonFuncDecl,
	hasEmptyReturnTypeDecl,
	hasEmptyFuncBody,
	hasOwnParamDeclList,
	([$]) => assertRuntimeParam($, 0, 'a', true),
	([$]) => assertRuntimeParam($, 1, 'b', false),
	([$]) => assertRuntimeParam($, 2, 'abc', true)
)

test<ast.PrecedenceExpr<ast.AnonFuncDecl>>(
	'(func(a: Type, b, abc: Type))',
	([$]) => $ instanceof ast.PrecedenceExpr,
	([$]) => $.expr instanceof ast.AnonFuncDecl,
	([$]) => hasEmptyReturnTypeDecl([$.expr]),
	([$]) => hasEmptyFuncBody([$.expr]),
	([$]) => hasOwnParamDeclList([$.expr]),
	([$]) => assertRuntimeParam($.expr, 0, 'a', true),
	([$]) => assertRuntimeParam($.expr, 1, 'b', false),
	([$]) => assertRuntimeParam($.expr, 2, 'abc', true)
)
