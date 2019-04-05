import { SourceUnit } from '@/compiler/ast'
import { BaseGenerator } from './BaseGenerator'
import { createForAstNode as createGeneratorForAstNode } from './codeGeneratorFactory'
import { astTransformer } from './transformer/astTransformer'

/**
 * Main code generator for the bash compile target.
 */
export class CodeGenerator extends BaseGenerator<SourceUnit> {
	/**
	 * Generates code for a given syntax tree.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(ast: SourceUnit) {
		const transformedAst = astTransformer(ast)
		const transformedCode = transformedAst.transformedNode.getChildNodes().map(createGeneratorForAstNode).join('')

		const code = [
			// add the library code
			this.createSectionComment('library'),
			this.getLibFileCode(),

			// add the actual program code
			this.createSectionComment('program'),
			transformedCode,

			// add code that starts the program
			this.createSectionComment('program entry point'),
			'main',
			'exit $?'
		]

		return code.join('\n')
	}

	private createSectionComment(sectionTitle: string) {
		return [
			'#####',
			`##### ${sectionTitle}`,
			'#####'
		].join('\n')
	}

	private getLibFileCode(): string {
		const code = `
			print() {
				local message=$1
				printf $message
			}`

		return code
			// remove the first blank line
			.replace(/\n/, '')
			// remove the unnecessary indentation from the code
			.replace(/\n\t{3}/g, '\n') +
			// append a newline
			'\n'
	}
}

export default CodeGenerator
