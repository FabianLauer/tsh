///
/// SymbolTable.ts
///
/// Contains the class implementation for symbol tables as well as a few type declarations
/// that are being used by the `SymbolTable` class.
///

import * as ast from '@/compiler/ast'

export type IActualScope =
	ast.SourceUnit |
	ast.ParamDeclList |
	ast.Statement


/**
 * All AST node types that have their own scope.
 */
export type IScope =
	IActualScope |
	ast.AnonFuncDecl | ast.FuncDecl | ast.MethodDecl |
	ast.ClassDecl


const scopeConstructors = [
	ast.SourceUnit,
	ast.AnonFuncDecl, ast.FuncDecl, ast.MethodDecl,
	ast.ParamDeclList,
	ast.ClassDecl,
	ast.Statement,
	ast.IfStatement, ast.ElseIfStatement, ast.ElseStatement
]


/**
 * All AST node types that can be used as symbol declarations.
 */
export type ISymbolDecl = ast.VarDecl | ast.ParamDecl | ast.FuncDecl | ast.ClassDecl
const symbolDeclConstructors = [ast.VarDecl, ast.ParamDecl, ast.FuncDecl, ast.ClassDecl]


export class SymbolTable {
	/**
	 * Contains all symbol tables that were created.
	 * The map's keys are AST nodes for which symbol tables were created.
	 */
	private static byAstNode = new Map<IScope, SymbolTable>()


	/**
	 * Check if a node is a scope node.
	 * @param node The node to check.
	 */
	private static isScopeNode(node: IScope | ast.BaseNode): node is IScope {
		return scopeConstructors.indexOf(<any>node.constructor) !== -1
	}


	/** Ceates a new symbol table. */
	private constructor(
		/**
		 * The AST node for which a symbol table was created.
		 */
		private readonly proxy: IScope,
		/**
		 * The AST node for that the symbol table should use as the scope.
		 * This can be the same as `proxy` or it can be a member of the `proxy` node, such as
		 * the `body` statement of `FuncDecl`s.
		 */
		private readonly actualScope: IScope
	) { }


	/**
	 * Returns a symbol table for a certain AST node.
	 * @param node The AST node to return a symbol table for.
	 */
	public static getSymbolTableForAstNode(node: IScope) {
		if (!SymbolTable.isScopeNode(node)) {
			throw new Error('Can not get/create symbol table for node: not a scope node.')
		}

		if (!SymbolTable.byAstNode.has(node)) {
			const proxy = node
			let actualScope = node
			if (node instanceof ast.AnonFuncDecl || node instanceof ast.ClassDecl) {
				actualScope = node.body
			}
			SymbolTable.byAstNode.set(node, new SymbolTable(proxy, actualScope))
		}

		return SymbolTable.byAstNode.get(node)
	}


	/**
	 * Returns an array of all symbols that were declared in a symbol table's scope.
	 */
	public getAllSymbolDecls(): ISymbolDecl[] {
		if (ast.IContainerNode.isImplementedBy(<ast.IContainerNode.Any>this.actualScope)) {
			const asContainerNode = <ast.IContainerNode.Any>this.actualScope
			return <ISymbolDecl[]>asContainerNode.getChildNodes()
				.filter(node => symbolDeclConstructors.indexOf(<any>node.constructor) !== -1)
		}
		return []
	}


	/**
	 * Returns a symbol declaration by its name.
	 * @param symbolName The name of the symbol.
	 */
	public getSymbolDeclByName(symbolName: string): ISymbolDecl {
		return this.getAllSymbolDecls()
			.find(symbol => symbol.name.rawValue === symbolName)
	}


	/**
	 * Checks if a symbol with a certain name was declared in the scope of a symbol table.
	 * @param symbolName The name of the symbol to search for.
	 */
	public wasSymbolWithNameDeclared(symbolName: string): boolean {
		return this.getSymbolDeclByName(symbolName) instanceof ast.BaseNode
	}
}
