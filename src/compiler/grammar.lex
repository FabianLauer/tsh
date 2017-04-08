D							[0-9]
L							[a-zA-Z_]
H							[a-fA-F0-9]
A							.*
E							[Ee][+-]?{D}+
FS							[fFlL]
IS							[uUlL]*
NL							\n

%%
"//"{A}						return 'SL_COMMENT';

"func"						return 'FUNCTION';
"class"						return 'CLASS';
"let"						return 'LET';
"const"						return 'CONST';
"return"					return 'RETURN';
"if"						return 'IF';
"else"						return 'ELSE';

{NL}						return 'NL';

{L}({L}|{D})*				return 'IDENTIFIER';

{D}+"."{D}*({E})?{FS}?		return 'CONSTANT';
{D}*"."{D}+({E})?{FS}?		return 'CONSTANT';

"0"[xX]{H}+{IS}?			return 'CONSTANT';
"0"{D}+{IS}?				return 'CONSTANT';
{D}+{IS}?					return 'CONSTANT';
"L"?"'"("\'"|[^'])+"'"		return 'CONSTANT';

{D}+{E}{FS}?				return 'CONSTANT';

"L"?'"'('\"'|[^"])*'"'		return 'STRING_LITERAL';

">>="						return 'RIGHT_ASSIGN';
"<<="						return 'LEFT_ASSIGN';
"+="						return 'ADD_ASSIGN';
"-="						return 'SUB_ASSIGN';
"*="						return 'MUL_ASSIGN';
"/="						return 'DIV_ASSIGN';
"%="						return 'MOD_ASSIGN';
"&="						return 'AND_ASSIGN';
"^="						return 'XOR_ASSIGN';
"|="						return 'OR_ASSIGN';
">>"						return 'RIGHT_OP';
"<<"						return 'LEFT_OP';
"++"						return 'INC_OP';
"--"						return 'DEC_OP';
"->"						return 'ARR';
"&&"						return 'AND_OP';
"||"						return 'OR_OP';
"<="						return 'LE_OP';
">="						return 'GE_OP';
"=="						return 'EQ_OP';
"!="						return 'NE_OP';
<<EOF>>						return 'EOF';

";"							{ return(';'); }
("{"|"<%")					{ return('{'); }
("}"|"%>")					%{ return('}'); %}
","							{ return(','); }
":"							{ return(':'); }
"="							{ return('='); }
"("							{ return('('); }
")"							{ return(')'); }
("["|"<:")					{ return('['); }
("]"|":>")					{ return(']'); }
"."							{ return('.'); }
"&"							{ return('&'); }
"!"							{ return('!'); }
"~"							{ return('~'); }
"-"							{ return('-'); }
"+"							{ return('+'); }
"*"							{ return('*'); }
"/"							{ return('/'); }
"%"							{ return('%'); }
"<"							{ return('<'); }
">"							{ return('>'); }
"^"							{ return('^'); }
"|"							{ return('|'); }
"?"							{ return('?'); }

[ \t\v\r\f]					{ }
.							{ /* ignore bad characters */ }

%%
