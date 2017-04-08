import { VarDeclCodeGenerator } from './VarDeclCodeGenerator'
import { register } from '../factory'
import { VarDecl, Statement, ClassDecl } from '@/compiler/ast'

@register(node => (
	node instanceof VarDecl &&
	node.parent instanceof Statement &&
	node.parent.parent instanceof ClassDecl
) ? 10 : 0)
export class ClassVarDeclCodeGenerator extends VarDeclCodeGenerator {
	/**
	 * Generate the keyword part of the variable declaration, for example `var `.
	 * @override
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateDeclarationKeyword(astNode: VarDecl) {
		return 'this.'
	}
}
