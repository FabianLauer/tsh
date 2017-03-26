import { BaseNode, Token, Expr, TypeExpr, VarDeclModifier } from './'


interface IVarDeclCreateParams {
	/**
	 * The name of the variable.
	 */
	varName: Token

	/**
	 * The modifier with which the variable was declared.
	 */
	modifier: VarDeclModifier

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
			params.modifier,
			params.varName,
			params.typeDecl,
			params.assignment
		)
	}


	/**
	 * Creates a new `VarDecl` instance.
	 */
	private constructor(
		/**
		 * The modifier with which the variable was declared.
		 */
		public readonly modifier: VarDeclModifier,
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
