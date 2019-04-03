// tslint:disable:one-line
import {
	ClassDecl,
	FuncDecl,
	MethodDecl,
	VarDecl,
	Token,
	VarDeclModifier,
	EnumMemberDecl,
	EnumDecl
} from 'ast'
import { findContainingNode } from 'ast/utils/traverse'

/**
 * All node types that can have a unique name generated.
 */
type IUniquelyNamedNode = (
	ClassDecl |
	FuncDecl |
	MethodDecl |
	VarDecl |
	EnumMemberDecl
)

/**
 * Generates a unique name for an AST node.
 * @param node The AST node to get a unique name for.
 */
export function getUniqueName(node: IUniquelyNamedNode): string {
	// ClassDecl:
	if (node instanceof ClassDecl) {
		return `class__${node.name.rawValue}`
	}

	// VarDecl:
	else if (node instanceof VarDecl) {
		const containingClassDecl = findContainingNode<ClassDecl>(
			<VarDecl>node,
			parent => parent instanceof ClassDecl
		)

		if (!containingClassDecl) {
			throw new Error(
				'Cannot generate unique name for variable declaration that ' +
				'is not member of a class declaration.'
			)
		}

		const isStatic = VarDeclModifier.doesCombinationContain(
			node.modifiers,
			VarDeclModifier.Static
		)

		let modifiers = '_public'
		if (isStatic) {
			modifiers += '_static'
		}


		return `var${modifiers}__${containingClassDecl.name.rawValue}__${node.name.rawValue}`
	}

	// MethodDecl:
	else if (node instanceof MethodDecl) {
		const containingClassDecl = findContainingNode<ClassDecl>(
			<MethodDecl>node,
			parent => parent instanceof ClassDecl
		)
		if (!containingClassDecl) {
			throw new Error(
				'Cannot generate unique name for method declaration that ' +
				'is not member of a class declaration.'
			)
		}
		return `method__${containingClassDecl.name.rawValue}__${node.name.rawValue}`
	}

	// FuncDecl:
	else if (node instanceof FuncDecl) {
		return `func__${node.name.rawValue}`
	}

	// EnumMemberDecl:
	else if (node instanceof EnumMemberDecl) {
		const containingEnumDecl = findContainingNode<EnumDecl>(
			<MethodDecl>node,
			parent => parent instanceof EnumDecl
		)
		if (!containingEnumDecl) {
			throw new Error(
				'Cannot generate unique name for enum member declaration that ' +
				'is not member of an enum declaration.'
			)
		}

		return `enum__${containingEnumDecl.name.rawValue}__${node.name.rawValue}`
	}
}

/**
 * Generates a unique name for an AST node wrapped in a token node.
 * @param node The AST node to get a unique name for.
 */
export function getUniqueNameToken(node: IUniquelyNamedNode): Token {
	const uniqueName = getUniqueName(node)
	return new Token(
		uniqueName,
		node.name.startLineNumber,
		node.name.startColumnNumber,
		node.name.endLineNumber,
		node.name.endColumnNumber
	)
}

