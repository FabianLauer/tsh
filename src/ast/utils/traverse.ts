///
/// AST Traversion Utilities
///

import * as ast from '../'

/**
 * The constructor of a certain AST node type.
 */
export type ConstructorOf<T extends ast.BaseNode> = ({ new(...args: any[]): T })


/**
 * Filter an array of AST nodes so that only nodes of a certain AST node type remain.
 * @param nodes The node array to filter.
 * @param nodeType The AST node type to include in the result.
 * @return An array of nodes of the given AST node type.
 */
export function filterByNodeType<T extends ast.BaseNode>(
	nodes: ReadonlyArray<ast.BaseNode>,
	nodeType: ConstructorOf<T>
): T[] {
	return <T[]>nodes.filter(node => node instanceof nodeType)
}


/**
 * @see flattenContainerNode(...)
 */
function flattenContainerNodeInternal<T extends ast.BaseNode>(
	container: ast.IContainerNode.Any,
	flattenSubsequentContainer: (container: ast.IContainerNode.Any) => boolean,
	nodeList: T[]
): void {
	for (const childNode of container.getChildNodes()) {
		nodeList.push(<T>childNode)

		// If the child node is a container node, check if it should also be flattened using
		// the provided `flattenSubsequentContainer` closure.
		if (
			ast.IContainerNode.isImplementedBy(<ast.IContainerNode.Any>childNode) &&
			flattenSubsequentContainer(<ast.IContainerNode.Any>childNode)
		) {
			// The child node should also be flattened, so call this function recursively:
			flattenContainerNodeInternal<T>(
				<ast.IContainerNode.Any>childNode,
				flattenSubsequentContainer,
				nodeList
			)
		}
	}
}


/**
 * Flatten a part of a syntax tree by collecting the child nodes of a container node recursively
 * in a single array.
 * @param container The container node that should be flattened.
 * @param flatten A function that checks whether subsequent container nodes should also be flattened.
 * @return The flattened list of child nodes in `container`.
 */
export function flattenContainerNode<T extends ast.BaseNode>(
	container: ast.IContainerNode.Any,
	flattenSubsequentContainer: (container: ast.IContainerNode.Any) => boolean = _ => true
): T[] {
	const nodeList: T[] = []
	flattenContainerNodeInternal(container, flattenSubsequentContainer, nodeList)
	return nodeList
}
