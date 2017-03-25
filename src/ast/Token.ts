import { BaseNode } from './'

export class Token extends BaseNode {
	public constructor(
		/**
		 * The raw value of this token in source code.
		 */
		public readonly rawValue: string
	) {
		super()
	}
}

export default Token
