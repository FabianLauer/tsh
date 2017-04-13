import BaseGenerator from '../BaseGenerator'
import { register, createForAstNode } from '../factory'
import { ClassDecl, MethodDecl, VarDecl } from '@/compiler/ast'

@register(node => node instanceof ClassDecl ? Infinity : 0)
export class ClassDeclCodeGenerator extends BaseGenerator<ClassDecl> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: ClassDecl) {
		const className = astNode.name.rawValue
		const memberVarDecls = astNode.body.nodes.filter(node => (
			node instanceof VarDecl
		))
		const methodDecls = astNode.body.nodes.filter(node => (
			node instanceof MethodDecl
		))

		return `
		/** @class ${className} */
		var ${className} = (function() {
			/** @constructor */
			function ${className}() {
				${memberVarDecls.map(createForAstNode).join('')}
			}

			${methodDecls.map(createForAstNode).join('')}

			return ${className};
		})();

		`
	}
}
