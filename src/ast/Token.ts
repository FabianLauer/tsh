import { BaseNode } from './'

export class Token extends BaseNode {
	public constructor(
		/**
		 * The raw value of this token in source code.
		 */
		public readonly rawValue: string
	) { super() }


	/**
	 * A token with no content whatsoever.
	 */
	// tslint:disable-next-line:variable-name
	public static readonly Empty = new Token('')
}

export default Token
