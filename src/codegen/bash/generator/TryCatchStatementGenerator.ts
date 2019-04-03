import BaseGenerator from '../BaseGenerator'
import { register, createForAstNode } from '../codeGeneratorFactory'
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
		return `{
			${createForAstNode(astNode.attemptStatement)}
		}`
	}

	private generateCatchBlockWithoutErrorVariable(astNode: TryCatchStatement) {
		return ` || {
			${createForAstNode(astNode.errorHandlerStatement)}
		}\n`
	}

	private generateCatchBlockWithErrorVariable(astNode: TryCatchStatement) {
		return ` 2>$1 | {
			read -d "\0" -t 0.01 ${astNode.errorIdentifier.name.rawValue}
			if [-z "$error"]; then
				${createForAstNode(astNode.errorHandlerStatement)}
			fi
		}\n`
	}
}
