import * as ast from '@/compiler/ast'
import ParserTestCase from '../ParserTestCase'

export const cases: ParserTestCase[] = []
export default cases

function test<TNode extends ast.BaseNode>(
	name: string,
	sourceCode: string = name,
	...expectation: Array<(node: TNode) => boolean>
): void {
	if (name === sourceCode) {
		name = `'${name}'`
	}
	cases.push(ParserTestCase.create(name, sourceCode, ...expectation))
}

///
/// Test Cases
///

test<ast.FuncDecl>(
	'func alpha()',
	undefined,
	$ => $ instanceof ast.FuncDecl,
	$ => $.name.rawValue === 'alpha'
)

test<ast.FuncDecl>(
	'func alpha() { }',
	undefined,
	$ => $ instanceof ast.FuncDecl,
	$ => $.name.rawValue === 'alpha'
)

test<ast.FuncDecl>(
	'func alpha(): typename',
	undefined,
	$ => $ instanceof ast.FuncDecl,
	$ => $.name.rawValue === 'alpha'
)

test<ast.FuncDecl>(
	'func alpha(): typename { }',
	undefined,
	$ => $ instanceof ast.FuncDecl,
	$ => $.name.rawValue === 'alpha'
)
