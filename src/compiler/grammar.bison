%start root
%%

/* ------------------------------------------------------------------------------- */
/* ----------- TRIVIA ------------------------------------------------------------ */
/* ------------------------------------------------------------------------------- */

nl_or_eof:
		NL
	|	EOF
;

maybe_nl:
		NL
	|
;

maybe_nls:
		maybe_nl
	|	maybe_nls maybe_nl
;

maybe_nl_or_eof:
		maybe_nls
	|	EOF
;


comment: SL_COMMENT nl_or_eof { $$ = new yy.Comment([new yy.Token($1)]) };




/* ------------------------------------------------------------------------------- */
/* ----------- OPERATIONS -------------------------------------------------------- */
/* ------------------------------------------------------------------------------- */


/* ---------------------------- */
/* Unary Operators & Operations */
/* ---------------------------- */


unary_operator:
		INC_OP		{ $$ = yy.getOperatorFromToken($1) }
	|	DEC_OP		{ $$ = yy.getOperatorFromToken($1) }
;


unary_operation:
	/* postfix: */
		primary_expr unary_operator
			{ $$ = new yy.UnaryOperation($1, $2, yy.UnaryOperatorPosition.Postfix) }
	
	/* prefix: */
	|	unary_operator primary_expr
			{ $$ = new yy.UnaryOperation($1, $2, yy.UnaryOperatorPosition.Prefix) }
;



/* ----------------------------- */
/* Binary Operators & Operations */
/* ----------------------------- */


binary_operator:
		'+'		{ $$ = yy.getOperatorFromToken($1) }
	|	'-'		{ $$ = yy.getOperatorFromToken($1) }
	|	'*'		{ $$ = yy.getOperatorFromToken($1) }
	|	'/'		{ $$ = yy.getOperatorFromToken($1) }
	|	'%'		{ $$ = yy.getOperatorFromToken($1) }
;


binary_operation:
	primary_expr binary_operator primary_expr
		{ $$ = new yy.BinaryOperation($1, $2, $3) }
;



/* --------------------------------- */
/* Assignment Operators & Operations */
/* --------------------------------- */

assignment_operator:
		'='
	|	MUL_ASSIGN		{ $$ = yy.getOperatorFromToken($1) }
	|	DIV_ASSIGN		{ $$ = yy.getOperatorFromToken($1) }
	|	MOD_ASSIGN		{ $$ = yy.getOperatorFromToken($1) }
	|	ADD_ASSIGN		{ $$ = yy.getOperatorFromToken($1) }
	|	SUB_ASSIGN		{ $$ = yy.getOperatorFromToken($1) }
	|	LEFT_ASSIGN		{ $$ = yy.getOperatorFromToken($1) }
	|	RIGHT_ASSIGN	{ $$ = yy.getOperatorFromToken($1) }
	|	AND_ASSIGN		{ $$ = yy.getOperatorFromToken($1) }
	|	XOR_ASSIGN		{ $$ = yy.getOperatorFromToken($1) }
	|	OR_ASSIGN		{ $$ = yy.getOperatorFromToken($1) }
;


assignment_expr:
	IDENTIFIER assignment_operator expression
		{ $$ = new yy.BinaryOperation(new yy.Expr($1), $2, $3) }
;




/* ------------------------------------------------------------------------------- */
/* ----------- EXPRESSIONS ------------------------------------------------------- */
/* ------------------------------------------------------------------------------- */



primary_expr:
		IDENTIFIER
	|	STRING_LITERAL
	|	CONSTANT
;


operation:
		unary_operation		{ $$ = $1 }
	|	binary_operation	{ $$ = $1 }
;

expression:
		primary_expr		{ $$ = new yy.Expr($1) }
	|	operation			{ $$ = $1 }
	|	assignment_expr		{ $$ = $1 }
;


expression_statement:
	expression maybe_nl_or_eof		{ $$ = new yy.ExprStatement($1) }
;


type_expr:
	IDENTIFIER { $$ = yy.TypeExpr.fromIdentifier(new yy.Token($1)) }
;





/* ------------------------------------------------------------------------------- */
/* ----------- IF/ELSE IF/ELSE STATEMENTS ---------------------------------------- */
/* ------------------------------------------------------------------------------- */


__conditional_body: statement | compound_statement;


__conditional_if_statement:
	IF expression __conditional_body maybe_nl_or_eof
	{ $$ = new yy.IfStatement($2, $3) }
;


__conditional_else_if_statement:
	ELSE IF expression __conditional_body maybe_nl_or_eof
	{ $$ = new yy.ElseIfStatement($3, $4) }
;


__conditional_maybe_else_if_statements:
		maybe_nl_or_eof
	|	__conditional_maybe_else_if_statements __conditional_else_if_statement
	{
		$$ = $1 || []
		if (typeof $2 !== 'undefined') {
			$$ = $$.concat($2)
		}
	}
;


__conditional_else_statement:
	ELSE __conditional_body maybe_nl_or_eof
	{ $$ = new yy.ElseStatement([$2]) }
;
__conditional_maybe_else_statement: __conditional_else_statement | maybe_nl_or_eof;



conditional_statement:
	__conditional_if_statement
	__conditional_maybe_else_if_statements
	__conditional_maybe_else_statement
	maybe_nl_or_eof
	{
		var statements = [$1]
		if (Array.isArray($2)) {
			statements = statements.concat($2)
		}
		if (typeof $3 !== 'undefined') {
			statements.push($3)
		}
		$$ = new yy.Statement(statements)
	}
;



/* ------------------------------------------------------------------------------- */
/* ----------- STATEMENTS -------------------------------------------------------- */
/* ------------------------------------------------------------------------------- */


