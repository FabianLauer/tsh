import { CompileTarget } from '@/compiler/api'
import ICodeGeneratorTestContext from '../ICodeGeneratorTestContext'

export const context = new class EcmaScriptTestContext implements ICodeGeneratorTestContext {
	/**
	 * The name of the output language.
	 * This is used to search for baseline files in the `e2e/baseline` directory.
	 */
	readonly outputLanguageName = 'bash'

	/**
	 * The internal identifier for the compile target to be used with this test implementation.
	 */
	readonly compileTarget = CompileTarget.Bash

	/**
	 * Return the filename for the baseline of a certain test case.
	 */
	getBaselineFilename(testCasePath: string): string {
		return testCasePath.replace(/(.*)\.[a-z]+$/, '$1.sh')
	}
}

export default context
