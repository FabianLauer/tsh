import { assertAstNodeParam } from './utils/assert'
import { BaseNode, Token, Statement, TypeExpr, ParamDeclList } from './'


export interface IFuncDeclCreateParams {
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
	protected constructor(
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
	) {
		super()
		assertAstNodeParam(name instanceof Token)
		assertAstNodeParam(runtimeParamDecls instanceof ParamDeclList)
		assertAstNodeParam(returnTypeDecl instanceof TypeExpr)
		assertAstNodeParam(body instanceof Statement)
	}
}

export default FuncDecl
