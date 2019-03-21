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


function isInstanceOf<T>(obj: T, constructor: Function | ({ new(...args: any[]): T; name?: string })) {
	if (obj instanceof (<Function>constructor)) {
		return true
	}
	throw new Error(`instanceof assertion failed: expected ${constructor.name}, got ${obj.constructor.name}`)
}


///
/// Test Cases:
///

test<ast.TryCatchStatement>(
	`try { } catch { }`,
	([$]) => isInstanceOf($, ast.TryCatchStatement),
	([$]) => isInstanceOf($.attemptStatement, ast.Statement),
	([$]) => isInstanceOf($.errorHandlerStatement, ast.Statement),
	([$]) => !$.errorIdentifier
)

test<ast.TryCatchStatement>(
	`try { } catch as error { }`,
	([$]) => isInstanceOf($, ast.TryCatchStatement),
	([$]) => isInstanceOf($.attemptStatement, ast.Statement),
	([$]) => isInstanceOf($.errorHandlerStatement, ast.Statement),
	([$]) => isInstanceOf($.errorIdentifier, ast.Identifier),
	([$]) => $.errorIdentifier!.name.rawValue === 'error'
)

test<ast.TryCatchStatement>(
	`try thing() catch handleError()`,
	([$]) => isInstanceOf($, ast.TryCatchStatement),
	([$]) => isInstanceOf($.attemptStatement, ast.Statement),
	([$]) => isInstanceOf($.errorHandlerStatement, ast.Statement),
	([$]) => !$.errorIdentifier
)

test<ast.TryCatchStatement>(
	`try thing() catch as e handleError(e)`,
	([$]) => isInstanceOf($, ast.TryCatchStatement),
	([$]) => isInstanceOf($.attemptStatement, ast.Statement),
	([$]) => isInstanceOf($.errorHandlerStatement, ast.Statement),
	([$]) => isInstanceOf($.errorIdentifier, ast.Identifier),
	([$]) => $.errorIdentifier!.name.rawValue === 'e'
)
