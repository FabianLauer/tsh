import { Expr, Token } from './'

export class Identifier extends Expr {
	public constructor(
		public readonly name: Token
	) { super(name) }
}

export default Identifier
