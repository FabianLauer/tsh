import { assertAstNodeParam } from './utils/assert'
import Statement from './Statement'
import ExprList from './ExprList'
import Expr from './Expr'

export class WhileStatement extends Statement {
	public constructor(
		public readonly loop: ExprList<Expr[]>,
		public readonly body: Statement
	) {
		super([body])

		assertAstNodeParam(loop instanceof ExprList)
		assertAstNodeParam(body instanceof Statement)

		this.setParentOf(loop, this)
		this.setParentOf(body, this)
	}
}

export default WhileStatement
