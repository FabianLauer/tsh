import * as ast from '@/compiler/ast'
import ParserTestCase from '../ParserTestCase'

export const cases: ParserTestCase[] = []
export default cases

function test(
	name: string,
	sourceCode: string = name,
	...expectation: Array<{ new (...args: any[]): ast.BaseNode }>
): void {
	if (name === sourceCode) {
		name = `'${name}'`
	}
	cases.push(ParserTestCase.create(name, sourceCode, ...expectation))
}

///
/// Test Cases
///

test(
	'func alpha()',
	undefined, ast.FuncDecl
)

test(
	'func alpha() { }',
	undefined, ast.FuncDecl
)

test(
	'func alpha(): void',
	undefined, ast.FuncDecl
)

test(
	'func alpha(): void { }',
	undefined, ast.FuncDecl
)
