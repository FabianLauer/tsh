import Expr from './Expr'
import Statement from './Statement'

export class ExprStatement<TExpr extends Expr> extends Statement {
	// tslint:disable-next-line:variable-name
	public static readonly Any = class AnyExprStatement extends ExprStatement<Expr> { }

	public constructor(
		/**
		 * The expression wrapped by this expression statement.
		 */
		public readonly expression: TExpr
	) { super([expression]) }
}

export default ExprStatement
