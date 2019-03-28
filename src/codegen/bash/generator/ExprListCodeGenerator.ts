import BaseGenerator from '../BaseGenerator'
import { register, createForAstNode } from '../codeGeneratorFactory'
import { ExprList } from '@/compiler/ast'

@register(node => node instanceof ExprList ? Infinity : 0)
export class ExprListCodeGenerator extends BaseGenerator<ExprList<any>> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: ExprList<any>) {
		return astNode.expressions.map(createForAstNode).join(', ')
	}
}
