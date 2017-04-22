import * as ast from '@/compiler/ast'

/**
 * All AST node types that have their own scope.
 */
export type IScope =
	ast.SourceUnit |
	ast.AnonFuncDecl | ast.FuncDecl | ast.MethodDecl |
	ast.ParamDeclList |
	ast.ClassDecl |
	ast.IfStatement | ast.ElseIfStatement | ast.ElseStatement


const scopeConstructors = [
	ast.SourceUnit,
	ast.AnonFuncDecl, ast.FuncDecl, ast.MethodDecl,
	ast.ParamDeclList,
	ast.ClassDecl,
	ast.IfStatement, ast.ElseIfStatement, ast.ElseStatement
]


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


	/**
	 * Returns a symbol table for a certain AST node.
	 * @param node The AST node to return a symbol table for.
	 */
	public static getSymbolTableForAstNode(node: IScope) {
		if (!SymbolTable.isScopeNode(node)) {
			throw new Error('Can not get/create symbol table for node: not a scope node.')
		}
		if (!SymbolTable.byAstNode.has(node)) {
			SymbolTable.byAstNode.set(node, new SymbolTable(node))
		}
		return SymbolTable.byAstNode.get(node)
	}


	/** Ceates a new symbol table. */
	private constructor(
		/**
		 * The AST node for which a symbol table was created.
		 */
		private node: IScope
	) { }
}
