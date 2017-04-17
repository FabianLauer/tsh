///
/// Imports:
///

import * as ast from '@/compiler/ast'
import { getLowercaseAlphabet } from '@/utils'
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


function isInstanceOf<T>(obj: T, constructor: { new (...args: any[]): T; name?: string }) {
	if (obj instanceof constructor) {
		return true
	}
	throw new Error(`instanceof assertion failed: expected ${constructor.name}, got ${obj.constructor.name}`)
}


///
/// Test Cases:
///

for (let i = 1; i < 25; i++) {
	const numExprs = i + 1

	/// Numeric Literals

	const integers = ('|'.repeat(numExprs - 1).split('|')).map((_, index) => index + 1)
	const integerCode = integers.join(', ')

	// 1, 2, 3, ...
	test<ast.ExprStatement<ast.ExprList<ast.NumericExpr[]>>>(
		integerCode,
		([$]) => isInstanceOf($, ast.ExprStatement),
		([$]) => isInstanceOf($.expression, ast.ExprList),
		([$]) => $.expression.expressions.length === numExprs,
		([$]) => -1 === $.expression.expressions.findIndex(expr => !(expr instanceof ast.NumericExpr))
	)

	// (1, 2, 3, ...)
	test<ast.ExprStatement<ast.PrecedenceExpr<ast.ExprList<ast.NumericExpr[]>>>>(
		`(${integerCode})`,
		([$]) => isInstanceOf($, ast.ExprStatement),
		([$]) => isInstanceOf($.expression, ast.PrecedenceExpr),
		([$]) => isInstanceOf($.expression.expr, ast.ExprList),
		([$]) => $.expression.expr.expressions.length === numExprs,
		([$]) => -1 === $.expression.expr.expressions.findIndex(expr => !(expr instanceof ast.NumericExpr))
	)

	// a + (1, 2, 3, ...)
	test<ast.ExprStatement<ast.BinaryOperation>>(
		`a + (${integers})`,
		([$]) => isInstanceOf($, ast.ExprStatement),
		([$]) => isInstanceOf($.expression, ast.BinaryOperation),
		([$]) => isInstanceOf($.expression.rightOperand, ast.PrecedenceExpr),
		([$]) => {
			const rightOperand = (<ast.PrecedenceExpr<any>>$.expression.rightOperand)
			const list = (<ast.ExprList<ast.NumericExpr[]>>rightOperand.expr)
			return list.expressions.length === numExprs
		},
		([$]) => {
			const rightOperand = (<ast.PrecedenceExpr<any>>$.expression.rightOperand)
			const list = (<ast.ExprList<ast.NumericExpr[]>>rightOperand.expr)
			return -1 === list.expressions.findIndex(expr => !(expr instanceof ast.NumericExpr))
		}
	)

	// a = (1, 2, 3, ...)
	test<ast.ExprStatement<ast.BinaryOperation>>(
		`a = (${integers})`,
		([$]) => isInstanceOf($, ast.ExprStatement),
		([$]) => isInstanceOf($.expression, ast.BinaryOperation),
		([$]) => isInstanceOf($.expression.rightOperand, ast.PrecedenceExpr),
		([$]) => {
			const rightOperand = (<ast.PrecedenceExpr<any>>$.expression.rightOperand)
			const list = (<ast.ExprList<ast.NumericExpr[]>>rightOperand.expr)
			return list.expressions.length === numExprs
		},
		([$]) => {
			const rightOperand = (<ast.PrecedenceExpr<any>>$.expression.rightOperand)
			const list = (<ast.ExprList<ast.NumericExpr[]>>rightOperand.expr)
			return -1 === list.expressions.findIndex(expr => !(expr instanceof ast.NumericExpr))
		}
	)


	/// String Literals

	const stringLiterals = getLowercaseAlphabet()
		.slice(0, numExprs)
		.map(_ => `"${_}"`)
		.join(', ')

	// "a", "b", "c", ...
	test<ast.ExprStatement<ast.ExprList<ast.StringLiteral[]>>>(
		stringLiterals,
		([$]) => isInstanceOf($, ast.ExprStatement),
		([$]) => isInstanceOf($.expression, ast.ExprList),
		([$]) => $.expression.expressions.length === numExprs,
		([$]) => -1 === $.expression.expressions.findIndex(expr => !(expr instanceof ast.StringLiteral))
	)

	// ("a", "b", "c", ...)
	test<ast.ExprStatement<ast.PrecedenceExpr<ast.ExprList<ast.StringLiteral[]>>>>(
		`(${stringLiterals})`,
		([$]) => isInstanceOf($, ast.ExprStatement),
		([$]) => isInstanceOf($.expression, ast.PrecedenceExpr),
		([$]) => isInstanceOf($.expression.expr, ast.ExprList),
		([$]) => $.expression.expr.expressions.length === numExprs,
		([$]) => -1 === $.expression.expr.expressions.findIndex(expr => !(expr instanceof ast.StringLiteral))
	)

	// a + ("a", "b", "c", ...)
	test<ast.ExprStatement<ast.BinaryOperation>>(
		`a + (${stringLiterals})`,
		([$]) => isInstanceOf($, ast.ExprStatement),
		([$]) => isInstanceOf($.expression, ast.BinaryOperation),
		([$]) => isInstanceOf($.expression.rightOperand, ast.PrecedenceExpr),
		([$]) => {
			const rightOperand = (<ast.PrecedenceExpr<any>>$.expression.rightOperand)
			const list = (<ast.ExprList<ast.StringLiteral[]>>rightOperand.expr)
			return list.expressions.length === numExprs
		},
		([$]) => {
			const rightOperand = (<ast.PrecedenceExpr<any>>$.expression.rightOperand)
			const list = (<ast.ExprList<ast.StringLiteral[]>>rightOperand.expr)
			return -1 === list.expressions.findIndex(expr => !(expr instanceof ast.StringLiteral))
		}
	)

	// a = ("a", "b", "c", ...)
	test<ast.ExprStatement<ast.BinaryOperation>>(
		`a = (${stringLiterals})`,
		([$]) => isInstanceOf($, ast.ExprStatement),
		([$]) => isInstanceOf($.expression, ast.BinaryOperation),
		([$]) => isInstanceOf($.expression.rightOperand, ast.PrecedenceExpr),
		([$]) => {
			const rightOperand = (<ast.PrecedenceExpr<any>>$.expression.rightOperand)
			const list = (<ast.ExprList<ast.StringLiteral[]>>rightOperand.expr)
			return list.expressions.length === numExprs
		},
		([$]) => {
			const rightOperand = (<ast.PrecedenceExpr<any>>$.expression.rightOperand)
			const list = (<ast.ExprList<ast.StringLiteral[]>>rightOperand.expr)
			return -1 === list.expressions.findIndex(expr => !(expr instanceof ast.StringLiteral))
		}
	)


	/// Identifiers

	const identifiers = getLowercaseAlphabet().slice(0, numExprs).join(', ')

	// a, b, c, ...
	test<ast.ExprStatement<ast.ExprList<ast.Identifier[]>>>(
		identifiers,
		([$]) => isInstanceOf($, ast.ExprStatement),
		([$]) => isInstanceOf($.expression, ast.ExprList),
		([$]) => $.expression.expressions.length === numExprs,
		([$]) => -1 === $.expression.expressions.findIndex(expr => !(expr instanceof ast.Identifier))
	)

	// (a, b, c, ...)
	test<ast.ExprStatement<ast.PrecedenceExpr<ast.ExprList<ast.Identifier[]>>>>(
		`(${identifiers})`,
		([$]) => isInstanceOf($, ast.ExprStatement),
		([$]) => isInstanceOf($.expression, ast.PrecedenceExpr),
		([$]) => isInstanceOf($.expression.expr, ast.ExprList),
		([$]) => $.expression.expr.expressions.length === numExprs,
		([$]) => -1 === $.expression.expr.expressions.findIndex(expr => !(expr instanceof ast.Identifier))
	)

	// a + (a, b, c, ...)
	test<ast.ExprStatement<ast.BinaryOperation>>(
		`a + (${identifiers})`,
		([$]) => isInstanceOf($, ast.ExprStatement),
		([$]) => isInstanceOf($.expression, ast.BinaryOperation),
		([$]) => isInstanceOf($.expression.rightOperand, ast.PrecedenceExpr),
		([$]) => {
			const rightOperand = (<ast.PrecedenceExpr<any>>$.expression.rightOperand)
			const list = (<ast.ExprList<ast.Identifier[]>>rightOperand.expr)
			return list.expressions.length === numExprs
		},
		([$]) => {
			const rightOperand = (<ast.PrecedenceExpr<any>>$.expression.rightOperand)
			const list = (<ast.ExprList<ast.Identifier[]>>rightOperand.expr)
			return -1 === list.expressions.findIndex(expr => !(expr instanceof ast.Identifier))
		}
	)

	// a = (a, b, c, ...)
	test<ast.ExprStatement<ast.BinaryOperation>>(
		`a = (${identifiers})`,
		([$]) => isInstanceOf($, ast.ExprStatement),
		([$]) => isInstanceOf($.expression, ast.BinaryOperation),
		([$]) => isInstanceOf($.expression.rightOperand, ast.PrecedenceExpr),
		([$]) => {
			const rightOperand = (<ast.PrecedenceExpr<any>>$.expression.rightOperand)
			const list = (<ast.ExprList<ast.Identifier[]>>rightOperand.expr)
			return list.expressions.length === numExprs
		},
		([$]) => {
			const rightOperand = (<ast.PrecedenceExpr<any>>$.expression.rightOperand)
			const list = (<ast.ExprList<ast.Identifier[]>>rightOperand.expr)
			return -1 === list.expressions.findIndex(expr => !(expr instanceof ast.Identifier))
		}
	)
}
