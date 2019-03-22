import { assertAstNodeParam } from './utils/assert'
import { BaseNode } from './'

export class Token extends BaseNode {
	public constructor(
		/**
		 * The raw value of this token in source code.
		 */
		public readonly rawValue: string,

		/**
		 * The start line number of the token in source code.
		 */
		public readonly startLineNumber?: number,

		/**
		 * The start column number of the token in source code.
		 */
		public readonly startColumnNumber?: number,

		/**
		 * The end line number of the token in source code.
		 */
		public readonly endLineNumber?: number,

		/**
		 * The end column number of the token in source code.
		 */
		public readonly endColumnNumber?: number
	) {
		super()
		assertAstNodeParam(typeof rawValue === 'string')
	}

	/**
	 * A token with no content whatsoever.
	 */
	// tslint:disable-next-line:variable-name
	public static readonly Empty = new Token('')

	/**
	 * Creates an identical copy of this AST node.
	 */
	public clone(): this {
		return <this>new Token(
			this.rawValue,
			this.startLineNumber,
			this.startColumnNumber,
			this.endLineNumber,
			this.endColumnNumber
		)
	}
}

export default Token
