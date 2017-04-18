import BaseGenerator from '../BaseGenerator'
import { register, createForAstNode } from '../factory'
import { MethodDecl, ClassDecl } from '@/compiler/ast'

@register(node => node instanceof MethodDecl ? Infinity : 0)
export class MethodDeclCodeGenerator extends BaseGenerator<MethodDecl> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: MethodDecl) {
		const methodName = astNode.name.rawValue
		const classDecl = astNode.getClass()

		if (!(classDecl instanceof ClassDecl)) {
			throw new Error(`cannot find class for method '${methodName}'`)
		}

		let returnTypeExpr = createForAstNode(astNode.returnTypeDecl).toString()
		if (returnTypeExpr.length > 0) {
			returnTypeExpr = `: ${returnTypeExpr}`
		}

		return `public ${astNode.name.rawValue}(${createForAstNode(astNode.runtimeParamDecls)})${returnTypeExpr};\n`
	}
}
