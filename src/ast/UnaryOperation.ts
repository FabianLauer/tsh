import { assertAstNodeParam } from './utils/assert'
import { Expr, Operator, UnaryOperatorPosition } from './'

export class UnaryOperation extends Expr {
	public constructor(
		public readonly operand: Expr,
		public readonly operator: Operator,
		public readonly operatorPosition: UnaryOperatorPosition
	) {
		super()
		assertAstNodeParam(operand instanceof Expr)
		assertAstNodeParam(operator instanceof Operator)
		assertAstNodeParam(UnaryOperatorPosition.isValid(operatorPosition))
	}

	/**
	 * Creates an identical copy of this AST node.
	 */
	public clone(): this {
		return <this>new UnaryOperation(
			this.operand.clone(),
			this.operator.clone(),
			this.operatorPosition
		)
	}
}

export default UnaryOperation
