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

	/**
	 * Creates an identical copy of this AST node.
	 */
	public clone(): this {
		return <this>new ImportStatement(this.importPath.clone())
	}
}

export default ImportStatement
