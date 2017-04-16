import BaseGenerator from '../BaseGenerator'
import { register } from '../factory'
import { StringLiteral } from '@/compiler/ast'

@register(node => node instanceof StringLiteral ? Infinity : 0)
export class StringLiteralCodeGenerator extends BaseGenerator<StringLiteral> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: StringLiteral) {
		return `"${astNode.contentToken.rawValue}"`
	}
}
