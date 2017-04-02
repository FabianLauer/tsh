///
/// factory.ts
/// Functions to register and instantiate EcmaScript code generators.
///

/// Imports

import { BaseNode } from '@/compiler/ast'
import { ICodeGenerator } from '@/compiler/codegen/base'


/// Factory

/**
 * Describes a type that constructs an `ICodeGenerator` when calling `new(BaseNode)` on it.
 */
export type IGeneratorConstructor<TNode extends BaseNode> = {
	new(astNode: TNode): ICodeGenerator<TNode>
}

/**
 * Describes rating function signatures used by the `register(...)` decorator.
 */
export type IRatingFunc<TNode extends BaseNode> = (input: TNode) => number | void

/**
 * Contains all registered code generators and their rating functions.
 */
const registry: Array<{
	readonly ratingFunc: IRatingFunc<BaseNode>
	readonly generatorType: IGeneratorConstructor<BaseNode>
}> = []

/**
 * Class decorator used to register a code generator.
 * @param ratingFunc A function that determines how relevant the registered code
 *                   generator is for any given AST node. The higher the rating
 *                   that this function returns, the more likely the code
 *                   generator is to be used for a given AST node.
 */
export function register<TNode extends BaseNode>(ratingFunc: IRatingFunc<TNode>) {
	return (generatorType: IGeneratorConstructor<TNode>) => {
		registry.push({ ratingFunc, generatorType })
	}
}

/**
 * Finds the best matching code generator for the given AST node, then attempts
 * to instantiate such a code generator.
 * Throws if no matching code generator could be found.
 * @throws
 * @param astNode The AST node to instantiate a code generator for.
 * @return The code generator created for the given AST node.
 */
export function createForAstNode<TNode extends BaseNode>(astNode: TNode) {
	const constructor = registry
		// find all constructors that have a rating > 0
		.filter(registered => (registered.ratingFunc(astNode) || 0) > 0)
		// sort by rating descending
		.sort((a, b) => {
			const orderA = a.ratingFunc(astNode)
			const orderB = b.ratingFunc(astNode)
			if (orderA > orderB) {
				return -1
			} else if (orderA < orderB) {
				return 1
			} else {
				return 0
			}
		})
		// return the best match
		[0]
	if (typeof constructor !== 'object') {
		throw new Error(
			`Can not create code generator for AST node ${astNode.constructor.name}: no generator in registry.`
		)
	}
	return <ICodeGenerator<TNode>>new constructor.generatorType(astNode)
}
