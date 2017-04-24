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
		public readonly startLineNumber: number = undefined,

		/**
		 * The start column number of the token in source code.
		 */
		public readonly startColumnNumber: number = undefined,

		/**
		 * The end line number of the token in source code.
		 */
		public readonly endLineNumber: number = undefined,

		/**
		 * The end column number of the token in source code.
		 */
		public readonly endColumnNumber: number = undefined
	) {
		super()
		assertAstNodeParam(typeof rawValue === 'string')
	}


	/**
	 * A token with no content whatsoever.
	 */
	// tslint:disable-next-line:variable-name
	public static readonly Empty = new Token('')
}

export default Token
