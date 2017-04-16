/**
 * Enumerates all possible positions of unary operators.
 */
export enum UnaryOperatorPosition { Prefix, Postfix }

export namespace UnaryOperatorPosition {
	/**
	 * Checks if a value is a valid `UnaryOperatorPosition`.
	 * @param position The value to check.
	 */
	export function isValid(
		position: UnaryOperatorPosition
	): position is UnaryOperatorPosition {
		return position in UnaryOperatorPosition
	}
}

export default UnaryOperatorPosition
