import { assertAstNodeParam } from './utils/assert'
import { BaseNode } from './'

export class Expr extends BaseNode {
	public constructor(
		public readonly content?: BaseNode
	) {
		super()
		assertAstNodeParam(
			content instanceof BaseNode ||
			typeof content === 'undefined'
		)
	}


	/**
	 * An expression with no content whatsoever.
	 */
	// tslint:disable-next-line:variable-name
	public static readonly Empty = new Expr()

	/**
	 * Creates an identical copy of this AST node.
	 */
	public clone(): this {
		return <this>new Expr(this.content ? this.content.clone() : undefined)
	}
}

export default Expr
