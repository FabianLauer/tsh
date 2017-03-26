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
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,7],$V1=[1,4,5,32,33,34,39,40,47,50,51],$V2=[1,14],$V3=[1,17],$V4=[54,58],$V5=[1,22],$V6=[1,43],$V7=[1,44],$V8=[1,32],$V9=[1,37],$Va=[1,38],$Vb=[1,35],$Vc=[1,36],$Vd=[1,4,5,32,33,34,39,40,50,51],$Ve=[4,5,32,33,34,39,40,50,51],$Vf=[1,52],$Vg=[1,53],$Vh=[1,54],$Vi=[1,55],$Vj=[1,56],$Vk=[4,5,10,11,12,13,14,32,33,34,39,40,50,51],$Vl=[2,28],$Vm=[4,5,17,32,33,34,39,40,50,51],$Vn=[1,74],$Vo=[4,5,32,33,34],$Vp=[1,78];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"unary_operator_tokens":3,"INC_OP":4,"DEC_OP":5,"unary_operator":6,"unary_operation":7,"primary_expr":8,"binary_operator_tokens":9,"+":10,"-":11,"*":12,"/":13,"%":14,"binary_operator":15,"assignment_operator_tokens":16,"=":17,"MUL_ASSIGN":18,"DIV_ASSIGN":19,"MOD_ASSIGN":20,"ADD_ASSIGN":21,"SUB_ASSIGN":22,"LEFT_ASSIGN":23,"RIGHT_ASSIGN":24,"AND_ASSIGN":25,"XOR_ASSIGN":26,"OR_ASSIGN":27,"assignment_operator":28,"binary_operation":29,"expression":30,"operation":31,"IDENTIFIER":32,"STRING_LITERAL":33,"CONSTANT":34,"type_expression":35,"decl_assignment":36,"assignment_expr":37,"let_or_const":38,"LET":39,"CONST":40,"var_name_decl_with_type_expr":41,":":42,"var_decl":43,"statement":44,"compound_statement":45,"comment":46,"SL_COMMENT":47,"comment_list":48,"statement_list":49,"{":50,"}":51,"param_decl":52,"param_decl_list":53,",":54,"func_decl":55,"FUNCTION":56,"(":57,")":58,"ARR":59,"root_grammar":60,"root":61,"$accept":0,"$end":1},
terminals_: {2:"error",4:"INC_OP",5:"DEC_OP",10:"+",11:"-",12:"*",13:"/",14:"%",17:"=",18:"MUL_ASSIGN",19:"DIV_ASSIGN",20:"MOD_ASSIGN",21:"ADD_ASSIGN",22:"SUB_ASSIGN",23:"LEFT_ASSIGN",24:"RIGHT_ASSIGN",25:"AND_ASSIGN",26:"XOR_ASSIGN",27:"OR_ASSIGN",32:"IDENTIFIER",33:"STRING_LITERAL",34:"CONSTANT",39:"LET",40:"CONST",42:":",47:"SL_COMMENT",50:"{",51:"}",54:",",56:"FUNCTION",57:"(",58:")",59:"ARR"},
productions_: [0,[3,0],[3,1],[3,1],[6,1],[7,2],[7,2],[9,1],[9,1],[9,1],[9,1],[9,1],[15,1],[16,1],[16,1],[16,1],[16,1],[16,1],[16,1],[16,1],[16,1],[16,1],[16,1],[16,1],[28,1],[29,3],[31,1],[31,1],[8,1],[8,1],[8,1],[30,1],[30,1],[35,1],[36,2],[37,3],[38,1],[38,1],[41,0],[41,3],[43,2],[43,2],[43,3],[43,3],[44,1],[44,1],[44,1],[44,1],[44,1],[46,1],[48,1],[48,2],[49,1],[49,1],[49,2],[45,2],[45,3],[52,1],[52,3],[53,1],[53,3],[55,4],[55,5],[55,5],[55,6],[55,7],[60,1],[60,1],[61,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 4: case 12: case 24:
 this.$ = yy.getOperatorFromToken($$[$0]) 
break;
case 5:
 this.$ = new yy.UnaryOperation($$[$0-1], $$[$0], yy.UnaryOperatorPosition.Postfix) 
break;
case 6:
 this.$ = new yy.UnaryOperation($$[$0-1], $$[$0], yy.UnaryOperatorPosition.Prefix) 
break;
case 25:
 this.$ = new yy.BinaryOperation($$[$0-2], $$[$0-1], $$[$0]) 
break;
case 33:
 this.$ = yy.TypeExpr.fromIdentifier(new yy.Token($$[$0])) 
break;
case 34:
 this.$ = new yy.Expr($$[$0-1]) 
break;
case 35:
 this.$ = new yy.BinaryOperation(new yy.Expr($$[$0-2]), $$[$0-1], $$[$0]) 
break;
case 39:
 this.$ = [$$[$0-2], $$[$0]] 
break;
case 40:

			this.$ = yy.VarDecl.create({
				modifier: yy.getVarDeclModifierByKeyword($$[$0-1]),
				varName: yy.createToken($$[$0])
			})
		
break;
case 41:

			this.$ = yy.VarDecl.create({
				modifier: yy.getVarDeclModifierByKeyword($$[$0-1]),
				varName: yy.createToken($$[$0][0]),
				typeDecl: $$[$0][1]
			})
		
break;
case 42:

			this.$ = yy.VarDecl.create({
				modifier: yy.getVarDeclModifierByKeyword($$[$0-2]),
				varName: yy.createToken($$[$0-1]),
				assignment: $$[$0]
			})
		
break;
case 43:

			this.$ = yy.VarDecl.create({
				modifier: yy.getVarDeclModifierByKeyword($$[$0-2]),
				varName: yy.createToken($$[$0-1][0]),
				typeDecl: $$[$0-1][1],
				assignment: $$[$0]
			})
		
break;
case 49:
 this.$ = new yy.Comment([new yy.Token($$[$0])]) 
break;
case 50:
 this.$ = $$[$0] 
break;
case 51:
 this.$ = new yy.Comment($$[$0-1].lines.concat($$[$0].lines)) 
break;
case 52: case 53:
 this.$ = new yy.Statement([$$[$0]]) 
break;
case 54:

			this.$ = new yy.Statement(
				$$[$0-1].nodes.concat($$[$0])
			)
		
break;
case 55:
 this.$ = new yy.Statement() 
break;
case 56:

			this.$ = $$[$0-1]
		
break;
case 57:
 this.$ = new yy.ParamDecl(new yy.Token($$[$0])) 
break;
case 58:
 this.$ = new yy.ParamDecl(new yy.Token($$[$0-2]), $$[$0]) 
break;
case 59:
 this.$ = yy.ParamDeclList.fromParamDecls([ $$[$0] ]) 
break;
case 60:

			this.$ = yy.ParamDeclList.fromParamDecls(
				$$[$0-2].paramDecls.concat($$[$0])
			)
		
break;
case 61:

			this.$ = yy.FuncDecl.create({
				funcName: yy.createToken($$[$0-2])
			})
		
break;
case 62:

			this.$ = yy.FuncDecl.create({
				funcName: yy.createToken($$[$0-3]),
				runtimeParamDecls: $$[$0-1]
			})
		
break;
case 63:

			this.$ = yy.FuncDecl.create({
				funcName: yy.createToken($$[$0-3]),
				funcBody: $$[$0]
			})
		
break;
case 64:

			this.$ = yy.FuncDecl.create({
				funcName: yy.createToken($$[$0-4]),
				returnTypeDecl: $$[$0]
			})
		
break;
case 65:

			this.$ = yy.FuncDecl.create({
				funcName: yy.createToken($$[$0-5]),
				returnTypeDecl: $$[$0-1],
				funcBody: $$[$0]
			})
		
break;
case 68:
 yy.result.push(this.$); return this.$ 
break;
}
},
table: [{46:5,47:$V0,48:3,55:4,56:[1,6],60:2,61:1},{1:[3]},{1:[2,68]},{1:[2,66],46:8,47:$V0},{1:[2,67]},o($V1,[2,50]),{32:[1,9]},o($V1,[2,49]),o($V1,[2,51]),{57:[1,10]},{32:$V2,52:13,53:12,58:[1,11]},{1:[2,61],45:15,50:$V3,59:[1,16]},{54:[1,19],58:[1,18]},o($V4,[2,59]),o($V4,[2,57],{42:[1,20]}),{1:[2,63]},{32:$V5,35:21},{3:42,4:$V6,5:$V7,6:41,7:40,8:33,29:39,30:29,31:34,32:$V8,33:$V9,34:$Va,37:28,38:31,39:$Vb,40:$Vc,43:27,44:25,45:30,46:5,47:$V0,48:26,49:24,50:$V3,51:[1,23]},{1:[2,62]},{32:$V2,52:45},{32:$V5,35:46},{1:[2,64],45:47,50:$V3},o([1,4,5,17,32,33,34,39,40,50,51,54,58],[2,33]),o($Vd,[2,55]),{3:42,4:$V6,5:$V7,6:41,7:40,8:33,29:39,30:29,31:34,32:$V8,33:$V9,34:$Va,37:28,38:31,39:$Vb,40:$Vc,43:27,44:49,45:30,50:$V3,51:[1,48]},o($Ve,[2,52]),o($Ve,[2,53],{46:8,47:$V0}),o($Ve,[2,44]),o($Ve,[2,45]),o($Ve,[2,46],{15:50,9:51,10:$Vf,11:$Vg,12:$Vh,13:$Vi,14:$Vj}),o($Ve,[2,48]),o([4,5,17,33,34,39,40,50,51],[2,38],{41:58,32:[1,57]}),o($Vk,$Vl,{28:59,16:60,17:[1,61],18:[1,62],19:[1,63],20:[1,64],21:[1,65],22:[1,66],23:[1,67],24:[1,68],25:[1,69],26:[1,70],27:[1,71]}),o([10,11,12,13,14,32,33,34,39,40,50,51],[2,31],{3:42,6:72,4:$V6,5:$V7}),o($Vk,[2,32]),o($Vm,[2,36]),o($Vm,[2,37]),o($Vk,[2,29]),o($Vk,[2,30]),o($Vk,[2,26]),o($Vk,[2,27]),{8:73,32:$Vn,33:$V9,34:$Va},o($Vk,[2,4]),o($Vk,[2,2]),o($Vk,[2,3]),o($V4,[2,60]),o($V4,[2,58]),{1:[2,65]},o($Vd,[2,56]),o($Ve,[2,54]),{3:42,4:$V6,5:$V7,6:41,7:40,8:33,29:39,30:75,31:34,32:$Vn,33:$V9,34:$Va},o($Vo,[2,12]),o($Vo,[2,7]),o($Vo,[2,8]),o($Vo,[2,9]),o($Vo,[2,10]),o($Vo,[2,11]),o($Ve,[2,40],{36:76,17:$Vp,42:[1,77]}),o($Ve,[2,41],{36:79,17:$Vp}),{3:42,4:$V6,5:$V7,6:41,7:40,8:33,29:39,30:80,31:34,32:$Vn,33:$V9,34:$Va},o($Vo,[2,24]),o($Vo,[2,13]),o($Vo,[2,14]),o($Vo,[2,15]),o($Vo,[2,16]),o($Vo,[2,17]),o($Vo,[2,18]),o($Vo,[2,19]),o($Vo,[2,20]),o($Vo,[2,21]),o($Vo,[2,22]),o($Vo,[2,23]),o($Vk,[2,5]),o($Vk,[2,6]),o($Vk,$Vl),o($Ve,[2,25],{15:50,9:51,10:$Vf,11:$Vg,12:$Vh,13:$Vi,14:$Vj}),o($Ve,[2,42]),{32:$V5,35:81},{3:42,4:$V6,5:$V7,6:41,7:40,8:33,29:39,30:82,31:34,32:$Vn,33:$V9,34:$Va},o($Ve,[2,43]),o($Ve,[2,35],{15:50,9:51,10:$Vf,11:$Vg,12:$Vh,13:$Vi,14:$Vj}),o($Vm,[2,39]),o($Ve,[2,34],{15:50,9:51,10:$Vf,11:$Vg,12:$Vh,13:$Vi,14:$Vj})],
defaultActions: {2:[2,68],4:[2,67],15:[2,63],18:[2,62],47:[2,65]},
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
case 0:return 47;
break;
case 1:return 56;
break;
case 2:return 39;
break;
case 3:return 40;
break;
case 4:return 32;
break;
case 5:return 34;
break;
case 6:return 34;
break;
case 7:return 34;
break;
case 8:return 34;
break;
case 9:return 34;
break;
case 10:return 34;
break;
case 11:return 34;
break;
case 12:return 33;
break;
case 13:return 24;
break;
case 14:return 23;
break;
case 15:return 21;
break;
case 16:return 22;
break;
case 17:return 18;
break;
case 18:return 19;
break;
case 19:return 20;
break;
case 20:return 25;
break;
case 21:return 26;
break;
case 22:return 27;
break;
case 23:return 'RIGHT_OP';
break;
case 24:return 'LEFT_OP';
break;
case 25:return 4;
break;
case 26:return 5;
break;
case 27:return 59;
break;
case 28:return 'AND_OP';
break;
case 29:return 'OR_OP';
break;
case 30:return 'LE_OP';
break;
case 31:return 'GE_OP';
break;
case 32:return 'EQ_OP';
break;
case 33:return 'NE_OP';
break;
case 34: return(';'); 
break;
case 35: return('{'); 
break;
case 36: return('}'); 
break;
case 37: return(','); 
break;
case 38: return(':'); 
break;
case 39: return('='); 
break;
case 40: return('('); 
break;
case 41: return(')'); 
break;
case 42: return('['); 
break;
case 43: return(']'); 
break;
case 44: return('.'); 
break;
case 45: return('&'); 
break;
case 46: return('!'); 
break;
case 47: return('~'); 
break;
case 48: return('-'); 
break;
case 49: return('+'); 
break;
case 50: return('*'); 
break;
case 51: return('/'); 
break;
case 52: return('%'); 
break;
case 53: return('<'); 
break;
case 54: return('>'); 
break;
case 55: return('^'); 
break;
case 56: return('|'); 
break;
case 57: return('?'); 
break;
case 58: 
break;
case 59: /* ignore bad characters */ 
break;
}
},
rules: [/^(?:\/\/(.*))/,/^(?:func\b)/,/^(?:let\b)/,/^(?:const\b)/,/^(?:([a-zA-Z_])(([a-zA-Z_])|([0-9]))*)/,/^(?:([0-9])+\.([0-9])*(([Ee][+-]?([0-9])+))?([fFlL])?)/,/^(?:([0-9])*\.([0-9])+(([Ee][+-]?([0-9])+))?([fFlL])?)/,/^(?:0[xX]([a-fA-F0-9])+([uUlL]*)?)/,/^(?:0([0-9])+([uUlL]*)?)/,/^(?:([0-9])+([uUlL]*)?)/,/^(?:L?'(\\'|[^'])+')/,/^(?:([0-9])+([Ee][+-]?([0-9])+)([fFlL])?)/,/^(?:L?"(\\"|[^"])*")/,/^(?:>>=)/,/^(?:<<=)/,/^(?:\+=)/,/^(?:-=)/,/^(?:\*=)/,/^(?:\/=)/,/^(?:%=)/,/^(?:&=)/,/^(?:\^=)/,/^(?:\|=)/,/^(?:>>)/,/^(?:<<)/,/^(?:\+\+)/,/^(?:--)/,/^(?:->)/,/^(?:&&)/,/^(?:\|\|)/,/^(?:<=)/,/^(?:>=)/,/^(?:==)/,/^(?:!=)/,/^(?:;)/,/^(?:(\{|<%))/,/^(?:(\}|%>))/,/^(?:,)/,/^(?::)/,/^(?:=)/,/^(?:\()/,/^(?:\))/,/^(?:(\[|<:))/,/^(?:(\]|:>))/,/^(?:\.)/,/^(?:&)/,/^(?:!)/,/^(?:~)/,/^(?:-)/,/^(?:\+)/,/^(?:\*)/,/^(?:\/)/,/^(?:%)/,/^(?:<)/,/^(?:>)/,/^(?:\^)/,/^(?:\|)/,/^(?:\?)/,/^(?:[ \t\v\n\f])/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59],"inclusive":true}}
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