import { BaseNode } from './'

export class Statement extends BaseNode {
	public constructor() {
		super()
	}


	/**
	 * A statement with no members.
	 */
	// tslint:disable-next-line:variable-name
	public static readonly Empty = new Statement()
}

export default Statement
