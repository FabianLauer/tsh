%token IDENTIFIER
%token FUNCTION
%start root
%%

primary_expression
	: IDENTIFIER
		{ $$ = yy.createNode(yy.Identifier, yy.createToken($1)); }
	| STRING_LITERAL
		{ $$ = yy.createNode(yy.StringLiteral, yy.createToken($1)); }
	| '(' expression ')'
		{ $$ = $2; }
	;

root
	: primary_expression
	{ return $$; }
	;
