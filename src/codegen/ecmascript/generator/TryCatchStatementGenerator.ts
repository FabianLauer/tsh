import BaseGenerator from '../BaseGenerator'
import { register, createForAstNode } from '../factory'
import { TryCatchStatement } from '@/compiler/ast'

@register(node => node instanceof TryCatchStatement ? Infinity : 0)
export class TryCatchStatementCodeGenerator extends BaseGenerator<TryCatchStatement> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: TryCatchStatement) {
		let code = this.generateTryBlock(astNode)

		if (astNode.errorIdentifier) {
			code += this.generateCatchBlockWithErrorVariable(astNode)
		} else {
			code += this.generateCatchBlockWithoutErrorVariable(astNode)
		}

		return code
	}

	private generateTryBlock(astNode: TryCatchStatement) {
		return `try {
			${createForAstNode(astNode.attemptStatement)}
		}`
	}

	private generateCatchBlockWithoutErrorVariable(astNode: TryCatchStatement) {
		return ` catch {
			${createForAstNode(astNode.errorHandlerStatement)}
		}`
	}

	private generateCatchBlockWithErrorVariable(astNode: TryCatchStatement) {
		return ` catch (${astNode.errorIdentifier.name.rawValue}) {
			${createForAstNode(astNode.errorHandlerStatement)}
		}`
	}
}
