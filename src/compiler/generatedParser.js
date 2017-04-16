/* parser generated by jison 0.4.17 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var generatedParser = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,11],$V1=[1,12],$V2=[1,8],$V3=[1,13],$V4=[1,14],$V5=[1,4,5,10,83,95],$V6=[1,18],$V7=[4,5],$V8=[1,4,5,10,12,13,17,42,45,46,54,56,62,66,68,69,76,83,95],$V9=[2,91],$Va=[1,25],$Vb=[18,81],$Vc=[2,84],$Vd=[1,28],$Ve=[2,4],$Vf=[1,31],$Vg=[2,93],$Vh=[1,34],$Vi=[1,36],$Vj=[10,66,68,69,76,83],$Vk=[1,44],$Vl=[1,4,5,10,66,68,69,76,83,95],$Vm=[1,60],$Vn=[1,61],$Vo=[4,10,66,68,69,76,83],$Vp=[10,12,13,17,42,45,46,54,62,66,68,69],$Vq=[1,68],$Vr=[1,98],$Vs=[1,99],$Vt=[1,88],$Vu=[1,92],$Vv=[1,93],$Vw=[1,94],$Vx=[1,86],$Vy=[1,81],$Vz=[4,10,12,13,17,42,45,46,54,62,66,68,69],$VA=[4,5,10,12,13,17,42,45,46,54,56,62,66,68,69,76,83],$VB=[2,76],$VC=[1,101],$VD=[4,5,10,12,13,17,30,42,45,46,54,56,62,66,68,69,76,83],$VE=[4,5,10,66,68,69,76,83],$VF=[4,5,10,12,13,17,42,45,46,54,56,62,66,68,69],$VG=[10,12,13,17,42,45,46,54,56,62,66,68,69],$VH=[1,109],$VI=[1,110],$VJ=[1,111],$VK=[1,112],$VL=[1,113],$VM=[1,114],$VN=[4,5,10,12,13,17,18,20,21,22,23,24,25,42,45,46,54,56,62,65,66,68,69,76,83],$VO=[2,42],$VP=[2,37],$VQ=[2,39],$VR=[2,14],$VS=[2,23],$VT=[1,139],$VU=[12,13,17,42,45,46],$VV=[1,156],$VW=[20,21,22,23,24,25],$VX=[4,5,10,12,13,17,18,42,45,46,54,56,62,65,66,68,69,76,83];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"nl_or_eof":3,"NL":4,"EOF":5,"maybe_nl":6,"maybe_nls":7,"maybe_nl_or_eof":8,"comment":9,"SL_COMMENT":10,"unary_operator":11,"INC_OP":12,"DEC_OP":13,"atomic_unary_operation":14,"primary_expr":15,"unary_operation":16,"(":17,")":18,"binary_operator":19,".":20,"+":21,"-":22,"*":23,"/":24,"%":25,"atomic_binary_operation":26,"expression":27,"binary_operation":28,"assignment_operator":29,"=":30,"MUL_ASSIGN":31,"DIV_ASSIGN":32,"MOD_ASSIGN":33,"ADD_ASSIGN":34,"SUB_ASSIGN":35,"LEFT_ASSIGN":36,"RIGHT_ASSIGN":37,"AND_ASSIGN":38,"XOR_ASSIGN":39,"OR_ASSIGN":40,"atomic_assignment_expr":41,"IDENTIFIER":42,"assignment_expr":43,"atomic_primary_expr":44,"CONSTANT":45,"STRING_LITERAL":46,"operation":47,"expression_statement":48,"type_expr":49,"conditional_body":50,"statement":51,"compound_statement":52,"conditional_if_statement":53,"IF":54,"conditional_else_if_statement":55,"ELSE":56,"conditional_maybe_else_if_statements":57,"conditional_else_statement":58,"conditional_maybe_else_statement":59,"conditional_statement":60,"return_statement":61,"RETURN":62,"var_decl":63,"statements":64,"{":65,"}":66,"var_decl_modifier":67,"LET":68,"CONST":69,"var_decl_type_decl":70,":":71,"var_decl_name_and_maybe_type_decl":72,"var_decl_maybe_assignment":73,"var_decl_end":74,"static_var_decl_modifier":75,"STATIC":76,"static_var_decl":77,"param_decl_type_expr":78,"param_decl":79,"param_decl_list":80,",":81,"func_ident":82,"FUNCTION":83,"func_param_decl_list":84,"func_return_expr":85,"ARR":86,"func_body":87,"func_decl_end":88,"func_decl":89,"method_decl":90,"class_body_statement":91,"class_body_statements":92,"class_body_compound_statement":93,"class_ident":94,"CLASS":95,"class_body":96,"class_decl":97,"root_grammar":98,"root_grammar_list":99,"root":100,"$accept":0,"$end":1},
terminals_: {2:"error",4:"NL",5:"EOF",10:"SL_COMMENT",12:"INC_OP",13:"DEC_OP",17:"(",18:")",20:".",21:"+",22:"-",23:"*",24:"/",25:"%",30:"=",31:"MUL_ASSIGN",32:"DIV_ASSIGN",33:"MOD_ASSIGN",34:"ADD_ASSIGN",35:"SUB_ASSIGN",36:"LEFT_ASSIGN",37:"RIGHT_ASSIGN",38:"AND_ASSIGN",39:"XOR_ASSIGN",40:"OR_ASSIGN",42:"IDENTIFIER",45:"CONSTANT",46:"STRING_LITERAL",54:"IF",56:"ELSE",62:"RETURN",65:"{",66:"}",68:"LET",69:"CONST",71:":",76:"STATIC",81:",",83:"FUNCTION",86:"ARR",95:"CLASS"},
productions_: [0,[3,1],[3,1],[6,1],[6,0],[7,1],[7,2],[8,1],[8,1],[9,2],[11,1],[11,1],[14,2],[14,2],[16,1],[16,3],[19,1],[19,1],[19,1],[19,1],[19,1],[19,1],[26,3],[28,1],[28,3],[29,1],[29,1],[29,1],[29,1],[29,1],[29,1],[29,1],[29,1],[29,1],[29,1],[29,1],[41,3],[43,1],[43,3],[44,1],[44,1],[44,1],[15,1],[15,3],[47,1],[47,1],[27,1],[27,1],[27,1],[48,2],[49,1],[50,1],[50,1],[53,4],[55,5],[57,1],[57,2],[58,3],[59,1],[59,1],[60,4],[61,3],[51,1],[51,1],[51,1],[51,1],[51,1],[64,1],[64,2],[52,5],[67,1],[67,1],[70,2],[70,0],[72,2],[73,2],[73,0],[74,1],[63,4],[75,2],[75,2],[77,4],[78,2],[78,0],[79,0],[79,2],[80,1],[80,3],[82,2],[84,3],[85,2],[85,0],[87,1],[87,0],[88,1],[89,5],[90,5],[91,1],[91,1],[91,1],[91,1],[92,1],[92,2],[93,5],[94,2],[96,1],[96,0],[97,3],[98,1],[98,1],[98,1],[98,1],[99,1],[99,2],[100,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 9:
 this.$ = new yy.Comment([new yy.Token($$[$0-1])]) 
break;
case 10: case 11: case 16: case 17: case 18: case 19: case 20: case 21: case 25: case 26: case 27: case 28: case 29: case 30: case 31: case 32: case 33: case 34: case 35:
 this.$ = yy.getOperatorFromToken($$[$0]) 
break;
case 12:
 this.$ = new yy.UnaryOperation($$[$0-1], $$[$0], yy.UnaryOperatorPosition.Postfix) 
break;
case 13:
 this.$ = new yy.UnaryOperation($$[$0], $$[$0-1], yy.UnaryOperatorPosition.Prefix) 
break;
case 14: case 23: case 37: case 42: case 44: case 45: case 46: case 47: case 48: case 72: case 82: case 90: case 92: case 105: case 112:
 this.$ = $$[$0] 
break;
case 15: case 24: case 38: case 43:
 this.$ = new yy.PrecedenceExpr($$[$0-1]) 
break;
case 22:
 this.$ = new yy.BinaryOperation($$[$0-2], $$[$0-1], $$[$0]) 
break;
case 36:

			var identifierToken = new yy.Token($$[$0-2])
			var identifier = new yy.Identifier(identifierToken)
			this.$ = new yy.BinaryOperation(identifier, $$[$0-1], $$[$0])
		
break;
case 39:
 this.$ = new yy.Identifier(new yy.Token($$[$0])) 
break;
case 40:
 this.$ = new yy.NumericExpr(new yy.Token($$[$0])) 
break;
case 41:

		/*
			We replace the quotes by slicing them away. This is trivial since the quotes
			are *always* the first and last character in the `STRING_LITERAL` terminal.
			The `.trim()` before the `.slice(...)` shouldn't be necessary, but we're
			rather safe than sorry.
		*/
		var content = new yy.Token(($$[$0]).trim().slice(1, -1))
		this.$ = new yy.StringLiteral(content)
	
