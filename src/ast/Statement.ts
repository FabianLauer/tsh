import { assertAstNodeParam } from './utils/assert'
import { BaseNode } from './'

export class Statement extends BaseNode {
	public constructor(
		private readonly items: BaseNode[]
	) {
		super()

		assertAstNodeParam(
			Array.isArray(items),
			'Invalid Argument for ast.Statement: must be an array'
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
}

export default Statement
