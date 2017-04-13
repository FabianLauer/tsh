import { CompileTarget } from '@/compiler/api'

export interface ICodeGeneratorTestImpl {
	/**
	 * The name of the output language.
	 * This is used to search for baseline files in the `e2e/baseline` directory.
	 */
	readonly outputLanguageName: string


	/**
	 * The internal identifier for the compile target to be used with this test implementation.
	 */
	readonly compileTarget: CompileTarget


	/**
	 * Return the filename for the baseline of a certain test case.
	 * @example
	 *     test-case.a    ->   test-case.b
	 */
	getBaselineFilename(testCasePath: string): string
}

export default ICodeGeneratorTestImpl
