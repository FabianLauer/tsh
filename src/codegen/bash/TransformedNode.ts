import { BaseNode } from 'ast'
import { assertAstNodeParam } from 'ast/utils/assert'

export class TransformedNodeWrapper<
	TOriginal extends BaseNode,
	TTransformed extends BaseNode
> extends BaseNode {
	public constructor(
		public readonly originalNode: TOriginal,
		public readonly transformedNode: TTransformed
	) {
		super()

		assertAstNodeParam(transformedNode instanceof BaseNode)
		assertAstNodeParam(originalNode instanceof BaseNode)
	}

	/**
	 * Creates an identical copy of this AST node.
	 */
	public clone(): this {
		return <this>new TransformedNodeWrapper<TOriginal, TTransformed>(
			this.originalNode.clone(),
			this.transformedNode.clone()
		)
	}
}
