import BaseGenerator from '../BaseGenerator'
import { register } from '../factory'
import { Statement } from '@/compiler/ast'

@register(node => node === Statement.Empty ? Infinity : 0)
export class EmptyStatmenetCodeGenerator extends BaseGenerator<Statement> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: Statement) {
		return ''
	}
}
