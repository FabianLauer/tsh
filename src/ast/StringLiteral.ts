import { assertAstNodeParam } from './utils/assert'
import Expr from './Expr'
import Token from './Token'

export class StringLiteral extends Expr {
	public constructor(
		public readonly contentToken: Token
	) {
		super(contentToken)
		assertAstNodeParam(contentToken instanceof Token)
	}

	/**
	 * Creates an identical copy of this AST node.
	 */
	public clone(): this {
		return <this>new StringLiteral(this.contentToken.clone())
	}
}

export default StringLiteral
