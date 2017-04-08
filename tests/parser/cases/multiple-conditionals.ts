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
	...expectation: Array<(node: TNodes[]) => boolean>
): void {
	const testName = sourceCode
	// wrap the source code in a func decl so we can parse it
	sourceCode = `func __wrapper__() { ${sourceCode} }`
	// wrap the assertion functions so that they receive the first node of the wrapper function's
	// body as their parameter
	const assertions = expectation.map(fn => {
		return ([decl]: ast.FuncDecl[]) => {
			// The parser wraps conditional statements in another statement.
			// We unwrap these statement here and pass their nodes into the assertion function.
			const nodes = (<ast.Statement[]>decl.body.nodes).map(stm => <TNodes>stm.nodes)
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


function isInstanceOf<T>(obj: T, constructor: Function | ({ new(...args: any[]): T; name?: string })) {
	if (obj instanceof (<Function>constructor)) {
		return true
	}
	throw new Error(`instanceof assertion failed: expected ${constructor.name}, got ${obj.constructor.name}`)
}


///
/// Test Cases:
///

test<ast.IfStatement[]>(
	`
	if variable { }
	if variable { }
	`,
	([first]) => isInstanceOf(first[0], ast.IfStatement),
	([, second]) => isInstanceOf(second[0], ast.IfStatement)
)


test<[ast.IfStatement, ast.ElseStatement]>(
	`
	if variable { } else { }
	if variable { } else { }
	`,
	([first]) => isInstanceOf(first[0], ast.IfStatement),
	([first]) => isInstanceOf(first[1], ast.ElseStatement),
	([, second]) => isInstanceOf(second[0], ast.IfStatement),
	([, second]) => isInstanceOf(second[1], ast.ElseStatement)
)


test<[ast.IfStatement, ast.ElseIfStatement]>(
	`
	if variable { } else if { }
	if variable { } else if { }
	`,
	([first]) => isInstanceOf(first[0], ast.IfStatement),
	([first]) => isInstanceOf(first[1], ast.ElseIfStatement),
	([, second]) => isInstanceOf(second[0], ast.IfStatement),
	([, second]) => isInstanceOf(second[1], ast.ElseIfStatement)
)


test<[ast.IfStatement, ast.ElseIfStatement, ast.ElseIfStatement]>(
	`
	if variable { } else if { } else if { }
	if variable { } else if { } else if { }
	`,
	([first]) => isInstanceOf(first[0], ast.IfStatement),
	([first]) => isInstanceOf(first[1], ast.ElseIfStatement),
	([first]) => isInstanceOf(first[2], ast.ElseIfStatement),
	([, second]) => isInstanceOf(second[0], ast.IfStatement),
	([, second]) => isInstanceOf(second[1], ast.ElseIfStatement),
	([, second]) => isInstanceOf(second[2], ast.ElseIfStatement)
)


test<[ast.IfStatement, ast.ElseIfStatement, ast.ElseStatement]>(
	`
	if variable { } else if { } else { }
	if variable { } else if { } else { }
	`,
	([first]) => isInstanceOf(first[0], ast.IfStatement),
	([first]) => isInstanceOf(first[1], ast.ElseIfStatement),
	([first]) => isInstanceOf(first[2], ast.ElseStatement),
	([, second]) => isInstanceOf(second[0], ast.IfStatement),
	([, second]) => isInstanceOf(second[1], ast.ElseIfStatement),
	([, second]) => isInstanceOf(second[2], ast.ElseStatement)
)
