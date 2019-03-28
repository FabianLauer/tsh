import BaseGenerator from '../BaseGenerator'
import { register } from '../codeGeneratorFactory'
import { Token } from '@/compiler/ast'

@register(node => node instanceof Token ? 1 : 0)
export class TokenCodeGenerator extends BaseGenerator<Token> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: Token) {
		return astNode.rawValue
	}
}
