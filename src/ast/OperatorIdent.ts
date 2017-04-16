/**
 * Enumerates all operators.
 */
export enum OperatorIdent {
	// Access
	'.',

	// Assignment
	'=',

	// Arithmetic Binary
	'+',	'-',	'*',	'/',	'%',
	'+=',	'-=', 	'*=',	'/=',	'%=',

	// Unary
	'++', '--'

}

export namespace OperatorIdent {
	/**
	 * Checks if a value is a valid `OperatorIdent` value.
	 * @param ident The value to check.
	 */
	export function isValid(ident: OperatorIdent): ident is OperatorIdent {
		return ident in OperatorIdent
	}
}

export default OperatorIdent
