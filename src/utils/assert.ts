/**
 * An exception that is thrown if an assertion fails.
 */
export class AssertionException extends Error { }


/**
 * Asserts a condition and throws an exception if `condition` is not `true`.
 * The exception that is thrown when the assertion fails is created by param `createError`.
 * @param condition The condition to assert.
 * @param createError A function that creates an exception when the assertion fails.
 * @param message Optional message parts to be included in the `AssertionException`'s message if the assertion fails.
 * @throws TError
 */
export function configurableAssert<TError extends Error>(
	condition: boolean,
	createError: (message: string) => TError,
	...message: any[]
): void | never {
	if (condition) {
		return
	}
	throw createError(message.join(' '))
}


/**
 * Asserts a condition. Throws an `AssertionException` if `condition` is not `true`.
 * @param condition The condition to assert.
 * @param message Optional message parts to be included in the `AssertionException`'s message if the assertion fails.
 * @throws AssertionException
 */
export function assert(condition: boolean, ...message: any[]): void | never {
	configurableAssert(
		condition,
		errorMessage => new AssertionException(`Assertion failed. ${errorMessage}`),
		...message
	)
}
