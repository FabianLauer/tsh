import BaseGenerator from '../BaseGenerator'
import { register, createForAstNode } from '../factory'
import { ClassDecl } from '@/compiler/ast'

@register(node => node instanceof ClassDecl ? Infinity : 0)
export class ClassDeclCodeGenerator extends BaseGenerator<ClassDecl> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: ClassDecl) {
		const className = astNode.name.rawValue

		return `
		/** @class ${className} */
		var ${className} = (function() {
			/** @constructor */
			function ${className}() {
				${createForAstNode(astNode.body)}
			}

			return ${className};
		})();

		`
	}
}
