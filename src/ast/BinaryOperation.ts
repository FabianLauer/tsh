import { assertAstNodeParam } from './utils/assert'
import Expr from './Expr'
import Operator from './Operator'

export class BinaryOperation extends Expr {
	public constructor(
		public readonly leftOperand: Expr,
		public readonly operator: Operator,
		public readonly rightOperand: Expr
	) {
		super()
		assertAstNodeParam(leftOperand instanceof Expr)
		assertAstNodeParam(operator instanceof Operator)
		assertAstNodeParam(rightOperand instanceof Expr)
	}

	/**
	 * Creates an identical copy of this AST node.
	 */
	public clone(): this {
		return <this>new BinaryOperation(
			this.leftOperand.clone(),
			this.operator.clone(),
			this.rightOperand.clone()
		)
	}
}

export default BinaryOperation
