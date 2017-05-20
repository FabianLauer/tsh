///
/// analysis/SymbolTable Test Suite
///
/// Contains all tests for `SymbolTable`s.
///


import { assert } from '../../utils'
import * as ast from '@/compiler/ast'
import {
	TypeChecker,
	TypeCheckIssue,
	TypeCheckIssueSeverity as Severity
} from '@/compiler/analysis'


// tslint:disable-next-line:variable-name
const Issues = TypeCheckIssue.Issues


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


	it('identifier used but not declared #1', () => {
		const issues = getTypeCheckIssues('a')
		assert(issues.length === 1, 'expected number of issues')
		assert(issues[0] instanceof Issues.IdentifierUsedButNeverDeclared, 'correct issue type')
		assert(issues[0].severity === Severity.Error, 'expected severity')
	})

	it('identifier used but not declared #2', () => {
		const issues = getTypeCheckIssues(`
			a
			func () { b }
		`)
		assert(issues.length === 1, 'expected number of issues')
		assert(issues[0] instanceof Issues.IdentifierUsedButNeverDeclared, 'correct issue type')
		assert(issues[0].severity === Severity.Error, 'expected severity')
	})

	it('identifier used but not declared #3', () => {
		const issues = getTypeCheckIssues(`
			a
			b
			func () { b }
			func () { c }
		`)
		assert(issues.length === 2, 'expected number of issues')
		assert(issues[0] instanceof Issues.IdentifierUsedButNeverDeclared, 'correct issue type')
		assert(issues[0].severity === Severity.Error, 'expected severity')
		assert(issues[1] instanceof Issues.IdentifierUsedButNeverDeclared, 'correct issue type')
		assert(issues[1].severity === Severity.Error, 'expected severity')
	})

	it('identifier used but not declared #4', () => {
		const issues = getTypeCheckIssues(`
			a
			let b
			b
			a
		`)
		assert(issues.length === 2, 'expected number of issues')
		assert(issues[0] instanceof Issues.IdentifierUsedButNeverDeclared, 'correct issue type')
		assert(issues[0].severity === Severity.Error, 'expected severity')
		assert(issues[1] instanceof Issues.IdentifierUsedButNeverDeclared, 'correct issue type')
		assert(issues[1].severity === Severity.Error, 'expected severity')
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
