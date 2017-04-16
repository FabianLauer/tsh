import { assertAstNodeParam } from './utils/assert'
import Expr from './Expr'
import Token from './Token'

export class NumericExpr extends Expr {
	public constructor(
		public readonly contentToken: Token
	) {
		super(contentToken)
		assertAstNodeParam(contentToken instanceof Token)
	}
}

export default NumericExpr
