import { IAstTransformer } from '../IAstTransformer'
import { Statement, BaseNode, EnumDecl, EnumMemberDecl } from 'ast'
import { TransformedNodeWrapper } from '../TransformedNode'
import { getUniqueNameToken } from './identification'
import { createDeclarationComment } from './declarationComments'

export const enumTransformer: IAstTransformer<EnumDecl, Statement> = enumDecl => {
	const output: BaseNode[] = []

	// opening declaration comment
	output.push(createDeclarationComment(enumDecl, 'open'))

	// static variable declarations
	const memberDecls = enumDecl.body.nodes.filter((node): node is EnumMemberDecl => (
		node instanceof EnumMemberDecl
	))
	memberDecls.forEach(astNode => {
		const memberName = getUniqueNameToken(astNode)
		const memberDecl = new EnumMemberDecl(memberName)
		output.push(memberDecl)
	})

	// closing declaration comment
	output.push(createDeclarationComment(enumDecl, 'close'))

	return new TransformedNodeWrapper(
		enumDecl,
		new Statement(output)
	)
}
