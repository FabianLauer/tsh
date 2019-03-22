import BaseGenerator from '../BaseGenerator'
import { register, createForAstNode } from '../factory'
import { PrecedenceExpr } from '@/compiler/ast'

@register(node => node instanceof PrecedenceExpr ? Infinity : 0)
export class PrecedenceExprCodeGenerator extends BaseGenerator<PrecedenceExpr<any>> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: PrecedenceExpr<any>) {
		return ['(', createForAstNode(astNode.expr), ')']
	}
}
