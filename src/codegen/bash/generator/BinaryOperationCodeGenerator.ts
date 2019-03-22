import BaseGenerator from '../BaseGenerator'
import { register, createForAstNode } from '../factory'
import { BinaryOperation } from '@/compiler/ast'

@register(node => node instanceof BinaryOperation ? 1 : 0)
export class BinaryOperationCodeGenerator extends BaseGenerator<BinaryOperation> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: BinaryOperation) {
		let operatorCode = createForAstNode(astNode.operator).toString()

		if (operatorCode !== '.') {
			operatorCode = ` ${operatorCode} `
		}

		return [
			createForAstNode(astNode.leftOperand),
			operatorCode,
			createForAstNode(astNode.rightOperand)
		].join('')
	}
}
