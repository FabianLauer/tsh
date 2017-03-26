import { SourceUnit } from '@/compiler/ast'

export interface ICodeGeneratorTestImpl {
	/**
	 * The name of the output language.
	 * This is used to search for baseline files in the `e2e/baseline` directory.
	 */
	outputLanguageName: string

	/**
	 * Generate code for a certain AST node.
	 * @param ast The AST node to generate code for.
	 */
	generateCode(ast: SourceUnit): string

	/**
	 * Return the filename for the baseline of a certain test case.
	 * @example
	 *     test-case.a    ->   test-case.b
	 */
	getBaselineFilename(testCasePath: string): string
}

export default ICodeGeneratorTestImpl
