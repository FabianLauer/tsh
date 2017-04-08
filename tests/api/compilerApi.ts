import { createTestSuite } from './suite/compilerApi'
import { CompilerApi } from '@/compiler/api'

// tslint:disable:member-access

describe(
	'api/CompilerApi',
	createTestSuite(new class {
		createCompilerApi() {
			return CompilerApi.create()
		}

		isInstanceOfCompilerApi(object: CompilerApi): object is CompilerApi {
			return object instanceof CompilerApi
		}
	})
)
