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
		return astNode.body.nodes.map(createForAstNode)
	}
}
