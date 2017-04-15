import Expr from './Expr'
import Token from './Token'

export class NumericExpr extends Expr {
	public constructor(
		public readonly contentToken: Token
	) { super(contentToken) }
}

export default NumericExpr
