import { assertAstNodeParam } from './utils/assert'
import Statement from './Statement'
import ExprList from './ExprList'
import Expr from './Expr'

export class WhileStatement extends Statement {
	public constructor(
		public readonly condition: ExprList<Expr[]>,
		public readonly body: Statement
	) {
		super([body])

		assertAstNodeParam(condition instanceof ExprList)
		assertAstNodeParam(body instanceof Statement)

		this.setParentOf(condition, this)
		this.setParentOf(body, this)
	}

	/**
	 * Creates an identical copy of this AST node.
	 */
	public clone(): this {
		return <this>new WhileStatement(
			this.condition.clone(),
			this.body.clone()
		)
	}
}

export default WhileStatement
