import { BaseNode } from '@/compiler/ast'

export interface ICodeGenerator<TNode extends BaseNode> {
	/**
	 * The name of the output language, such as `JavaScript`.
	 */
	readonly outputLanguageName: string


	/**
	 * Creates a new code generator instance.
	 */
	readonly astNode: TNode

	/**
	 * Generates code for a given syntax tree.
	 * @param ast The syntax tree to generate code for.
	 */
	generateCode(): string
}

export default ICodeGenerator
