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


///
/// Test Cases:
///


/// String Literals:

// empty string literal
test<ast.ExprStatement<ast.StringLiteral>>(
	`""`,
	([$]) => isInstanceOf($, ast.ExprStatement),
	([$]) => isInstanceOf($.expression, ast.StringLiteral),
	([$]) => $.expression.contentToken.rawValue === ''
)

test<ast.ExprStatement<ast.StringLiteral>>(
	`"a"`,
	([$]) => isInstanceOf($, ast.ExprStatement),
	([$]) => isInstanceOf($.expression, ast.StringLiteral),
	([$]) => $.expression.contentToken.rawValue === 'a'
)

test<ast.ExprStatement<ast.StringLiteral>>(
	`"A"`,
	([$]) => isInstanceOf($, ast.ExprStatement),
	([$]) => isInstanceOf($.expression, ast.StringLiteral),
	([$]) => $.expression.contentToken.rawValue === 'A'
)

test<ast.ExprStatement<ast.StringLiteral>>(
	`"abcdefg"`,
	([$]) => isInstanceOf($, ast.ExprStatement),
	([$]) => isInstanceOf($.expression, ast.StringLiteral),
	([$]) => $.expression.contentToken.rawValue === 'abcdefg'
)

test<ast.ExprStatement<ast.StringLiteral>>(
	`"ABCDE"`,
	([$]) => isInstanceOf($, ast.ExprStatement),
	([$]) => isInstanceOf($.expression, ast.StringLiteral),
	([$]) => $.expression.contentToken.rawValue === 'ABCDE'
)

test<ast.ExprStatement<ast.StringLiteral>>(
	`"0123456789"`,
	([$]) => isInstanceOf($, ast.ExprStatement),
	([$]) => isInstanceOf($.expression, ast.StringLiteral),
	([$]) => $.expression.contentToken.rawValue === '0123456789'
)



/// Numeric Expressions:

for (let i = 0; i <= 10; i++) {
	test<ast.ExprStatement<any>>(
		`${i}`,
		([$]) => isInstanceOf($, ast.ExprStatement),
		([$]) => isInstanceOf($.expression, ast.NumericExpr)
	)

	test<ast.ExprStatement<any>>(
		`${i}.${i * 0.1234}`,
		([$]) => isInstanceOf($, ast.ExprStatement),
		([$]) => isInstanceOf($.expression, ast.NumericExpr)
	)
}
