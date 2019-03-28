import BaseGenerator from '../BaseGenerator'
import { register, createForAstNode } from '../codeGeneratorFactory'
import { ClassDecl, MethodDecl, VarDecl, VarDeclModifier } from '@/compiler/ast'

@register(node => node instanceof ClassDecl ? Infinity : 0)
export class ClassDeclCodeGenerator extends BaseGenerator<ClassDecl> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: ClassDecl) {
		const className = astNode.name.rawValue

		const instanceVarDecls = astNode.body.nodes.filter(node => (
			node instanceof VarDecl &&
			!VarDeclModifier.doesCombinationContain(
				node.modifiers,
				VarDeclModifier.Static
			)
		))

		const staticVarDecls = astNode.body.nodes.filter(node => (
			node instanceof VarDecl &&
			VarDeclModifier.doesCombinationContain(
				node.modifiers,
				VarDeclModifier.Static
			)
		))

		const methodDecls = astNode.body.nodes.filter(node => (
			node instanceof MethodDecl
		))

		return `
		/** @class ${className} */
		var ${className} = (function() {
			/** @constructor */
			function ${className}() {
				${instanceVarDecls.map(createForAstNode).join('')}
			}

			${staticVarDecls.map(createForAstNode).join('')}

			${methodDecls.map(createForAstNode).join('')}

			return function() {
				return new ${className}();
			};
		})();

		`
	}
}
