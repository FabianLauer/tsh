import { assertAstNodeParam } from './utils/assert'
import { Expr, Token } from './'

export class Identifier extends Expr {
	public constructor(
		public readonly name: Token
	) {
		super(name)
		assertAstNodeParam(name instanceof Token)
	}
}

export default Identifier
