import { VarDeclCodeGenerator } from './VarDeclCodeGenerator'
import { register } from '../factory'
import { VarDecl, VarDeclModifier, Statement, ClassDecl } from '@/compiler/ast'

@register(node => (
	node instanceof VarDecl &&
	node.parent instanceof Statement &&
	node.parent.parent instanceof ClassDecl
) ? 10 : 0)
export class ClassVarDeclCodeGenerator extends VarDeclCodeGenerator {
	/**
	 * Generate the keyword part of the variable declaration, for example `var `.
	 * @override
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateDeclarationKeyword(astNode: VarDecl) {
		const isStatic = VarDeclModifier.doesCombinationContain(
			astNode.modifiers,
			VarDeclModifier.Static
		)

		if (isStatic) {
			return this.generateStaticVarDeclarationKeyword(astNode)
		} else {
			return this.generateInstanceVarDeclarationKeyword()
		}
	}


	private generateInstanceVarDeclarationKeyword(): string {
		return 'this.'
	}


	private generateStaticVarDeclarationKeyword(astNode: VarDecl): string {
		const varName = astNode.name.rawValue
		const classDecl = <ClassDecl>astNode.parent.parent

		if (!(classDecl instanceof ClassDecl)) {
			throw new Error(`cannot find class for static var decl '${varName}'`)
		}

		const className = classDecl.name.rawValue

		return `${className}.`
	}
}
