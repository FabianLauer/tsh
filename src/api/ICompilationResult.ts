import { TypeCheckIssue } from '@/compiler/analysis'

export interface ICompilationResult {
	readonly typeCheckIssues: ReadonlyArray<TypeCheckIssue>
	readonly compiledCode: string
}

export default ICompilationResult
