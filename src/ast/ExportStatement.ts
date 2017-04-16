import { assertAstNodeParam } from './utils/assert'
import { Identifier } from './'
import Statement from './Statement'

export class ExportStatement extends Statement {
	public constructor(
		/**
		 * The identifier to be exported.
		 */
		public readonly exportedIdentifier: Identifier
	) {
		super([exportedIdentifier])
		assertAstNodeParam(exportedIdentifier instanceof Identifier)
	}
}

export default ExportStatement
