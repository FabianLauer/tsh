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

	/**
	 * Creates an identical copy of this AST node.
	 */
	public clone(): this {
		return <this>new NumericExpr(this.contentToken.clone())
	}
}

export default NumericExpr
