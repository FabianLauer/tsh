import { IAstTransformer } from '../IAstTransformer'
import { ClassDecl, Statement, VarDecl, VarDeclModifier, MethodDecl, BaseNode, FuncDecl } from 'ast'
import { TransformedNodeWrapper } from '../TransformedNode'
import { getUniqueNameToken } from './identification'
import { createDeclarationComment } from './declarationComments'

export const classTransformer: IAstTransformer<ClassDecl, Statement> = classDecl => {
	const output: BaseNode[] = []

	// opening declaration comment
	output.push(createDeclarationComment(classDecl, 'open'))

	// static variable declarations
	const staticVarDecls = classDecl.body.nodes.filter((node): node is VarDecl => (
		node instanceof VarDecl &&
		VarDeclModifier.doesCombinationContain(
			node.modifiers,
			VarDeclModifier.Static
		)
	))
	staticVarDecls.forEach(staticVarDecl => {
		// opening declaration comment
		output.push(createDeclarationComment(staticVarDecl, 'open'))

		// transformed node
		const varName = getUniqueNameToken(staticVarDecl)
		const varDecl = VarDecl.create({
			varName,
			assignment: staticVarDecl.assignment,
			modifiers: staticVarDecl.modifiers,
			typeDecl: staticVarDecl.typeDecl
		})
		output.push(varDecl)

		// closing declaration comment
		output.push(createDeclarationComment(staticVarDecl, 'close'))
	})

	// method declarations
	const methodDecls = classDecl.body.nodes.filter((node): node is MethodDecl => (
		node instanceof MethodDecl
	))
	methodDecls.forEach(methodDecl => {
		// opening declaration comment
		output.push(createDeclarationComment(methodDecl, 'open'))

		// transformed node
		const funcName = getUniqueNameToken(methodDecl)

		const funcDecl = FuncDecl.create({
			funcName,
			funcBody: methodDecl.body,
			returnTypeDecl: methodDecl.returnTypeDecl,
			runtimeParamDecls: methodDecl.runtimeParamDecls
		})
		output.push(funcDecl)

		// closing declaration comment
		output.push(createDeclarationComment(methodDecl, 'close'))
	})

	// closing declaration comment
	output.push(createDeclarationComment(classDecl, 'close'))

	return new TransformedNodeWrapper(
		classDecl,
		new Statement(output)
	)
}
