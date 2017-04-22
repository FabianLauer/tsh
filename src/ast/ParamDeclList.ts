import { assertAstNodeParam } from './utils/assert'
import { BaseNode, IContainerNode, ParamDecl } from './'

export class ParamDeclList extends BaseNode implements IContainerNode<ParamDecl[]> {
	private constructor(
		/**
		 * The parameter declarations in the list.
		 * The order of this array is exactly the same as the order of the
		 * declarations in source code.
		 */
		private readonly decls: ParamDecl[]
	) {
		super()
		assertAstNodeParam(Array.isArray(decls))
		decls.forEach(decl => assertAstNodeParam(decl instanceof ParamDecl))
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


	///
	/// `IContainerNode` Implementation:
	///

	// tslint:disable-next-line:variable-name
	public readonly __IContainerNodeBrand__ = IContainerNode.BRAND

	/**
	 * Returns all child nodes of a container node.
	 */
	public getChildNodes() {
		return [].concat(this.paramDecls)
	}
}

export default ParamDeclList
