import BaseGenerator from '../BaseGenerator'
import { register, createForAstNode } from '../codeGeneratorFactory'
import { FuncCall } from '@/compiler/ast'

@register(node => node instanceof FuncCall ? Infinity : 0)
export class ExprListCodeGenerator extends BaseGenerator<FuncCall> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: FuncCall) {
		return [
			createForAstNode(astNode.identifier),
			'(', createForAstNode(astNode.parameterList), ')'
		]
	}
}
