import BaseGenerator from '../BaseGenerator'
import { register } from '../factory'
import { Comment } from '@/compiler/ast'

@register(node => node instanceof Comment ? Infinity : 0)
export class CommentCodeGenerator extends BaseGenerator<Comment> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: Comment) {
		// we ignore comments in output
		return ''
	}
}
