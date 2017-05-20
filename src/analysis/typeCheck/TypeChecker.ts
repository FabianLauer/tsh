///
/// TypeChecker.ts
/// Contains the base class for all other type checker classes.
///

import { BaseNode } from '@/compiler/ast'
import { createForAstNode } from './typeCheckerFactory'
import TypeCheckResult from './TypeCheckResult'
import TypeCheckIssue from './TypeCheckIssue'

/**
 * Base class for type checkers.
 * Type checkers perform arbitrary type checks on `IContainerNode`s.
 */
export abstract class TypeChecker<TNode extends BaseNode> {
	/**
	 * Creates a new instance.
	 * @param astNode The syntax tree part to perform typechecking on.
	 * @param results The results object to add type check issues to.
	 */
	public constructor(
		private readonly astNode: TNode,
		private results: TypeCheckResult = new TypeCheckResult()
	) { }


	public getAstNode() {
		return this.astNode
	}


	/**
	 * Performs type checking and updates the `TypeChecker` instance's result state along the way.
	 */
	public performTypeCheck(): void {
		this.performTypeCheckConcrete()
	}


	public getIssues() {
		return this.results.getIssues()
	}


	protected addIssue(issue: TypeCheckIssue) {
		return this.results.addIssue(issue)
	}


	/**
	 * Run type checking on other nodes.
	 * @param nodes The nodes to perform type checking on.
	 * @example
	 *     this.runSubsequentTypeChecksOn(this.astNode.runtimeParamDecls, this.astNode.body)
	 */
	protected runSubsequentTypeChecksOn(...nodes: BaseNode[]) {
		nodes.forEach(_ => {
			const typeChecker = createForAstNode(_)
			// Overwrite the new type checker's `results` object with ours.
			// This will make the subsequent issues appear in the our `results`.
			typeChecker.results = this.results
			// run type checks
			typeChecker.performTypeCheck()
		})
	}


	/**
	 * Performs type checking and updates the `TypeChecker` instance's result state along the way.
	 */
	protected abstract performTypeCheckConcrete(): void
}

export default TypeChecker
