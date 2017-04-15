import Expr from './Expr'
import Token from './Token'

export class StringLiteral extends Expr {
	public constructor(
		public readonly contentToken: Token
	) { super(contentToken) }
}

export default StringLiteral
