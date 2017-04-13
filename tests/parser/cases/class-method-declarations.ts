///
/// Imports:
///

import * as ast from '@/compiler/ast'
import ParserTestCase from '../ParserTestCase'


///
/// Test Preparation:
///


// This array contains all test cases we'll export from this file.
export const cases: ParserTestCase[] = []
export default cases


/**
 * Create a test case and export it from this file.
 * @param testName The name of the test case.
 * @param sourceCode The source code to parse.
 * @param expectation Assertion functions. Return `true` for "test passed", `false` "for failed".
 */
function testWithName<TNode extends ast.BaseNode>(
	testName: string,
	sourceCode: string,
	...expectation: Array<(node: TNode[]) => boolean>
): void {
	cases.push(ParserTestCase.create(testName, sourceCode, ...expectation))
}


/**
 * Create a test case and export it from this file.
 * @param sourceCode The source code to parse.
 * @param expectation Assertion functions. Return `true` for "test passed", `false` "for failed".
 */
function test<TNode extends ast.BaseNode>(
	sourceCode: string,
	...expectation: Array<(node: TNode[]) => boolean>
): void {
	const testName = sourceCode
	testWithName(testName, sourceCode, ...expectation)
}



///
/// Assertions:
///


function isInstanceOf<T>(obj: T, constructor: Function | ({ new (...args: any[]): T; name?: string })) {
	if (obj instanceof (<Function>constructor)) {
		return true
	}
	throw new Error(`instanceof assertion failed: expected ${constructor.name}, got ${obj.constructor.name}`)
}


/**
 * Returns all method declarations in a given class declaration.
 * @param classDecl The class declaration to return methods of.
 */
function getClassMethods(classDecl: ast.ClassDecl) {
	return <Array<ast.MethodDecl>>classDecl.body.nodes
		.filter(node => (
			isInstanceOf(node, ast.MethodDecl)
		))
}


/**
 * Searches a method declaration in a class declaration by its name and returns it.
 * If there are multiple methods with the same name, the returned method can be any of the methods
 * with that name.
 * Returns `undefined` if no method with the given name is found.
 * @param classDecl The class declaration to search members in.
 * @param name The name of the method to return.
 */
function getMethodByName(classDecl: ast.ClassDecl, name: string): ast.MethodDecl {
	const methods = getClassMethods(classDecl)
	return methods.find(node => node.name.rawValue === name)
}


/**
 * Generates a function that checks whether an AST member is a method declaration. 
 */
function isMethodDecl(methodName: string) {
	return ([classDecl]: [ast.ClassDecl]) =>
		isInstanceOf(getMethodByName(classDecl, methodName), ast.MethodDecl)
}



function isEmptyStatement(statement: ast.Statement): boolean {
	if (
		statement === ast.Statement.Empty || (
			statement instanceof ast.Statement &&
			statement.nodes.length === 0
		)
	) {
		return true
	}
	const firstNonEmptyStatementOrNodeIndex = statement.nodes.findIndex(
		node => {
			if (node instanceof ast.Statement) {
				return isEmptyStatement(node)
			}
			return true
		}
	)
	return firstNonEmptyStatementOrNodeIndex !== -1
}


function hasEmptyFuncBody(methodName: string) {
	return ([classDecl]: [ast.ClassDecl]) =>
		isEmptyStatement(getMethodByName(classDecl, methodName).body)
}


function hasNumberOfRuntimeParams(methodName: string, numParams: number) {
	return ([classDecl]: [ast.ClassDecl]) => {
		const methodDecl = getMethodByName(classDecl, methodName)
		return methodDecl.runtimeParamDecls.paramDecls.length === numParams
	}
}


function getRuntimeParamAtIndex(funcDecl: ast.FuncDecl, paramIndex: number) {
	return funcDecl.runtimeParamDecls.getParamAtIndex(paramIndex)
}


function assertRuntimeParam(
	methodName: string,
	paramIndex: number,
	name: string,
	hasTypeDecl: boolean
) {
	return ([classDecl]: [ast.ClassDecl]) => {
		const methodDecl = getMethodByName(classDecl, methodName)
		const decl = getRuntimeParamAtIndex(methodDecl, paramIndex)
		if (decl.name.rawValue !== name) {
			return false
		}
		if (hasTypeDecl) {
			return (
				decl.typeDecl instanceof ast.TypeExpr &&
				decl.typeDecl !== ast.TypeExpr.Empty
			)
		} else {
			return decl.typeDecl === ast.TypeExpr.Empty
		}
	}
}


function hasEmptyReturnTypeDecl(methodName: string) {
	return ([classDecl]: [ast.ClassDecl]) =>
		getMethodByName(classDecl, methodName).returnTypeDecl === ast.TypeExpr.Empty
}


