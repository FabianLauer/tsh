import { assertAstNodeParam } from './utils/assert'
import Expr from './Expr'

/**
 * Used to wrap expressions (that includes all kinds of operations) when they need to be
 * evaluated with precedence over other expressions, just like parens in source code.
 * Type parameter `TExpr` can be used to specify the wrapped expression's type.
 */
export class PrecedenceExpr<TExpr extends Expr> extends Expr {
	public constructor(
		/**
		 * The expression that should be evaluated with precedence.
		 */
		public readonly expr: TExpr
	) {
		super(expr)
		assertAstNodeParam(expr instanceof Expr)
	}
}

export default PrecedenceExpr
