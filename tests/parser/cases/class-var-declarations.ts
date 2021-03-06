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
 * Returns all member declarations in a given class declaration.
 * @param classDecl The class declaration to return the members of.
 */
function getClassMembers(classDecl: ast.ClassDecl) {
	return <Array<ast.VarDecl | ast.FuncDecl>>classDecl.body.nodes
		.filter(node => (
			isInstanceOf(node, ast.VarDecl) ||
			isInstanceOf(node, ast.FuncDecl)
		))
}


/**
 * Searches a class declaration member and returns it.
 * If there are multiple class members with the same name, the returned member can be any of the members
 * with that name.
 * Returns `undefined` if no member with the given name is found.
 * @param classDecl The class declaration to search members in.
 * @param name The name of the member to return.
 */
function getMemberByName<
	TMember extends ast.VarDecl | ast.MethodDecl
>(classDecl: ast.ClassDecl, name: string): TMember {
	const members = getClassMembers(classDecl)
	return <TMember>members.find(node => node.name.rawValue === name)
}

function isMemberVarDecl(memberName: string) {
	return ([classDecl]: [ast.ClassDecl]) =>
		isInstanceOf(getMemberByName<ast.VarDecl>(classDecl, memberName), ast.VarDecl)
}

function doesMemberHaveOwnAssignment(memberName: string) {
	return ([classDecl]: [ast.ClassDecl]) => {
		const varDecl = getMemberByName<ast.VarDecl>(classDecl, memberName)
		return (
			varDecl.assignment instanceof ast.Expr &&
			varDecl.assignment !== ast.Expr.Empty
		)
	}
}

function doesMemberHaveEmptyAssignment(memberName: string) {
	return ([classDecl]: [ast.ClassDecl]) =>
		getMemberByName<ast.VarDecl>(classDecl, memberName).assignment === ast.Expr.Empty
}

function expectVarDeclModifiers(
	memberName: string,
	firstModifier: ast.VarDeclModifier,
	...modifiers: ast.VarDeclModifier[]
) {
	return ([classDecl]: [ast.ClassDecl]) => {
		return ast.VarDeclModifier.areCombinationsEqual(
			getMemberByName<ast.VarDecl>(classDecl, memberName).modifiers,
			ast.VarDeclModifier.combine(firstModifier, ...modifiers)
		)
	}
}


///
/// Test Cases:
///

// tslint:disable:variable-name

