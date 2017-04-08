import { Expr, Statement } from './'

export interface IConditionalStatement {
	/**
	 * The condition expression.
	 */
	condition: Expr
	/**
	 * The statement that is executed when the `condition` evaluates true.
	 */
	body: Statement
}

export default IConditionalStatement