break;
case 49:
 this.$ = new yy.ExprStatement($$[$0-1]) 
break;
case 50:
 this.$ = yy.TypeExpr.fromIdentifier(new yy.Token($$[$0])) 
break;
case 53:
 this.$ = new yy.IfStatement($$[$0-2], $$[$0-1]) 
break;
case 54:
 this.$ = new yy.ElseIfStatement($$[$0-2], $$[$0-1]) 
break;
case 56:

		this.$ = $$[$0-1] || []
		if (typeof $$[$0] !== 'undefined') {
			this.$ = this.$.concat($$[$0])
		}
	
break;
case 57:
 this.$ = new yy.ElseStatement([$$[$0-1]]) 
break;
case 60:

		var statements = [$$[$0-3]]
		if (Array.isArray($$[$0-2])) {
			statements = statements.concat($$[$0-2])
		}
		if (typeof $$[$0-1] !== 'undefined') {
			statements.push($$[$0-1])
		}
		this.$ = new yy.Statement(statements)
	
break;
case 61:
 this.$ = new yy.ReturnStatement($$[$0-1]) 
break;
case 67: case 101:
 this.$ = [] 
break;
case 68: case 102:

			$$[$0-1] = $$[$0-1] || []
			$$[$0] = $$[$0] || yy.Statement.Empty
			this.$ = $$[$0-1].concat($$[$0])
		
