///
/// analysis/SymbolTable Test Suite
///
/// Contains all tests for `SymbolTable`s.
///


import { assert, assertThrows } from '../../utils'
import { IScope, SymbolTable } from '@/compiler/analysis'
import * as ast from '@/compiler/ast'


/**
 * Describes all dependencies of this test suite.
 */
export interface ITestSuiteDependencies {
	getSymbolTableFor(node: IScope): SymbolTable
}


/**
 * Run the SymbolTable test suite.
 * @param dependencies The dependencies to inject into this test suite.
 */
function runTestSuite(dependencies: ITestSuiteDependencies) {
	// We only test a few nodes here to see if types are actually checked by the
	// symbol table get/create logic. We can't really test *every* non-scope AST
	// node type anyway since there will likely be many more non-scope AST node
	// types in the future.
	it(`get/create should throw for non-scope nodes`, () => {
		assertThrows(
			() => dependencies.getSymbolTableFor(<any>new ast.Comment([])),
			'new ast.Comment'
		)
		assertThrows(
			() => dependencies.getSymbolTableFor(<any>ast.Expr.Empty),
			'ast.Expr.Empty'
		)
		assertThrows(
			() => dependencies.getSymbolTableFor(<any>ast.ReturnStatement.Empty),
			'ast.ReturnStatement.Empty'
		)
	})



	///
	/// Manual Get/Create-Tests with Scope Nodes:
	/// We test the symbol table get/create logic with all AST node types that can
	/// be used as scopes here.
	/// The AST nodes in the tests below are created manually. This is a little less
	/// complex than parsing source code and unwrapping it to get to the actual AST
	/// node we want to test get/create logic with.
	///


	// SourceUnit

	it(`get/create symbol table for SourceUnit`, () => {
		const decl = new ast.SourceUnit('test-source-unit', [])
		const symbolTable = dependencies.getSymbolTableFor(decl)
		assert(symbolTable instanceof SymbolTable)
	})


	// AnonFuncDecl

	it(`get/create symbol table for AnonFuncDecl w/ empty body`, () => {
		const decl = ast.AnonFuncDecl.create({
			funcBody: ast.Statement.Empty,
			returnTypeDecl: ast.TypeExpr.Empty,
			runtimeParamDecls: ast.ParamDeclList.Empty
		})
		const symbolTable = dependencies.getSymbolTableFor(decl)
		assert(symbolTable instanceof SymbolTable)
	})

	it(`get/create symbol table for AnonFuncDecl w/ body`, () => {
		const decl = ast.AnonFuncDecl.create({
			funcBody: new ast.Statement([]),
			returnTypeDecl: ast.TypeExpr.Empty,
			runtimeParamDecls: ast.ParamDeclList.Empty
		})
		const symbolTable = dependencies.getSymbolTableFor(decl)
		assert(symbolTable instanceof SymbolTable)
	})


	// FuncDecl

	it(`get/create symbol table for FuncDecl w/ empty body`, () => {
		const decl = ast.FuncDecl.create({
			funcName: new ast.Token('testFunc'),
			funcBody: ast.Statement.Empty,
			returnTypeDecl: ast.TypeExpr.Empty,
			runtimeParamDecls: ast.ParamDeclList.Empty
		})
		const symbolTable = dependencies.getSymbolTableFor(decl)
		assert(symbolTable instanceof SymbolTable)
	})

	it(`get/create symbol table for FuncDecl w/ body`, () => {
		const decl = ast.FuncDecl.create({
			funcName: new ast.Token('testFunc'),
			funcBody: new ast.Statement([]),
			returnTypeDecl: ast.TypeExpr.Empty,
			runtimeParamDecls: ast.ParamDeclList.Empty
		})
		const symbolTable = dependencies.getSymbolTableFor(decl)
		assert(symbolTable instanceof SymbolTable)
	})


	// MethodDecl

	it(`get/create symbol table for MethodDecl w/ empty body`, () => {
		const decl = ast.MethodDecl.create({
			funcName: new ast.Token('testFunc'),
			funcBody: ast.Statement.Empty,
			returnTypeDecl: ast.TypeExpr.Empty,
			runtimeParamDecls: ast.ParamDeclList.Empty
		})
		const symbolTable = dependencies.getSymbolTableFor(decl)
		assert(symbolTable instanceof SymbolTable)
	})

	it(`get/create symbol table for MethodDecl w/ body`, () => {
		const decl = ast.FuncDecl.create({
			funcName: new ast.Token('testFunc'),
			funcBody: new ast.Statement([]),
			returnTypeDecl: ast.TypeExpr.Empty,
			runtimeParamDecls: ast.ParamDeclList.Empty
		})
		const symbolTable = dependencies.getSymbolTableFor(decl)
		assert(symbolTable instanceof SymbolTable)
	})


	// ParamDeclList

	it(`get/create symbol table for ParamDeclList`, () => {
		const symbolTable = dependencies.getSymbolTableFor(ast.ParamDeclList.Empty)
		assert(symbolTable instanceof SymbolTable)
	})


	// ClassDecl

	it(`get/create symbol table for ClassDecl w/ empty body`, () => {
		const decl = ast.ClassDecl.create({
			className: new ast.Token('TestClass'),
			classBody: ast.Statement.Empty
		})
		const symbolTable = dependencies.getSymbolTableFor(decl)
		assert(symbolTable instanceof SymbolTable)
	})

	it(`get/create symbol table for ClassDecl w/ body`, () => {
		const decl = ast.ClassDecl.create({
			className: new ast.Token('TestClass'),
			classBody: new ast.Statement([])
		})
		const symbolTable = dependencies.getSymbolTableFor(decl)
		assert(symbolTable instanceof SymbolTable)
	})


	// IfStatement, ElseIfStatement

	it(`get/create symbol table for IfStatement`, () => {
		const decl = new ast.IfStatement(
			ast.Expr.Empty,
			ast.Statement.Empty
		)
		const symbolTable = dependencies.getSymbolTableFor(decl)
		assert(symbolTable instanceof SymbolTable)
	})

	it(`get/create symbol table for ElseIfStatement`, () => {
		const decl = new ast.ElseIfStatement(
			ast.Expr.Empty,
			ast.Statement.Empty
		)
		const symbolTable = dependencies.getSymbolTableFor(decl)
		assert(symbolTable instanceof SymbolTable)
	})

	it(`get/create symbol table for ElseStatement`, () => {
		const decl = new ast.ElseStatement([])
		const symbolTable = dependencies.getSymbolTableFor(decl)
		assert(symbolTable instanceof SymbolTable)
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
