import { assertAstNodeParam } from './utils/assert'
import { BaseNode } from './'

export class SourceUnit extends BaseNode {
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
	 * Returns an array of all nodes in the source unit.
	 */
	public get nodes(): ReadonlyArray<BaseNode> {
		return this.items
	}


	public getNodeAtIndex(index: number) {
		return this.items[index]
	}
}

export default SourceUnit
