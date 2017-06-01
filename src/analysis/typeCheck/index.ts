import TypeChecker from './TypeChecker'
import TypeCheckIssue from './TypeCheckIssue'
import TypeCheckIssueSeverity from './TypeCheckIssueSeverity'
import TypeCheckResult from './TypeCheckResult'

import { createForAstNode as createTypeChecker } from './typeCheckerFactory'

// Import all concrete type checkers:
// Since they register themselves using the factory functions, there's
// no need to interact with them here in any other way.
import FunctionTypeChecker from './FunctionTypeChecker'
import NoOpTypeChecker from './NoOpTypeChecker'
import SourceUnitTypeChecker from './SourceUnitTypeChecker'
import StatementTypeChecker from './StatementTypeChecker'

export {
	TypeChecker,
	TypeCheckIssue,
	TypeCheckIssueSeverity,
	TypeCheckResult,

	createTypeChecker,

	FunctionTypeChecker,
	NoOpTypeChecker,
	SourceUnitTypeChecker,
	StatementTypeChecker
}
