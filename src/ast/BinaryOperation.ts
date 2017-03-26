import Expr from './Expr'
import Operator from './Operator'

export class BinaryOperation extends Expr {
	public constructor(
		public readonly leftOperand: Expr,
		public readonly operator: Operator,
		public readonly rightOperand: Expr
	) { super() }
}

export default BinaryOperation
