import * as ast from '@/compiler/ast'

type IConstructor<T> = { new (...args: any[]): T }

export class ParserTestCase {
	private constructor(
		public readonly name: string,
		public readonly sourceCode: string,
		public readonly expectation: Array<IConstructor<ast.BaseNode>>
	) { }

	public static create(
		name: string,
		sourceCode: string,
		...expectation: Array<IConstructor<ast.BaseNode>>
	) {
		return new ParserTestCase(name, sourceCode, expectation)
	}
}

export default ParserTestCase
