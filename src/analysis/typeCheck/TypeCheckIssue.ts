import Severity from './TypeCheckIssueSeverity'
import * as ast from '@/compiler/ast'

export class TypeCheckIssue {
	protected constructor(
		public readonly severity: Severity,
		public readonly message: string,
		private readonly astNodes: ast.BaseNode[]
	) { }


	// tslint:disable:variable-name
	public static  readonly Issues = new class {
		public readonly VariableDeclaredButNeverUsed = class extends TypeCheckIssue {
			constructor(varDecl: ast.VarDecl) {
				super(Severity.Error, 'Variable declared but never used.', [varDecl])
			}
		}


		public readonly IdentifierUsedButNeverDeclared = class extends TypeCheckIssue {
			constructor(identifier: ast.Identifier) {
				super(
					Severity.Error,
					`Identifier ${identifier.name.rawValue} was used but never declared.`,
					[identifier]
				)
			}
		}
	}
	// tslint:enable:variable-name
}

export default TypeCheckIssue
