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
}

export default Operator
