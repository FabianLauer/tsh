import BaseGenerator from '../BaseGenerator'
import { register, createForAstNode } from '../factory'
import { FuncDecl, MethodDecl } from '@/compiler/ast'

@register(node => (
	node instanceof FuncDecl && !(node instanceof MethodDecl)
		? Infinity
		: 0
))
export class FuncDeclCodeGenerator extends BaseGenerator<FuncDecl> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: FuncDecl) {
		return `
		${astNode.name.rawValue}() {
			# parameter declarations:
			${createForAstNode(astNode.runtimeParamDecls)}

			# function implementation:
			${createForAstNode(astNode.body)}
		}
		`
	}
}
