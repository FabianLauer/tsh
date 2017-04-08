import { assert, assertThrows } from '../../utils'
import { ICompilerApi, ICompileTargetIds, CompileTarget } from '@/compiler/api'


/**
 * Describes all dependencies of this test suite.
 */
export interface ITestSuiteDependencies {
	/**
	 * Creates an object that implements `ICompilerApi`.
	 */
	createCompilerApi(): ICompilerApi

	/**
	 * Checks whether an object implements `ICompilerApi`.
	 * This function must not throw.
	 * @param object The object to check.
	 * @return Returns `true` if `object` implements `ICompilerApi`, `false` if not.
	 */
	isInstanceOfCompilerApi(object: ICompilerApi | any): object is ICompilerApi
}


function runTestSuite(dependencies: ITestSuiteDependencies) {
	/**
	 * A short piece of valid source code that is expected to be parsed and compiled without any issues.
	 */
	const VALID_TEST_SOURCE_CODE = 'func test() { }'

	///
	/// Validate Injected Dependencies
	///

	it('[DI] should  return `false`: isInstanceOfCompilerApi(invalid)', () => {
		assert(!dependencies.isInstanceOfCompilerApi(undefined), '`undefined`')
		assert(!dependencies.isInstanceOfCompilerApi(null), '`null`')
		assert(!dependencies.isInstanceOfCompilerApi({}), '`{}`')
	})

	it('[DI] should instantiate without error', () => {
		dependencies.createCompilerApi()
	})

	it('[DI] should instantiate to expected type', () => {
		const api = dependencies.createCompilerApi()
		assert(dependencies.isInstanceOfCompilerApi(api))
	})


	///
	/// Actual Tests
	///


	it('should return available compile targets as an array', () => {
		const api = dependencies.createCompilerApi()
		const targets = api.getAvailableCompileTargets()
		assert(Array.isArray(targets))
	})

	it('should offer at least one compile target', () => {
		const api = dependencies.createCompilerApi()
		const targets = api.getAvailableCompileTargets()
		assert(targets.length > 0)
	})

	it('should return only valid values from getAvailableCompileTargets()', () => {
		const api = dependencies.createCompilerApi()
		const targets = api.getAvailableCompileTargets()
		const invalidTargets = targets
			.filter(_ => !ICompileTargetIds.TCompileTarget.isValid(_))
		assert(
			invalidTargets.length === 0,
			`returned ${invalidTargets.length} invalid targets: ${invalidTargets.join(', ')}`
		)
	})

	it('should return a valid set of IDs for all available compile targets', () => {
		const api = dependencies.createCompilerApi()
		const targets = api.getAvailableCompileTargets()
		targets.forEach(target => {
			const ids = api.getIdentifiersForCompileTarget(target)
			const isValid = ICompileTargetIds.isValid(ids)
			assert(isValid, `invalid set of IDs for compile target ${target}`)
		})
	})

	it('should return same targets for overloads: getIdentifiersForCompileTarget()', () => {
		const api = dependencies.createCompilerApi()
		const targets = api.getAvailableCompileTargets()
		targets.forEach(target => {
			const result1 = api.getIdentifiersForCompileTarget(target)
			const result2 = api.getIdentifiersForCompileTarget(result1)
			const result3 = api.getIdentifiersForCompileTarget(result1.humanReadableId)
			assert(
				result1 === result2,
				'getIdentifiersForCompileTarget(TCompileTarget)',
				'!==',
				'getIdentifiersForCompileTarget(ICompileTargetIds)',
				result1.humanReadableId, result2.humanReadableId
			)
			assert(
				result1 === result3,
				'getIdentifiersForCompileTarget(TCompileTarget)',
				'!==',
				'getIdentifiersForCompileTarget(THumanReadableId)',
				result1.humanReadableId, result3.humanReadableId
			)
			assert(
				result2 === result3,
				'getIdentifiersForCompileTarget(ICompileTargetIds)',
				'!==',
				'getIdentifiersForCompileTarget(THumanReadableId)',
				result2.humanReadableId, result3.humanReadableId
			)
		})
	})

	it('should not contain duplicate human readable compile target IDs', () => {
		const api = dependencies.createCompilerApi()
		const targets = api.getAvailableCompileTargets()

		const ids = targets.map(target => api.getIdentifiersForCompileTarget(target))
		const humanReadableIds = ids.map(_ => _.humanReadableId)

		// Count the number of duplicates by creating a `Set` and comparing its length to
		// the length of the original array. See http://stackoverflow.com/a/7376645/3861083.
		const humanReadableIdSet = new Set(humanReadableIds)
		const numDuplis = humanReadableIds.length - humanReadableIdSet.size

		assert(
			numDuplis === 0,
			`there's ${numDuplis - 1} duplicate human readable IDs: ${humanReadableIds.join(', ')}`
		)
	})

	it('should throw: compileSourceCode(undef, valid)', () => {
		const api = dependencies.createCompilerApi()
		assertThrows(() => api.compileSourceCode(undefined, CompileTarget.EcmaScript))
	})

	it('should throw: compileSourceCode(valid, undef)', () => {
		const api = dependencies.createCompilerApi()
		assertThrows(() => api.compileSourceCode(VALID_TEST_SOURCE_CODE, undefined))
	})

	it('should throw: compileSourceCode(undef, undef)', () => {
		const api = dependencies.createCompilerApi()
		assertThrows(() => api.compileSourceCode(undefined, undefined))
	})

	it('should not throw: compileSourceCode(valid, valid)', () => {
		const api = dependencies.createCompilerApi()
		api.compileSourceCode(VALID_TEST_SOURCE_CODE, CompileTarget.EcmaScript)
	})
}


/**
 * Creates a test suite.
 * @param dependencies The dependencies to inject into the test suite.
 */
export function createTestSuite(dependencies: ITestSuiteDependencies) {
	return function () {
		runTestSuite(dependencies)
	}
}
