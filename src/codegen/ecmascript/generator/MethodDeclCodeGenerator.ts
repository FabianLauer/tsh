import BaseGenerator from '../BaseGenerator'
import { FuncDeclCodeGenerator } from './FuncDeclCodeGenerator'
import { register } from '../factory'
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

		const className = classDecl.name.rawValue

		return [
			`${className}.prototype.${methodName} = `,
			new FuncDeclCodeGenerator(astNode).generateCode().trim(),
			'\n'
		].join('')
	}
}
