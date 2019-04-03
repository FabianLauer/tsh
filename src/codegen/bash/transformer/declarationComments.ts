// tslint:disable:one-line
import {
	Token,
	Comment,
	EnumDecl,
	ClassDecl,
	MethodDecl,
	FuncDecl,
	VarDecl,
	VarDeclModifier,
	BaseNode
} from '@/compiler/ast'

type IDeclarationNode = (
	EnumDecl |
	ClassDecl |
	MethodDecl |
	FuncDecl |
	VarDecl
)

type IDeclarationCommentRole = 'open' | 'close'

export function createDeclarationComment(node: IDeclarationNode, role: IDeclarationCommentRole): Comment {
	const nodePrefix = getDeclarationCommentPrefix(node)
	const content: string[] = []

	if (role === 'open') {
		content.push(
			`<tsh-declaration description="${nodePrefix} ${node.name.rawValue}">`
		)
	} else {
		content.push(
			`</tsh-declaration> ${nodePrefix} ${node.name.rawValue}`
		)
	}

	const tokens = content.map(line => new Token(line))

	return new Comment(tokens)
}


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


function getDeclarationCommentPrefix(node: IDeclarationNode): string {
	let prefix = ''

	// EnumDecl:
	if (node instanceof EnumDecl) {
		prefix = 'enum'
	}

	// ClassDecl:
	else if (node instanceof ClassDecl) {
		prefix = 'class'
	}

	// MethodDecl:
	else if (node instanceof MethodDecl) {
		const containingClassDecl = findContainingClassDecl(node)
		if (!containingClassDecl) {
			throw new Error(
				'Cannot generate declaration comment prefix for method declaration ' +
				'that is not member of a class declaration.'
			)
		}

		prefix = `method in class ${containingClassDecl.name.rawValue}`
	}

	// VarDecl:
	else if (node instanceof VarDecl) {
		const isStatic = VarDeclModifier.doesCombinationContain(
			node.modifiers,
			VarDeclModifier.Static
		)
		const isConst = VarDeclModifier.doesCombinationContain(
			node.modifiers,
			VarDeclModifier.Const
		)

		if (isStatic) {
			prefix += 'static '
		}

		if (isConst) {
			prefix += 'readonly '
		}

		prefix = 'var'

		const containingClassDecl = findContainingClassDecl(node)
		if (containingClassDecl) {
			prefix += ` in class ${containingClassDecl.name.rawValue}`
		}
	}

	return prefix
}