break;
case 69: case 103:

			if ($$[$0-2] === '\n' || $$[$0-2] === '') {
				$$[$0-2] = []
			}
			$$[$0-2] = $$[$0-2] || []
			this.$ = new yy.Statement($$[$0-2])
		
break;
case 70: case 71: case 79: case 80:
 this.$ = yy.getVarDeclModifierByKeyword($$[$0]) 
break;
case 74:
 this.$ = [yy.createToken($$[$0-1]), $$[$0]] 
break;
case 75:
 this.$ = new yy.Expr($$[$0]) 
break;
case 78:

			this.$ = yy.VarDecl.create({
				modifiers: yy.VarDeclModifier.combine($$[$0-3]),
				varName: $$[$0-2][0],
				typeDecl: $$[$0-2][1],
				assignment: $$[$0-1]
			})
		
break;
case 81:

			this.$ = yy.VarDecl.create({
				modifiers: yy.VarDeclModifier.combine(yy.VarDeclModifier.Static, $$[$0-3]),
				varName: $$[$0-2][0],
				typeDecl: $$[$0-2][1],
				assignment: $$[$0-1]
			})
		
break;
case 85:
 this.$ = new yy.ParamDecl(new yy.Token($$[$0-1]), $$[$0]) 
break;
case 86:

			const decls = []
			if (typeof $$[$0] !== 'undefined') {
				decls.push($$[$0])
			}
			this.$ = yy.ParamDeclList.fromParamDecls(decls)
		
break;
case 87:

			this.$ = yy.ParamDeclList.fromParamDecls(
				$$[$0-2].paramDecls.concat($$[$0])
			)
		
break;
case 88: case 104:
 this.$ = yy.createToken($$[$0]) 
break;
case 89:
 this.$ = $$[$0-1] 
break;
case 95:

			this.$ = yy.FuncDecl.create({
				funcName: $$[$0-4],
				runtimeParamDecls: $$[$0-3],
				returnTypeDecl: $$[$0-2],
				funcBody: $$[$0-1]
			})
		
break;
case 96:

			this.$ = yy.MethodDecl.create({
				funcName: $$[$0-4],
				runtimeParamDecls: $$[$0-3],
				returnTypeDecl: $$[$0-2],
				funcBody: $$[$0-1]
			})
		
break;
case 107:

			this.$ = yy.ClassDecl.create({
				className: $$[$0-2],
				classBody: $$[$0-1]
			})
		
