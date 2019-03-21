// tslint:disable-next-line:no-var-requires
void require('app-module-path').addPath(__dirname + '/../src/')

import { CompilerApi } from '@/compiler/api'
import { readFileSync } from 'fs'
import { inspect } from 'util'

const sourceArgument = process.argv[2]
const sourceCode = (
	/\.tsh$/.test(sourceArgument)
		? readFileSync(sourceArgument).toString('utf8')
		: sourceArgument
)

const api = CompilerApi.create()
const ast = api.parseSourceCode(sourceCode)

process.stdout.write(inspect(ast, { depth: undefined }))
process.stdout.write('\n')

process.exit()
