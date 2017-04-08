///
/// factory.ts
/// Functions to register and instantiate EcmaScript code generators.
///

/// Imports

import { BaseNode } from '@/compiler/ast'
import { ICodeGenerator } from '@/compiler/codegen/base'


/// Types & Interfaces


/**
 * Describes a type that constructs an `ICodeGenerator` when calling `new(BaseNode)`
 * on it.
 */
export type IGeneratorConstructor<TNode extends BaseNode> = {
	new (astNode: TNode): ICodeGenerator<TNode>
}



/**
 * Describes rating function signatures used by the `register(...)` decorator.
 */
export type IRatingFunc<TNode extends BaseNode> = (input: TNode) => number | void



/**
 * Describes the objects used to store a code generator constructor in the `registry`.
 */
interface IRegisteredGeneratorConstructor<TNode> {
	readonly ratingFunc: IRatingFunc<TNode>
	readonly generatorType: IGeneratorConstructor<TNode>
}


/// Factory Implementation


/**
 * Contains all registered code generators and their rating functions.
 */
const registry: Array<IRegisteredGeneratorConstructor<BaseNode>> = []



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
 * Creates a function that can be used to sort arrays of `IRegisteredGeneratorConstructor`s
 * by their rating for a given AST node.
 * The function is ment to be passed into `Array.prototype.sort()`.
 * @param astNode The AST node to calculate ratings for.
 */
function createRatingSorter<TNode extends BaseNode>(astNode: TNode) {
	return (
		a: IRegisteredGeneratorConstructor<TNode>,
		b: IRegisteredGeneratorConstructor<TNode>
	) => {
		const orderA = a.ratingFunc(astNode)
		const orderB = b.ratingFunc(astNode)
		if (orderA > orderB) {
			return -1
		} else if (orderA < orderB) {
			return 1
		} else {
			return 0
		}
	}
}



/**
 * Finds the best matching code generator for the given AST node and returns its
 * constructor.
 * @throws
 * @param astNode The AST node to get a matching a code generator constructor for.
 * @return The code generator constructor for the given AST node.
 */
function findForAstNode<TNode extends BaseNode>(astNode: TNode): IGeneratorConstructor<TNode> {
	const list = registry
		// find all constructors that have a rating > 0
		.filter(registered => (registered.ratingFunc(astNode) || 0) > 0)
		// sort by rating descending
		.sort(createRatingSorter(astNode))
	if (list.length < 1) {
		return undefined
	}
	// the first item in `list` is the item with the best match
	return <IGeneratorConstructor<TNode>>list[0].generatorType
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
	const constructor = findForAstNode(astNode)
	// double check that a `constructor` was found, throw an error if not
	if (typeof constructor !== 'function') {
		throw new Error(
			`Can not create code generator for AST node ${astNode.constructor.name}: no generator in registry.`
		)
	}
	return <ICodeGenerator<TNode>>(new constructor(astNode))
}
