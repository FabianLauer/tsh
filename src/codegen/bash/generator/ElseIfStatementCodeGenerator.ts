import { BaseConditionalStatementCodeGenerator } from './BaseConditionalStatementCodeGenerator'
import { register } from '../codeGeneratorFactory'
import { ElseIfStatement } from '@/compiler/ast'

@register(node => node instanceof ElseIfStatement ? 10 : 0)
export class ElseIfStatementCodeGenerator
extends BaseConditionalStatementCodeGenerator<ElseIfStatement> {
	protected getConditionalKeyword() { return 'else if' }
}
