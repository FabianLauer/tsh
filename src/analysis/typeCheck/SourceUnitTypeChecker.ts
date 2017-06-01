import * as ast from '@/compiler/ast'
import { register } from './typeCheckerFactory'
import TypeChecker from './TypeChecker'

@register(node => (node instanceof ast.SourceUnit ? Infinity : 0))
export class SourceUnitTypeChecker extends TypeChecker<ast.SourceUnit> {
	/** Performs type checking and updates the `TypeChecker` instance's result state along the way. */
	protected performTypeCheckConcrete(): void {
		this.runSubsequentTypeChecksOn(...this.getAstNode().getChildNodes())
	}
}

export default SourceUnitTypeChecker
