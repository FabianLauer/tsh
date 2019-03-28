import { IAstTransformer } from '../IAstTransformer'
import { ClassDecl, Statement, VarDecl, VarDeclModifier, MethodDecl, BaseNode, FuncDecl, Comment, Token } from 'ast'
import { TransformedNodeWrapper } from '../TransformedNode'

export const classTransformer: IAstTransformer<ClassDecl, Statement> = classDecl => {
	const output: BaseNode[] = []

	// class name
	output.push(new Comment([new Token(`class ${classDecl.name.rawValue}`)]))

	const instanceVarDecls = classDecl.body.nodes.filter(node => (
		node instanceof VarDecl &&
		!VarDeclModifier.doesCombinationContain(
			node.modifiers,
			VarDeclModifier.Static
		)
	))

	const staticVarDecls = classDecl.body.nodes.filter(node => (
		node instanceof VarDecl &&
		VarDeclModifier.doesCombinationContain(
			node.modifiers,
			VarDeclModifier.Static
		)
	))

	const methodDecls = classDecl.body.nodes.filter((node): node is MethodDecl => (
		node instanceof MethodDecl
	))
	methodDecls.forEach(methodDecl => {
		const funcName = methodDecl.name.clone()
		const funcDecl = FuncDecl.create({
			funcName,
			funcBody: methodDecl.body,
			returnTypeDecl: methodDecl.returnTypeDecl,
			runtimeParamDecls: methodDecl.runtimeParamDecls
		})
		output.push(funcDecl)
	})

	return new TransformedNodeWrapper(
		classDecl,
		new Statement(output)
	)
}
