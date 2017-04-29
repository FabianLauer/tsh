import { IContainerNode } from '@/compiler/ast'
import { createForAstNode } from './typeCheck/typeCheckerFactory'

/**
 * Finds the best matching type checker for the given AST node, then attempts to instantiate the type checker.
 * Throws if no matching type checker could be found.
 * @throws
 * @param astNode The AST node to instantiate a type checker for.
 * @return The type checker created for the given AST node.
 */
export function createTypeChecker(astNode: IContainerNode.Any) {
	return createForAstNode(astNode)
}
