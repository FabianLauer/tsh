import { BaseNode, Token } from './'

export class Comment extends BaseNode {
	public constructor(
		/**
		 * The comment's complete text as it was in the source code.
		 */
		public readonly text: Token
	) { super() }
}

export default Comment
