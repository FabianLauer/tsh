import * as ast from '@/compiler/ast'
import { register } from './typeCheckerFactory'
import TypeChecker from './TypeChecker'

@register(node => 1)
export class NoOpTypeChecker extends TypeChecker<ast.Statement> {
	/** Performs type checking and updates the `TypeChecker` instance's result state along the way. */
	protected performTypeCheckConcrete(): void {
		return
	}
}

export default NoOpTypeChecker
