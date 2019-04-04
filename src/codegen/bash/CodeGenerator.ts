import { SourceUnit, IContainerNode, ClassDecl, EnumDecl } from '@/compiler/ast'
import { BaseGenerator } from './BaseGenerator'
import { createForAstNode as createGeneratorForAstNode } from './codeGeneratorFactory'
import { classTransformer } from './transformer/classTransformer'
import { enumTransformer } from './transformer/enumTransformer'

/**
 * Main code generator for the bash compile target.
 */
export class CodeGenerator extends BaseGenerator<SourceUnit> {
	/**
	 * Generates code for a given syntax tree.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(ast: SourceUnit) {
		const transformed = this.transformAstInContainerNode(ast.clone())
		const transformedCode = transformed.getChildNodes().map(createGeneratorForAstNode).join('')

		const code = [
			'# library:',
			this.getLibFileCode(),
			'# program',
			transformedCode,
			'# entry point:',
			'main',
			'exit $?'
		]

		return code.join('\n')
	}

	private getLibFileCode(): string {
		return `
			print() {
				local message=$1
				printf $message
			}
		`
	}

	private transformAstInContainerNode(ast: IContainerNode.Any): IContainerNode.Any {
		ast.getChildNodes().forEach(node => {
			if (node instanceof ClassDecl) {
				const transformation = classTransformer(node)
				ast.replaceChildNode(
					transformation.originalNode,
					transformation.transformedNode
				)
			}

			if (node instanceof EnumDecl) {
				const transformation = enumTransformer(node)
				ast.replaceChildNode(
					transformation.originalNode,
					transformation.transformedNode
				)
			}
		})

		return ast
	}
}

export default CodeGenerator
