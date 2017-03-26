%token IDENTIFIER
%token FUNCTION LET CONST
%start root
%%


expression:
		IDENTIFIER
	|	STRING_LITERAL
	|	CONSTANT
;


type_expression:
	IDENTIFIER
		{ $$ = yy.TypeExpr.fromIdentifier(new yy.Token($1)) }
;


assignment:
	'=' expression
		{ $$ = new yy.Expr($1) }
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
	|	let_or_const IDENTIFIER assignment
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
	|	let_or_const var_name_decl_with_type_expr assignment
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
	|	statement
	|	compound_statement
;


statement_list:
		statement
		{ $$ = new yy.Statement([$1]) }
	|	comment
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
		{ $$ = new yy.Statement() }

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


comment:
	SL_COMMENT { $$ = new yy.Comment(new yy.Token($1)) }
;


root:
		comment				{ return $$; }
	| 	func_decl			{ return $$; }
;
