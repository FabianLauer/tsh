/* parser generated by jison 0.4.15 */
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
var parser = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,10],$V1=[1,11],$V2=[1,7],$V3=[1,12],$V4=[1,13],$V5=[1,4,5,9,63,76],$V6=[4,5],$V7=[1,4,5,9,11,12,35,37,38,43,49,51,52,63,76],$V8=[4,5,48],$V9=[61,66],$Va=[2,61],$Vb=[1,27],$Vc=[2,4],$Vd=[1,30],$Ve=[1,35],$Vf=[4,5,9,11,12,35,37,38,43,49,51,52],$Vg=[1,51],$Vh=[1,52],$Vi=[4,9,49,51,52],$Vj=[9,11,12,35,37,38,43,49,51,52],$Vk=[1,75],$Vl=[1,76],$Vm=[1,69],$Vn=[1,70],$Vo=[1,71],$Vp=[4,9,11,12,35,37,38,43,49,51,52],$Vq=[4,5,9,11,12,23,35,37,38,43,49,51,52],$Vr=[2,7],$Vs=[1,83],$Vt=[1,84],$Vu=[4,5,9,11,12,16,17,18,19,20,35,37,38,43,49,51,52],$Vv=[2,31],$Vw=[1,106],$Vx=[35,37,38],$Vy=[11,12,35,37,38];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"nl_or_eof":3,"NL":4,"EOF":5,"maybe_nl":6,"maybe_nl_or_eof":7,"comment":8,"SL_COMMENT":9,"unary_operator":10,"INC_OP":11,"DEC_OP":12,"unary_operation":13,"primary_expr":14,"binary_operator":15,"+":16,"-":17,"*":18,"/":19,"%":20,"binary_operation":21,"assignment_operator":22,"=":23,"MUL_ASSIGN":24,"DIV_ASSIGN":25,"MOD_ASSIGN":26,"ADD_ASSIGN":27,"SUB_ASSIGN":28,"LEFT_ASSIGN":29,"RIGHT_ASSIGN":30,"AND_ASSIGN":31,"XOR_ASSIGN":32,"OR_ASSIGN":33,"assignment_expr":34,"IDENTIFIER":35,"expression":36,"STRING_LITERAL":37,"CONSTANT":38,"operation":39,"expression_statement":40,"type_expr":41,"return_statement":42,"RETURN":43,"statement":44,"var_decl":45,"statements":46,"compound_statement":47,"{":48,"}":49,"var_decl_modifier":50,"LET":51,"CONST":52,"var_decl_type_decl":53,":":54,"var_decl_name_and_maybe_type_decl":55,"var_decl_maybe_assignment":56,"var_decl_end":57,"param_decl_type_expr":58,"param_decl":59,"param_decl_list":60,",":61,"func_ident":62,"FUNCTION":63,"func_param_decl_list":64,"(":65,")":66,"func_return_expr":67,"ARR":68,"func_body":69,"func_decl":70,"class_ident":71,"class_body":72,"class_body_statement":73,"class_body_statements":74,"class_body_compound_statement":75,"CLASS":76,"root_grammar":77,"root_grammar_list":78,"root":79,"$accept":0,"$end":1},
terminals_: {2:"error",4:"NL",5:"EOF",9:"SL_COMMENT",11:"INC_OP",12:"DEC_OP",16:"+",17:"-",18:"*",19:"/",20:"%",23:"=",24:"MUL_ASSIGN",25:"DIV_ASSIGN",26:"MOD_ASSIGN",27:"ADD_ASSIGN",28:"SUB_ASSIGN",29:"LEFT_ASSIGN",30:"RIGHT_ASSIGN",31:"AND_ASSIGN",32:"XOR_ASSIGN",33:"OR_ASSIGN",35:"IDENTIFIER",37:"STRING_LITERAL",38:"CONSTANT",43:"RETURN",48:"{",49:"}",51:"LET",52:"CONST",54:":",61:",",63:"FUNCTION",65:"(",66:")",68:"ARR",76:"CLASS"},
productions_: [0,[3,1],[3,1],[6,1],[6,0],[7,1],[7,1],[7,0],[8,2],[10,1],[10,1],[13,2],[13,2],[15,1],[15,1],[15,1],[15,1],[15,1],[21,3],[22,1],[22,1],[22,1],[22,1],[22,1],[22,1],[22,1],[22,1],[22,1],[22,1],[22,1],[34,3],[14,1],[14,1],[14,1],[39,1],[39,1],[36,1],[36,1],[36,1],[40,2],[41,1],[42,3],[44,1],[44,1],[44,1],[44,1],[46,0],[46,1],[46,2],[47,5],[50,1],[50,1],[53,2],[53,0],[55,2],[56,2],[56,0],[57,1],[45,4],[58,2],[58,0],[59,0],[59,2],[60,1],[60,3],[62,2],[64,3],[67,2],[67,0],[69,1],[69,0],[70,5],[70,3],[73,1],[73,1],[74,0],[74,1],[74,2],[75,5],[71,2],[72,1],[72,0],[77,1],[77,1],[77,1],[78,1],[78,2],[79,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 8:
 this.$ = new yy.Comment([new yy.Token($$[$0-1])]) 
break;
case 9: case 10: case 13: case 14: case 15: case 16: case 17: case 20: case 21: case 22: case 23: case 24: case 25: case 26: case 27: case 28: case 29:
 this.$ = yy.getOperatorFromToken($$[$0]) 
break;
case 11:
 this.$ = new yy.UnaryOperation($$[$0-1], $$[$0], yy.UnaryOperatorPosition.Postfix) 
break;
case 12:
 this.$ = new yy.UnaryOperation($$[$0-1], $$[$0], yy.UnaryOperatorPosition.Prefix) 
break;
case 18:
 this.$ = new yy.BinaryOperation($$[$0-2], $$[$0-1], $$[$0]) 
break;
case 30:
 this.$ = new yy.BinaryOperation(new yy.Expr($$[$0-2]), $$[$0-1], $$[$0]) 
break;
case 34: case 35: case 37: case 38: case 59: case 67: case 69: case 80: case 85:
 this.$ = $$[$0] 
break;
case 36: case 55:
 this.$ = new yy.Expr($$[$0]) 
break;
case 39:
 this.$ = new yy.ExprStatement($$[$0-1]) 
break;
case 40:
 this.$ = yy.TypeExpr.fromIdentifier(new yy.Token($$[$0])) 
break;
case 41:
 this.$ = new yy.ReturnStatement($$[$0-1]) 
break;
case 48: case 77:

			$$[$0-1] = $$[$0-1] || []
			$$[$0] = $$[$0] || yy.Statement.Empty
			this.$ = $$[$0-1].concat($$[$0])
		
break;
case 49: case 78:

			if ($$[$0-2] === '\n' || $$[$0-2] === '') {
				$$[$0-2] = []
			}
			$$[$0-2] = $$[$0-2] || []
			this.$ = new yy.Statement($$[$0-2])
		
break;
case 50: case 51:
 this.$ = yy.getVarDeclModifierByKeyword($$[$0]) 
break;
case 52: case 66:
 this.$ = $$[$0-1] 
break;
case 54:
 this.$ = [yy.createToken($$[$0-1]), $$[$0]] 
break;
case 58:

			this.$ = yy.VarDecl.create({
				modifier: $$[$0-3],
				varName: $$[$0-2][0],
				typeDecl: $$[$0-2][1],
				assignment: $$[$0-1]
			})
		
break;
case 62:
 this.$ = new yy.ParamDecl(new yy.Token($$[$0-1]), $$[$0]) 
break;
case 63:

			const decls = []
			if (typeof $$[$0] !== 'undefined') {
				decls.push($$[$0])
			}
			this.$ = yy.ParamDeclList.fromParamDecls(decls)
		
break;
case 64:

			this.$ = yy.ParamDeclList.fromParamDecls(
				$$[$0-2].paramDecls.concat($$[$0])
			)
		
break;
case 65: case 79:
 this.$ = yy.createToken($$[$0]) 
break;
case 71:

			this.$ = yy.FuncDecl.create({
				funcName: $$[$0-4],
				runtimeParamDecls: $$[$0-3],
				returnTypeDecl: $$[$0-2],
				funcBody: $$[$0-1]
			})
		
break;
case 72:

			this.$ = yy.ClassDecl.create({
				className: $$[$0-2],
				classBody: $$[$0-1]
			})
		
break;
case 86:

			$$[$0-1] = $$[$0-1] || []
			if (!Array.isArray($$[$0-1])) {
				$$[$0-1] = [$$[$0-1]]
			}
			this.$ = $$[$0-1].concat($$[$0])
		
break;
case 87:

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
table: [{3:6,4:$V0,5:$V1,8:4,9:$V2,62:8,63:$V3,70:5,71:9,76:$V4,77:3,78:2,79:1},{1:[3]},{1:[2,87],3:6,4:$V0,5:$V1,8:4,9:$V2,62:8,63:$V3,70:5,71:9,76:$V4,77:14},o($V5,[2,85]),o($V5,[2,82]),o($V5,[2,83]),o($V5,[2,84]),{3:15,4:$V0,5:$V1},{64:16,65:[1,17]},o($V6,[2,81],{72:18,75:19,48:[1,20]}),o($V7,[2,1]),o($V7,[2,2]),{35:[1,21]},{35:[1,22]},o($V5,[2,86]),o($V7,[2,8]),o($V8,[2,68],{67:23,68:[1,24]}),o($V9,$Va,{60:25,59:26,35:$Vb}),{3:28,4:$V0,5:$V1},o($V6,[2,80]),o([5,9,49,51,52],$Vc,{6:29,4:$Vd}),{65:[2,65]},o($V8,[2,79]),o($V6,[2,70],{69:31,47:32,48:[1,33]}),{35:$Ve,41:34},{61:[1,37],66:[1,36]},o($V9,[2,63]),o($V9,[2,60],{58:38,54:[1,39]}),o($V5,[2,72]),o([9,49,51,52],[2,75],{74:40,3:41,4:$V0,5:$V1}),o($Vf,[2,3]),{3:42,4:$V0,5:$V1},o($V6,[2,69]),o([5,9,11,12,35,37,38,43,49,51,52],$Vc,{6:43,4:$Vd}),o($V8,[2,67]),o([4,5,9,11,12,23,35,37,38,43,48,49,51,52,61,66],[2,40]),o([4,5,48,68],[2,66]),o($V9,$Va,{59:44,35:$Vb}),o($V9,[2,62]),{35:$Ve,41:45},{4:$Vd,6:46,8:48,9:$V2,45:49,49:$Vc,50:50,51:$Vg,52:$Vh,73:47},o($Vi,[2,76]),o($V5,[2,71]),o($Vj,[2,46],{46:53,3:54,4:$V0,5:$V1}),o($V9,[2,64]),o($V9,[2,59]),{49:[1,55]},o($Vi,[2,77]),o($Vi,[2,73]),o($Vi,[2,74]),{35:[1,57],55:56},{35:[2,50]},{35:[2,51]},{4:$Vd,6:58,8:60,9:$V2,10:74,11:$Vk,12:$Vl,13:72,14:66,21:73,34:68,35:$Vm,36:64,37:$Vn,38:$Vo,39:67,40:61,42:63,43:[1,65],44:59,45:62,49:$Vc,50:50,51:$Vg,52:$Vh},o($Vp,[2,47]),o($V6,[2,78]),o($Vf,[2,56],{56:77,23:[1,78]}),o($Vq,[2,53],{53:79,54:[1,80]}),{49:[1,81]},o($Vp,[2,48]),o($Vp,[2,42]),o($Vp,[2,43]),o($Vp,[2,44]),o($Vp,[2,45]),o($Vj,$Vr,{7:82,4:$Vs,5:$Vt}),{10:74,11:$Vk,12:$Vl,13:72,14:66,21:73,34:68,35:$Vm,36:85,37:$Vn,38:$Vo,39:67},o([4,5,9,35,37,38,43,49,51,52],[2,36],{10:86,15:87,11:$Vk,12:$Vl,16:[1,88],17:[1,89],18:[1,90],19:[1,91],20:[1,92]}),o($Vf,[2,37]),o($Vf,[2,38]),o($Vu,$Vv,{22:93,23:[1,94],24:[1,95],25:[1,96],26:[1,97],27:[1,98],28:[1,99],29:[1,100],30:[1,101],31:[1,102],32:[1,103],33:[1,104]}),o($Vu,[2,32]),o($Vu,[2,33]),o($Vf,[2,34]),o($Vf,[2,35]),{14:105,35:$Vw,37:$Vn,38:$Vo},o($Vf,[2,9]),o($Vf,[2,10]),o($Vj,$Vr,{57:107,7:108,4:$Vs,5:$Vt}),{10:74,11:$Vk,12:$Vl,13:72,14:66,21:73,34:68,35:$Vm,36:109,37:$Vn,38:$Vo,39:67},o($Vq,[2,54]),{35:$Ve,41:110},o($V6,[2,49]),o($Vp,[2,39]),o($Vp,[2,5]),o($Vp,[2,6]),o($Vj,$Vr,{7:111,4:$Vs,5:$Vt}),o($Vf,[2,11]),{14:112,35:$Vw,37:$Vn,38:$Vo},o($Vx,[2,13]),o($Vx,[2,14]),o($Vx,[2,15]),o($Vx,[2,16]),o($Vx,[2,17]),{10:74,11:$Vk,12:$Vl,13:72,14:66,21:73,34:68,35:$Vm,36:113,37:$Vn,38:$Vo,39:67},o($Vy,[2,19]),o($Vy,[2,20]),o($Vy,[2,21]),o($Vy,[2,22]),o($Vy,[2,23]),o($Vy,[2,24]),o($Vy,[2,25]),o($Vy,[2,26]),o($Vy,[2,27]),o($Vy,[2,28]),o($Vy,[2,29]),o($Vf,[2,12]),o($Vf,$Vv),o($Vp,[2,58]),o($Vp,[2,57]),o($Vf,[2,55]),o($Vq,[2,52]),o($Vp,[2,41]),o($Vf,[2,18]),o($Vf,[2,30])],
defaultActions: {21:[2,65],51:[2,50],52:[2,51]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        throw new Error(str);
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
        function lex() {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        }
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
case 0:return 9;
break;
case 1:return 63;
break;
case 2:return 76;
break;
case 3:return 51;
break;
case 4:return 52;
break;
case 5:return 43;
break;
case 6:return 4;
break;
case 7:return 35;
break;
case 8:return 38;
break;
case 9:return 38;
break;
case 10:return 38;
break;
case 11:return 38;
break;
case 12:return 38;
break;
case 13:return 38;
break;
case 14:return 38;
break;
case 15:return 37;
break;
case 16:return 30;
break;
case 17:return 29;
break;
case 18:return 27;
break;
case 19:return 28;
break;
case 20:return 24;
break;
case 21:return 25;
break;
case 22:return 26;
break;
case 23:return 31;
break;
case 24:return 32;
break;
case 25:return 33;
break;
case 26:return 'RIGHT_OP';
break;
case 27:return 'LEFT_OP';
break;
case 28:return 11;
break;
case 29:return 12;
break;
case 30:return 68;
break;
case 31:return 'AND_OP';
break;
case 32:return 'OR_OP';
break;
case 33:return 'LE_OP';
break;
case 34:return 'GE_OP';
break;
case 35:return 'EQ_OP';
break;
case 36:return 'NE_OP';
break;
case 37:return 5;
break;
case 38: return(';'); 
break;
case 39: return('{'); 
break;
case 40: return('}'); 
break;
case 41: return(','); 
break;
case 42: return(':'); 
break;
case 43: return('='); 
break;
case 44: return('('); 
break;
case 45: return(')'); 
break;
case 46: return('['); 
break;
case 47: return(']'); 
break;
case 48: return('.'); 
break;
case 49: return('&'); 
break;
case 50: return('!'); 
break;
case 51: return('~'); 
break;
case 52: return('-'); 
break;
case 53: return('+'); 
break;
case 54: return('*'); 
break;
case 55: return('/'); 
break;
case 56: return('%'); 
break;
case 57: return('<'); 
break;
case 58: return('>'); 
break;
case 59: return('^'); 
break;
case 60: return('|'); 
break;
case 61: return('?'); 
break;
case 62: 
break;
case 63: /* ignore bad characters */ 
break;
}
},
rules: [/^(?:\/\/(.*))/,/^(?:func\b)/,/^(?:class\b)/,/^(?:let\b)/,/^(?:const\b)/,/^(?:return\b)/,/^(?:(\n))/,/^(?:([a-zA-Z_])(([a-zA-Z_])|([0-9]))*)/,/^(?:([0-9])+\.([0-9])*(([Ee][+-]?([0-9])+))?([fFlL])?)/,/^(?:([0-9])*\.([0-9])+(([Ee][+-]?([0-9])+))?([fFlL])?)/,/^(?:0[xX]([a-fA-F0-9])+([uUlL]*)?)/,/^(?:0([0-9])+([uUlL]*)?)/,/^(?:([0-9])+([uUlL]*)?)/,/^(?:L?'(\\'|[^'])+')/,/^(?:([0-9])+([Ee][+-]?([0-9])+)([fFlL])?)/,/^(?:L?"(\\"|[^"])*")/,/^(?:>>=)/,/^(?:<<=)/,/^(?:\+=)/,/^(?:-=)/,/^(?:\*=)/,/^(?:\/=)/,/^(?:%=)/,/^(?:&=)/,/^(?:\^=)/,/^(?:\|=)/,/^(?:>>)/,/^(?:<<)/,/^(?:\+\+)/,/^(?:--)/,/^(?:->)/,/^(?:&&)/,/^(?:\|\|)/,/^(?:<=)/,/^(?:>=)/,/^(?:==)/,/^(?:!=)/,/^(?:$)/,/^(?:;)/,/^(?:(\{|<%))/,/^(?:(\}|%>))/,/^(?:,)/,/^(?::)/,/^(?:=)/,/^(?:\()/,/^(?:\))/,/^(?:(\[|<:))/,/^(?:(\]|:>))/,/^(?:\.)/,/^(?:&)/,/^(?:!)/,/^(?:~)/,/^(?:-)/,/^(?:\+)/,/^(?:\*)/,/^(?:\/)/,/^(?:%)/,/^(?:<)/,/^(?:>)/,/^(?:\^)/,/^(?:\|)/,/^(?:\?)/,/^(?:[ \t\v\r\f])/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],"inclusive":true}}
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
exports.parser = parser;
exports.Parser = parser.Parser;
exports.parse = function () { return parser.parse.apply(parser, arguments); };
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