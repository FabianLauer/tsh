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

	/**
	 * Creates an identical copy of this AST node.
	 */
	public clone(): this {
		return <this>new ReturnStatement(this.returnValue.clone())
	}
}

export default ReturnStatement
