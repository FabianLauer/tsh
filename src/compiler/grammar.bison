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


function_declaration:
	FUNCTION IDENTIFIER "(" ")"
		{
			$$ = yy.FuncDecl.create({
				funcName: yy.createToken($2)
			})
		}
	| FUNCTION IDENTIFIER "(" ")" compound_statement
		{
			$$ = yy.FuncDecl.create({
				funcName: yy.createToken($2),
				funcBody: $5
			})
		}
	| FUNCTION IDENTIFIER "(" ")" ":" type_expression
		{
			$$ = yy.FuncDecl.create({
				funcName: yy.createToken($2),
				returnTypeDecl: $6
			})
		}
	| FUNCTION IDENTIFIER "(" ")" ":" type_expression compound_statement
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
