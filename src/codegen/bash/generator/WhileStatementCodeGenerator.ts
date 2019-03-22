import BaseGenerator from '../BaseGenerator'
import { register, createForAstNode } from '../factory'
import { WhileStatement } from '@/compiler/ast'

@register(node => node instanceof WhileStatement ? Infinity : 0)
export class WhileStatementCodeGenerator extends BaseGenerator<WhileStatement> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: WhileStatement) {
		return `while (${createForAstNode(astNode.condition)}) {
            ${createForAstNode(astNode.body)}
        }\n`
	}
}
