import * as generatedParser from './generatedParser.js'
import * as ast from '../ast'

interface IGeneratedParser {
	yy: any
	parse(input: string): any
}

/**
 * This is the parser generated by JISON.
 * We keep this private.
 */
const parser: IGeneratedParser = (<any>generatedParser).parser


function getVarDeclModifierByKeyword(keyword: 'let' | 'const') {
	if (keyword === 'let') {
		return ast.VarDeclModifier.Let
	} else if (keyword === 'const') {
		return ast.VarDeclModifier.Const
	} else {
		throw new Error(`Parsing Error: "${keyword}" is not a legal var decl keyword.`)
	}
}


/**
 * Maps source code tokens to AST operator identifiers.
 */
const operatorMap: { [token: string]: ast.OperatorIdent } = {}

// Generate the operator map
Object.keys(ast.OperatorIdent)
	.filter(key => typeof key !== 'string' || key.length < 1)
	.forEach(key => {
		operatorMap[key] = <ast.OperatorIdent><any>ast.OperatorIdent[<any>key]
	})

function getOperatorFromToken(token: string) {
	return new ast.Operator(operatorMap[token], new ast.Token(token))
}


export function parseToArray(sourceCode: string): ast.BaseNode[] {
	for (const typeName in ast) {
		parser.yy[typeName] = (<any>ast)[typeName]
	}

	parser.yy.createToken = function (rawSource: string) {
		return new ast.Token(rawSource)
	}

	parser.yy.getVarDeclModifierByKeyword = getVarDeclModifierByKeyword
	parser.yy.getOperatorFromToken = getOperatorFromToken

	parser.yy.result = []
	parser.parse(sourceCode)
	return [].concat(parser.yy.result)
}


export function parseToSourceUnit(name: string, sourceCode: string): ast.SourceUnit {
	return new ast.SourceUnit(
		name,
		parseToArray(sourceCode)
	)
}

