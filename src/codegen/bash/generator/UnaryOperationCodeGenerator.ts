import BaseGenerator from '../BaseGenerator'
import { register, createForAstNode } from '../factory'
import { UnaryOperation, UnaryOperatorPosition } from '@/compiler/ast'

@register(node => node instanceof UnaryOperation ? Infinity : 0)
export class UnaryOperationCodeGenerator extends BaseGenerator<UnaryOperation> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: UnaryOperation) {
		const parts = [
			createForAstNode(astNode.operand),
			createForAstNode(astNode.operator)
		]

		// The `parts` array is in `Postfix` order by default. We need to reverse it if
		// the operation's order is `Prefix`, otherwise we can just return the array.
		if (astNode.operatorPosition === UnaryOperatorPosition.Prefix) {
			return parts.reverse()
		}
		return parts
	}
}
