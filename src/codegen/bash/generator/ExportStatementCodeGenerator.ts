import BaseGenerator from '../BaseGenerator'
import { register } from '../codeGeneratorFactory'
import { ExportStatement } from '@/compiler/ast'

@register(node => node instanceof ExportStatement ? Infinity : 0)
export class ExportStatementCodeGenerator extends BaseGenerator<ExportStatement> {
	/**
	 * Generates code for a given syntax tree.
	 * This method is automatically called by the `BaseGenerator` class whenever necessary.
	 * @param ast The syntax tree to generate code for.
	 */
	protected generateCodeConcrete(astNode: ExportStatement) {
		const exportedName = astNode.exportedIdentifier.name.rawValue
		return `exports['${exportedName}'] = ${exportedName};\n`
	}
}
