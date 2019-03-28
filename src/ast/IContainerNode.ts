import BaseNode from './BaseNode'

/**
 * Describes nodes that contain an arbitrary number of other nodes.
 * Used to create a common interface for different kinds of container nodes, such as `Statement`, `*DeclList`, etc.
 */
export interface IContainerNode<TChildNode extends BaseNode> extends BaseNode {
	/**
	 * IContainerNode brand. This must be set to `IContainerNode.BRAND`.
	 */
	__IContainerNodeBrand__: Symbol

	/**
	 * Returns all child nodes of a container node.
	 */
	getChildNodes(): TChildNode[]

	/**
	 * Replaces a child node of the container node.
	 */
	replaceChildNode(childNode: TChildNode, replacementNode: TChildNode): void
}


export namespace IContainerNode {
	/**
	 * Declares the IContainerNode type with `BaseNode`.
	 */
	export type Any = IContainerNode<BaseNode>

	/**
	 * The `IContainerNode` brand symbol.
	 * This must be used by implementing classes as the value for `__IContainerNodeBrand__`.
	 */
	export const BRAND = Symbol('IContainerNodeBrand')

	/**
	 * Checks if a certain object implements the `IContainerNode` interface.
	 * @param object The object to check.
	 */
	export function isImplementedBy(
		object: IContainerNode.Any
	): object is IContainerNode.Any {
		return object.__IContainerNodeBrand__ === IContainerNode.BRAND
	}
}


export default IContainerNode
