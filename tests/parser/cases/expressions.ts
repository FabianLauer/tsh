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

function isInstanceOfEither<T>(obj: T, ...constructors: Array<{ new (...args: any[]): T; name?: string }>) {
	for (const constructor of constructors) {
		try {
			if (isInstanceOf(obj, constructor)) {
				return true
			}
		} catch (err) {
			// ignore assertion error
		}
	}
	throw new Error(
		`instanceof assertion failed: expected ${constructors.map($ => $.name).join(' or ')}, got ${obj.constructor.name}`
	)
}


///
/// Test Cases:
///


/// Simple Assignments:

test<ast.Expr>(
	`a = 1`,
	([$]) => $ instanceof ast.Expr
)

test<ast.Expr>(
	`a = b`,
	([$]) => $ instanceof ast.Expr
)


/// Binary Operators:

let binaryOperators = [
	'+', '-', '*', '/', '%'
]

binaryOperators = binaryOperators.map(operator => `${operator}=`)

for (const operator of binaryOperators) {
	test<ast.Expr>(
		`a ${operator} b`,
		([$]) => isInstanceOfEither($, ast.BinaryOperation, ast.Expr)
	)
}


/// Unary Operators:

const unaryOperators = ['++', '--']

for (const operator of unaryOperators) {
	test<ast.Expr>(
		`a${operator}`,
		([$]) => isInstanceOfEither($, ast.UnaryOperation, ast.Expr)
	)


	test<ast.Expr>(
		`${operator}a`,
		([$]) => isInstanceOfEither($, ast.UnaryOperation, ast.Expr)
	)
}
