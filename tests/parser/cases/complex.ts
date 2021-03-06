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
/// Test Cases:
///


test<ast.FuncDecl>(
	`
	func alpha() {
		let foo = 1
	}
	`,
	([$]) => $ instanceof ast.FuncDecl
)


test<ast.FuncDecl>(
	`
	func alpha() {
		let foo = 1
		const bar = 2
	}
	`,
	([$]) => $ instanceof ast.FuncDecl
)


test<ast.FuncDecl>(
	`
	func beta(bar: Int) -> Int {
		let foo = bar
		const fibo = nacci
	}
	`,
	([$]) => $ instanceof ast.FuncDecl
)


test<ast.FuncDecl>(
	`
	func gamma(bar: Int) -> Void {
		foo += bar
	}
	`,
	([$]) => $ instanceof ast.FuncDecl
)


test<ast.FuncDecl>(
	`
	func gamma(bar: Int) -> Void {
		return foo
		foo += bar
	}
	`,
	([$]) => $ instanceof ast.FuncDecl
)


test<ast.FuncDecl>(
	`
	func gamma(bar: Int) -> Void {
		let foo = bar
		foo += bar
		const fibo = foo++
		foo += bar * fibo
		return foo
	}
	`,
	([$]) => $ instanceof ast.FuncDecl
)


test<ast.FuncDecl>(
	`
	// Comment 
	func test()
	`,
	() => true
)


test<ast.FuncDecl>(
	'// Comment with code: func test()',
	() => true
)


test<ast.FuncDecl>(
	`
	// A test with a bunch of ...
		//   ... different comments.
	// 
	func beta(bar: Int) -> Int {
		// comment inside the func
		// // // 
	}
	`,
	() => true
)
