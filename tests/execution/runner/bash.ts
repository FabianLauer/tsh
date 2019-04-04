import { CompileTarget } from '@/compiler/api'
import IRunner, { IRunnerExecutionResult } from '../IRunner'
import { exec } from 'child_process'

export const context = new class BashRunner implements IRunner {
	readonly outputLanguageName = 'bash'
	readonly compileTarget = CompileTarget.Bash
	readonly fileExtension = 'sh'

	async execute(outputFilePath: string) {
		return new Promise<IRunnerExecutionResult>((resolve, reject) => {
			let stdout = ''

			const process = exec(`bash ${outputFilePath}`, err => {
				if (err) {
					reject(err)
				}
			})

			process.stdout.on('data', data => stdout += data)
			process.on('exit', exitCode => resolve({ exitCode, stdout }))
		})
	}
}

export default context
