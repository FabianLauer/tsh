import { CompileTarget } from '@/compiler/api'
import ICodeGeneratorTestContext from '../ICodeGeneratorTestContext'

export const context = new class TypeScriptDeclarationsTestContext implements ICodeGeneratorTestContext {
	/**
	 * The name of the output language.
	 * This is used to search for baseline files in the `e2e/baseline` directory.
	 */
	readonly outputLanguageName = 'TypeScriptDeclarations'

	/**
	 * The internal identifier for the compile target to be used with this test implementation.
	 */
	readonly compileTarget = CompileTarget.TypeScriptDeclarations

	/**
	 * Return the filename for the baseline of a certain test case.
	 */
	getBaselineFilename(testCasePath: string): string {
		return testCasePath.replace(/(.*)\.[a-z]+$/, '$1.d.ts')
	}
}

export default context
