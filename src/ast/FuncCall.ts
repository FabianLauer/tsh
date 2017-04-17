import { assertAstNodeParam } from './utils/assert'
import Expr from './Expr'
import ExprList from './ExprList'
import Identifier from './Identifier'

export class FuncCall extends Expr {
	public constructor(
		/**
		 * The identifier that identifies the function that is called.
		 */
		public readonly identifier: Identifier,
		/**
		 * The list of parameter values passed to the called function.
		 */
		public readonly parameterList: ExprList<Expr[]>
	) {
		super()
		assertAstNodeParam(identifier instanceof Identifier)
		assertAstNodeParam(parameterList instanceof ExprList)
	}
}

export default FuncCall
