import { assertAstNodeParam } from './utils/assert'
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
	) {
		super([expression])
		assertAstNodeParam(expression instanceof Expr)
	}

	/**
	 * Creates an identical copy of this AST node.
	 */
	public clone(): this {
		return <this>new ExprStatement(this.expression.clone())
	}
}

export default ExprStatement
