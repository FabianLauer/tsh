import BaseGenerator from '../BaseGenerator'
import { register, createForAstNode } from '../factory'
import { ExprStatement } from '@/compiler/ast'

@register(node => node instanceof ExprStatement ? 1 : 0)
export class ExprCodeGenerator extends BaseGenerator<ExprStatement> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: ExprStatement) {
		return `${createForAstNode(astNode.expression)};\n`
	}
}
