import { BaseNode, Token, Statement, TypeExpr, ParamDeclList } from './'


interface IFuncDeclCreateParams {
	/**
	 * The name of the function itself.
	 */
	funcName: Token

	/**
	 * The function's runtime parameter declaration list.
	 */
	runtimeParamDecls?: ParamDeclList

	/**
	 * The function's return type declaration.
	 */
	returnTypeDecl?: TypeExpr

	/**
	 * The function body.
	 */
	funcBody?: Statement
}


export class FuncDecl extends BaseNode {
	/**
	 * Creates a new `FuncDecl` instance.
	 * @param params Parameters for the function declaration.
	 */
	public static create(params: IFuncDeclCreateParams) {
		return new FuncDecl(
			params.funcName,
			params.runtimeParamDecls,
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
		 * The function's runtime parameter declaration list.
		 */
		public readonly runtimeParamDecls: ParamDeclList = ParamDeclList.Empty,
		/**
		 * The function's return type declaration.
		 */
		public readonly returnTypeDecl: TypeExpr = TypeExpr.Empty,
		/**
		 * The function body.
		 */
		public readonly body: Statement = Statement.Empty
	) { super() }
}

export default FuncDecl
