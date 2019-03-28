///
/// codeGeneratorFactory.ts
/// Functions to register and instantiate bash code generators.
///

import { BaseNode } from '@/compiler/ast'
import { ICodeGenerator } from '@/compiler/codegen/base'
import { FactoryRegistry } from '../../utils/FactoryRegistry'


/**
 * The factory registry used to instantiate code generators.
 * @internal
 */
const factory = FactoryRegistry.create<BaseNode, ICodeGenerator<BaseNode>>()


/**
 * Class decorator used to register a code generator.
 * @param ratingFunc A function that determines how relevant the registered code
 *                   generator is for any given AST node. The higher the rating
 *                   that this function returns, the more likely the code
 *                   generator is to be used for a given AST node.
 */
export const register: typeof factory.registerClass = factory.registerClass.bind(factory)


/**
 * Finds the best matching code generator for the given AST node, then attempts
 * to instantiate such a code generator.
 * Throws if no matching code generator could be found.
 * @throws
 * @param astNode The AST node to instantiate a code generator for.
 * @return The code generator created for the given AST node.
 */
export const createForAstNode: typeof factory.create = factory.create.bind(factory)
