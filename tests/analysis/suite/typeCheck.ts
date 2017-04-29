///
/// analysis/SymbolTable Test Suite
///
/// Contains all tests for `SymbolTable`s.
///


import { assert } from '../../utils'
import { TypeChecker } from '@/compiler/analysis'
import * as ast from '@/compiler/ast'


/**
 * Describes all dependencies of this test suite.
 */
export interface ITestSuiteDependencies {
	parseSourceCodeToAST(sourceCode: string): ast.SourceUnit
	createTypeChecker(ast: ast.BaseNode): TypeChecker<typeof ast>
}


/**
 * Run the SymbolTable test suite.
 * @param dependencies The dependencies to inject into this test suite.
 */
function runTestSuite(dependencies: ITestSuiteDependencies) {
	///
	/// Utilities:
	///

	function wrapAndParse(sourceCode: string) {
		const sourceUnit = dependencies.parseSourceCodeToAST(`
			func __wrapper__() {
				${sourceCode}
			}
		`)

		const funcDecl = <ast.FuncDecl>sourceUnit.getNodeAtIndex(0)
		return funcDecl.body
	}


	function typeCheck(sourceCode: string) {
		const tree = wrapAndParse(sourceCode)
		const typeChecker = dependencies.createTypeChecker(tree)
		typeChecker.performTypeCheck()
		return typeChecker
	}


	function getTypeCheckIssues(sourceCode: string) {
		const typeChecker = typeCheck(sourceCode)
		return typeChecker.getIssues()
	}



	///
	/// Test Cases
	///


	it('used but not declared', () => {
		
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
