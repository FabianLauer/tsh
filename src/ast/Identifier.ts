import { BaseNode, Token } from './'

export class Identifier extends BaseNode {
	public constructor(
		public readonly name: Token
	) {
		super()
	}
}

export default Identifier
