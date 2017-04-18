import BaseGenerator from '../BaseGenerator'
import { register } from '../factory'
import { BaseNode } from '@/compiler/ast'

@register(node => node instanceof BaseNode ? 1 : 0)
export class IgnoredCodeGenerator extends BaseGenerator<BaseNode> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: BaseNode) {
		return ''
	}
}
