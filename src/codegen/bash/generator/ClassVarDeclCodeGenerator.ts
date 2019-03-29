import { VarDeclCodeGenerator } from './VarDeclCodeGenerator'
import { register } from '../codeGeneratorFactory'
import { VarDecl, Statement, ClassDecl } from '@/compiler/ast'

@register(node => (
	node instanceof VarDecl &&
	node.parent instanceof Statement &&
	node.parent.parent instanceof ClassDecl
) ? 10 : 0)
export class ClassVarDeclCodeGenerator extends VarDeclCodeGenerator { }
