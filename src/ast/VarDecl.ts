import { BaseNode, Token, Expr, TypeExpr, VarDeclModifier } from './'


interface IVarDeclCreateParams {
	/**
	 * The name of the variable.
	 */
	varName: Token

	/**
	 * The modifiers with which the variable was declared.
	 */
	modifiers: VarDeclModifier.ICombination

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
			params.modifiers,
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
		 * The modifiers with which the variable was declared.
		 */
		public readonly modifiers: VarDeclModifier.ICombination,
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
	) {
		super()

		// validate the var declaration modifiers
		VarDeclModifier.throwUnlessCombinationLegal(this.modifiers)
	}
}

export default VarDecl
