import BaseGenerator from '../BaseGenerator'
import { register, createForAstNode } from '../factory'
import { BaseNode, Expr } from '@/compiler/ast'

@register(node => node instanceof Expr ? 1 : 0)
export class ExprCodeGenerator extends BaseGenerator<Expr> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: Expr) {
		if (astNode.content instanceof BaseNode) {
			return createForAstNode(astNode.content)
		}
		return (<any>astNode.content).toString()
	}
}
