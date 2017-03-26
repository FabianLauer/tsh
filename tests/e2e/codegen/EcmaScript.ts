import { SourceUnit } from '@/compiler/ast'
import { CodeGenerator } from '@/compiler/codegen/ecmascript'
import ICodeGeneratorTestImpl from '../ICodeGeneratorTestImpl'

export const implementation = new class EcmaScriptImpl implements ICodeGeneratorTestImpl {
	/**
	 * The name of the output language.
	 * This is used to search for baseline files in the `e2e/baseline` directory.
	 */
	outputLanguageName = 'EcmaScript'

	/**
	 * Generate code for a certain AST node.
	 * @param ast The AST node to generate code for.
	 */
	generateCode(ast: SourceUnit): string {
		return new CodeGenerator(ast).generateCode()
	}

	/**
	 * Return the filename for the baseline of a certain test case.
	 */
	getBaselineFilename(testCasePath: string): string {
		return testCasePath.replace(/(.*)\.[a-z]+$/, '$1.js')
	}
}

export default implementation
