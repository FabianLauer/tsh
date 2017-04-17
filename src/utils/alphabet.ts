const alphabet = [
	'a', 'b', 'c', 'd', 'e', 'f', 'g',
	'h', 'i', 'j', 'k', 'l', 'm', 'n',
	'o', 'p', 'q', 'r', 's', 't', 'u',
	'v', 'w', 'x', 'y', 'z'
]

/**
 * Returns the alphabet as an array of all lowercase letters.
 */
export function getLowercaseAlphabet(): string[] {
	return [].concat(alphabet)
}

/**
 * Returns the alphabet as an array of all uppercase letters.
 */
export function getUppercaseAlphabet(): string[] {
	return getLowercaseAlphabet().map(c => c.toUpperCase())
}
