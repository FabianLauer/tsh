import BaseGenerator from '../BaseGenerator'
import { register } from '../factory'
import { VarDecl } from '@/compiler/ast'

@register(node => node instanceof VarDecl ? 1 : 0)
export class VarDeclCodeGenerator extends BaseGenerator<VarDecl> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: VarDecl) {
		return `${this.generateDeclarationKeyword(astNode)}${astNode.name.rawValue};\n`
	}


	/**
	 * Generate the keyword part of the variable declaration, for example `var `.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateDeclarationKeyword(astNode: VarDecl) {
		return 'var '
	}
}
