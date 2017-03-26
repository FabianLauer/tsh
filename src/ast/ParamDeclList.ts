import { BaseNode, ParamDecl } from './'

export class ParamDeclList extends BaseNode {
	private constructor(
		/**
		 * The parameter declarations in the list.
		 * The order of this array is exactly the same as the order of the
		 * declarations in source code.
		 */
		private readonly decls: ParamDecl[]
	) {
		super()
	}


	/**
	 * A completely empty parameter declaration list.
	 */
	// tslint:disable-next-line:variable-name
	public static readonly Empty = new ParamDeclList([])


	/**
	 * The parameter declarations in the list.
	 * The order of this array is exactly the same as the order of the
	 * declarations in source code.
	 */
	public get paramDecls(): ReadonlyArray<ParamDecl> {
		return this.decls
	}


	public getParamAtIndex(index: number) {
		return this.decls[index]
	}


	/**
	 * Creates a parameter declaration list with a set of `ParamDecls`.
	 * The order of the given parameter declarations is preserved.
	 * @param decls The parameter declarations for the param declaration list.
	 */
	public static fromParamDecls(decls: ParamDecl[]) {
		return new ParamDeclList(decls)
	}
}

export default ParamDeclList
