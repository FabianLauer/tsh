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

	/**
	 * Creates an identical copy of this AST node.
	 */
	public clone(): this {
		return <this>new TryCatchStatement(
			this.attemptStatement.clone(),
			this.errorHandlerStatement.clone(),
			this.errorIdentifier.clone()
		)
	}
}

export default TryCatchStatement
