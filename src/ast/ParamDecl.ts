import { assertAstNodeParam } from './utils/assert'
import { BaseNode, Token, TypeExpr } from './'

export class ParamDecl extends BaseNode {
	public constructor(
		/**
		 * The parameter's name.
		 */
		public readonly name: Token,

		/**
		 * The parameter's type declaration.
		 */
		public readonly typeDecl: TypeExpr = TypeExpr.Empty
	) {
		super()
		assertAstNodeParam(name instanceof Token)
		assertAstNodeParam(typeDecl instanceof TypeExpr)
	}

	/**
	 * Creates an identical copy of this AST node.
	 */
	public clone(): this {
		return <this>new ParamDecl(
			this.name.clone(),
			this.typeDecl.clone()
		)
	}
}

export default ParamDecl
