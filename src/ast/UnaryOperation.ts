import { Expr, Operator, UnaryOperatorPosition } from './'

export class UnaryOperation extends Expr {
	public constructor(
		public readonly operand: Expr,
		public readonly operator: Operator,
		public readonly operatorPosition: UnaryOperatorPosition
	) { super() }
}

export default UnaryOperation
