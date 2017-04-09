import * as parser from '@/compiler/parser'
import { readdirSync, statSync, readFileSync } from 'fs'
import ICodeGeneratorTestImpl from './ICodeGeneratorTestImpl'
import { importFromDirectorySync } from 'utils/importUtils'

const basedir = `${process.cwd()}/tests/e2e/`

// Import all code generator implementations from `./codegen/`.
// The files in the directory are expected to export their code
// generator implementation as `exports.default`.
const codeGenerators = importFromDirectorySync<
	ICodeGeneratorTestImpl & { 'default'?: ICodeGeneratorTestImpl }
>(
	`${__dirname}/codegen/`,
	filename => (/.*\.(j|t)s$/g).test(filename)
)
	// if necessary, unwrap the `export default ...`
	.map(imports => imports.default || imports)


// Get all file names from the `./cases/` directory.
const files = readdirSync(`${basedir}/cases/`)
	.map(filename => `${basedir}/cases/${filename}`)
	.filter(filepath => statSync(filepath).isFile())


// Run all end to end tests:
describe('E2E:', () => {
	for (const filePath of files) {
		const filename = filePath.replace(/^.*\//, '')
		for (const codeGenerator of codeGenerators) {
			it(
				`${filename} -> ${codeGenerator.outputLanguageName}`,
				() => runTestCase(filePath, codeGenerator)
			)
		}
	}
})


/**
 * Runs a specific E2E test case.
 * @param testCaseFilePath The path to the test case file.
 * @param codeGenerator The code generator implementation to use.
 */
function runTestCase(
	testCaseFilePath: string,
	codeGenerator: ICodeGeneratorTestImpl
): void {
	// try to parse the source code
	const sourceCode = readFileSync(testCaseFilePath).toString('utf8')
	const sourceUnit = parser.parseToSourceUnit(testCaseFilePath, sourceCode)

	// transpile using the code generator implementation
	const transpiledCode = codeGenerator.generateCode(sourceUnit)

	// read the baseline file
	const testCaseFileName = testCaseFilePath.replace(/^.*\//, '')
	const baselineFileName = codeGenerator.getBaselineFilename(testCaseFileName)
	const baselinePath = `${basedir}/baseline/${codeGenerator.outputLanguageName}/`
	const baselineCode = readFileSync(`${baselinePath}/${baselineFileName}`).toString('utf8')

	// compare the transpiled code to the baseline code
	it('transpiled code should match baseline', () => {
		if (normalizeCode(baselineCode) !== normalizeCode(transpiledCode)) {
			printDiff(normalizeCode(baselineCode), normalizeCode(transpiledCode))
			throw new Error(`Transpiled code does not match baseline.`)
		}
	})
}


function normalizeCode(code: string): string {
	return code.split('\n')
		.map(line => line.replace(/^\s+/, ''))
		.map(line => line.replace(/\s+$/, ''))
		.filter(line => line.length > 0)
		.filter(line => line !== '\n')
		.join('\n') + '\n'
}


function printDiff(a: string, b: string) {
	require('colors')
	return require('diff').diffChars(a, b).forEach((part: any) => {
		// green for additions, red for deletions 
		// grey for common parts 
		var color = part.added
			? 'green'
			: part.removed ? 'red' : 'grey'
		process.stdout.write(part.value[color])
	})
}

