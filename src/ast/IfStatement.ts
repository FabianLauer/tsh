import { assertAstNodeParam } from './utils/assert'
import Statement from './Statement'
import Expr from './Expr'
import IConditionalStatement from './IConditionalStatement'

export class IfStatement extends Statement implements Readonly<IConditionalStatement> {
	public constructor(
		public readonly condition: Expr,
		public readonly body: Statement
	) {
		super([body])

		assertAstNodeParam(condition instanceof Expr)
		assertAstNodeParam(body instanceof Statement)

		this.setParentOf(condition, this)
		this.setParentOf(body, this)
	}

	/**
	 * Creates an identical copy of this AST node.
	 */
	public clone(): this {
		return <this>new IfStatement(
			this.condition.clone(),
			this.body.clone()
		)
	}
}

export default IfStatement
