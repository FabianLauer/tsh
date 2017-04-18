import BaseGenerator from '../BaseGenerator'
import { register, createForAstNode } from '../factory'
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

		return `export class ${className} {
			${staticVarDecls.map(createForAstNode).join('')}
			${instanceVarDecls.map(createForAstNode).join('')}
			${methodDecls.map(createForAstNode).join('')}
		}\n`
	}
}
