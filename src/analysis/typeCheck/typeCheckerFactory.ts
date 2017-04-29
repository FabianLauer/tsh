import { BaseNode } from '@/compiler/ast'
import TypeChecker from './TypeChecker'
import { FactoryRegistry } from '../../utils/FactoryRegistry'


/**
 * The factory registry used to instantiate type checker objects.
 * @internal
 */
const factory = FactoryRegistry.create<BaseNode, TypeChecker<BaseNode>>()


/**
 * Class decorator used to register a type checker.
 * @param ratingFunc A function that determines how relevant the registered code
 *                   generator is for any given AST node. The higher the rating
 *                   that this function returns, the more likely the code
 *                   generator is to be used for a given AST node.
 */
export const register: typeof factory.registerClass = factory.registerClass.bind(factory)


/**
 * Finds the best matching type checker for the given AST node, then attempts
 * to instantiate the type checker.
 * Throws if no matching type checker could be found.
 * @throws
 * @param astNode The AST node to instantiate a type checker for.
 * @return The type checker created for the given AST node.
 */
export function createForAstNode<TNode extends BaseNode>(astNode: TNode): TypeChecker<TNode> {
	return factory.create(astNode)
}
