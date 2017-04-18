import BaseGenerator from '../BaseGenerator'
import { register } from '../factory'
import { TypeExpr } from '@/compiler/ast'

@register(node => node instanceof TypeExpr ? Infinity : 0)
export class TypeExprCodeGenerator extends BaseGenerator<TypeExpr> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: TypeExpr) {
		let code = astNode.typeIdentifier.rawValue

		switch (code) {
			default:
				// do nothing
				break

			case 'Void':
			case 'Any':
			case 'String':
			case 'Int':
			case 'Float':
				code = `TSH.TypeScript.${code}`
				break
		}

		return code
	}
}
