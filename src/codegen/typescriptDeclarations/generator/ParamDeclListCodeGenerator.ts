import BaseGenerator from '../BaseGenerator'
import { register, createForAstNode } from '../factory'
import { ParamDeclList } from '@/compiler/ast'

@register(node => node instanceof ParamDeclList ? Infinity : 0)
export class ParamDeclListCodeGenerator extends BaseGenerator<ParamDeclList> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: ParamDeclList) {
		return astNode.paramDecls.map(
			paramDecl => {
				let typeExpr = createForAstNode(paramDecl.typeDecl).toString()
				if (typeExpr.length > 0) {
					typeExpr = `: ${typeExpr}`
				}
				return `${paramDecl.name.rawValue}${typeExpr}`
			}
		).join(', ')
	}
}


