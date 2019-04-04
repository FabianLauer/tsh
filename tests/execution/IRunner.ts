import { CompileTarget } from '@/compiler/api'

export interface IRunnerExecutionResult {
	exitCode: number
	stdout: string
}

export interface IRunner {
	/**
	 * The name of the output language.
	 */
	readonly outputLanguageName: string


	/**
	 * The internal identifier for the compile target to be used with this test implementation.
	 */
	readonly compileTarget: CompileTarget


	/**
	 * The extension of the compile target file, without the leading dot.
	 * For example, `js` for JavaScript or `d.ts` for TypeScript declaration files.
	 */
	readonly fileExtension: string


	/**
	 * Executes a compiled program.
	 * @param outputFilePath The absolute path to the compiled program.
	 */
	execute(outputFilePath: string): Promise<IRunnerExecutionResult>
}

export default IRunner
