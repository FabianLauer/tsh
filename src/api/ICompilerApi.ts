import { CompileTarget, ICompileTargetIds } from '@/compiler/api'
import { SourceUnit } from 'ast';

/**
 * Describes the public compiler API.
 */
export interface ICompilerApi {
	/**
	 * Returns all available compile target identifiers.
	 */
	getAvailableCompileTargets(): CompileTarget[]

	/**
	 * Returns all available identifiers that are associated to a compile target.
	 * The compile target must be known to the API, otherwise an error will be thrown.
	 * @throws
	 */
	getIdentifiersForCompileTarget(target: ICompileTargetIds.Any): ICompileTargetIds.Any
	getIdentifiersForCompileTarget(target: ICompileTargetIds.TCompileTarget): ICompileTargetIds.Any
	getIdentifiersForCompileTarget(target: ICompileTargetIds.THumanReadableId): ICompileTargetIds.Any

	/**
	 * Parses a string of source code into an AST.
	 * @param sourceCode The source code to compile.
	 * @return The syntax tree.
	 */
	parseSourceCode(sourceCode: string): SourceUnit

	/**
	 * Compiles a string of source code to output code.
	 * @param sourceCode The source code to compile.
	 * @param target The build target to compile to.
	 * @return string The output code.
	 */
	compileSourceCode(sourceCode: string, target: CompileTarget): string
}
