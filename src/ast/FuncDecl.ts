import { BaseNode, Token, Statement, TypeExpr } from './'

export class FuncDecl extends BaseNode {
	/**
	 * Creates a new `FuncDecl` instance.
	 * @param params Parameters for the function declaration.
	 */
	public static create(params: {
		/**
		 * The name of the function itself.
		 */
		funcName: Token,
		/**
		 * The function's return type declaration.
		 */
		returnTypeDecl?: TypeExpr,
		/**
		 * The function body.
		 */
		funcBody?: Statement
	}) {
		return new FuncDecl(
			params.funcName,
			params.returnTypeDecl,
			params.funcBody
		)
	}


	/**
	 * Creates a new `FuncDecl` instance.
	 */
	private constructor(
		/**
		 * The name of the function itself.
		 */
		public readonly name: Token,
		/**
		 * The function's return type declaration.
		 */
		public readonly returnTypeDecl: TypeExpr = TypeExpr.Empty,
		/**
		 * The function body.
		 */
		public readonly body: Statement = Statement.Empty
	) {
		super()
	}
}

export default FuncDecl
