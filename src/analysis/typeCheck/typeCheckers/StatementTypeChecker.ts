import * as ast from '@/compiler/ast'
import { register } from './../typeCheckerFactory'
import TypeChecker from './../TypeChecker'

@register(node => (node instanceof ast.Statement ? Infinity : 0))
export class StatementTypeChecker extends TypeChecker<ast.Statement> {
	/** Performs type checking and updates the `TypeChecker` instance's result state along the way. */
	protected performTypeCheckConcrete(): void {
		this.astNode.getChildNodes()
			.forEach((node: ast.BaseNode) => this.runSubsequentTypeChecksOn(node))
	}
}

export default TypeChecker
