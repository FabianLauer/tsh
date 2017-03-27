%start root
%%


unary_operator_tokens:
	|	INC_OP
	|	DEC_OP
;

unary_operator:
	unary_operator_tokens { $$ = yy.getOperatorFromToken($1) }
;


unary_operation:
		primary_expr unary_operator
		{ $$ = new yy.UnaryOperation($1, $2, yy.UnaryOperatorPosition.Postfix) }
	|	unary_operator primary_expr
		{ $$ = new yy.UnaryOperation($1, $2, yy.UnaryOperatorPosition.Prefix) }
;


binary_operator_tokens:
		'+'
	|	'-'
	|	'*'
	|	'/'
	|	'%'
;


binary_operator:
	binary_operator_tokens { $$ = yy.getOperatorFromToken($1) }
;


assignment_operator_tokens:
		'='
	|	MUL_ASSIGN
	|	DIV_ASSIGN
	|	MOD_ASSIGN
	|	ADD_ASSIGN
	|	SUB_ASSIGN
	|	LEFT_ASSIGN
	|	RIGHT_ASSIGN
	|	AND_ASSIGN
	|	XOR_ASSIGN
	|	OR_ASSIGN
;


assignment_operator:
	assignment_operator_tokens { $$ = yy.getOperatorFromToken($1) }
;


binary_operation:
	expression binary_operator expression
	{ $$ = new yy.BinaryOperation($1, $2, $3) }
;


operation:
		binary_operation
	|	unary_operation
;



primary_expr:
		IDENTIFIER
	|	STRING_LITERAL
	|	CONSTANT
;


expression_tokens:
		primary_expr
	|	operation
;
expression:
	expression_tokens { $$ = new yy.Expr($1) }
;


type_expression:
	IDENTIFIER
		{ $$ = yy.TypeExpr.fromIdentifier(new yy.Token($1)) }
;


decl_assignment:
	'=' expression
		{ $$ = new yy.Expr($1) }
;


assignment_expr:
	IDENTIFIER assignment_operator expression
		{ $$ = new yy.BinaryOperation(new yy.Expr($1), $2, $3) }
;


let_or_const:
		LET
	|	CONST
;


var_name_decl_with_type_expr:
	/*
	Example:
		name: type_expr
	*/
	|	IDENTIFIER ":" type_expression
			{ $$ = [$1, $3] }
;

var_decl:
	/*
	Example:
		let varName
		const varName
	*/
		let_or_const IDENTIFIER
		{
			$$ = yy.VarDecl.create({
				modifier: yy.getVarDeclModifierByKeyword($1),
				varName: yy.createToken($2)
			})
		}

	/*
	Example:
		let varName: Type
		const varName: Type
	*/
	|	let_or_const var_name_decl_with_type_expr
		{
			$$ = yy.VarDecl.create({
				modifier: yy.getVarDeclModifierByKeyword($1),
				varName: yy.createToken($2[0]),
				typeDecl: $2[1]
			})
		}
	
	/*
	Example:
		let varName = expr
		const varName = expr
	*/
	|	let_or_const IDENTIFIER decl_assignment
		{
			$$ = yy.VarDecl.create({
				modifier: yy.getVarDeclModifierByKeyword($1),
				varName: yy.createToken($2),
				assignment: $3
			})
		}
	
	/*
	Example:
		let varName: Type = expr
		const varName: Type = expr
	*/
	|	let_or_const var_name_decl_with_type_expr decl_assignment
		{
			$$ = yy.VarDecl.create({
				modifier: yy.getVarDeclModifierByKeyword($1),
				varName: yy.createToken($2[0]),
				typeDecl: $2[1],
				assignment: $3
			})
		}
;


statement:
		var_decl
	|	assignment_expr
	|	expression
	|	statement
	|	return_statement
	|	compound_statement
;


return_statement:
	RETURN expression		{ $$ = new yy.ReturnStatement($2) }
;


comment:
	SL_COMMENT { $$ = new yy.Comment([new yy.Token($1)]) }
;


comment_list:
		comment
		{ $$ = $1 }
	|	comment_list comment
		{ $$ = new yy.Comment($1.lines.concat($2.lines)) }
;


statement_list:
		statement
		{ $$ = new yy.Statement([$1]) }
	|	comment_list
		{ $$ = new yy.Statement([$1]) }
	|	statement_list statement
		{
			$$ = new yy.Statement(
				$1.nodes.concat($2)
			)
		}
;


compound_statement:
		"{" "}"
		{ $$ = yy.Statement.Empty }

	|	"{" statement_list "}"
		{
			$$ = $2
		}
;


param_decl:
	/*
	Example:
		name
	*/
		IDENTIFIER
			{ $$ = new yy.ParamDecl(new yy.Token($1)) }
	
	/*
	Example:
		name: type_expr
	*/
	|	IDENTIFIER ":" type_expression
			{ $$ = new yy.ParamDecl(new yy.Token($1), $3) }
;


param_decl_list:
		param_decl
		{ $$ = yy.ParamDeclList.fromParamDecls([ $1 ]) }
	|	param_decl_list "," param_decl
		{
			$$ = yy.ParamDeclList.fromParamDecls(
				$1.paramDecls.concat($3)
			)
		}
;


func_decl:
	/*
	Example:
		func ident()
	*/
		FUNCTION IDENTIFIER "(" ")"
		{
			$$ = yy.FuncDecl.create({
				funcName: yy.createToken($2)
			})
		}

	/*
	Example:
		func ident(params: param_types)
	*/
	|	FUNCTION IDENTIFIER "(" param_decl_list ")"
		{
			$$ = yy.FuncDecl.create({
				funcName: yy.createToken($2),
				runtimeParamDecls: $4
			})
		}

	/*
	Example:
		func ident() { }
	*/
	|	FUNCTION IDENTIFIER "(" ")" compound_statement
		{
			$$ = yy.FuncDecl.create({
				funcName: yy.createToken($2),
				funcBody: $5
			})
		}

	/*
	Example:
		func ident(): type
	*/
	|	FUNCTION IDENTIFIER "(" ")" ARR type_expression
		{
			$$ = yy.FuncDecl.create({
				funcName: yy.createToken($2),
				returnTypeDecl: $6
			})
		}

	/*
	Example:
		func ident(): type { }
	*/
	|	FUNCTION IDENTIFIER "(" ")" ARR type_expression compound_statement
		{
			$$ = yy.FuncDecl.create({
				funcName: yy.createToken($2),
				returnTypeDecl: $6,
				funcBody: $7
			})
		}
;



root_grammar:
		comment_list
	| 	func_decl
;


root: root_grammar { yy.result.push($$); return $$ };
