import { CompileTarget, ICompileTargetIds, ICompilerApi } from '@/compiler/api'
import { parseToSourceUnit } from '@/compiler/parser'
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
		return this.compileTargetIds.map($ => $.id)
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
		
	}


	/**
	 * Compiles a string of source code to output code.
	 * @param sourceCode The source code to compile.
	 * @param target The build target to compile to.
	 * @return string The output code.
	 */
	public compileSourceCode(sourceCode: string, target: CompileTarget): string {
		const sourceUnit = parseToSourceUnit(undefined, sourceCode)
		const codeGenerator = this.getCodeGeneratorByCompileTarget(target)
		return ''
	}


	private getCodeGeneratorByCompileTarget(target: CompileTarget) {
		switch (target) {
			default:
				throw new Error()
			case CompileTarget.EcmaScript:
				return EcmaScriptCodeGenerator
		}
	}
}
