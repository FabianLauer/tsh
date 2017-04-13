// tslint:disable:no-reference


import { sh, jake } from './buildUtils'


/**
 * Creates a namespace which allows logical grouping of tasks, and prevents name-collisions
 * with task-names. Namespaces can be nested inside of other namespaces.
 * @param name The name of the namespace
 * @param scope The enclosing scope for the namespaced tasks
 */
declare function namespace(name: string, scope: () => void): void;


/**
 * Creates a description for a Jake Task (or FileTask, DirectoryTask). When invoked, the
 * description that iscreated will be associated with whatever Task is created next.
 * @param description The description for the Task
 */
declare function desc(description: string): void;


/**
 * @param name The name of the Task
 * @param prereqs Prerequisites to be run before this task
 * @param action The action to perform for this task
 * @param opts
 */
declare function task(name: string, action?: (...params: any[]) => any, opts?: any): any;




namespace('build', function () {

	desc('Removes the built compiler.')
	task('clean', () => {
		sh `rm -rf ./build/`
	})

	desc('Compiles the parser.')
	task('parser', () => {
		sh `jison -o ./src/compiler/generatedParser.js ./src/compiler/grammar.bison ./src/compiler/grammar.lex`
	})


	desc('Compiles the compiler except for the parser.')
	task('compiler', () => {
		jake('build', 'clean')
		sh `tsc`
	})

})


namespace('test', function () {

	const MOCHA_FLAGS = [
		'--reporter', 'progress'
	].join(' ')

	desc('Runs all tests.')
	task('all', () => {
		sh `mocha build/tests/all.js ${MOCHA_FLAGS}`
	})


	desc('Runs all parser tests.')
	task('parser', () => {
		sh `mocha build/tests/all.js --grep Parser ${MOCHA_FLAGS}`
	})


	desc('Runs all end to end tests.')
	task('e2e', () => {
		sh `mocha build/tests/all.js --grep E2E ${MOCHA_FLAGS}`
	})


	desc('Runs all API tests.')
	task('api', () => {
		sh `mocha build/tests/all.js --grep api ${MOCHA_FLAGS}`
	})

})


namespace('dev', function () {

	desc('Compiles the parser, then runs tests for it. Useful when working on the grammar definitions.')
	task('parser', () => {
		jake('build', 'clean')
		jake('build', 'parser')
		jake('build', 'compiler')
		jake('test', 'parser')
	})


	desc('Compiles the compiler, then runs end to end tests. Useful when working on code generators.')
	task('codegen', () => {
		jake('build', 'compiler')
		jake('test', 'e2e')
	})


	desc('Compiles the compiler, then runs API tests.')
	task('api', () => {
		jake('build', 'compiler')
		jake('test', 'api')
	})

})


namespace('demo', function () {

	desc('Clean the existing demo.')
	task('clean', () => {
		sh `rm -rf ./docs/monaco-editor`
		sh `mkdir ./docs/monaco-editor`
		sh `rm -rf ./docs/static`
		sh `mkdir ./docs/static`
	})


	desc('Update all JavaScript files (except the compiled compiler) that are needed for the demo to work.')
	task('update-static-js', () => {
		sh `cp ./node_modules/requirejs/require.js ./docs/static/`
		sh `cp -r ./node_modules/monaco-editor/min/vs ./docs/monaco-editor/vs`
	})


	desc('Update the JavaScript files of the compiler used for the demo.')
	task('update-compiler-js', () => {
		sh `node tools/bundleDemoCompiler.js`
	})


	desc('Fully updates the existing demo.')
	task('update', () => {
		jake('demo', 'clean')
		jake('demo', 'update-static-js')
		jake('demo', 'update-compiler-js')
	})

})
