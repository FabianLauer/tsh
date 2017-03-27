import { BaseNode } from './'

export class Statement extends BaseNode {
	public constructor(
		private readonly items: BaseNode[]
	) {
		super()
		console.assert(Array.isArray(items))
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
