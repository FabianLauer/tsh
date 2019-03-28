import { BaseNode } from '@/compiler/ast'
import { TransformedNodeWrapper } from './TransformedNode'

export type IAstTransformer<
	TOriginal extends BaseNode,
	TTransformed extends BaseNode,
> = (input: TOriginal) => TransformedNodeWrapper<TOriginal, TTransformed>
