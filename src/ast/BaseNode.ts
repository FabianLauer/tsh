/**
 * Base AST node.
 */
export abstract class BaseNode {
	// tslint:disable-next-line:variable-name
	private _parent: BaseNode

	public get parent() {
		return this._parent
	}

	/**
	 * Creates an identical copy of this AST node.
	 */
	public abstract clone(): this

	/**
	 * Changes the parent of an AST node.
	 * @param parent The new parent node.
	 */
	protected setParent(parent: BaseNode) {
		this._parent = parent
	}

	/**
	 * Changes the parent of an AST node.
	 * @param node The node to set a new parent on.
	 * @param parent The new parent to set on `node`.
	 */
	protected setParentOf(node: BaseNode, parent: BaseNode) {
		node.setParent(parent)
	}
}

export default BaseNode
