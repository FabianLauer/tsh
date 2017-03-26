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

const binaryOperators = [
	'+', '-', '*', '/', '%'
]

for (const operator of binaryOperators) {
	test<ast.Expr>(
		`a + b`,
		([$]) => $ instanceof ast.Expr
	)

	test<ast.Expr>(
		`a ${operator}= b`,
		([$]) => $ instanceof ast.Expr
	)
}


/// Unary Operators:

const unaryOperators = ['++', '--']

for (const operator of unaryOperators) {
	test<ast.Expr>(
		`a${operator}`,
		([$]) => $ instanceof ast.Expr
	)


	test<ast.Expr>(
		`${operator}a`,
		([$]) => $ instanceof ast.Expr
	)
}

