import { BaseNode } from '@/compiler/ast'

/**
 * Walks up the AST until a matcher function finds a match, or until the root of the
 * AST has been reached. If the matcher function fins a matching AST node, this node
 * will be returned. Returns `undefined` if the root of the AST has been reached.
 * @param child The child to find the container for.
 * @param match A function that checks if a given AST node matches a condition.
 * @return Returns the AST node for which `match` returned `true`.
 */
export function findContainingNode<TParent extends BaseNode>(
	node: BaseNode,
	match: (parent: BaseNode) => boolean
) {
	let parent: BaseNode = node

	do {
		// if there's either no parent or if the parent node is identical to the
		// previous one (that would be an infinite loop), stop and return
		if (!parent.parent || parent.parent === parent) {
			return undefined
		}

		parent = parent.parent
	} while (!match(parent))

	return <TParent>parent
}

/**
 * Checks if a given AST node has a parent that matches a given condition at any
 * distance upwards in the AST.
 */
export function hasRemoteParent(
	node: BaseNode,
	match: (parent: BaseNode) => boolean
) {
	return !!findContainingNode(node, match)
}
