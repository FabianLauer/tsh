import { assertAstNodeParam } from './utils/assert'
import { BaseNode, Expr } from './'

export class ReturnStatement extends BaseNode {
	public constructor(
		public readonly returnValue: Expr = Expr.Empty
	) {
		super()
		assertAstNodeParam(returnValue instanceof Expr)
	}


	/**
	 * A return statement with no members.
	 */
	// tslint:disable-next-line:variable-name
	public static readonly Empty = new ReturnStatement()
}

export default ReturnStatement
