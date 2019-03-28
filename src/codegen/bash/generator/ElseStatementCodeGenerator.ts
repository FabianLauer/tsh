import BaseGenerator from '../BaseGenerator'
import { register, createForAstNode } from '../codeGeneratorFactory'
import { ElseStatement } from '@/compiler/ast'

@register(node => node instanceof ElseStatement ? 1 : 0)
export class ElseStatementCodeGenerator extends BaseGenerator<ElseStatement> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: ElseStatement) {
		return `else {
			${astNode.nodes.map(createForAstNode).join('')}
		}\n`
	}
}
