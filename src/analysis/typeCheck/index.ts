export * from './TypeChecker'
export * from './TypeCheckIssue'
export * from './TypeCheckIssueSeverity'
export * from './TypeCheckResult'

import { createForAstNode as createTypeChecker } from './typeCheckerFactory'
export { createTypeChecker }

// Make sure all concrete type checkers are imported.
// Since they register themselves using the factory functions, there's
// no need to interact with them here in any other way.
import './typeCheckers/'
