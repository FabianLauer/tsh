import BaseGenerator from '../BaseGenerator'
import { register } from '../codeGeneratorFactory'
import { Operator, OperatorIdent } from '@/compiler/ast'

@register(node => node instanceof Operator ? 1 : 0)
export class OperatorCodeGenerator extends BaseGenerator<Operator> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: Operator) {
		if (typeof astNode.ident === 'string') {
			return astNode.ident
		}
		return OperatorIdent[astNode.ident]
	}
}
