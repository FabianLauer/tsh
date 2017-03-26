// Make sure all concrete generators are imported.
// Since they register themselves using the `factory.ts` functions, there's
// no need to interact with them here in any other way.
import { importFromDirectorySync } from 'utils/importUtils'
importFromDirectorySync(`${__dirname}/generator/`)

// Import and export the public types in this module.
import CodeGenerator from './CodeGenerator'
export { CodeGenerator }
