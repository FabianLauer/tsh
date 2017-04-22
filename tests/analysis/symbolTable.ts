import { createTestSuite } from './suite/symbolTable'
import { IScope, SymbolTable } from '@/compiler/analysis'
import { SourceUnit } from '@/compiler/ast'
import { parseToSourceUnit } from '@/compiler/parser'


// tslint:disable:member-access

describe(
	'analysis/SymbolTable',
	createTestSuite(new class {
		getSymbolTableFor(node: IScope): SymbolTable {
			return SymbolTable.getSymbolTableForAstNode(node)
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
