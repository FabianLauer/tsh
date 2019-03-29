// tslint:disable:one-line

import { ClassDecl, FuncDecl, MethodDecl, VarDecl, BaseNode, Token } from 'ast'

/**
 * Finds the next highest class declaration node that contains the given AST node.
 * @param child The child to find the containing class declaration for.
 */
function findContainingClassDecl(
	node: (
		MethodDecl |
		VarDecl
	)
) {
	let parent: BaseNode = node

	do {
		parent = parent.parent
		if (!parent) {
			return undefined
		}
	} while (!(parent instanceof ClassDecl))

	return parent
}

/**
 * All node types that can have a unique name generated.
 */
type IUniquelyNamedNode = (
	ClassDecl |
	FuncDecl |
	MethodDecl |
	VarDecl
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
		const containingClassDecl = findContainingClassDecl(<VarDecl>node)
		if (!containingClassDecl) {
			throw new Error(
				'Cannot generate unique name for variable declaration that ' +
				'is not member of a class declaration.'
			)
		}
		return `var__${containingClassDecl.name.rawValue}__${node.name.rawValue}`
	}

	// MethodDecl:
	else if (node instanceof MethodDecl) {
		const containingClassDecl = findContainingClassDecl(<MethodDecl>node)
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

