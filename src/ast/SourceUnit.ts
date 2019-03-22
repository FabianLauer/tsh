import { assertAstNodeParam } from './utils/assert'
import { BaseNode, IContainerNode } from './'

export class SourceUnit extends BaseNode implements IContainerNode.Any {
	public constructor(
		/**
		 * The name of the source unit.
		 * This is usually the file name or path to the source file.
		 */
		public readonly name: string,
		private readonly items: BaseNode[]
	) {
		super()
		assertAstNodeParam(typeof name === 'string')
		assertAstNodeParam(name.length > 0)
		assertAstNodeParam(Array.isArray(items))
		items.forEach(item => assertAstNodeParam(item instanceof BaseNode))
	}


	/**
	 * Creates an identical copy of this AST node.
	 */
	public clone(): this {
		return <this>new SourceUnit(
			this.name,
			this.items.map(item => item.clone())
		)
	}


	/**
	 * Returns an array of all nodes in the source unit.
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
		return [].concat(this.items)
	}
}

export default SourceUnit
