import { Token, Statement, TypeExpr, ParamDeclList, ClassDecl } from './'
import { IFuncDeclCreateParams, FuncDecl } from './FuncDecl'


interface IMethodDeclCreateParams extends IFuncDeclCreateParams { }


export class MethodDecl extends FuncDecl {
	/**
	 * Creates a new `FuncDecl` instance.
	 * @param params Parameters for the function declaration.
	 */
	public static create(params: IMethodDeclCreateParams) {
		return new MethodDecl(
			params.funcName,
			params.runtimeParamDecls,
			params.returnTypeDecl,
			params.funcBody
		)
	}


	/**
	 * Creates a new `MethodDecl` instance.
	 */
	private constructor(
		/**
		 * The name of the method itself.
		 */
		name: Token,
		/**
		 * The method's runtime parameter declaration list.
		 */
		runtimeParamDecls: ParamDeclList = ParamDeclList.Empty,
		/**
		 * The method's return type declaration.
		 */
		returnTypeDecl: TypeExpr = TypeExpr.Empty,
		/**
		 * The method body.
		 */
		body: Statement = Statement.Empty
	) {
		super(
			name,
			runtimeParamDecls,
			returnTypeDecl,
			body
		)
	}


	/**
	 * Returns the class declaration in which a method was defined.
	 */
	public getClass(): ClassDecl {
		if (!(this.parent instanceof Statement)) {
			return undefined
		}
		return <ClassDecl>this.parent.parent
	}
}

export default MethodDecl
