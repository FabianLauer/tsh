import { assertAstNodeParam } from './utils/assert'
import { BaseNode, IContainerNode } from './'

export class Statement extends BaseNode implements IContainerNode.Any {
	public constructor(
		private readonly items: BaseNode[]
	) {
		super()

		assertAstNodeParam(
			Array.isArray(items),
			'Invalid Argument for ast.Statement: must be an array, is ',
			'typeof ', typeof(items),
			(items ? ', instanceof ' + items.constructor.name : '')
		)
		items.forEach(item => assertAstNodeParam(item instanceof BaseNode))

		items.forEach(item => this.setParentOf(item, this))
	}


	/**
	 * A statement with no members.
	 */
	// tslint:disable-next-line:variable-name
	public static readonly Empty = new Statement([])


	/**
	 * Returns an array of all nodes in the statement.
	 */
	public get nodes(): ReadonlyArray<BaseNode> {
		return this.items
	}


	public getNodeAtIndex(index: number) {
		return this.items[index]
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
		return [].concat(this.nodes)
	}
}

export default Statement
