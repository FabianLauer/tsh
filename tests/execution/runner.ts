import { CompilerApi } from '@/compiler/api'
import { readdirSync, statSync, readFileSync, writeFileSync, unlinkSync } from 'fs'
import IRunner from './IRunner'
import { importFromDirectorySync } from 'utils/importUtils'
import { assert } from '../utils'

const basedir = `${process.cwd()}/tests/execution/`

// Import all runner implementations from `./codegen/`.
// The files in the directory are expected to export their code
// generator implementation as `exports.default`.
const runners = importFromDirectorySync<
	IRunner & { 'default'?: IRunner }
>(
	`${__dirname}/runner/`,
	filename => (/.*\.(j|t)s$/g).test(filename)
)
	// if necessary, unwrap the `export default ...`
	.map(imports => imports.default || imports)


// Get all directory names from the `./cases/` directory.
const caseDirs = readdirSync(`${basedir}/cases/`)
	.map(dirName => `${basedir}/cases/${dirName}`)
	.filter(dirPath => statSync(dirPath).isDirectory())


// Run all tests:
describe('Execution:', () => {
	for (const dirPath of caseDirs) {
		const dirName = dirPath.replace(/^.*\//, '')

		// read the configuration file
		const config = getConfig(dirPath)

		for (const languageName in config) {
			const languageConfig = config[languageName]
			const runner = getRunnerByLanguageName(languageName)

			if (!runner) {
				throw new Error(`No runner for configured language "${languageName}" in ${dirName}`)
			}

			describe(
				`${dirName} -> ${runner.outputLanguageName}`,
				() => runTestCase(dirPath, runner, languageConfig)
			)
		}
	}
})


function getRunnerByLanguageName(languageName: string) {
	return runners.find(runner => runner.outputLanguageName === languageName)
}


interface ITestCaseLanguageConfig {
	expectation: {
		exitCode: number
		stdout: string
	}
}


interface ITestCaseConfig {
	[languageName: string]: ITestCaseLanguageConfig
}


function getConfig(testCaseDirPath: string) {
	const rawConfig = readFileSync(`${testCaseDirPath}/config.json`).toString('utf8')
	return <ITestCaseConfig>JSON.parse(rawConfig)
}


/**
 * Runs a specific execution test case.
 * @param testCaseDirPath The path to the test case directory.
 * @param runner The code generator implementation to use.
 * @param config The test's config for the given language. Extracted from the test case config file.
 */
function runTestCase(
	testCaseDirPath: string,
	runner: IRunner,
	config: ITestCaseLanguageConfig
): void {
	// try to parse the source code
	const sourceCode = readFileSync(`${testCaseDirPath}/main.tsh`).toString('utf8')
	const api = CompilerApi.create()
	const transpiledCode = api.compileSourceCode(sourceCode, runner.compileTarget)

	// write the output file
	const testCaseName = testCaseDirPath.replace(/^.*\//, '')
	const outputFilePath = `${basedir}/output/${testCaseName}.${runner.fileExtension}`
	writeFileSync(outputFilePath, transpiledCode)

	// compare the transpiled code to the baseline code
	it('transpiled code should match baseline', async () => {
		const result = await runner.execute(outputFilePath)

		// assert exit code
		assert(
			result.exitCode === config.expectation.exitCode,
			`exit code as expected: expected ${config.expectation.exitCode}, got ${result.exitCode}`
		)

		// assert stdout
		if ('stdout' in config.expectation) {
			assert(
				result.stdout === config.expectation.stdout,
				`stdout as expected: expected "${config.expectation.stdout}", got "${result.stdout}"`
			)
		}
	})
}
