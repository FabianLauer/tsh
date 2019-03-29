import { IAstTransformer } from '../IAstTransformer'
import { ClassDecl, Statement, VarDecl, VarDeclModifier, MethodDecl, BaseNode, FuncDecl, Comment, Token } from 'ast'
import { TransformedNodeWrapper } from '../TransformedNode'
import { getUniqueNameToken } from './identification';

export const classTransformer: IAstTransformer<ClassDecl, Statement> = classDecl => {
	const output: BaseNode[] = []

	// class name
	output.push(new Comment([new Token(`class ${classDecl.name.rawValue}`)]))

	// static variable declarations
	const staticVarDecls = classDecl.body.nodes.filter((node): node is VarDecl => (
		node instanceof VarDecl &&
		VarDeclModifier.doesCombinationContain(
			node.modifiers,
			VarDeclModifier.Static
		)
	))
	staticVarDecls.forEach(staticVarDecl => {
		const varName = getUniqueNameToken(staticVarDecl)
		const varDecl = VarDecl.create({
			varName,
			assignment: staticVarDecl.assignment,
			modifiers: staticVarDecl.modifiers,
			typeDecl: staticVarDecl.typeDecl
		})
		output.push(varDecl)
	})

	// method declarations
	const methodDecls = classDecl.body.nodes.filter((node): node is MethodDecl => (
		node instanceof MethodDecl
	))
	methodDecls.forEach(methodDecl => {
		const funcName = getUniqueNameToken(methodDecl)

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
