// tslint:disable:one-line

import { CompileTarget } from '@/compiler/api'

/**
 * Associates all available identifiers of a compile target with each other.
 * Used primarily to decouple human readable identifiers such as `ES5` from build target identifiers used
 * in source code (such as `CompileTarget.EcmaScript`).
 * @example
 *     export type IEcmaScript5Identifiers = ICompileTargetIdentifiers<CompileTarget.EcmaScript, 'ES5'>
 */
export interface ICompileTargetIds<
	/**
	 * Uniquely identifies the compile target.
	 */
	TCompileTarget extends ICompileTargetIds.TCompileTarget,
	/**
	 * Uniquely identifies the compile target with a human readable string, for example `EcmaScript` or `ES3`.
	 */
	THumanReadableId extends ICompileTargetIds.THumanReadableId
> {
	/**
	 * Uniquely identifies the compile target.
	 */
	readonly id: TCompileTarget

	/**
	 * Uniquely identifies the compile target with a human readable string, for example `EcmaScript` or `ES5`.
	 */
	readonly humanReadableId: THumanReadableId
}


export namespace ICompileTargetIds {
	/**
	 * Defines the acceptable types for compile target identifiers.
	 */
	export type TCompileTarget = CompileTarget


	/**
	 * Defines the acceptable types for human readable compile target identifiers.
	 */
	export type THumanReadableId = string


	/**
	 * A type that extends `ICompileTargetIdentifiers` with its default generic parameters.
	 * Use this for type declarations, return type annotations, etc.
	 */
	export type Any = ICompileTargetIds<
		ICompileTargetIds.TCompileTarget,
		ICompileTargetIds.THumanReadableId
	>


	/**
	 * Creates and returns an instance of `ICompileTargetIds`.
	 * @param id The compile target identifier.
	 * @param humanReadableId The human readable identifier to associate with `id`.
	 */
	export function create(id: TCompileTarget, humanReadableId: THumanReadableId) {
		return <ICompileTargetIds<TCompileTarget, THumanReadableId>>{ id, humanReadableId }
	}


	/**
	 * Checks whether an object implements `ICompileTargetIds`.
	 * This function does not throw.
	 * @param object The object to validate.
	 * @return Returns `true` if `object` implements `ICompileTargetIds`, `false` if not.
	 */
	export function isValid(
		object: ICompileTargetIds.Any
	): object is ICompileTargetIds.Any {
		return (
			typeof object === 'object' &&
			object !== null &&
			object.id >= 0 &&
			typeof object.humanReadableId === 'string' &&
			object.humanReadableId.length > 0
		)
	}
}

export default ICompileTargetIds
