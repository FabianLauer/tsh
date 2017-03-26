import BaseGenerator from '../BaseGenerator'
import { register, createForAstNode } from '../factory'
import { Statement } from '@/compiler/ast'

@register(node => node instanceof Statement ? 1 : 0)
export class StatmenetCodeGenerator extends BaseGenerator<Statement> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: Statement) {
		return astNode.nodes.map(createForAstNode).join('')
	}
}