break;
case 113:

			$$[$0-1] = $$[$0-1] || []
			if (!Array.isArray($$[$0-1])) {
				$$[$0-1] = [$$[$0-1]]
			}
			this.$ = $$[$0-1].concat($$[$0])
		
break;
case 114:

	if (Array.isArray($$[$0])) {
		$$[$0] = $$[$0].filter(node => (
			node !== '\n' &&
			node !== ''
		))
		yy.result.push.apply(yy.result, $$[$0])
	} else {
		yy.result.push($$[$0])
	}
	return this.$

break;
}
},
table: [{3:7,4:$V0,5:$V1,9:4,10:$V2,82:9,83:$V3,89:5,94:10,95:$V4,97:6,98:3,99:2,100:1},{1:[3]},{1:[2,114],3:7,4:$V0,5:$V1,9:4,10:$V2,82:9,83:$V3,89:5,94:10,95:$V4,97:6,98:15},o($V5,[2,112]),o($V5,[2,108]),o($V5,[2,109]),o($V5,[2,110]),o($V5,[2,111]),{3:16,4:$V0,5:$V1},{17:$V6,84:17},o($V7,[2,106],{96:19,93:20,65:[1,21]}),o($V8,[2,1]),o($V8,[2,2]),{42:[1,22]},{42:[1,23]},o($V5,[2,113]),o($V8,[2,9]),o([1,4,5,10,65,83,95],$V9,{85:24,86:$Va}),o($Vb,$Vc,{80:26,79:27,42:$Vd}),{3:29,4:$V0,5:$V1},o($V7,[2,105]),o([5,10,66,68,69,76,83],$Ve,{6:30,4:$Vf}),{17:[2,88]},o([4,5,65],[2,104]),o($V5,$Vg,{87:32,52:33,65:$Vh}),{42:$Vi,49:35},{18:[1,37],81:[1,38]},o($Vb,[2,86]),o($Vb,[2,83],{78:39,71:[1,40]}),o($V5,[2,107]),o($Vj,$Ve,{92:41,8:42,7:43,6:45,4:$Vf,5:$Vk}),o($V8,[2,3]),o([1,10,83,95],$Ve,{7:43,6:45,88:46,8:47,4:$Vf,5:$Vk}),o($Vl,[2,92]),o([5,10,12,13,17,42,45,46,54,62,66,68,69],$Ve,{6:48,4:$Vf}),o([1,4,5,10,65,66,68,69,76,83,95],[2,90]),o([1,4,5,10,12,13,17,18,30,42,45,46,54,56,62,65,66,68,69,76,81,83,95],[2,50]),o([1,4,5,10,65,66,68,69,76,83,86,95],[2,89]),o($Vb,$Vc,{79:49,42:$Vd}),o($Vb,[2,85]),{42:$Vi,49:50},{4:$Vf,6:51,9:53,10:$V2,63:54,66:$Ve,67:57,68:$Vm,69:$Vn,75:58,76:[1,62],77:55,82:59,83:$V3,90:56,91:52},o($Vo,[2,101]),o([1,5,10,12,13,17,42,45,46,54,56,62,66,68,69,76,83,95],[2,7],{6:63,4:$Vf}),o($V8,[2,8]),o($V8,[2,5]),o($V5,[2,95]),o($Vl,[2,94]),o($Vp,$Ve,{7:43,6:45,64:64,8:65,4:$Vf,5:$Vk}),o($Vb,[2,87]),o($Vb,[2,82]),{66:[1,66]},o($Vo,[2,102]),o($Vo,[2,97]),o($Vo,[2,98]),o($Vo,[2,99]),o($Vo,[2,100]),{42:$Vq,72:67},{42:$Vq,72:69},{17:$V6,84:70},{42:[2,70]},{42:[2,71]},{68:[1,71],69:[1,72]},o($V8,[2,6]),{4:$Vf,6:73,9:75,10:$V2,11:97,12:$Vr,13:$Vs,14:95,15:83,16:89,17:$Vt,26:96,27:80,28:90,41:91,42:$Vu,43:85,44:87,45:$Vv,46:$Vw,47:84,48:76,51:74,53:82,54:$Vx,60:79,61:78,62:$Vy,63:77,66:$Ve,67:57,68:$Vm,69:$Vn},o($Vz,[2,67]),o($V7,[2,103]),o($VA,$VB,{73:100,30:$VC}),o($VD,[2,73],{70:102,71:[1,103]}),o($VE,$VB,{73:104,30:$VC}),o([4,5,10,65,66,68,69,76,83],$V9,{85:105,86:$Va}),{42:[2,79]},{42:[2,80]},{66:[1,106]},o($Vz,[2,68]),o($VF,[2,62]),o($VF,[2,63]),o($VF,[2,64]),o($VF,[2,65]),o($VF,[2,66]),o($VG,$Ve,{7:43,6:45,8:107,19:108,4:$Vf,5:$Vk,20:$VH,21:$VI,22:$VJ,23:$VK,24:$VL,25:$VM}),{11:97,12:$Vr,13:$Vs,14:95,15:83,16:89,17:$Vt,26:96,27:115,28:90,41:91,42:$Vu,43:85,44:87,45:$Vv,46:$Vw,47:84},o($VG,$Ve,{7:43,6:45,57:116,8:117,4:$Vf,5:$Vk}),o([4,5,10,17,18,20,21,22,23,24,25,42,45,46,54,56,62,65,66,68,69,76,83],[2,46],{11:118,12:$Vr,13:$Vs}),o($VN,[2,47]),o($VN,[2,48]),{11:97,12:$Vr,13:$Vs,14:95,15:83,16:89,17:$Vt,26:96,27:119,28:90,41:91,42:$Vu,43:85,44:87,45:$Vv,46:$Vw,47:84},o($VN,$VO),{11:97,12:$Vr,13:$Vs,14:122,15:83,16:89,17:$Vt,26:123,27:124,28:90,41:121,42:$Vu,43:85,44:120,45:$Vv,46:$Vw,47:84},o($VN,[2,44]),o($VN,[2,45]),o($VN,$VP),o($VN,$VQ,{29:125,30:[1,126],31:[1,127],32:[1,128],33:[1,129],34:[1,130],35:[1,131],36:[1,132],37:[1,133],38:[1,134],39:[1,135],40:[1,136]}),o($VN,[2,40]),o($VN,[2,41]),o($VN,$VR),o($VN,$VS),{15:137,17:[1,138],42:$VT,44:87,45:$Vv,46:$Vw},o($VN,[2,10]),o($VN,[2,11]),o([10,12,13,17,42,45,46,54,56,62,66,68,69,76,83],$Ve,{7:43,6:45,74:140,8:141,4:$Vf,5:$Vk}),{11:97,12:$Vr,13:$Vs,14:95,15:83,16:89,17:$Vt,26:96,27:142,28:90,41:91,42:$Vu,43:85,44:87,45:$Vv,46:$Vw,47:84},o($VD,[2,74]),{42:$Vi,49:143},o($Vj,$Ve,{7:43,6:45,8:141,74:144,4:$Vf,5:$Vk}),o($VE,$Vg,{52:33,87:145,65:$Vh}),o($V8,[2,69]),o($VF,[2,49]),{11:97,12:$Vr,13:$Vs,14:95,15:83,16:89,17:$Vt,26:96,27:146,28:90,41:91,42:$Vu,43:85,44:87,45:$Vv,46:$Vw,47:84},o($VU,[2,16]),o($VU,[2,17]),o($VU,[2,18]),o($VU,[2,19]),o($VU,[2,20]),o($VU,[2,21]),o($VG,$Ve,{7:43,6:45,19:108,8:147,4:$Vf,5:$Vk,20:$VH,21:$VI,22:$VJ,23:$VK,24:$VL,25:$VM}),o($Vp,$Ve,{7:43,6:45,59:148,55:149,58:150,8:151,4:$Vf,5:$Vk,56:[1,152]}),o($VF,[2,55]),o($VN,[2,12]),{9:75,10:$V2,11:97,12:$Vr,13:$Vs,14:95,15:83,16:89,17:$Vt,19:108,20:$VH,21:$VI,22:$VJ,23:$VK,24:$VL,25:$VM,26:96,27:80,28:90,41:91,42:$Vu,43:85,44:87,45:$Vv,46:$Vw,47:84,48:76,50:153,51:154,52:155,53:82,54:$Vx,60:79,61:78,62:$Vy,63:77,65:$Vh,67:57,68:$Vm,69:$Vn},o([12,13,20,21,22,23,24,25],$VO,{18:$VV}),o($VW,$VP,{18:[1,157]}),o($VW,$VR,{18:[1,158]}),o($VW,$VS,{18:[1,159]}),{19:108,20:$VH,21:$VI,22:$VJ,23:$VK,24:$VL,25:$VM},{11:97,12:$Vr,13:$Vs,14:95,15:83,16:89,17:$Vt,26:96,27:160,28:90,41:91,42:$Vu,43:85,44:87,45:$Vv,46:$Vw,47:84},o($VU,[2,25]),o($VU,[2,26]),o($VU,[2,27]),o($VU,[2,28]),o($VU,[2,29]),o($VU,[2,30]),o($VU,[2,31]),o($VU,[2,32]),o($VU,[2,33]),o($VU,[2,34]),o($VU,[2,35]),o($VN,[2,13]),{42:$VT,44:161,45:$Vv,46:$Vw},o($VN,$VQ),o($VA,[2,78]),o($VA,[2,77]),o($VA,[2,75],{19:108,20:$VH,21:$VI,22:$VJ,23:$VK,24:$VL,25:$VM}),o($VD,[2,72]),o($Vo,[2,81]),o($Vj,$Ve,{7:43,6:45,8:47,88:162,4:$Vf,5:$Vk}),o($VX,[2,22],{19:108,20:$VH,21:$VI,22:$VJ,23:$VK,24:$VL,25:$VM}),o($VF,[2,61]),o($VG,$Ve,{7:43,6:45,8:163,4:$Vf,5:$Vk}),o($VF,[2,56]),o($VF,[2,58]),o($VF,[2,59]),{9:75,10:$V2,11:97,12:$Vr,13:$Vs,14:95,15:83,16:89,17:$Vt,26:96,27:80,28:90,41:91,42:$Vu,43:85,44:87,45:$Vv,46:$Vw,47:84,48:76,50:165,51:154,52:155,53:82,54:[1,164],60:79,61:78,62:$Vy,63:77,65:$Vh,67:57,68:$Vm,69:$Vn},o($VG,$Ve,{7:43,6:45,8:166,4:$Vf,5:$Vk}),o($VF,[2,51]),o($VF,[2,52]),o($VN,[2,43]),o($VN,[2,38]),o($VN,[2,15]),o($VN,[2,24]),o($VX,[2,36],{19:108,20:$VH,21:$VI,22:$VJ,23:$VK,24:$VL,25:$VM}),{18:$VV},o($Vo,[2,96]),o($VF,[2,60]),{11:97,12:$Vr,13:$Vs,14:95,15:83,16:89,17:$Vt,26:96,27:167,28:90,41:91,42:$Vu,43:85,44:87,45:$Vv,46:$Vw,47:84},o($VG,$Ve,{7:43,6:45,8:168,4:$Vf,5:$Vk}),o($VF,[2,53]),{9:75,10:$V2,11:97,12:$Vr,13:$Vs,14:95,15:83,16:89,17:$Vt,19:108,20:$VH,21:$VI,22:$VJ,23:$VK,24:$VL,25:$VM,26:96,27:80,28:90,41:91,42:$Vu,43:85,44:87,45:$Vv,46:$Vw,47:84,48:76,50:169,51:154,52:155,53:82,54:$Vx,60:79,61:78,62:$Vy,63:77,65:$Vh,67:57,68:$Vm,69:$Vn},o($VF,[2,57]),o($VG,$Ve,{7:43,6:45,8:170,4:$Vf,5:$Vk}),o($VF,[2,54])],
defaultActions: {22:[2,88],60:[2,70],61:[2,71],71:[2,79],72:[2,80]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        function _parseError (msg, hash) {
            this.message = msg;
            this.hash = hash;
        }
        _parseError.prototype = Error;

        throw new _parseError(str, hash);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 10;
break;
case 1:return 83;
break;
case 2:return 95;
break;
case 3:return 68;
break;
case 4:return 69;
break;
case 5:return 76;
break;
case 6:return 62;
break;
case 7:return 54;
break;
case 8:return 56;
break;
case 9:return 4;
break;
case 10:return 42;
break;
case 11:return 45;
break;
case 12:return 45;
break;
case 13:return 45;
break;
case 14:return 45;
break;
case 15:return 45;
break;
case 16:return 45;
break;
case 17:return 45;
break;
case 18:return 46;
break;
case 19:return 37;
break;
case 20:return 36;
break;
case 21:return 34;
break;
case 22:return 35;
break;
case 23:return 31;
break;
case 24:return 32;
break;
case 25:return 33;
break;
case 26:return 38;
break;
case 27:return 39;
break;
case 28:return 40;
break;
case 29:return 'RIGHT_OP';
break;
case 30:return 'LEFT_OP';
break;
case 31:return 12;
break;
case 32:return 13;
break;
case 33:return 86;
break;
case 34:return 'AND_OP';
break;
case 35:return 'OR_OP';
break;
case 36:return 'LE_OP';
break;
case 37:return 'GE_OP';
break;
case 38:return 'EQ_OP';
break;
case 39:return 'NE_OP';
break;
case 40:return 5;
break;
case 41: return(';'); 
break;
case 42: return('{'); 
break;
case 43: return('}'); 
break;
case 44: return(','); 
break;
case 45: return(':'); 
break;
case 46: return('='); 
break;
case 47: return('('); 
break;
case 48: return(')'); 
break;
case 49: return('['); 
break;
case 50: return(']'); 
break;
case 51: return('.'); 
break;
case 52: return('&'); 
break;
case 53: return('!'); 
break;
case 54: return('~'); 
break;
case 55: return('-'); 
break;
case 56: return('+'); 
break;
case 57: return('*'); 
break;
case 58: return('/'); 
break;
case 59: return('%'); 
break;
case 60: return('<'); 
break;
case 61: return('>'); 
break;
case 62: return('^'); 
break;
case 63: return('|'); 
break;
case 64: return('?'); 
break;
case 65: 
break;
case 66: /* ignore bad characters */ 
break;
}
},
rules: [/^(?:\/\/(.*))/,/^(?:func\b)/,/^(?:class\b)/,/^(?:let\b)/,/^(?:const\b)/,/^(?:static\b)/,/^(?:return\b)/,/^(?:if\b)/,/^(?:else\b)/,/^(?:(\n))/,/^(?:([a-zA-Z_])(([a-zA-Z_])|([0-9]))*)/,/^(?:([0-9])+\.([0-9])*(([Ee][+-]?([0-9])+))?([fFlL])?)/,/^(?:([0-9])*\.([0-9])+(([Ee][+-]?([0-9])+))?([fFlL])?)/,/^(?:0[xX]([a-fA-F0-9])+([uUlL]*)?)/,/^(?:0([0-9])+([uUlL]*)?)/,/^(?:([0-9])+([uUlL]*)?)/,/^(?:L?'(\\'|[^'])+')/,/^(?:([0-9])+([Ee][+-]?([0-9])+)([fFlL])?)/,/^(?:L?"(\\"|[^"])*")/,/^(?:>>=)/,/^(?:<<=)/,/^(?:\+=)/,/^(?:-=)/,/^(?:\*=)/,/^(?:\/=)/,/^(?:%=)/,/^(?:&=)/,/^(?:\^=)/,/^(?:\|=)/,/^(?:>>)/,/^(?:<<)/,/^(?:\+\+)/,/^(?:--)/,/^(?:->)/,/^(?:&&)/,/^(?:\|\|)/,/^(?:<=)/,/^(?:>=)/,/^(?:==)/,/^(?:!=)/,/^(?:$)/,/^(?:;)/,/^(?:(\{|<%))/,/^(?:(\}|%>))/,/^(?:,)/,/^(?::)/,/^(?:=)/,/^(?:\()/,/^(?:\))/,/^(?:(\[|<:))/,/^(?:(\]|:>))/,/^(?:\.)/,/^(?:&)/,/^(?:!)/,/^(?:~)/,/^(?:-)/,/^(?:\+)/,/^(?:\*)/,/^(?:\/)/,/^(?:%)/,/^(?:<)/,/^(?:>)/,/^(?:\^)/,/^(?:\|)/,/^(?:\?)/,/^(?:[ \t\v\r\f])/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = generatedParser;
exports.Parser = generatedParser.Parser;
exports.parse = function () { return generatedParser.parse.apply(generatedParser, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}