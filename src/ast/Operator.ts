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
	) { super() }
}

export default Operator
