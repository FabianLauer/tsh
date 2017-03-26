import { readdirSync, statSync } from 'fs'

/**
 * Import all files from a directory synchronously.
 * The type parameter `TExports` can be used to describe the format of the imported
 * files, for example:
 * @example
 *     const tests = importFromDirectorySync<{ run: () => void }>(__dirname + '/tests/')
 *     tests.forEach(test => test.run())
 * @param directoryPath The directory to import from.
 * @param filter Optional. A function to filter which files are imported. The function is
 *               called once per file. When the return value evaluates to `true`, the file
 *               is imported, otherwise it will be omitted.
 */
export function importFromDirectorySync<TExports>(
	directoryPath: string,
	filter: (filename: string) => boolean = () => true
): TExports[] {
	return (readdirSync(`${directoryPath}/`) || [])
		.map(filename => `${directoryPath}/${filename}`)
		.filter(filename => statSync(filename).isFile())
		.filter(filter)
		.map(filename => require(filename).default)
}
