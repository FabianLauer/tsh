import { BaseNode, Token } from './'

export class FuncDecl extends BaseNode {
	public constructor(
		public readonly name: Token
	) {
		super()
	}
}

export default FuncDecl
