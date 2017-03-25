import * as ast from '@/compiler/ast'

type IConstructor<T> = { new (...args: any[]): T }

export class ParserTestCase {
	private constructor(
		public readonly sourceCode: string,
		public readonly expectation: Array<IConstructor<ast.BaseNode>>
	) { }

	public static create(sourceCode: string, ...expectation: Array<IConstructor<ast.BaseNode>>) {
		return new ParserTestCase(sourceCode, expectation)
	}
}

export default ParserTestCase
