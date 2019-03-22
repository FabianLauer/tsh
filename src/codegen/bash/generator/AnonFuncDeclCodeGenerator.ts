import BaseGenerator from '../BaseGenerator'
import { register } from '../factory'
import { AnonFuncDecl, FuncDecl, MethodDecl } from '@/compiler/ast'

@register(node => (
	node instanceof AnonFuncDecl &&
	!(node instanceof FuncDecl) &&
	!(node instanceof MethodDecl)
		? Infinity
		: 0
))
export class AnonFuncDeclCodeGenerator extends BaseGenerator<AnonFuncDecl> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: AnonFuncDecl) {
		return `# anon func decl #`
	}
}
