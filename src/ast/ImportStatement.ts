import { assertAstNodeParam } from './utils/assert'
import Statement from './Statement'
import StringLiteral from './StringLiteral'

export class ImportStatement extends Statement {
	public constructor(
		/**
		 * The path of the file to be imported.
		 */
		public readonly importPath: StringLiteral
	) {
		super([importPath])
		assertAstNodeParam(importPath instanceof StringLiteral)
	}
}

export default ImportStatement
