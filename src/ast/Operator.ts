import { assertAstNodeParam } from './utils/assert'
import { BaseNode, Token, OperatorIdent } from './'

export class Operator extends BaseNode {
	public constructor(
		/**
		 * Identifies which operator was used.
		 */
		public readonly ident: OperatorIdent,
		/**
		 * The operator's original source code.
		 */
		public readonly text: Token = Token.Empty
	) {
		super()
		assertAstNodeParam(OperatorIdent.isValid(ident))
		assertAstNodeParam(text instanceof Token)
	}

	/**
	 * Creates an identical copy of this AST node.
	 */
	public clone(): this {
		return <this>new Operator(
			this.ident,
			this.text.clone()
		)
	}
}

export default Operator
