import * as ast from '@/compiler/ast'
import ParserTestCase from '../ParserTestCase'

export const cases: ParserTestCase[] = []
export default cases

function test<TNode extends ast.BaseNode>(
	sourceCode: string,
	...expectation: Array<(node: TNode) => boolean>
): void {
	const name = sourceCode
	cases.push(ParserTestCase.create(name, sourceCode, ...expectation))
}

///
/// Test Cases
///

test<ast.FuncDecl>(
	'func alpha()',
	$ => $ instanceof ast.FuncDecl,
	$ => $.name.rawValue === 'alpha'
)

test<ast.FuncDecl>(
	'func alpha() { }',
	$ => $ instanceof ast.FuncDecl,
	$ => $.name.rawValue === 'alpha'
)

test<ast.FuncDecl>(
	'func alpha(): typename',
	$ => $ instanceof ast.FuncDecl,
	$ => $.name.rawValue === 'alpha'
)

test<ast.FuncDecl>(
	'func alpha(): typename { }',
	$ => $ instanceof ast.FuncDecl,
	$ => $.name.rawValue === 'alpha'
)
