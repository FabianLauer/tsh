import BaseGenerator from '../BaseGenerator'
import { register } from '../codeGeneratorFactory'
import { EnumMemberDecl } from '@/compiler/ast'

@register(node => node instanceof EnumMemberDecl ? Infinity : 0)
export class EnumMemberDeclCodeGenerator extends BaseGenerator<EnumMemberDecl> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: EnumMemberDecl) {
		const declName = astNode.name.rawValue

		return `'${declName}': '${declName}'`
	}
}
