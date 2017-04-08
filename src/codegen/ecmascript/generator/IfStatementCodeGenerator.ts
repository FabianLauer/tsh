import { BaseConditionalStatementCodeGenerator } from './BaseConditionalStatementCodeGenerator'
import { register } from '../factory'
import { IfStatement } from '@/compiler/ast'

@register(node => node instanceof IfStatement ? 1 : 0)
export class IfStatementCodeGenerator
extends BaseConditionalStatementCodeGenerator<IfStatement> {
	protected getConditionalKeyword() { return 'if' }
}