for (const keyword of ['let', 'const']) {
	const modifier = keyword === 'let'
		? ast.VarDeclModifier.Let
		: ast.VarDeclModifier.Const

	const otherKeyword = keyword === 'let'
		? 'const'
		: 'let'

	const otherModifier = keyword === 'let'
		? ast.VarDeclModifier.Const
		: ast.VarDeclModifier.Let



	test<ast.ClassDecl>(
		`
		class TestClass {
			${keyword} a
		}
		`,
		([Class]) => isInstanceOf(Class, ast.ClassDecl),
		([Class]) => Class.name.rawValue === 'TestClass',

		isMemberVarDecl('a'),
		expectVarDeclModifiers('a', modifier)
	)

	test<ast.ClassDecl>(
		`
		class TestClass {
			static ${keyword} a
		}
		`,
		([Class]) => isInstanceOf(Class, ast.ClassDecl),
		([Class]) => Class.name.rawValue === 'TestClass',

		isMemberVarDecl('a'),
		expectVarDeclModifiers('a', modifier, ast.VarDeclModifier.Static)
	)



	test<ast.ClassDecl>(
		`
		class TestClass {
			${keyword} longMemberName
		}
		`,
		([Class]) => isInstanceOf(Class, ast.ClassDecl),
		([Class]) => Class.name.rawValue === 'TestClass',

		isMemberVarDecl('longMemberName'),
		expectVarDeclModifiers('longMemberName', modifier)
	)

	test<ast.ClassDecl>(
		`
		class TestClass {
			static ${keyword} longMemberName
		}
		`,
		([Class]) => isInstanceOf(Class, ast.ClassDecl),
		([Class]) => Class.name.rawValue === 'TestClass',

		isMemberVarDecl('longMemberName'),
		expectVarDeclModifiers('longMemberName', modifier, ast.VarDeclModifier.Static)
	)



	test<ast.ClassDecl>(
		`
		class TestClass {
			${keyword} a
			${keyword} b
		}
		`,
		([Class]) => isInstanceOf(Class, ast.ClassDecl),
		([Class]) => Class.name.rawValue === 'TestClass',

		isMemberVarDecl('a'),
		expectVarDeclModifiers('a', modifier),

		isMemberVarDecl('b'),
		expectVarDeclModifiers('b', modifier),
	)

	test<ast.ClassDecl>(
		`
		class TestClass {
			static ${keyword} a
			static ${keyword} b
		}
		`,
		([Class]) => isInstanceOf(Class, ast.ClassDecl),
		([Class]) => Class.name.rawValue === 'TestClass',

		isMemberVarDecl('a'),
		expectVarDeclModifiers('a', modifier, ast.VarDeclModifier.Static),

		isMemberVarDecl('b'),
		expectVarDeclModifiers('b', modifier, ast.VarDeclModifier.Static)
	)

	test<ast.ClassDecl>(
		`
		class TestClass {
			${keyword} a
			static ${keyword} b
		}
		`,
		([Class]) => isInstanceOf(Class, ast.ClassDecl),
		([Class]) => Class.name.rawValue === 'TestClass',

		isMemberVarDecl('a'),
		expectVarDeclModifiers('a', modifier),

		isMemberVarDecl('b'),
		expectVarDeclModifiers('b', modifier, ast.VarDeclModifier.Static)
	)

	test<ast.ClassDecl>(
		`
		class TestClass {
			static ${keyword} a
			${keyword} b
		}
		`,
		([Class]) => isInstanceOf(Class, ast.ClassDecl),
		([Class]) => Class.name.rawValue === 'TestClass',

		isMemberVarDecl('a'),
		expectVarDeclModifiers('a', modifier, ast.VarDeclModifier.Static),

		isMemberVarDecl('b'),
		expectVarDeclModifiers('b', modifier)
	)



	test<ast.ClassDecl>(
		`
		class TestClass {
			${keyword} a
			${otherKeyword} b
		}
		`,
		([Class]) => isInstanceOf(Class, ast.ClassDecl),
		([Class]) => Class.name.rawValue === 'TestClass',

		isMemberVarDecl('a'),
		expectVarDeclModifiers('a', modifier),

		isMemberVarDecl('b'),
		expectVarDeclModifiers('b', otherModifier),
	)

	test<ast.ClassDecl>(
		`
		class TestClass {
			static ${keyword} a
			static ${otherKeyword} b
		}
		`,
		([Class]) => isInstanceOf(Class, ast.ClassDecl),
		([Class]) => Class.name.rawValue === 'TestClass',

		isMemberVarDecl('a'),
		expectVarDeclModifiers('a', modifier, ast.VarDeclModifier.Static),

		isMemberVarDecl('b'),
		expectVarDeclModifiers('b', otherModifier, ast.VarDeclModifier.Static),
	)

	test<ast.ClassDecl>(
		`
		class TestClass {
			${keyword} a
			static ${otherKeyword} b
		}
		`,
		([Class]) => isInstanceOf(Class, ast.ClassDecl),
		([Class]) => Class.name.rawValue === 'TestClass',

		isMemberVarDecl('a'),
		expectVarDeclModifiers('a', modifier),

		isMemberVarDecl('b'),
		expectVarDeclModifiers('b', otherModifier, ast.VarDeclModifier.Static),
	)

	test<ast.ClassDecl>(
		`
		class TestClass {
			static ${keyword} a
			${otherKeyword} b
		}
		`,
		([Class]) => isInstanceOf(Class, ast.ClassDecl),
		([Class]) => Class.name.rawValue === 'TestClass',

		isMemberVarDecl('a'),
		expectVarDeclModifiers('a', modifier, ast.VarDeclModifier.Static),

		isMemberVarDecl('b'),
		expectVarDeclModifiers('b', otherModifier),
	)


	// Whitespace Tests:
	// Run some tests with 0, 1, ... newlines in between declarations.
	// The newlines are auto-generated in the loop and inserted into the tests' source code.
	for (let i = 0; i <= 10; i++) {
		// the newlines to insert in source code
		const newlines = '\n'.repeat(i)

		testWithName<ast.ClassDecl>(
			`class var decls with ${keyword} separated by ${i} newlines each`,

			`
			class TestClass {
				${newlines}
				${keyword} a${newlines}
				${keyword} b: Type${newlines}
				${keyword} c = 123${newlines}
				${keyword} d: Type = 123${newlines}
			}
			`,

			([classDecl]) => isInstanceOf(classDecl, ast.ClassDecl),
			([classDecl]) => classDecl.name.rawValue === 'TestClass',

			isMemberVarDecl('a'),
			expectVarDeclModifiers('a', modifier),
			doesMemberHaveEmptyAssignment('a'),

			isMemberVarDecl('b'),
			expectVarDeclModifiers('b', modifier),
			doesMemberHaveEmptyAssignment('b'),

			isMemberVarDecl('c'),
			expectVarDeclModifiers('c', modifier),
			doesMemberHaveOwnAssignment('c'),

			isMemberVarDecl('d'),
			expectVarDeclModifiers('d', modifier),
			doesMemberHaveOwnAssignment('d')
		)


		testWithName<ast.ClassDecl>(
			`class var decls (${keyword}, ${otherKeyword}) separated by ${i} newlines each`,

			`
			class TestClass {
				${newlines}
				${keyword} a${newlines}
				${otherKeyword} b: Type${newlines}
				${keyword} c = 123${newlines}
				${otherKeyword} d: Type = 123${newlines}
			}
			`,

			([classDecl]) => isInstanceOf(classDecl, ast.ClassDecl),
			([classDecl]) => classDecl.name.rawValue === 'TestClass',

			isMemberVarDecl('a'),
			expectVarDeclModifiers('a', modifier),
			doesMemberHaveEmptyAssignment('a'),

			isMemberVarDecl('b'),
			expectVarDeclModifiers('b', otherModifier),
			doesMemberHaveEmptyAssignment('b'),

			isMemberVarDecl('c'),
			expectVarDeclModifiers('c', modifier),
			doesMemberHaveOwnAssignment('c'),

			isMemberVarDecl('d'),
			expectVarDeclModifiers('d', otherModifier),
			doesMemberHaveOwnAssignment('d')
		)


		testWithName<ast.ClassDecl>(
			`static class var decls (${keyword}, ${otherKeyword}) separated by ${i} newlines each`,

			`
			class TestClass {
				${newlines}
				static ${keyword} a${newlines}
				static ${otherKeyword} b: Type${newlines}
				static ${keyword} c = 123${newlines}
				static ${otherKeyword} d: Type = 123${newlines}
			}
			`,

			([classDecl]) => isInstanceOf(classDecl, ast.ClassDecl),
			([classDecl]) => classDecl.name.rawValue === 'TestClass',

			isMemberVarDecl('a'),
			expectVarDeclModifiers('a', modifier, ast.VarDeclModifier.Static),
			doesMemberHaveEmptyAssignment('a'),

			isMemberVarDecl('b'),
			expectVarDeclModifiers('b', otherModifier, ast.VarDeclModifier.Static),
			doesMemberHaveEmptyAssignment('b'),

			isMemberVarDecl('c'),
			expectVarDeclModifiers('c', modifier, ast.VarDeclModifier.Static),
			doesMemberHaveOwnAssignment('c'),

			isMemberVarDecl('d'),
			expectVarDeclModifiers('d', otherModifier, ast.VarDeclModifier.Static),
			doesMemberHaveOwnAssignment('d')
		)


		testWithName<ast.ClassDecl>(
			`class var decls (static ${keyword}, ${otherKeyword}) separated by ${i} newlines each`,

			`
			class TestClass {
				${newlines}
				static ${keyword} a${newlines}
				${otherKeyword} b: Type${newlines}
				static ${keyword} c = 123${newlines}
				${otherKeyword} d: Type = 123${newlines}
			}
			`,

			([classDecl]) => isInstanceOf(classDecl, ast.ClassDecl),
			([classDecl]) => classDecl.name.rawValue === 'TestClass',

			isMemberVarDecl('a'),
			expectVarDeclModifiers('a', modifier, ast.VarDeclModifier.Static),
			doesMemberHaveEmptyAssignment('a'),

			isMemberVarDecl('b'),
			expectVarDeclModifiers('b', otherModifier),
			doesMemberHaveEmptyAssignment('b'),

			isMemberVarDecl('c'),
			expectVarDeclModifiers('c', modifier, ast.VarDeclModifier.Static),
			doesMemberHaveOwnAssignment('c'),

			isMemberVarDecl('d'),
			expectVarDeclModifiers('d', otherModifier),
			doesMemberHaveOwnAssignment('d')
		)
	}
}
