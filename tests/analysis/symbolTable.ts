import { createTestSuite } from './suite/symbolTable'
import { IScope, SymbolTable } from '@/compiler/analysis'

// tslint:disable:member-access

describe(
	'analysis/SymbolTable',
	createTestSuite(new class {
		getSymbolTableFor(node: IScope): SymbolTable {
			return SymbolTable.getSymbolTableForAstNode(node)
		}
	})
)
