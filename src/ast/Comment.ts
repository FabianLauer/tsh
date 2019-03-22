import { assertAstNodeParam } from './utils/assert'
import { BaseNode, Token } from './'

export class Comment extends BaseNode {
	public constructor(
		/**
		 * The comment's complete text as it was in the source code.
		 */
		public readonly lines: Token[]
	) {
		super()
		assertAstNodeParam(Array.isArray(lines))
		lines.forEach(line => assertAstNodeParam(line instanceof Token))
	}

	/**
	 * Creates an identical copy of this AST node.
	 */
	public clone(): this {
		return <this>new Comment(
			this.lines.map(line => line.clone())
		)
	}
}

export default Comment
