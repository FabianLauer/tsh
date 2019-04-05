import { IAstTransformer } from '../IAstTransformer'
import { SourceUnit, ClassDecl, EnumDecl } from 'ast'
import { TransformedNodeWrapper } from '../TransformedNode'
import { classTransformer } from './classTransformer'
import { enumTransformer } from './enumTransformer'

export const astTransformer: IAstTransformer<SourceUnit, SourceUnit> = originalAst => {
	const transformedAst = originalAst.clone()

	transformedAst.getChildNodes().forEach(node => {
		if (node instanceof ClassDecl) {
			const transformation = classTransformer(node)
			transformedAst.replaceChildNode(
				transformation.originalNode,
				transformation.transformedNode
			)
		}

		if (node instanceof EnumDecl) {
			const transformation = enumTransformer(node)
			transformedAst.replaceChildNode(
				transformation.originalNode,
				transformation.transformedNode
			)
		}
	})

	return new TransformedNodeWrapper(
		originalAst,
		transformedAst
	)
}
