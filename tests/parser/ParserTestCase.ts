import * as ast from '@/compiler/ast'

export class ParserTestCase {
	private constructor(
		public readonly name: string,
		public readonly sourceCode: string,
		public readonly expectation: Array<(node: ast.BaseNode[]) => boolean>
	) { }

	public static create(
		name: string,
		sourceCode: string,
		...expectation: Array<(node: ast.BaseNode[]) => boolean>
	) {
		return new ParserTestCase(name, sourceCode, expectation)
	}
}

export default ParserTestCase
