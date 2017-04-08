import Expr from './Expr'
import Statement from './Statement'

export class ExprStatement extends Statement {
	public constructor(
		/**
		 * The expression wrapped by this expression statement.
		 */
		public readonly expression: Expr
	) {
		super([expression])
	}
}

export default ExprStatement
