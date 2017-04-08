import { BaseNode, Token, Statement } from './'


interface IClassDeclCreateParams {
	/**
	 * The name of the class itself.
	 */
	className: Token

	/**
	 * The class body.
	 */
	classBody: Statement
}


export class ClassDecl extends BaseNode {
	/**
	 * Creates a new `ClassDecl` instance.
	 * @param params Parameters for the class declaration.
	 */
	public static create(params: IClassDeclCreateParams) {
		return new ClassDecl(
			params.className,
			params.classBody
		)
	}


	/**
	 * Creates a new `ClassDecl` instance.
	 */
	private constructor(
		/**
		 * The name of the class itself.
		 */
		public readonly name: Token,
		/**
		 * The class body.
		 */
		public readonly body: Statement = Statement.Empty
	) {
		super()
		this.setParentOf(name, this)
		this.setParentOf(body, this)
	}
}

export default ClassDecl
