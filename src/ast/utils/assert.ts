///
/// ast/utils/assert.ts
/// Utilities for assertions in the AST module.
///

import { configurableAssert } from '@/utils'


/**
 * An exception that is thrown if an AST node parameter assertion fails.
 */
export class AstNodeParamAssertionException extends Error { }


/**
 * Asserts a parameter value passed to an AST node.
 * Throws an `AssertionException` if `condition` is not `true`.
 * @param condition The condition to assert.
 * @param message Optional message parts to be included in the `AssertionException`'s message if the assertion fails.
 * @throws AssertionException
 */
export function assertAstNodeParam(condition: boolean, ...message: any[]) {
	configurableAssert(
		condition,
		errorMessage => {
			return new AstNodeParamAssertionException(errorMessage)
		},
		'AST node parameter assertion failed.', ...message
	)
}
