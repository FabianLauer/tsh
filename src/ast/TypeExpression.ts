import { Expr, Token } from './'

export class TypeExpr extends Expr {
	private constructor() {
		super()
	}


	/**
	 * Creates a type expression from an identifier.
	 */
	public static fromIdentifier(identifier: Token) {
		return new TypeExpr()
	}


	/**
	 * A type expression with no content whatsoever.
	 */
	// tslint:disable-next-line:variable-name
	public static readonly Empty = new TypeExpr()
}

export default TypeExpr
