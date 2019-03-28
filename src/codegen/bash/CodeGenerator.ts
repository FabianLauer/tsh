import { SourceUnit, IContainerNode, ClassDecl } from '@/compiler/ast'
import { BaseGenerator } from './BaseGenerator'
import { createForAstNode as createGeneratorForAstNode } from './codeGeneratorFactory'
import { classTransformer } from './transformer/ClassTransformer'

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
		return transformed.getChildNodes().map(createGeneratorForAstNode).join('')
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
		})

		return ast
	}
}

export default CodeGenerator