return_statement:
	RETURN expression maybe_nl_or_eof		{ $$ = new yy.ReturnStatement($2) }
;

statement:
		comment
	|	expression_statement
	|	var_decl
	|	return_statement
	|	conditional_statement
;

statements:
		maybe_nl_or_eof		{ $$ = [] }
	|	statements statement
		{
			$1 = $1 || []
			$2 = $2 || yy.Statement.Empty
			$$ = $1.concat($2)
		}
;

compound_statement:
	"{" maybe_nl statements maybe_nl "}"
		{
			if ($3 === '\n' || $3 === '') {
				$3 = []
			}
			$3 = $3 || []
			$$ = new yy.Statement($3)
		}
;




/* ------------------------------------------------------------------------------- */
/* ----------- VARIABLE DEC ------------------------------------------------------ */
/* ------------------------------------------------------------------------------- */


__var_decl_modifier:
		LET			{ $$ = yy.getVarDeclModifierByKeyword($1) }
	|	CONST		{ $$ = yy.getVarDeclModifierByKeyword($1) }
;
__var_decl_type_decl: ":" type_expr	{ $$ = $1 } | ;

__var_decl_name_and_maybe_type_decl:
	IDENTIFIER __var_decl_type_decl
		{ $$ = [yy.createToken($1), $2] }
;

__var_decl_maybe_assignment: '=' expression { $$ = new yy.Expr($2) } | ;

__var_decl_end: maybe_nl_or_eof;

var_decl:
	__var_decl_modifier
	__var_decl_name_and_maybe_type_decl
	__var_decl_maybe_assignment
	__var_decl_end
		{
			$$ = yy.VarDecl.create({
				modifier: $1,
				varName: $2[0],
				typeDecl: $2[1],
				assignment: $3
			})
		}
;




/* ------------------------------------------------------------------------------- */
/* ----------- PARAM & FUNC DECL ------------------------------------------------- */
/* ------------------------------------------------------------------------------- */


__param_decl_type_expr:
		":" type_expr { $$ = $2 }
	|
;
__param_decl:
	|	IDENTIFIER __param_decl_type_expr
			{ $$ = new yy.ParamDecl(new yy.Token($1), $2) }
;
param_decl_list:
		param_decl {
			const decls = []
			if (typeof $1 !== 'undefined') {
				decls.push($1)
			}
			$$ = yy.ParamDeclList.fromParamDecls(decls)
		}
	|	param_decl_list "," __param_decl
		{
			$$ = yy.ParamDeclList.fromParamDecls(
				$1.paramDecls.concat($3)
			)
		}
;


__func_ident: FUNCTION IDENTIFIER { $$ = yy.createToken($2) };
__func_param_decl_list: "(" param_decl_list ")" { $$ = $2 };
__func_return_expr: ARR type_expr { $$ = $2 } | ;
__func_body: compound_statement { $$ = $1 } | ;
__func_decl_end: maybe_nl_or_eof;
func_decl:
		__func_ident
		__func_param_decl_list
		__func_return_expr
		__func_body
		__func_decl_end
		{
			$$ = yy.FuncDecl.create({
				funcName: $1,
				runtimeParamDecls: $2,
				returnTypeDecl: $3,
				funcBody: $4
			})
		}
;



/* ------------------------------------------------------------------------------- */
/* ----------- METHOD DECL ------------------------------------------------------- */
/* ------------------------------------------------------------------------------- */

method_decl:
		__func_ident
		__func_param_decl_list
		__func_return_expr
		__func_body
		__func_decl_end
		{
			$$ = yy.MethodDecl.create({
				funcName: $1,
				runtimeParamDecls: $2,
				returnTypeDecl: $3,
				funcBody: $4
			})
		}
;



/* ------------------------------------------------------------------------------- */
/* ----------- CLASS DECL -------------------------------------------------------- */
/* ------------------------------------------------------------------------------- */



__class_body_statement:
		comment
	|	var_decl
	|	method_decl
;

__class_body_statements:
		maybe_nl_or_eof		{ $$ = [] }
	|	__class_body_statements __class_body_statement
		{
			$1 = $1 || []
			$2 = $2 || yy.Statement.Empty
			$$ = $1.concat($2)
		}
;

__class_body_compound_statement:
	"{" maybe_nl __class_body_statements maybe_nl "}"
		{
			if ($3 === '\n' || $3 === '') {
				$3 = []
			}
			$3 = $3 || []
			$$ = new yy.Statement($3)
		}
;

__class_ident: CLASS IDENTIFIER { $$ = yy.createToken($2) };
__class_body: __class_body_compound_statement { $$ = $1 } | ;
class_decl:
		__class_ident
		__class_body
		nl_or_eof
		{
			$$ = yy.ClassDecl.create({
				className: $1,
				classBody: $2
			})
		}
;



/* ------------------------------------------------------------------------------- */
/* ----------- ROOT -------------------------------------------------------------- */
/* ------------------------------------------------------------------------------- */



root_grammar:
		comment
	|	func_decl
	|	class_decl
	|	nl_or_eof
;


root_grammar_list:
		root_grammar
			{ $$ = $1 }
	|	root_grammar_list root_grammar
		{
			$1 = $1 || []
			if (!Array.isArray($1)) {
				$1 = [$1]
			}
			$$ = $1.concat($2)
		}
;

root: root_grammar_list {
	if (Array.isArray($1)) {
		$1 = $1.filter(node => (
			node !== '\n' &&
			node !== ''
		))
		yy.result.push.apply(yy.result, $1)
	} else {
		yy.result.push($1)
	}
	return $$
};

