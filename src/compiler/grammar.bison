%token IDENTIFIER
%token FUNCTION
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


statement:
		expression
	|	statement
	|	compound_statement
;


statement_list:
		statement
	|	statement_list statement
;


compound_statement:
		"{" "}"					{ $$ = new yy.Statement() }
	|	"{" statement_list "}"	{ $$ = new yy.Statement() }
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


function_declaration:
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


root:
	compound_statement			{ return $$; }
	| function_declaration		{ return $$; }
;
