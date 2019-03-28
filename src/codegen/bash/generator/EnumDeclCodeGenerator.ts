import BaseGenerator from '../BaseGenerator'
import { register, createForAstNode } from '../codeGeneratorFactory'
import { EnumDecl, EnumMemberDecl } from '@/compiler/ast'

@register(node => node instanceof EnumDecl ? Infinity : 0)
export class EnumDeclCodeGenerator extends BaseGenerator<EnumDecl> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: EnumDecl) {
		const enumName = astNode.name.rawValue

		const memberDecls = astNode.body.nodes.filter(node => (
			node instanceof EnumMemberDecl
		))

		return `
		/** @enum ${enumName} */
		var ${enumName} = {
			${memberDecls.map(createForAstNode).join(',\n')}
		};\n\n`
	}
}
