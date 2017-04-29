import { createTestSuite } from './suite/typeCheck'
import { TypeChecker, createTypeChecker } from '@/compiler/analysis'
import { BaseNode, SourceUnit } from '@/compiler/ast'
import { parseToSourceUnit } from '@/compiler/parser'


// tslint:disable:member-access

describe(
	'analysis/TypeChecker',
	createTestSuite(new class {
		createTypeChecker(node: BaseNode): TypeChecker<typeof node> {
			return createTypeChecker(<any>node)
		}


		private sourceUnitCount = 0

		parseSourceCodeToAST(sourceCode: string): SourceUnit {
			return parseToSourceUnit(
				`symbol-table-test-source-unit-${++this.sourceUnitCount}`,
				sourceCode
			)
		}
	})
)
