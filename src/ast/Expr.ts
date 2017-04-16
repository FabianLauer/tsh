import { assertAstNodeParam } from './utils/assert'
import { BaseNode } from './'

export class Expr extends BaseNode {
	public constructor(
		public readonly content: BaseNode = undefined
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
}

export default Expr
