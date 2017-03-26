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


test<ast.Comment>(
	'// Comment on a single line',
	$ => $ instanceof ast.Comment,
	$ => /Comment on a single line/.test($.lines[0].rawValue)
)


test<ast.FuncDecl>(
	`
	func someName() -> Void {
		// Comment on a single line inside a function
	}
	`,
	$ => $ instanceof ast.FuncDecl,
	$ => $.body.getNodeAtIndex(0) instanceof ast.Comment,
	$ => /Comment on a single line inside a function/.test(
		(<ast.Comment>$.body.getNodeAtIndex(0)).lines[0].rawValue
	)
)


test<ast.Comment>(
	`
	// A comment on
	// multiple lines
	`,
	$ => $ instanceof ast.Comment,
	$ => /A comment on/.test($.lines[0].rawValue)
)

