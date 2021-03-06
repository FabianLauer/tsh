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
	parseSourceCodeToAST(sourceCode: string): ast.SourceUnit
}


/**
 * Run the SymbolTable test suite.
 * @param dependencies The dependencies to inject into this test suite.
 */
function runTestSuite(dependencies: ITestSuiteDependencies) {
	///
	/// Utilities:
	///

	function wrapAndParse(sourceCode: string): ast.FuncDecl {
		const sourceUnit = dependencies.parseSourceCodeToAST(`
			func __wrapper__() {
				${sourceCode}
			}
		`)

		return <ast.FuncDecl>sourceUnit.getNodeAtIndex(0)
	}



	///
	/// Unit Tests:
	///


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



	///
	/// `SymbolTable` Method Tests
	///

	it('`let` decl', () => {
		const sourceUnit = wrapAndParse('let alpha')
		const symbolTable = dependencies.getSymbolTableFor(sourceUnit)
		const decls = <[ast.VarDecl]>symbolTable.getAllSymbolDecls()

		assert(decls.length === 1)

		assert(decls[0].name.rawValue === 'alpha')
		assert(decls[0] === symbolTable.getSymbolDeclByName('alpha'))
		assert(ast.VarDeclModifier.areCombinationsEqual(
			decls[0].modifiers, ast.VarDeclModifier.Let
		))
	})

	it('getAllSymbolDecls: `const` decl', () => {
		const sourceUnit = wrapAndParse('const alpha')
		const symbolTable = dependencies.getSymbolTableFor(sourceUnit)
		const decls = <[ast.VarDecl]>symbolTable.getAllSymbolDecls()

		assert(decls.length === 1)

		assert(decls[0].name.rawValue === 'alpha')
		assert(decls[0] === symbolTable.getSymbolDeclByName('alpha'))
		assert(ast.VarDeclModifier.areCombinationsEqual(
			decls[0].modifiers, ast.VarDeclModifier.Const
		))
	})

	it('getAllSymbolDecls: multiple `let` and `const` decls', () => {
		const sourceUnit = wrapAndParse(`
			let a = 1
			const b
			let foo: Int
			const bar: String = "abc"
		`)

		const symbolTable = dependencies.getSymbolTableFor(sourceUnit)
		const decls = <ast.VarDecl[]>symbolTable.getAllSymbolDecls()

		assert(decls.length === 4)

		assert(decls[0].name.rawValue === 'a')
		assert(decls[0] === symbolTable.getSymbolDeclByName('a'))
		assert(ast.VarDeclModifier.areCombinationsEqual(
			decls[0].modifiers, ast.VarDeclModifier.Let
		))

		assert(decls[1].name.rawValue === 'b')
		assert(decls[1] === symbolTable.getSymbolDeclByName('b'))
		assert(ast.VarDeclModifier.areCombinationsEqual(
			decls[1].modifiers, ast.VarDeclModifier.Const
		))

		assert(decls[2].name.rawValue === 'foo')
		assert(decls[2] === symbolTable.getSymbolDeclByName('foo'))
		assert(ast.VarDeclModifier.areCombinationsEqual(
			decls[2].modifiers, ast.VarDeclModifier.Let
		))

		assert(decls[3].name.rawValue === 'bar')
		assert(decls[3] === symbolTable.getSymbolDeclByName('bar'))
		assert(ast.VarDeclModifier.areCombinationsEqual(
			decls[3].modifiers, ast.VarDeclModifier.Const
		))
	})

	it('getAllSymbolDecls: `func alpha()` in SourceUnit', () => {
		const sourceUnit = dependencies.parseSourceCodeToAST('func alpha()')
		const symbolTable = dependencies.getSymbolTableFor(sourceUnit)
		const decls = <[ast.FuncDecl]>symbolTable.getAllSymbolDecls()

		assert(decls.length === 1)

		assert(decls[0].name.rawValue === 'alpha')
		assert(decls[0] === symbolTable.getSymbolDeclByName('alpha'))
	})

	it('getAllSymbolDecls: `class Alpha { }` in SourceUnit', () => {
		const sourceUnit = dependencies.parseSourceCodeToAST('class Alpha { }')
		const symbolTable = dependencies.getSymbolTableFor(sourceUnit)
		const decls = <[ast.ClassDecl]>symbolTable.getAllSymbolDecls()

		assert(decls.length === 1)

		assert(decls[0].name.rawValue === 'Alpha')
		assert(decls[0] === symbolTable.getSymbolDeclByName('Alpha'))
	})

	it('getAllSymbolDecls: ParamDeclList', () => {
		const sourceUnit = dependencies.parseSourceCodeToAST(`
			func alpha(a, b, foo: Int, bar) -> Void { }
		`)

		const funcDecl = <ast.FuncDecl>sourceUnit.getNodeAtIndex(0)
		const symbolTable = dependencies.getSymbolTableFor(funcDecl.runtimeParamDecls)
		const decls = <ast.ParamDecl[]>symbolTable.getAllSymbolDecls()

		assert(decls.length === 4)

		assert(decls[0].name.rawValue === 'a')
		assert(decls[0] === symbolTable.getSymbolDeclByName('a'))

		assert(decls[1].name.rawValue === 'b')
		assert(decls[1] === symbolTable.getSymbolDeclByName('b'))

		assert(decls[2].name.rawValue === 'foo')
		assert(decls[2] === symbolTable.getSymbolDeclByName('foo'))

		assert(decls[3].name.rawValue === 'bar')
		assert(decls[3] === symbolTable.getSymbolDeclByName('bar'))
	})

	it('getAllSymbolDecls: ClassDecl members', () => {
		const sourceUnit = dependencies.parseSourceCodeToAST(`
			class Alpha {
				let a = 1
				const b
				let foo: Int
				const bar: String = "abc"
			}
		`)

		const classDecl = <ast.ClassDecl>sourceUnit.getNodeAtIndex(0)
		const symbolTable = dependencies.getSymbolTableFor(classDecl)
		const decls = <ast.VarDecl[]>symbolTable.getAllSymbolDecls()

		assert(decls.length === 4)

		assert(decls[0].name.rawValue === 'a')
		assert(decls[0] === symbolTable.getSymbolDeclByName('a'))
		assert(ast.VarDeclModifier.areCombinationsEqual(
			decls[0].modifiers, ast.VarDeclModifier.Let
		))

		assert(decls[1].name.rawValue === 'b')
		assert(decls[1] === symbolTable.getSymbolDeclByName('b'))
		assert(ast.VarDeclModifier.areCombinationsEqual(
			decls[1].modifiers, ast.VarDeclModifier.Const
		))

		assert(decls[2].name.rawValue === 'foo')
		assert(decls[2] === symbolTable.getSymbolDeclByName('foo'))
		assert(ast.VarDeclModifier.areCombinationsEqual(
			decls[2].modifiers, ast.VarDeclModifier.Let
		))

		assert(decls[3].name.rawValue === 'bar')
		assert(decls[3] === symbolTable.getSymbolDeclByName('bar'))
		assert(ast.VarDeclModifier.areCombinationsEqual(
			decls[3].modifiers, ast.VarDeclModifier.Const
		))
	})


	///
	/// `SymbolTable.wasSymbolWithNameDeclared()` Tests:
	///

	it('should not return false positives for VarDecls', () => {
		const sourceUnit = wrapAndParse(`
			let a
			const b
		`)

		const symbolTable = dependencies.getSymbolTableFor(sourceUnit)

		assert(!symbolTable.wasSymbolWithNameDeclared('ab'))
		assert(!symbolTable.wasSymbolWithNameDeclared('a12'))

		// uppercase versions of the declared symbols should not be in the symbol table:
		assert(!symbolTable.wasSymbolWithNameDeclared('A'))
		assert(!symbolTable.wasSymbolWithNameDeclared('B'))
	})

	it('should not return false negatives for VarDecls', () => {
		const sourceUnit = wrapAndParse(`
			let a
			const b
		`)

		const symbolTable = dependencies.getSymbolTableFor(sourceUnit)

		assert(symbolTable.wasSymbolWithNameDeclared('a'))
		assert(symbolTable.wasSymbolWithNameDeclared('b'))
	})

	it('should not return false positives for FuncDecls and ClassDecls', () => {
		const sourceUnit = dependencies.parseSourceCodeToAST(`
			func a() -> Void
			class b { }
		`)

		const symbolTable = dependencies.getSymbolTableFor(sourceUnit)

		assert(!symbolTable.wasSymbolWithNameDeclared('ab'))
		assert(!symbolTable.wasSymbolWithNameDeclared('a12'))

		// uppercase versions of the declared symbols should not be in the symbol table:
		assert(!symbolTable.wasSymbolWithNameDeclared('A'))
		assert(!symbolTable.wasSymbolWithNameDeclared('B'))
	})

	it('should not return false negatives for FuncDecls and ClassDecls', () => {
		const sourceUnit = dependencies.parseSourceCodeToAST(`
			func a() -> Void
			class b { }
		`)

		const symbolTable = dependencies.getSymbolTableFor(sourceUnit)

		assert(symbolTable.wasSymbolWithNameDeclared('a'))
		assert(symbolTable.wasSymbolWithNameDeclared('b'))
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
