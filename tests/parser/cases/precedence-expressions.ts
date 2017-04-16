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
	// wrap the source code in a func decl so we can parse it
	sourceCode = `func __wrapper__() { ${sourceCode} }`
	// wrap the assertion functions so that they receive the first node of the wrapper function's
	// body as their parameter
	const assertions = expectation.map(fn => {
		return ([decl]: ast.FuncDecl[]) => {
			// The parser wraps conditional statements in another statement.
			// We unwrap that statement here and pass its nodes into the assertion function.
			const wrapperStatement = (<ast.Statement>decl.body.nodes[0])
			if (fn(<TNodes>wrapperStatement.nodes)) {
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


function isInstanceOf<T>(obj: T, constructor: Function | ({ new (...args: any[]): T; name?: string })) {
	if (obj instanceof (<Function>constructor)) {
		return true
	}
	throw new Error(`instanceof assertion failed: expected ${constructor.name}, got ${obj.constructor.name}`)
}


///
/// Test Cases:
///



/// Primary Expressions:

test<[ast.PrecedenceExpr<ast.NumericExpr>]>(
	`(1)`,
	([$]) => isInstanceOf($, ast.PrecedenceExpr),
	([$]) => isInstanceOf($.expr, ast.NumericExpr)
)

test<[ast.PrecedenceExpr<ast.StringLiteral>]>(
	`("")`,
	([$]) => isInstanceOf($, ast.PrecedenceExpr),
	([$]) => isInstanceOf($.expr, ast.StringLiteral),
	([$]) => $.expr.contentToken.rawValue === ''
)

test<[ast.PrecedenceExpr<ast.StringLiteral>]>(
	`("abc")`,
	([$]) => isInstanceOf($, ast.PrecedenceExpr),
	([$]) => isInstanceOf($.expr, ast.StringLiteral),
	([$]) => $.expr.contentToken.rawValue === 'abc'
)

test<[ast.PrecedenceExpr<ast.Identifier>]>(
	`(a)`,
	([$]) => isInstanceOf($, ast.PrecedenceExpr),
	([$]) => isInstanceOf($.expr, ast.Identifier)
)



/// Unary Operations:

test<[ast.PrecedenceExpr<ast.UnaryOperation>]>(
	`(a++)`,
	([$]) => isInstanceOf($, ast.PrecedenceExpr),
	([$]) => isInstanceOf($.expr, ast.UnaryOperation),
	([$]) => isInstanceOf($.expr.operand, ast.Identifier),
	([$]) => $.expr.operatorPosition === ast.UnaryOperatorPosition.Postfix
)

test<[ast.PrecedenceExpr<ast.UnaryOperation>]>(
	`(++a)`,
	([$]) => isInstanceOf($, ast.PrecedenceExpr),
	([$]) => isInstanceOf($.expr, ast.UnaryOperation),
	([$]) => isInstanceOf($.expr.operand, ast.Identifier),
	([$]) => $.expr.operatorPosition === ast.UnaryOperatorPosition.Prefix
)



/// Binary Operations:

test<[ast.PrecedenceExpr<ast.BinaryOperation>]>(
	`(a * b)`,
	([$]) => isInstanceOf($, ast.PrecedenceExpr),
	([$]) => isInstanceOf($.expr, ast.BinaryOperation)
)

test<[ast.BinaryOperation]>(
	`(a + b) * 123`,
	([$]) => isInstanceOf($, ast.BinaryOperation),
	([$]) => isInstanceOf($.leftOperand, ast.PrecedenceExpr),
	([$]) => {
		const nestedOperation =
			<ast.PrecedenceExpr<ast.BinaryOperation>>$.leftOperand
		return nestedOperation instanceof ast.PrecedenceExpr
	},
	([$]) => {
		const nestedOperation =
			<ast.PrecedenceExpr<ast.BinaryOperation>>$.leftOperand
		return nestedOperation.expr instanceof ast.BinaryOperation
	}
)

test<[ast.BinaryOperation]>(
	`2 / (a + b)`,
	([$]) => isInstanceOf($, ast.BinaryOperation),
	([$]) => isInstanceOf($.rightOperand, ast.PrecedenceExpr),
	([$]) => {
		const nestedOperation =
			<ast.PrecedenceExpr<ast.BinaryOperation>>$.rightOperand
		return nestedOperation instanceof ast.PrecedenceExpr
	},
	([$]) => {
		const nestedOperation =
			<ast.PrecedenceExpr<ast.BinaryOperation>>$.rightOperand
		return nestedOperation.expr instanceof ast.BinaryOperation
	}
)



/// Assignment Expressions:

test<[ast.PrecedenceExpr<ast.BinaryOperation>]>(
	`(a = b)`,
	([$]) => isInstanceOf($, ast.PrecedenceExpr),
	([$]) => isInstanceOf($.expr, ast.BinaryOperation)
)

test<[ast.BinaryOperation]>(
	`a = (b = c)`,
	([$]) => isInstanceOf($, ast.BinaryOperation),
	([$]) => isInstanceOf($.rightOperand, ast.PrecedenceExpr),
	([$]) => {
		const nestedOperation =
			<ast.PrecedenceExpr<ast.BinaryOperation>>$.rightOperand
		return nestedOperation instanceof ast.PrecedenceExpr
	},
	([$]) => {
		const nestedOperation =
			<ast.PrecedenceExpr<ast.BinaryOperation>>$.rightOperand
		return nestedOperation.expr instanceof ast.BinaryOperation
	}
)

test<[ast.BinaryOperation]>(
	`a *= (b += c)`,
	([$]) => isInstanceOf($, ast.BinaryOperation),
	([$]) => isInstanceOf($.rightOperand, ast.PrecedenceExpr),
	([$]) => {
		const nestedOperation =
			<ast.PrecedenceExpr<ast.BinaryOperation>>$.rightOperand
		return nestedOperation instanceof ast.PrecedenceExpr
	},
	([$]) => {
		const nestedOperation =
			<ast.PrecedenceExpr<ast.BinaryOperation>>$.rightOperand
		return nestedOperation.expr instanceof ast.BinaryOperation
	}
)
