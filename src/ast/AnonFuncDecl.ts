import { assertAstNodeParam } from './utils/assert'
import { Token, Statement, TypeExpr, ParamDeclList } from './'
import Expr from './Expr'


export interface IAnonFuncDeclCreateParams {
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


export class AnonFuncDecl extends Expr {
	/**
	 * Creates a new `FuncDecl` instance.
	 * @param params Parameters for the function declaration.
	 */
	public static create(params: IAnonFuncDeclCreateParams) {
		return new AnonFuncDecl(
			params.runtimeParamDecls,
			params.returnTypeDecl,
			params.funcBody
		)
	}


	/**
	 * Creates a new `AnonFuncDecl` instance.
	 */
	protected constructor(
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

		assertAstNodeParam(runtimeParamDecls instanceof ParamDeclList)
		assertAstNodeParam(returnTypeDecl instanceof TypeExpr)
		assertAstNodeParam(body instanceof Statement)
	}
}

export default AnonFuncDecl
