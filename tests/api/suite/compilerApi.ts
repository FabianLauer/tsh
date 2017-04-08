import { assert, assertThrows } from '../../utils'
import { ICompilerApi, CompileTarget } from '@/compiler/api'


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
	return function() {
		runTestSuite(dependencies)
	}
}
