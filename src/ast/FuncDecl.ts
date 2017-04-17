import { assertAstNodeParam } from './utils/assert'
import { IAnonFuncDeclCreateParams, AnonFuncDecl, Token, Statement, TypeExpr, ParamDeclList } from './'


export interface IFuncDeclCreateParams extends IAnonFuncDeclCreateParams {
	/**
	 * The name of the function itself.
	 */
	funcName: Token
}


export class FuncDecl extends AnonFuncDecl {
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
		runtimeParamDecls: ParamDeclList = ParamDeclList.Empty,
		/**
		 * The function's return type declaration.
		 */
		returnTypeDecl: TypeExpr = TypeExpr.Empty,
		/**
		 * The function body.
		 */
		body: Statement = Statement.Empty
	) {
		super(runtimeParamDecls, returnTypeDecl, body)

		assertAstNodeParam(name instanceof Token)
		assertAstNodeParam(runtimeParamDecls instanceof ParamDeclList)
		assertAstNodeParam(returnTypeDecl instanceof TypeExpr)
		assertAstNodeParam(body instanceof Statement)
	}
}

export default FuncDecl
