import { assertAstNodeParam } from './utils/assert'
import { BaseNode, Token, Statement } from './'


interface IEnumDeclCreateParams {
	/**
	 * The name of the enum itself.
	 */
	enumName: Token

	/**
	 * The enum body.
	 */
	enumBody: Statement
}


export class EnumDecl extends BaseNode {
	/**
	 * Creates a new `EnumDecl` instance.
	 * @param params Parameters for the class declaration.
	 */
	public static create(params: IEnumDeclCreateParams) {
		return new EnumDecl(
			params.enumName,
			params.enumBody
		)
	}

	/**
	 * Creates a new `EnumDecl` instance.
	 */
	private constructor(
		/**
		 * The name of the enum itself.
		 */
		public readonly name: Token,
		/**
		 * The enum body.
		 */
		public readonly body: Statement = Statement.Empty
	) {
		super()

		assertAstNodeParam(name instanceof Token)
		assertAstNodeParam(body instanceof Statement)

		this.setParentOf(name, this)
		this.setParentOf(body, this)
	}

	/**
	 * Creates an identical copy of this AST node.
	 */
	public clone(): this {
		return <this>new EnumDecl(
			this.name.clone(),
			this.body.clone()
		)
	}
}

export default EnumDecl
