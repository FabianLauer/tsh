import { BaseNode, Token, Expr, TypeExpr } from './'


interface IVarDeclCreateParams {
	/**
	 * The name of the variable.
	 */
	varName: Token

	/**
	 * The variable's type declaration.
	 */
	typeDecl?: TypeExpr


	/**
	 * The value assigned to the variable.
	 */
	assignment?: Expr
}


export class VarDecl extends BaseNode {
	/**
	 * Creates a new `VarDecl` instance.
	 * @param params Parameters for the function declaration.
	 */
	public static create(params: IVarDeclCreateParams) {
		return new VarDecl(
			params.varName,
			params.typeDecl
		)
	}


	/**
	 * Creates a new `VarDecl` instance.
	 */
	private constructor(
		/**
		 * The name of the variable.
		 */
		public readonly name: Token,
		/**
		 * The variable's type declaration.
		 */
		public readonly typeDecl: TypeExpr = TypeExpr.Empty,
		/**
		 * The value assigned to the variable.
		 */
		public readonly assignment: Expr = Expr.Empty
	) { super() }
}

export default VarDecl
