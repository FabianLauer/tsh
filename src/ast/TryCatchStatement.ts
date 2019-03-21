import { assertAstNodeParam } from './utils/assert'
import Statement from './Statement'
import Identifier from './Identifier'

export class TryCatchStatement extends Statement {
	public constructor(
		public readonly attemptStatement: Statement,
		public readonly errorHandlerStatement: Statement,
		public readonly errorIdentifier?: Identifier
	) {
		super([attemptStatement, errorHandlerStatement])

		assertAstNodeParam(attemptStatement instanceof Statement)
		assertAstNodeParam(errorHandlerStatement instanceof Statement)

		this.setParentOf(attemptStatement, this)
		this.setParentOf(errorHandlerStatement, this)

		if (errorIdentifier) {
			assertAstNodeParam(errorIdentifier instanceof Identifier)
			this.setParentOf(errorIdentifier, this)
		}
	}
}

export default TryCatchStatement
