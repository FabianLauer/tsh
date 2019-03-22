import { assertAstNodeParam } from './utils/assert'
import { Expr, Token } from './'

export class Identifier extends Expr {
	public constructor(
		public readonly name: Token
	) {
		super(name)
		assertAstNodeParam(name instanceof Token)
	}

	/**
	 * Creates an identical copy of this AST node.
	 */
	public clone(): this {
		return <this>new Identifier(this.name.clone())
	}
}

export default Identifier
