import { assertAstNodeParam } from './utils/assert'
import Expr from './Expr'

export class ExprList<TExprs extends Expr[]> extends Expr {
	public constructor(
		/**
		 * The actual expressions in the list.
		 * The order of this array represents the order that expressions have in source code.
		 */
		public readonly expressions: TExprs
	) {
		super()
		assertAstNodeParam(Array.isArray(expressions))
		expressions.forEach(expr => expr instanceof Expr)
	}
}

export default ExprList
