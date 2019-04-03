import BaseGenerator from '../BaseGenerator'
import { register, createForAstNode } from '../codeGeneratorFactory'
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
		const code = [
			`${astNode.name.rawValue}() {`,
			astNode.runtimeParamDecls ? createForAstNode(astNode.runtimeParamDecls) : undefined,
			createForAstNode(astNode.body),
			'}'
		]

		// make sure there are newlines between all parts of the generated code
		return code
			.filter(Boolean)
			.map(part => part.toString())
			.map(part => part.slice(-1) !== '\n' ? `${part}\n` : part)
	}
}
