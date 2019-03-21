import BaseGenerator from '../BaseGenerator'
import { register, createForAstNode } from '../factory'
import { EnumDecl, EnumMemberDecl } from '@/compiler/ast'

@register(node => node instanceof EnumDecl ? Infinity : 0)
export class EnumDeclCodeGenerator extends BaseGenerator<EnumDecl> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: EnumDecl) {
		const className = astNode.name.rawValue

		const memberDecls = astNode.body.nodes.filter(node => (
			node instanceof EnumMemberDecl
		))

		return `export enum ${className} {
			${memberDecls.map(createForAstNode).join(',\n')}
		}\n\n`
	}
}
