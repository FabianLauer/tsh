// tslint:disable-next-line:no-var-requires
void require('app-module-path').addPath(__dirname + '/../src/')

import { CompilerApi, CompileTarget } from '@/compiler/api'
import { readFileSync, writeFileSync } from 'fs'

const sourceFilePath = process.argv[2]
const targetFilePath = process.argv[3]

const sourceCode = readFileSync(sourceFilePath).toString('utf8')
const api = CompilerApi.create()
const compiledCode = api.compileSourceCode(sourceCode, CompileTarget.EcmaScript)

writeFileSync(targetFilePath, compiledCode)
