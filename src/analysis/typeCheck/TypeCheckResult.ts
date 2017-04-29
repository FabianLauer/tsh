import TypeCheckIssue from './TypeCheckIssue'

export class TypeCheckResult {
	public constructor() {
		// do nothing
	}


	private issues: TypeCheckIssue[] = []


	public getIssues() {
		return <ReadonlyArray<TypeCheckIssue>>this.issues
	}


	public addIssue(issue: TypeCheckIssue) {
		if (this.issues.indexOf(issue) !== -1) {
			throw new Error('Cannot add typecheck issue to result: issue already added.')
		}
		this.issues.push(issue)
	}
}

export default TypeCheckResult
