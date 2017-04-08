import { CompileTarget, ICompileTargetIds, ICompilerApi } from '@/compiler/api'
import { parseToSourceUnit } from '@/compiler/parser'
import { SourceUnit } from '@/compiler/ast'
import { ICodeGenerator } from '@/compiler/codegen/base'
import { CodeGenerator as EcmaScriptCodeGenerator } from '@/compiler/codegen/ecmascript'

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
		ICompileTargetIds.create(CompileTarget.EcmaScript, 'ES5')
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
	 * @return string The output code.
	 */
	public compileSourceCode(sourceCode: string, target: CompileTarget): string {
		const sourceUnit = parseToSourceUnit(undefined, sourceCode)
		const codeGenerator = this.createCodeGenerator(target, sourceUnit)
		return codeGenerator.generateCode()
	}


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
		}
	}
}
