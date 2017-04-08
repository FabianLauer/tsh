import { BaseNode } from './'

export class Expr extends BaseNode {
	public constructor(
		public readonly content: BaseNode = undefined
	) {
		super()
	}


	/**
	 * An expression with no content whatsoever.
	 */
	// tslint:disable-next-line:variable-name
	public static readonly Empty = new Expr()
}

export default Expr
