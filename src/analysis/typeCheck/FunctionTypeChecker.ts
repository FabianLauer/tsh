import * as ast from '@/compiler/ast'
import { register } from './typeCheckerFactory'
import TypeChecker from './TypeChecker'

@register(node => (node instanceof ast.FuncDecl ? Infinity : 0))
export class FunctionTypeChecker extends TypeChecker<ast.FuncDecl> {
	/** Performs type checking and updates the `TypeChecker` instance's result state along the way. */
	protected performTypeCheckConcrete(): void {
		// run type checks on the parameter declaration list and the function body
		this.runSubsequentTypeChecksOn(
			this.getAstNode().runtimeParamDecls,
			this.getAstNode().body
		)
	}
}

export default FunctionTypeChecker
