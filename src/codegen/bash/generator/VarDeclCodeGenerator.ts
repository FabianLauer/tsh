import BaseGenerator from '../BaseGenerator'
import { register, createForAstNode } from '../codeGeneratorFactory'
import { VarDecl } from '@/compiler/ast'

@register(node => node instanceof VarDecl ? 1 : 0)
export class VarDeclCodeGenerator extends BaseGenerator<VarDecl> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: VarDecl) {
		let assignmentCode = ''
		if (typeof astNode.assignment.content !== 'undefined') {
			assignmentCode = ` = ${createForAstNode(astNode.assignment)}`
		}
		return `${astNode.name.rawValue}${assignmentCode};\n`
	}
}
