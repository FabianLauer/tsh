import { SourceUnit } from '@/compiler/ast'
import { BaseGenerator } from './BaseGenerator'
import { createForAstNode as createGeneratorForAstNode } from './factory'

/**
 * Main code generator for the bash compile target.
 */
export class CodeGenerator extends BaseGenerator<SourceUnit> {
	/**
	 * Generates code for a given syntax tree.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(ast: SourceUnit) {
		return ast.nodes.map(createGeneratorForAstNode).join('')
	}
}

export default CodeGenerator
