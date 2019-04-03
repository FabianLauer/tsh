import BaseGenerator from '../BaseGenerator'
import { register } from '../codeGeneratorFactory'
import { ImportStatement } from '@/compiler/ast'

@register(node => node instanceof ImportStatement ? Infinity : 0)
export class ImportStatementCodeGenerator extends BaseGenerator<ImportStatement> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: ImportStatement) {
		const importPath = astNode.importPath.contentToken.rawValue
		return `source "${importPath}";\n`
	}
}
