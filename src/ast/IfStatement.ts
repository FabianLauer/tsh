import Statement from './Statement'
import Expr from './Expr'
import IConditionalStatement from './IConditionalStatement'

export class IfStatement extends Statement implements Readonly<IConditionalStatement> {
	public constructor(
		public readonly condition: Expr,
		public readonly body: Statement
	) {
		super([body])
		this.setParentOf(condition, this)
		this.setParentOf(body, this)
	}
}

export default IfStatement
