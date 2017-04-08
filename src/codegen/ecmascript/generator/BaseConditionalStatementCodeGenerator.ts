import BaseGenerator from '../BaseGenerator'
import { createForAstNode } from '../factory'
import { IConditionalStatement } from '@/compiler/ast'

export abstract class BaseConditionalStatementCodeGenerator<TNode extends IConditionalStatement>
extends BaseGenerator<TNode> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: IConditionalStatement) {
		return `${this.getConditionalKeyword()} (${createForAstNode(astNode.condition)}) {
			${createForAstNode(astNode.body)}
		}\n`
	}

	/**
	 * Returns the keyword used to start the conditional statement, e.g. `if` or `else if`.
	 */
	protected abstract getConditionalKeyword(): string;
}
