///
/// BaseGenerator.ts
/// Generic base class for TypeScript Declaration code generators.
///

/// Imports

import { BaseNode } from '@/compiler/ast'
import { ICodeGenerator } from '@/compiler/codegen/base'


/// Class

/**
 * Base class for TypeScriptDeclaration code generators. This class generically implements
 * the `ICodeGenerator` interface, making the implementation of concrete code generators
 * very convenient. All that needs to be done to implement a concrete version of this
 * class is that the `generateCodeConcrete(ast: TNode)` method must be implemented.
 * The implementation of the method should return either a string or another code
 * generator instance, or an array of strings and/or code generator instances.
 * Concatenation of these return values is done by the `BaseGenerator` class.
 */
export abstract class BaseGenerator<TNode extends BaseNode> implements ICodeGenerator<TNode> {
	/**
	 * Creates a new code generator instance.
	 */
	public constructor(
		/**
		 * The AST node to stringify.
		 */
		public readonly astNode: TNode
	) { }


	/**
	 * The name of the output language.
	 */
	public readonly outputLanguageName = 'TypeScriptDeclarations'

	/**
	 * Generates code for a given syntax tree.
	 * @param ast The syntax tree to generate code for.
	 */
	public generateCode(): string {
		let result: any = this.generateCodeConcrete(this.astNode)
		if (!Array.isArray(result)) {
			result = [result]
		}
		return result.join('')
	}

	/**
	 * Generates code for a given syntax tree.
	 * @param ast The syntax tree to generate code for.
	 */
	public toString() { return this.generateCode() }

	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	// tslint:disable-next-line:typedef-whitespace
	protected abstract generateCodeConcrete(ast: TNode):
		string | ICodeGenerator<any> | Array<string | ICodeGenerator<any>>
}

export default BaseGenerator
