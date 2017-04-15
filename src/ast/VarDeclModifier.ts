/**
 * Enumerates all available modifiers for variable declarations.
 * Bitmask.
 */
export enum VarDeclModifier {
	None = 0,
	Let = 1 << 0,
	Const = 1 << 1,
	Static = 1 << 2
}

export namespace VarDeclModifier {
	/**
	 * Contains all illegal combinations of var declaration modifiers.
	 * @internal
	 */
	const illegalCombinations: VarDeclModifier[] = [
		VarDeclModifier.None,
		VarDeclModifier.Let | VarDeclModifier.Const,
		VarDeclModifier.Let | VarDeclModifier.Const | VarDeclModifier.Static
	]


	/**
	 * Describes the type that is used for combinations of var declaration modifiers.
	 */
	export type ICombination = VarDeclModifier


	/**
	 * Checks if a certain combination of var declaration modifiers is legal.
	 * Returns `true` when the combination is legal, `false` when it's not.
	 * @param combination The modifier combination to check.
	 */
	export function isCombinationLegal(combination: ICombination) {
		return illegalCombinations.indexOf(combination) === -1
	}


	/**
	 * Returns a human readable name for a var declaration modifier.
	 * @param modifier The modifier to return a human readable name for.
	 */
	export function getVarDeclModifierAsText(modifier: VarDeclModifier): string {
		if (typeof modifier === 'string') {
			return modifier
		}
		return VarDeclModifier[modifier]
	}


	/**
	 * Returns a human readable version of a var declaration modifier combination.
	 * @param combination The modifier combination to return a human readable version of.
	 */
	export function getVarDeclModifierCombinationAsText(combination: VarDeclModifier): string {
		if (typeof combination !== 'number' || combination === VarDeclModifier.None) {
			return '{EMPTY}'
		}

		const modifierNames: string[] = []

		for (let modifier in VarDeclModifier) {
			if (typeof modifier !== 'number') {
				continue
			}
			modifierNames.push(getVarDeclModifierAsText(modifier))
		}

		return `{${modifierNames.join(', ')}}`
	}


	/**
	 * Throws an error if a var declaration modifier combination is illegal.
	 * Does nothing if the combination is legal.
	 * @throws
	 * @param combination The modifier combination to check.
	 */
	export function throwUnlessCombinationLegal(combination: ICombination): void | never {
		if (isCombinationLegal(combination)) {
			return
		}
		const combinationString = getVarDeclModifierCombinationAsText(combination)
		throw new Error(`Illegal VarDeclModifier combination: ${combinationString}`)
	}


	/**
	 * Combines multiple var declaration modifiers and returns the combination.
	 * @throws 
	 * @param firstModifier 
	 * @param modifiers 
	 */
	export function combine(
		firstModifier: VarDeclModifier,
		...modifiers: VarDeclModifier[]
	): ICombination {
		modifiers.unshift(firstModifier)

		// calculate the combination
		let combination = 0
		for (let modifier of modifiers) {
			combination |= modifier
		}

		// validate the combination before returning it
		throwUnlessCombinationLegal(combination)

		return combination
	}


	/**
	 * Checks if two var declaration modifier combinations are equal.
	 * @param combinationA The var declaration modifier combination to compare with `combinationB`.
	 * @param combinationB The var declaration modifier combination to compare with `combinationA`.
	 * @return Returns `true` when `combinationA` and `combinationB` are equal, `false` if not.
	 */
	export function areCombinationsEqual(
		combinationA: ICombination,
		combinationB: ICombination
	) {
		return combinationA === combinationB
	}
}

export default VarDeclModifier
