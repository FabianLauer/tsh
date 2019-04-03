import BaseGenerator from '../BaseGenerator'
import { register, createForAstNode } from '../codeGeneratorFactory'
import { VarDecl, FuncDecl } from '@/compiler/ast'
import { hasRemoteParent } from 'ast/utils/traverse'

@register(node => node instanceof VarDecl ? 1 : 0)
export class VarDeclCodeGenerator extends BaseGenerator<VarDecl> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: VarDecl) {
		const prefix = this.isInsideFunctionDeclaration(astNode) ? 'local ' : ''

		let assignmentCode = ''
		if (typeof astNode.assignment.content !== 'undefined') {
			assignmentCode = `=${createForAstNode(astNode.assignment)}`
		}

		return `${prefix}${astNode.name.rawValue}${assignmentCode};\n`
	}

	/**
	 * Checks if the variable was declared inside a function declaration.
	 */
	private isInsideFunctionDeclaration(astNode: VarDecl): boolean {
		return hasRemoteParent(astNode, parent => parent instanceof FuncDecl)
	}
}
