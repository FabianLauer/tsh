import { assertAstNodeParam } from './utils/assert'
import { Expr, Token } from './'

export class TypeExpr extends Expr {
	private constructor(
		public readonly typeIdentifier: Token
	) {
		super()
		assertAstNodeParam(typeIdentifier instanceof Token)
	}


	/**
	 * Creates a type expression from an identifier.
	 */
	public static fromIdentifier(identifier: Token) {
		return new TypeExpr(identifier)
	}


	/**
	 * A type expression with no content whatsoever.
	 */
	// tslint:disable-next-line:variable-name
	public static readonly Empty = new TypeExpr(Token.Empty)


	/**
	 * Creates an identical copy of this AST node.
	 */
	public clone(): this {
		return <this>new TypeExpr(this.typeIdentifier.clone())
	}
}

export default TypeExpr
