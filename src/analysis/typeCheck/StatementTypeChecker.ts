import * as ast from '@/compiler/ast'
import { SymbolTable } from '@/compiler/analysis'
import { register } from './typeCheckerFactory'
import { TypeChecker, TypeCheckIssue } from './'

@register(node => (node instanceof ast.Statement ? Infinity : 0))
export class StatementTypeChecker extends TypeChecker<ast.Statement> {
	/** Performs type checking and updates the `TypeChecker` instance's result state along the way. */
	protected performTypeCheckConcrete(): void {
		const symbolTable = SymbolTable.getSymbolTableForAstNode(this.getAstNode())

		const childNodesInScope = ast.utils.flattenContainerNode(
			this.getAstNode(),
			_ => !SymbolTable.isScopeNode(_)
		)

		const identifiers = ast.utils.filterByNodeType(
			childNodesInScope,
			ast.Identifier
		)

		for (const identifier of identifiers) {
			if (!symbolTable.wasSymbolWithNameDeclared(identifier.name.rawValue)) {
				this.addIssue(
					new TypeCheckIssue.Issues.IdentifierUsedButNeverDeclared(identifier)
				)
			}
		}
	}
}

export default StatementTypeChecker
