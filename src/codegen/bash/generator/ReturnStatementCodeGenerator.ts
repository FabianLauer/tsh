import BaseGenerator from '../BaseGenerator'
import { register, createForAstNode } from '../factory'
import { ReturnStatement } from '@/compiler/ast'

@register(node => node instanceof ReturnStatement ? Infinity : 0)
export class ReturnStatementCodeGenerator extends BaseGenerator<ReturnStatement> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: ReturnStatement) {
		return `return ${createForAstNode(astNode.returnValue)};\n`
	}
}
