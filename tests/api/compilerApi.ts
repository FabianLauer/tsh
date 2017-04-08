import { createTestSuite } from './suite/compilerApi'
import { CompileTarget, CompilerApi } from '@/compiler/api'

// tslint:disable:member-access

describe(
	'api/CompilerApi',
	createTestSuite(new class {
		/**
		 * Creates an object that implements `ICompilerApi`.
		 */
		createCompilerApi() {
			return CompilerApi.create()
		}

		/**
		 * Checks whether an object implements `ICompilerApi`.
		 * This function must not throw.
		 * @param object The object to check.
		 * @return Returns `true` if `object` implements `ICompilerApi`, `false` if not.
		 */
		isInstanceOfCompilerApi(object: CompilerApi): object is CompilerApi {
			return object instanceof CompilerApi
		}

		/**
		 * Returns all compile target IDs that will be available in the tested compiler API.
		 */
		getAvailableCompileTargets(): CompileTarget[] {
			return this.createCompilerApi().getAvailableCompileTargets()
		}

		/**
		 * Returns a human readable name for a certain compile target.
		 */
		getHumanReadableCompileTargetId(id: CompileTarget) {
			return this.createCompilerApi().getIdentifiersForCompileTarget(id).humanReadableId
		}
	})
)