function hasOwnReturnTypeDecl(methodName: string) {
	return ([classDecl]: [ast.ClassDecl]) => (
		getMethodByName(classDecl, methodName).returnTypeDecl instanceof ast.TypeExpr &&
		getMethodByName(classDecl, methodName).returnTypeDecl !== ast.TypeExpr.Empty
	)
}


///
/// Test Cases:
///

// tslint:disable:variable-name



// Method Name Tests

test<ast.ClassDecl>(
	`
	class TestClass {
		func a() { }
	}
	`,
	([Class]) => isInstanceOf(Class, ast.ClassDecl),
	([Class]) => Class.name.rawValue === 'TestClass',

	isMethodDecl('a')
)


test<ast.ClassDecl>(
	`
	class TestClass {
		func veryLongMethodNameInTestClass() { }
	}
	`,
	([Class]) => isInstanceOf(Class, ast.ClassDecl),
	([Class]) => Class.name.rawValue === 'TestClass',

	isMethodDecl('veryLongMethodNameInTestClass')
)




// Method Signature & Type Decl Tests


test<ast.ClassDecl>(
	`
	class TestClass {
		func a()
	}
	`,
	([Class]) => isInstanceOf(Class, ast.ClassDecl),
	([Class]) => Class.name.rawValue === 'TestClass',

	isMethodDecl('a'),
	hasNumberOfRuntimeParams('a', 0),
	hasEmptyReturnTypeDecl('a'),
	hasEmptyFuncBody('a')
)

test<ast.ClassDecl>(
	`
	class TestClass {
		func a() { }
	}
	`,
	([Class]) => isInstanceOf(Class, ast.ClassDecl),
	([Class]) => Class.name.rawValue === 'TestClass',

	isMethodDecl('a'),
	hasNumberOfRuntimeParams('a', 0),
	hasEmptyReturnTypeDecl('a')
)

test<ast.ClassDecl>(
	`
	class TestClass {
		func a() -> T
	}
	`,
	([Class]) => isInstanceOf(Class, ast.ClassDecl),
	([Class]) => Class.name.rawValue === 'TestClass',

	isMethodDecl('a'),
	hasNumberOfRuntimeParams('a', 0),
	hasOwnReturnTypeDecl('a'),
	hasEmptyFuncBody('a')
)

test<ast.ClassDecl>(
	`
	class TestClass {
		func a() -> T { }
	}
	`,
	([Class]) => isInstanceOf(Class, ast.ClassDecl),
	([Class]) => Class.name.rawValue === 'TestClass',

	isMethodDecl('a'),
	hasNumberOfRuntimeParams('a', 0),
	hasOwnReturnTypeDecl('a')
)

test<ast.ClassDecl>(
	`
	class TestClass {
		func a(p1: Type, p2: Type, p) -> T
	}
	`,
	([Class]) => isInstanceOf(Class, ast.ClassDecl),
	([Class]) => Class.name.rawValue === 'TestClass',

	isMethodDecl('a'),
	hasNumberOfRuntimeParams('a', 3),
	hasOwnReturnTypeDecl('a'),
	hasEmptyFuncBody('a'),

	assertRuntimeParam('a', 0, 'p1', true),
	assertRuntimeParam('a', 1, 'p2', true),
	assertRuntimeParam('a', 2, 'p', false)
)

test<ast.ClassDecl>(
	`
	class TestClass {
		func a(p1: Type, p2: Type, p) -> T { }
	}
	`,
	([Class]) => isInstanceOf(Class, ast.ClassDecl),
	([Class]) => Class.name.rawValue === 'TestClass',

	isMethodDecl('a'),
	hasNumberOfRuntimeParams('a', 3),
	hasOwnReturnTypeDecl('a'),

	assertRuntimeParam('a', 0, 'p1', true),
	assertRuntimeParam('a', 1, 'p2', true),
	assertRuntimeParam('a', 2, 'p', false)
)




// Whitespace Tests:
// Run some tests with 0, 1, ... newlines in between declarations.
// The newlines are auto-generated in the loop and inserted into the tests' source code.
for (let i = 0; i <= 10; i++) {
	// the newlines to insert in source code
	const newlines = '\n'.repeat(i)

	testWithName<ast.ClassDecl>(
		`class method decls separated by ${i} newlines each`,

		`class TestClass {
			func alpha() { }${newlines}
			func beta() { }
		}`,

		([classDecl]) => isInstanceOf(classDecl, ast.ClassDecl),
		([classDecl]) => classDecl.name.rawValue === 'TestClass',

		isMethodDecl('alpha'),
		isMethodDecl('beta')
	)
}
