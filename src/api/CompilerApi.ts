import { CompileTarget, ICompileTargetIds, ICompilerApi, ICompilationResult } from '@/compiler/api'
import { parseToSourceUnit } from '@/compiler/parser'
import { SourceUnit } from '@/compiler/ast'
import { createTypeChecker } from '@/compiler/analysis'
import { ICodeGenerator } from '@/compiler/codegen/base'
import { CodeGenerator as EcmaScriptCodeGenerator } from '@/compiler/codegen/ecmascript'
import { CodeGenerator as TypeScriptDeclarationsCodeGenerator } from '@/compiler/codegen/typescriptDeclarations'

/**
 * A programming interface to the compiler that is easy to use.
 * All operations in this class are idempotent, meaning they will always return the same output for
 * a set of input parameters.
 */
export class CompilerApi implements ICompilerApi {
	/**
	 * Creates a new instance of class `CompilerApi`.
	 */
	public static create() {
		return new CompilerApi()
	}


	/**
	 * Creates a new instance of class `CompilerApi`.
	 */
	private constructor() {
		// nothing to do
	}


	/**
	 * An array containing all compile target IDs.
	 */
	private readonly compileTargetIds: ICompileTargetIds.Any[] = [
		ICompileTargetIds.create(CompileTarget.EcmaScript, 'ES5'),
		ICompileTargetIds.create(CompileTarget.TypeScriptDeclarations, 'TSD')
	]


	/**
	 * Returns all available compile target identifiers.
	 */
	public getAvailableCompileTargets(): CompileTarget[] {
		return this.compileTargetIds.map(_ => _.id)
	}


	/**
	 * Finds the first item in `this.compileTargetIds` in which the given `key` matches `value`.
	 * @param key The key to compare.
	 * @param value The value to compare.
	 */
	private getCompileTargetByKeyValue<K extends keyof ICompileTargetIds.Any>(
		key: K,
		value: ICompileTargetIds.Any[K]
	) {
		return this.compileTargetIds.find(_ => _[key] === value)
	}


	/**
	 * Returns all available identifiers that are associated to a compile target.
	 * The compile target must be known to the API, otherwise an error will be thrown.
	 * @throws
	 */
	public getIdentifiersForCompileTarget(
		target: ICompileTargetIds.Any
	): ICompileTargetIds.Any

	public getIdentifiersForCompileTarget(
		target: ICompileTargetIds.TCompileTarget
	): ICompileTargetIds.Any

	public getIdentifiersForCompileTarget(
		target: ICompileTargetIds.THumanReadableId
	): ICompileTargetIds.Any

	public getIdentifiersForCompileTarget(
		target: (
			ICompileTargetIds.Any |
			ICompileTargetIds.TCompileTarget |
			ICompileTargetIds.THumanReadableId
		)
	): ICompileTargetIds.Any {
		if (ICompileTargetIds.TCompileTarget.isValid(<any>target)) {
			return this.getCompileTargetByKeyValue('id', <ICompileTargetIds.TCompileTarget>target)
		} else if (ICompileTargetIds.THumanReadableId.isValid(<any>target)) {
			return this.getCompileTargetByKeyValue(
				'humanReadableId',
				<ICompileTargetIds.THumanReadableId>target
			)
		} else if (
			ICompileTargetIds.isValid(<any>target) &&
			this.compileTargetIds.indexOf(<any>target) !== -1
		) {
			return <ICompileTargetIds.Any>target
		}

		// the compile target wasn't found:
		return undefined
	}


	/**
	 * Compiles a string of source code to output code.
	 * @param sourceCode The source code to compile.
	 * @param target The build target to compile to.
	 * @return The compilation result. See declaration of `ICompilationResult` for more.
	 */
	public compileSourceCode(sourceCode: string, target: CompileTarget): ICompilationResult {
		// Parse the source code:
		const sourceUnit = parseToSourceUnit(
			// we create the source unit with a unique name:
			`SourceUnit-${++CompilerApi.sourceUnitCount}`,
			sourceCode
		)

		// Perform type checking:
		const typeChecker = createTypeChecker(sourceUnit)
		typeChecker.performTypeCheck()


		// Generate code:
		const codeGenerator = this.createCodeGenerator(target, sourceUnit)

		// Return the complete compilation result:
		return {
			typeCheckIssues: typeChecker.getIssues(),
			compiledCode: codeGenerator.generateCode()
		}
	}


	/**
	 * An internal counter used to make source unit names as unique as possible.
	 */
	private static sourceUnitCount = 0


	/**
	 * Creates a code generator instance
	 * @param target The compile target to create a code generator for.
	 * @param sourceUnit The source unit to create a code generator for.
	 * @return A code generator for `target` and `sourceUnit`.
	 */
	private createCodeGenerator(
		target: CompileTarget,
		sourceUnit: SourceUnit
	): ICodeGenerator<SourceUnit> {
		switch (target) {
			default:
				throw new Error(`No code generator for compile target ${target} exists.`)
			case CompileTarget.EcmaScript:
				return new EcmaScriptCodeGenerator(sourceUnit)
			case CompileTarget.TypeScriptDeclarations:
				return new TypeScriptDeclarationsCodeGenerator(sourceUnit)
		}
	}
}
