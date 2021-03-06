import { assertAstNodeParam } from './utils/assert'
import { BaseNode, Token } from './'

export class EnumMemberDecl extends BaseNode {
	/**
	 * Creates a new `EnumMemberDecl` instance.
	 */
	private constructor(
		/**
		 * The name of the enum member.
		 */
		public readonly name: Token
	) {
		super()

		assertAstNodeParam(name instanceof Token)

		this.setParentOf(name, this)
	}
}

export default EnumMemberDecl
