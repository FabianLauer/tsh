(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.compiler = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("api"));

},{"api":8}],2:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("ast"));

},{"ast":34}],3:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("codegen/ecmascript/"));

},{"codegen/ecmascript/":54}],4:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("compiler/parser"));

},{"compiler/parser":56}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@/compiler/api");
const parser_1 = require("@/compiler/parser");
const ecmascript_1 = require("@/compiler/codegen/ecmascript");
/**
 * A programming interface to the compiler that is easy to use.
 * All operations in this class are idempotent, meaning they will always return the same output for
 * a set of input parameters.
 */
class CompilerApi {
    /**
     * Creates a new instance of class `CompilerApi`.
     */
    constructor() {
        /**
         * An array containing all compile target IDs.
         */
        this.compileTargetIds = [
            api_1.ICompileTargetIds.create(0 /* EcmaScript */, 'ES5')
        ];
        // nothing to do
    }
    /**
     * Creates a new instance of class `CompilerApi`.
     */
    static create() {
        return new CompilerApi();
    }
    /**
     * Returns all available compile target identifiers.
     */
    getAvailableCompileTargets() {
        return this.compileTargetIds.map(_ => _.id);
    }
    /**
     * Finds the first item in `this.compileTargetIds` in which the given `key` matches `value`.
     * @param key The key to compare.
     * @param value The value to compare.
     */
    getCompileTargetByKeyValue(key, value) {
        return this.compileTargetIds.find(_ => _[key] === value);
    }
    getIdentifiersForCompileTarget(target) {
        if (api_1.ICompileTargetIds.TCompileTarget.isValid(target)) {
            return this.getCompileTargetByKeyValue('id', target);
        }
        else if (api_1.ICompileTargetIds.THumanReadableId.isValid(target)) {
            return this.getCompileTargetByKeyValue('humanReadableId', target);
        }
        else if (api_1.ICompileTargetIds.isValid(target) &&
            this.compileTargetIds.indexOf(target) !== -1) {
            return target;
        }
        // the compile target wasn't found:
        return undefined;
    }
    /**
     * Compiles a string of source code to output code.
     * @param sourceCode The source code to compile.
     * @param target The build target to compile to.
     * @return string The output code.
     */
    compileSourceCode(sourceCode, target) {
        const sourceUnit = parser_1.parseToSourceUnit(undefined, sourceCode);
        const codeGenerator = this.createCodeGenerator(target, sourceUnit);
        return codeGenerator.generateCode();
    }
    /**
     * Creates a code generator instance
     * @param target The compile target to create a code generator for.
     * @param sourceUnit The source unit to create a code generator for.
     * @return A code generator for `target` and `sourceUnit`.
     */
    createCodeGenerator(target, sourceUnit) {
        switch (target) {
            default:
                throw new Error(`No code generator for compile target ${target} exists.`);
            case 0 /* EcmaScript */:
                return new ecmascript_1.CodeGenerator(sourceUnit);
        }
    }
}
exports.CompilerApi = CompilerApi;

},{"@/compiler/api":1,"@/compiler/codegen/ecmascript":3,"@/compiler/parser":4}],7:[function(require,module,exports){
// tslint:disable:one-line
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ICompileTargetIds;
(function (ICompileTargetIds) {
    var TCompileTarget;
    (function (TCompileTarget) {
        /**
         * Checks whether an object implements `TCompileTarget`.
         * This function does not throw.
         * @param value The object to validate.
         * @return Returns `true` if `object` implements `TCompileTarget`, `false` if not.
         */
        function isValid(value) {
            return (typeof value === 'number' &&
                value >= 0 &&
                isFinite(value));
        }
        TCompileTarget.isValid = isValid;
    })(TCompileTarget = ICompileTargetIds.TCompileTarget || (ICompileTargetIds.TCompileTarget = {}));
    var THumanReadableId;
    (function (THumanReadableId) {
        /**
         * Checks whether an object implements `THumanReadableId`.
         * This function does not throw.
         * @param value The object to validate.
         * @return Returns `true` if `object` implements `THumanReadableId`, `false` if not.
         */
        function isValid(value) {
            return (typeof value === 'string' &&
                value.length > 0 &&
                value.trim() === value);
        }
        THumanReadableId.isValid = isValid;
    })(THumanReadableId = ICompileTargetIds.THumanReadableId || (ICompileTargetIds.THumanReadableId = {}));
    /**
     * Creates and returns an instance of `ICompileTargetIds`.
     * @param id The compile target identifier.
     * @param humanReadableId The human readable identifier to associate with `id`.
     */
    function create(id, humanReadableId) {
        return { id, humanReadableId };
    }
    ICompileTargetIds.create = create;
    /**
     * Checks whether an object implements `ICompileTargetIds`.
     * This function does not throw.
     * @param object The object to validate.
     * @return Returns `true` if `object` implements `ICompileTargetIds`, `false` if not.
     */
    function isValid(object) {
        return (typeof object === 'object' &&
            object !== null &&
            TCompileTarget.isValid(object.id) &&
            THumanReadableId.isValid(object.humanReadableId));
    }
    ICompileTargetIds.isValid = isValid;
})(ICompileTargetIds = exports.ICompileTargetIds || (exports.ICompileTargetIds = {}));
exports.default = ICompileTargetIds;

},{}],8:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./CompilerApi"));
__export(require("./CompileTarget"));
__export(require("./ICompileTargetIds"));

},{"./CompileTarget":5,"./CompilerApi":6,"./ICompileTargetIds":7}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base AST node.
 */
class BaseNode {
    get parent() {
        return this._parent;
    }
    /**
     * Changes the parent of an AST node.
     * @param parent The new parent node.
     */
    setParent(parent) {
        this._parent = parent;
    }
    /**
     * Changes the parent of an AST node.
     * @param node The node to set a new parent on.
     * @param parent The new parent to set on `node`.
     */
    setParentOf(node, parent) {
        node.setParent(parent);
    }
}
exports.BaseNode = BaseNode;
exports.default = BaseNode;

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expr_1 = require("./Expr");
class BinaryOperation extends Expr_1.default {
    constructor(leftOperand, operator, rightOperand) {
        super();
        this.leftOperand = leftOperand;
        this.operator = operator;
        this.rightOperand = rightOperand;
    }
}
exports.BinaryOperation = BinaryOperation;
exports.default = BinaryOperation;

},{"./Expr":15}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class ClassDecl extends _1.BaseNode {
    /**
     * Creates a new `ClassDecl` instance.
     */
    constructor(
        /**
         * The name of the class itself.
         */
        name, 
        /**
         * The class body.
         */
        body = _1.Statement.Empty) {
        super();
        this.name = name;
        this.body = body;
        this.setParentOf(name, this);
        this.setParentOf(body, this);
    }
    /**
     * Creates a new `ClassDecl` instance.
     * @param params Parameters for the class declaration.
     */
    static create(params) {
        return new ClassDecl(params.className, params.classBody);
    }
}
exports.ClassDecl = ClassDecl;
exports.default = ClassDecl;

},{"./":34}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class Comment extends _1.BaseNode {
    constructor(
        /**
         * The comment's complete text as it was in the source code.
         */
        lines) {
        super();
        this.lines = lines;
    }
}
exports.Comment = Comment;
exports.default = Comment;

},{"./":34}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IfStatement_1 = require("./IfStatement");
class ElseIfStatement extends IfStatement_1.default {
}
exports.ElseIfStatement = ElseIfStatement;
exports.default = ElseIfStatement;

},{"./IfStatement":19}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Statement_1 = require("./Statement");
class ElseStatement extends Statement_1.default {
}
exports.ElseStatement = ElseStatement;
exports.default = ElseStatement;

},{"./Statement":27}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class Expr extends _1.BaseNode {
    constructor(content = undefined) {
        super();
        this.content = content;
    }
}
/**
 * An expression with no content whatsoever.
 */
// tslint:disable-next-line:variable-name
Expr.Empty = new Expr();
exports.Expr = Expr;
exports.default = Expr;

},{"./":34}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Statement_1 = require("./Statement");
class ExprStatement extends Statement_1.default {
    constructor(
        /**
         * The expression wrapped by this expression statement.
         */
        expression) {
        super([expression]);
        this.expression = expression;
    }
}
exports.ExprStatement = ExprStatement;
exports.default = ExprStatement;

},{"./Statement":27}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class FuncDecl extends _1.BaseNode {
    /**
     * Creates a new `FuncDecl` instance.
     */
    constructor(
        /**
         * The name of the function itself.
         */
        name, 
        /**
         * The function's runtime parameter declaration list.
         */
        runtimeParamDecls = _1.ParamDeclList.Empty, 
        /**
         * The function's return type declaration.
         */
        returnTypeDecl = _1.TypeExpr.Empty, 
        /**
         * The function body.
         */
        body = _1.Statement.Empty) {
        super();
        this.name = name;
        this.runtimeParamDecls = runtimeParamDecls;
        this.returnTypeDecl = returnTypeDecl;
        this.body = body;
    }
    /**
     * Creates a new `FuncDecl` instance.
     * @param params Parameters for the function declaration.
     */
    static create(params) {
        return new FuncDecl(params.funcName, params.runtimeParamDecls, params.returnTypeDecl, params.funcBody);
    }
}
exports.FuncDecl = FuncDecl;
exports.default = FuncDecl;

},{"./":34}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class Identifier extends _1.BaseNode {
    constructor(name) {
        super();
        this.name = name;
    }
}
exports.Identifier = Identifier;
exports.default = Identifier;

},{"./":34}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Statement_1 = require("./Statement");
class IfStatement extends Statement_1.default {
    constructor(condition, body) {
        super([body]);
        this.condition = condition;
        this.body = body;
        this.setParentOf(condition, this);
        this.setParentOf(body, this);
    }
}
exports.IfStatement = IfStatement;
exports.default = IfStatement;

},{"./Statement":27}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const FuncDecl_1 = require("./FuncDecl");
class MethodDecl extends FuncDecl_1.FuncDecl {
    /**
     * Creates a new `FuncDecl` instance.
     * @param params Parameters for the function declaration.
     */
    static create(params) {
        return new MethodDecl(params.funcName, params.runtimeParamDecls, params.returnTypeDecl, params.funcBody);
    }
    /**
     * Creates a new `MethodDecl` instance.
     */
    constructor(
        /**
         * The name of the method itself.
         */
        name, 
        /**
         * The method's runtime parameter declaration list.
         */
        runtimeParamDecls = _1.ParamDeclList.Empty, 
        /**
         * The method's return type declaration.
         */
        returnTypeDecl = _1.TypeExpr.Empty, 
        /**
         * The method body.
         */
        body = _1.Statement.Empty) {
        super(name, runtimeParamDecls, returnTypeDecl, body);
    }
}
exports.MethodDecl = MethodDecl;
exports.default = FuncDecl_1.FuncDecl;

},{"./":34,"./FuncDecl":17}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class Operator extends _1.BaseNode {
    constructor(
        /**
         * Identifies which operator was used.
         */
        ident, 
        /**
         * The operator's original source code.
         */
        text = _1.Token.Empty) {
        super();
        this.ident = ident;
        this.text = text;
    }
}
exports.Operator = Operator;
exports.default = Operator;

},{"./":34}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Enumerates all operators.
 */
var OperatorIdent;
(function (OperatorIdent) {
    // Arithmetic Binary
    OperatorIdent[OperatorIdent["+"] = 0] = "+";
    OperatorIdent[OperatorIdent["-"] = 1] = "-";
    OperatorIdent[OperatorIdent["*"] = 2] = "*";
    OperatorIdent[OperatorIdent["/"] = 3] = "/";
    OperatorIdent[OperatorIdent["%"] = 4] = "%";
    OperatorIdent[OperatorIdent["+="] = 5] = "+=";
    OperatorIdent[OperatorIdent["-="] = 6] = "-=";
    OperatorIdent[OperatorIdent["*="] = 7] = "*=";
    OperatorIdent[OperatorIdent["/="] = 8] = "/=";
    OperatorIdent[OperatorIdent["%="] = 9] = "%=";
    // Unary
    OperatorIdent[OperatorIdent["++"] = 10] = "++";
    OperatorIdent[OperatorIdent["--"] = 11] = "--";
})(OperatorIdent = exports.OperatorIdent || (exports.OperatorIdent = {}));
exports.default = OperatorIdent;

},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class ParamDecl extends _1.BaseNode {
    constructor(
        /**
         * The parameter's name.
         */
        name, 
        /**
         * The parameter's type declaration.
         */
        typeDecl = _1.TypeExpr.Empty) {
        super();
        this.name = name;
        this.typeDecl = typeDecl;
    }
}
exports.ParamDecl = ParamDecl;
exports.default = ParamDecl;

},{"./":34}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class ParamDeclList extends _1.BaseNode {
    constructor(
        /**
         * The parameter declarations in the list.
         * The order of this array is exactly the same as the order of the
         * declarations in source code.
         */
        decls) {
        super();
        this.decls = decls;
    }
    /**
     * The parameter declarations in the list.
     * The order of this array is exactly the same as the order of the
     * declarations in source code.
     */
    get paramDecls() {
        return this.decls;
    }
    getParamAtIndex(index) {
        return this.decls[index];
    }
    /**
     * Creates a parameter declaration list with a set of `ParamDecls`.
     * The order of the given parameter declarations is preserved.
     * @param decls The parameter declarations for the param declaration list.
     */
    static fromParamDecls(decls) {
        return new ParamDeclList(decls);
    }
}
/**
 * A completely empty parameter declaration list.
 */
// tslint:disable-next-line:variable-name
ParamDeclList.Empty = new ParamDeclList([]);
exports.ParamDeclList = ParamDeclList;
exports.default = ParamDeclList;

},{"./":34}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class ReturnStatement extends _1.BaseNode {
    constructor(returnValue = _1.Expr.Empty) {
        super();
        this.returnValue = returnValue;
    }
}
/**
 * A return statement with no members.
 */
// tslint:disable-next-line:variable-name
ReturnStatement.Empty = new ReturnStatement();
exports.ReturnStatement = ReturnStatement;
exports.default = ReturnStatement;

},{"./":34}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class SourceUnit extends _1.BaseNode {
    constructor(
        /**
         * The name of the source unit.
         * This is usually the file name or path to the source file.
         */
        name, items) {
        super();
        this.name = name;
        this.items = items;
    }
    /**
     * Returns an array of all nodes in the source unit.
     */
    get nodes() {
        return this.items;
    }
    getNodeAtIndex(index) {
        return this.items[index];
    }
}
exports.SourceUnit = SourceUnit;
exports.default = SourceUnit;

},{"./":34}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class Statement extends _1.BaseNode {
    constructor(items) {
        super();
        this.items = items;
        console.assert(Array.isArray(items), 'Invalid Argument for ast.Statement: must be an array');
        this.items.forEach(item => this.setParentOf(item, this));
    }
    /**
     * Returns an array of all nodes in the statement.
     */
    get nodes() {
        return this.items;
    }
    getNodeAtIndex(index) {
        return this.items[index];
    }
}
/**
 * A statement with no members.
 */
// tslint:disable-next-line:variable-name
Statement.Empty = new Statement([]);
exports.Statement = Statement;
exports.default = Statement;

},{"./":34}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class StringLiteral extends _1.BaseNode {
}
exports.StringLiteral = StringLiteral;
exports.default = StringLiteral;

},{"./":34}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class Token extends _1.BaseNode {
    constructor(
        /**
         * The raw value of this token in source code.
         */
        rawValue) {
        super();
        this.rawValue = rawValue;
    }
}
/**
 * A token with no content whatsoever.
 */
// tslint:disable-next-line:variable-name
Token.Empty = new Token('');
exports.Token = Token;
exports.default = Token;

},{"./":34}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class TypeExpr extends _1.Expr {
    constructor() {
        super();
    }
    /**
     * Creates a type expression from an identifier.
     */
    static fromIdentifier(identifier) {
        return new TypeExpr();
    }
}
/**
 * A type expression with no content whatsoever.
 */
// tslint:disable-next-line:variable-name
TypeExpr.Empty = new TypeExpr();
exports.TypeExpr = TypeExpr;
exports.default = TypeExpr;

},{"./":34}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class UnaryOperation extends _1.Expr {
    constructor(leftOperand, operator, operatorPosition) {
        super();
        this.leftOperand = leftOperand;
        this.operator = operator;
        this.operatorPosition = operatorPosition;
    }
}
exports.UnaryOperation = UnaryOperation;
exports.default = UnaryOperation;

},{"./":34}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Enumerates all possible positions of unary operators.
 */
var UnaryOperatorPosition;
(function (UnaryOperatorPosition) {
    UnaryOperatorPosition[UnaryOperatorPosition["Prefix"] = 0] = "Prefix";
    UnaryOperatorPosition[UnaryOperatorPosition["Postfix"] = 1] = "Postfix";
})(UnaryOperatorPosition = exports.UnaryOperatorPosition || (exports.UnaryOperatorPosition = {}));
exports.default = UnaryOperatorPosition;

},{}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class VarDecl extends _1.BaseNode {
    /**
     * Creates a new `VarDecl` instance.
     */
    constructor(
        /**
         * The modifier with which the variable was declared.
         */
        modifier, 
        /**
         * The name of the variable.
         */
        name, 
        /**
         * The variable's type declaration.
         */
        typeDecl = _1.TypeExpr.Empty, 
        /**
         * The value assigned to the variable.
         */
        assignment = _1.Expr.Empty) {
        super();
        this.modifier = modifier;
        this.name = name;
        this.typeDecl = typeDecl;
        this.assignment = assignment;
    }
    /**
     * Creates a new `VarDecl` instance.
     * @param params Parameters for the function declaration.
     */
    static create(params) {
        return new VarDecl(params.modifier, params.varName, params.typeDecl, params.assignment);
    }
}
exports.VarDecl = VarDecl;
exports.default = VarDecl;

},{"./":34}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseNode_1 = require("./BaseNode");
exports.BaseNode = BaseNode_1.default;
const BinaryOperation_1 = require("./BinaryOperation");
exports.BinaryOperation = BinaryOperation_1.default;
const ClassDecl_1 = require("./ClassDecl");
exports.ClassDecl = ClassDecl_1.default;
const Comment_1 = require("./Comment");
exports.Comment = Comment_1.default;
const ElseIfStatement_1 = require("./ElseIfStatement");
exports.ElseIfStatement = ElseIfStatement_1.default;
const ElseStatement_1 = require("./ElseStatement");
exports.ElseStatement = ElseStatement_1.default;
const Expr_1 = require("./Expr");
exports.Expr = Expr_1.default;
const ExprStatement_1 = require("./ExprStatement");
exports.ExprStatement = ExprStatement_1.default;
const FuncDecl_1 = require("./FuncDecl");
exports.FuncDecl = FuncDecl_1.default;
const Identifier_1 = require("./Identifier");
exports.Identifier = Identifier_1.default;
const IfStatement_1 = require("./IfStatement");
exports.IfStatement = IfStatement_1.default;
const MethodDecl_1 = require("./MethodDecl");
exports.MethodDecl = MethodDecl_1.default;
const Operator_1 = require("./Operator");
exports.Operator = Operator_1.default;
const OperatorIdent_1 = require("./OperatorIdent");
exports.OperatorIdent = OperatorIdent_1.default;
const ParamDecl_1 = require("./ParamDecl");
exports.ParamDecl = ParamDecl_1.default;
const ParamDeclList_1 = require("./ParamDeclList");
exports.ParamDeclList = ParamDeclList_1.default;
const ReturnStatement_1 = require("./ReturnStatement");
exports.ReturnStatement = ReturnStatement_1.default;
const SourceUnit_1 = require("./SourceUnit");
exports.SourceUnit = SourceUnit_1.default;
const Statement_1 = require("./Statement");
exports.Statement = Statement_1.default;
const StringLiteral_1 = require("./StringLiteral");
exports.StringLiteral = StringLiteral_1.default;
const Token_1 = require("./Token");
exports.Token = Token_1.default;
const TypeExpression_1 = require("./TypeExpression");
exports.TypeExpr = TypeExpression_1.default;
const UnaryOperation_1 = require("./UnaryOperation");
exports.UnaryOperation = UnaryOperation_1.default;
const UnaryOperatorPosition_1 = require("./UnaryOperatorPosition");
exports.UnaryOperatorPosition = UnaryOperatorPosition_1.default;
const VarDecl_1 = require("./VarDecl");
exports.VarDecl = VarDecl_1.default;

},{"./BaseNode":9,"./BinaryOperation":10,"./ClassDecl":11,"./Comment":12,"./ElseIfStatement":13,"./ElseStatement":14,"./Expr":15,"./ExprStatement":16,"./FuncDecl":17,"./Identifier":18,"./IfStatement":19,"./MethodDecl":20,"./Operator":21,"./OperatorIdent":22,"./ParamDecl":23,"./ParamDeclList":24,"./ReturnStatement":25,"./SourceUnit":26,"./Statement":27,"./StringLiteral":28,"./Token":29,"./TypeExpression":30,"./UnaryOperation":31,"./UnaryOperatorPosition":32,"./VarDecl":33}],35:[function(require,module,exports){
///
/// BaseGenerator.ts
/// Generic base class for EcmaScript code generators.
///
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// Class
/**
 * Base class for EcmaScript code generators. This class generically implements the
 * `ICodeGenerator` interface, making the implementation of concrete code generators
 * very convenient. All that needs to be done to implement a concrete version of this
 * class is that the `generateCodeConcrete(ast: TNode)` method must be implemented.
 * The implementation of the method should return either a string or another code
 * generator instance, or an array of strings and/or code generator instances.
 * Concatenation of these return values is done by the `BaseGenerator` class.
 */
class BaseGenerator {
    /**
     * Creates a new code generator instance.
     */
    constructor(
        /**
         * The AST node to stringify.
         */
        astNode) {
        this.astNode = astNode;
        /**
         * The name of the output language.
         */
        this.outputLanguageName = 'EcmaScript';
    }
    /**
     * Generates code for a given syntax tree.
     * @param ast The syntax tree to generate code for.
     */
    generateCode() {
        let result = this.generateCodeConcrete(this.astNode);
        if (!Array.isArray(result)) {
            result = [result];
        }
        return result.join('');
    }
    /**
     * Generates code for a given syntax tree.
     * @param ast The syntax tree to generate code for.
     */
    toString() { return this.generateCode(); }
}
exports.BaseGenerator = BaseGenerator;
exports.default = BaseGenerator;

},{}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("./BaseGenerator");
const factory_1 = require("./factory");
/**
 * Main code generator for the EcmaScript compile target.
 */
class CodeGenerator extends BaseGenerator_1.BaseGenerator {
    /**
     * Generates code for a given syntax tree.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(ast) {
        return ast.nodes.map(factory_1.createForAstNode).join('');
    }
}
exports.CodeGenerator = CodeGenerator;
exports.default = CodeGenerator;

},{"./BaseGenerator":35,"./factory":37}],37:[function(require,module,exports){
///
/// factory.ts
/// Functions to register and instantiate EcmaScript code generators.
///
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// Factory Implementation
/**
 * Contains all registered code generators and their rating functions.
 */
const registry = [];
/**
 * Class decorator used to register a code generator.
 * @param ratingFunc A function that determines how relevant the registered code
 *                   generator is for any given AST node. The higher the rating
 *                   that this function returns, the more likely the code
 *                   generator is to be used for a given AST node.
 */
function register(ratingFunc) {
    return (generatorType) => {
        registry.push({ ratingFunc, generatorType });
    };
}
exports.register = register;
/**
 * Creates a function that can be used to sort arrays of `IRegisteredGeneratorConstructor`s
 * by their rating for a given AST node.
 * The function is ment to be passed into `Array.prototype.sort()`.
 * @param astNode The AST node to calculate ratings for.
 */
function createRatingSorter(astNode) {
    return (a, b) => {
        const orderA = a.ratingFunc(astNode);
        const orderB = b.ratingFunc(astNode);
        if (orderA > orderB) {
            return -1;
        }
        else if (orderA < orderB) {
            return 1;
        }
        else {
            return 0;
        }
    };
}
/**
 * Finds the best matching code generator for the given AST node and returns its
 * constructor.
 * @throws
 * @param astNode The AST node to get a matching a code generator constructor for.
 * @return The code generator constructor for the given AST node.
 */
function findForAstNode(astNode) {
    const list = registry
        .filter(registered => (registered.ratingFunc(astNode) || 0) > 0)
        .sort(createRatingSorter(astNode));
    if (list.length < 1) {
        return undefined;
    }
    // the first item in `list` is the item with the best match
    return list[0].generatorType;
}
/**
 * Finds the best matching code generator for the given AST node, then attempts
 * to instantiate such a code generator.
 * Throws if no matching code generator could be found.
 * @throws
 * @param astNode The AST node to instantiate a code generator for.
 * @return The code generator created for the given AST node.
 */
function createForAstNode(astNode) {
    const constructor = findForAstNode(astNode);
    // double check that a `constructor` was found, throw an error if not
    if (typeof constructor !== 'function') {
        throw new Error(`Can not create code generator for AST node ${astNode.constructor.name}: no generator in registry.`);
    }
    return (new constructor(astNode));
}
exports.createForAstNode = createForAstNode;

},{}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const factory_1 = require("../factory");
class BaseConditionalStatementCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        return `${this.getConditionalKeyword()} (${factory_1.createForAstNode(astNode.condition)}) {
			${factory_1.createForAstNode(astNode.body)}
		}\n`;
    }
}
exports.BaseConditionalStatementCodeGenerator = BaseConditionalStatementCodeGenerator;

},{"../BaseGenerator":35,"../factory":37}],39:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const factory_1 = require("../factory");
const ast_1 = require("@/compiler/ast");
let ClassDeclCodeGenerator = class ClassDeclCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        const className = astNode.name.rawValue;
        return `
		/** @class ${className} */
		var ${className} = (function() {
			/** @constructor */
			function ${className}() {
				${factory_1.createForAstNode(astNode.body)}
			}

			return ${className};
		})();

		`;
    }
};
ClassDeclCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.ClassDecl ? Infinity : 0)
], ClassDeclCodeGenerator);
exports.ClassDeclCodeGenerator = ClassDeclCodeGenerator;

},{"../BaseGenerator":35,"../factory":37,"@/compiler/ast":2}],40:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const VarDeclCodeGenerator_1 = require("./VarDeclCodeGenerator");
const factory_1 = require("../factory");
const ast_1 = require("@/compiler/ast");
let ClassVarDeclCodeGenerator = class ClassVarDeclCodeGenerator extends VarDeclCodeGenerator_1.VarDeclCodeGenerator {
    /**
     * Generate the keyword part of the variable declaration, for example `var `.
     * @override
     * @param ast The syntax tree to generate code for.
     */
    generateDeclarationKeyword(astNode) {
        return 'this.';
    }
};
ClassVarDeclCodeGenerator = __decorate([
    factory_1.register(node => (node instanceof ast_1.VarDecl &&
        node.parent instanceof ast_1.Statement &&
        node.parent.parent instanceof ast_1.ClassDecl) ? 10 : 0)
], ClassVarDeclCodeGenerator);
exports.ClassVarDeclCodeGenerator = ClassVarDeclCodeGenerator;

},{"../factory":37,"./VarDeclCodeGenerator":52,"@/compiler/ast":2}],41:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const factory_1 = require("../factory");
const ast_1 = require("@/compiler/ast");
let CommentCodeGenerator = class CommentCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        // we ignore comments in output
        return '';
    }
};
CommentCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.Comment ? Infinity : 0)
], CommentCodeGenerator);
exports.CommentCodeGenerator = CommentCodeGenerator;

},{"../BaseGenerator":35,"../factory":37,"@/compiler/ast":2}],42:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseConditionalStatementCodeGenerator_1 = require("./BaseConditionalStatementCodeGenerator");
const factory_1 = require("../factory");
const ast_1 = require("@/compiler/ast");
let ElseIfStatementCodeGenerator = class ElseIfStatementCodeGenerator extends BaseConditionalStatementCodeGenerator_1.BaseConditionalStatementCodeGenerator {
    getConditionalKeyword() { return 'else if'; }
};
ElseIfStatementCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.ElseIfStatement ? 10 : 0)
], ElseIfStatementCodeGenerator);
exports.ElseIfStatementCodeGenerator = ElseIfStatementCodeGenerator;

},{"../factory":37,"./BaseConditionalStatementCodeGenerator":38,"@/compiler/ast":2}],43:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const factory_1 = require("../factory");
const ast_1 = require("@/compiler/ast");
let ElseStatementCodeGenerator = class ElseStatementCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        return `else {
			${astNode.nodes.map(factory_1.createForAstNode).join('')}
		}\n`;
    }
};
ElseStatementCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.ElseStatement ? 1 : 0)
], ElseStatementCodeGenerator);
exports.ElseStatementCodeGenerator = ElseStatementCodeGenerator;

},{"../BaseGenerator":35,"../factory":37,"@/compiler/ast":2}],44:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const factory_1 = require("../factory");
const ast_1 = require("@/compiler/ast");
let EmptyStatmenetCodeGenerator = class EmptyStatmenetCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        return '';
    }
};
EmptyStatmenetCodeGenerator = __decorate([
    factory_1.register(node => node === ast_1.Statement.Empty ? Infinity : 0)
], EmptyStatmenetCodeGenerator);
exports.EmptyStatmenetCodeGenerator = EmptyStatmenetCodeGenerator;

},{"../BaseGenerator":35,"../factory":37,"@/compiler/ast":2}],45:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const factory_1 = require("../factory");
const ast_1 = require("@/compiler/ast");
let ExprCodeGenerator = class ExprCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        if (astNode.content instanceof ast_1.BaseNode) {
            return factory_1.createForAstNode(astNode.content);
        }
        return astNode.content.toString();
    }
};
ExprCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.Expr ? 1 : 0)
], ExprCodeGenerator);
exports.ExprCodeGenerator = ExprCodeGenerator;

},{"../BaseGenerator":35,"../factory":37,"@/compiler/ast":2}],46:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const factory_1 = require("../factory");
const ast_1 = require("@/compiler/ast");
let ExprCodeGenerator = class ExprCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        return `${factory_1.createForAstNode(astNode.expression)};\n`;
    }
};
ExprCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.ExprStatement ? 1 : 0)
], ExprCodeGenerator);
exports.ExprCodeGenerator = ExprCodeGenerator;

},{"../BaseGenerator":35,"../factory":37,"@/compiler/ast":2}],47:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const factory_1 = require("../factory");
const ast_1 = require("@/compiler/ast");
let FuncDeclCodeGenerator = class FuncDeclCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        return `
		function ${astNode.name.rawValue}(${factory_1.createForAstNode(astNode.runtimeParamDecls)}) {
			${factory_1.createForAstNode(astNode.body)}
		}
		`;
    }
};
FuncDeclCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.FuncDecl ? Infinity : 0)
], FuncDeclCodeGenerator);
exports.FuncDeclCodeGenerator = FuncDeclCodeGenerator;

},{"../BaseGenerator":35,"../factory":37,"@/compiler/ast":2}],48:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseConditionalStatementCodeGenerator_1 = require("./BaseConditionalStatementCodeGenerator");
const factory_1 = require("../factory");
const ast_1 = require("@/compiler/ast");
let IfStatementCodeGenerator = class IfStatementCodeGenerator extends BaseConditionalStatementCodeGenerator_1.BaseConditionalStatementCodeGenerator {
    getConditionalKeyword() { return 'if'; }
};
IfStatementCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.IfStatement ? 1 : 0)
], IfStatementCodeGenerator);
exports.IfStatementCodeGenerator = IfStatementCodeGenerator;

},{"../factory":37,"./BaseConditionalStatementCodeGenerator":38,"@/compiler/ast":2}],49:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const factory_1 = require("../factory");
const ast_1 = require("@/compiler/ast");
let ParamDeclListCodeGenerator = class ParamDeclListCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        return astNode.paramDecls.map(paramDecl => paramDecl.name.rawValue).join(', ');
    }
};
ParamDeclListCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.ParamDeclList ? Infinity : 0)
], ParamDeclListCodeGenerator);
exports.ParamDeclListCodeGenerator = ParamDeclListCodeGenerator;

},{"../BaseGenerator":35,"../factory":37,"@/compiler/ast":2}],50:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const factory_1 = require("../factory");
const ast_1 = require("@/compiler/ast");
let ReturnStatementCodeGenerator = class ReturnStatementCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        return `return ${astNode.returnValue.content};\n`;
    }
};
ReturnStatementCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.ReturnStatement ? Infinity : 0)
], ReturnStatementCodeGenerator);
exports.ReturnStatementCodeGenerator = ReturnStatementCodeGenerator;

},{"../BaseGenerator":35,"../factory":37,"@/compiler/ast":2}],51:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const factory_1 = require("../factory");
const ast_1 = require("@/compiler/ast");
let StatementCodeGenerator = class StatementCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        return astNode.nodes.map(factory_1.createForAstNode).join('');
    }
};
StatementCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.Statement ? 1 : 0)
], StatementCodeGenerator);
exports.StatementCodeGenerator = StatementCodeGenerator;

},{"../BaseGenerator":35,"../factory":37,"@/compiler/ast":2}],52:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const factory_1 = require("../factory");
const ast_1 = require("@/compiler/ast");
let VarDeclCodeGenerator = class VarDeclCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        let assignmentCode = '';
        if (typeof astNode.assignment.content !== 'undefined') {
            assignmentCode = ` = ${factory_1.createForAstNode(astNode.assignment)}`;
        }
        return `${this.generateDeclarationKeyword(astNode)}${astNode.name.rawValue}${assignmentCode};\n`;
    }
    /**
     * Generate the keyword part of the variable declaration, for example `var `.
     * @param ast The syntax tree to generate code for.
     */
    generateDeclarationKeyword(astNode) {
        return 'var ';
    }
};
VarDeclCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.VarDecl ? 1 : 0)
], VarDeclCodeGenerator);
exports.VarDeclCodeGenerator = VarDeclCodeGenerator;

},{"../BaseGenerator":35,"../factory":37,"@/compiler/ast":2}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./BaseConditionalStatementCodeGenerator");
require("./ClassDeclCodeGenerator");
require("./ClassMemberDeclCodeGenerator");
require("./CommentCodeGenerator");
require("./ElseIfStatementCodeGenerator");
require("./ElseStatementCodeGenerator");
require("./EmptyStatementCodeGenerator");
require("./ExprCodeGenerator");
require("./ExprStatementCodeGenerator");
require("./FuncDeclCodeGenerator");
require("./IfStatementCodeGenerator");
require("./ParamDeclListCodeGenerator");
require("./ReturnStatementCodeGenerator");
require("./StatementCodeGenerator");
require("./VarDeclCodeGenerator");

},{"./BaseConditionalStatementCodeGenerator":38,"./ClassDeclCodeGenerator":39,"./ClassMemberDeclCodeGenerator":40,"./CommentCodeGenerator":41,"./ElseIfStatementCodeGenerator":42,"./ElseStatementCodeGenerator":43,"./EmptyStatementCodeGenerator":44,"./ExprCodeGenerator":45,"./ExprStatementCodeGenerator":46,"./FuncDeclCodeGenerator":47,"./IfStatementCodeGenerator":48,"./ParamDeclListCodeGenerator":49,"./ReturnStatementCodeGenerator":50,"./StatementCodeGenerator":51,"./VarDeclCodeGenerator":52}],54:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Make sure all concrete generators are imported.
// Since they register themselves using the `factory.ts` functions, there's
// no need to interact with them here in any other way.
require("./generator/");
// Import and export the public types in this module.
const CodeGenerator_1 = require("./CodeGenerator");
exports.CodeGenerator = CodeGenerator_1.default;

},{"./CodeGenerator":36,"./generator/":53}],55:[function(require,module,exports){
(function (process){
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
var parser = (function () {
    var o = function (k, v, o, l) { for (o = o || {}, l = k.length; l--; o[k[l]] = v)
        ; return o; }, $V0 = [1, 11], $V1 = [1, 12], $V2 = [1, 8], $V3 = [1, 13], $V4 = [1, 14], $V5 = [1, 4, 5, 10, 73, 87], $V6 = [1, 18], $V7 = [4, 5], $V8 = [1, 4, 5, 10, 12, 13, 36, 38, 39, 47, 49, 55, 59, 61, 62, 73, 87], $V9 = [2, 79], $Va = [1, 25], $Vb = [71, 76], $Vc = [2, 72], $Vd = [1, 28], $Ve = [2, 4], $Vf = [1, 31], $Vg = [2, 81], $Vh = [1, 34], $Vi = [1, 36], $Vj = [10, 59, 61, 62, 73], $Vk = [1, 44], $Vl = [1, 4, 5, 10, 59, 61, 62, 73, 87], $Vm = [1, 58], $Vn = [1, 59], $Vo = [4, 10, 59, 61, 62, 73], $Vp = [10, 12, 13, 36, 38, 39, 47, 55, 59, 61, 62], $Vq = [1, 87], $Vr = [1, 88], $Vs = [1, 81], $Vt = [1, 82], $Vu = [1, 83], $Vv = [1, 80], $Vw = [1, 75], $Vx = [4, 10, 12, 13, 36, 38, 39, 47, 55, 59, 61, 62], $Vy = [4, 5, 10, 12, 13, 36, 38, 39, 47, 49, 55, 59, 61, 62, 73], $Vz = [4, 5, 10, 12, 13, 24, 36, 38, 39, 47, 49, 55, 59, 61, 62, 73], $VA = [4, 5, 10, 12, 13, 36, 38, 39, 47, 49, 55, 59, 61, 62], $VB = [10, 12, 13, 36, 38, 39, 47, 49, 55, 59, 61, 62], $VC = [4, 5, 10, 12, 13, 36, 38, 39, 47, 49, 55, 58, 59, 61, 62, 73], $VD = [4, 5, 10, 12, 13, 17, 18, 19, 20, 21, 36, 38, 39, 47, 49, 55, 58, 59, 61, 62, 73], $VE = [2, 32], $VF = [1, 120], $VG = [36, 38, 39], $VH = [12, 13, 36, 38, 39];
    var parser = { trace: function trace() { },
        yy: {},
        symbols_: { "error": 2, "nl_or_eof": 3, "NL": 4, "EOF": 5, "maybe_nl": 6, "maybe_nls": 7, "maybe_nl_or_eof": 8, "comment": 9, "SL_COMMENT": 10, "unary_operator": 11, "INC_OP": 12, "DEC_OP": 13, "unary_operation": 14, "primary_expr": 15, "binary_operator": 16, "+": 17, "-": 18, "*": 19, "/": 20, "%": 21, "binary_operation": 22, "assignment_operator": 23, "=": 24, "MUL_ASSIGN": 25, "DIV_ASSIGN": 26, "MOD_ASSIGN": 27, "ADD_ASSIGN": 28, "SUB_ASSIGN": 29, "LEFT_ASSIGN": 30, "RIGHT_ASSIGN": 31, "AND_ASSIGN": 32, "XOR_ASSIGN": 33, "OR_ASSIGN": 34, "assignment_expr": 35, "IDENTIFIER": 36, "expression": 37, "STRING_LITERAL": 38, "CONSTANT": 39, "operation": 40, "expression_statement": 41, "type_expr": 42, "conditional_body": 43, "statement": 44, "compound_statement": 45, "conditional_if_statement": 46, "IF": 47, "conditional_else_if_statement": 48, "ELSE": 49, "conditional_maybe_else_if_statements": 50, "conditional_else_statement": 51, "conditional_maybe_else_statement": 52, "conditional_statement": 53, "return_statement": 54, "RETURN": 55, "var_decl": 56, "statements": 57, "{": 58, "}": 59, "var_decl_modifier": 60, "LET": 61, "CONST": 62, "var_decl_type_decl": 63, ":": 64, "var_decl_name_and_maybe_type_decl": 65, "var_decl_maybe_assignment": 66, "var_decl_end": 67, "param_decl_type_expr": 68, "param_decl": 69, "param_decl_list": 70, ",": 71, "func_ident": 72, "FUNCTION": 73, "func_param_decl_list": 74, "(": 75, ")": 76, "func_return_expr": 77, "ARR": 78, "func_body": 79, "func_decl_end": 80, "func_decl": 81, "method_decl": 82, "class_body_statement": 83, "class_body_statements": 84, "class_body_compound_statement": 85, "class_ident": 86, "CLASS": 87, "class_body": 88, "class_decl": 89, "root_grammar": 90, "root_grammar_list": 91, "root": 92, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 4: "NL", 5: "EOF", 10: "SL_COMMENT", 12: "INC_OP", 13: "DEC_OP", 17: "+", 18: "-", 19: "*", 20: "/", 21: "%", 24: "=", 25: "MUL_ASSIGN", 26: "DIV_ASSIGN", 27: "MOD_ASSIGN", 28: "ADD_ASSIGN", 29: "SUB_ASSIGN", 30: "LEFT_ASSIGN", 31: "RIGHT_ASSIGN", 32: "AND_ASSIGN", 33: "XOR_ASSIGN", 34: "OR_ASSIGN", 36: "IDENTIFIER", 38: "STRING_LITERAL", 39: "CONSTANT", 47: "IF", 49: "ELSE", 55: "RETURN", 58: "{", 59: "}", 61: "LET", 62: "CONST", 64: ":", 71: ",", 73: "FUNCTION", 75: "(", 76: ")", 78: "ARR", 87: "CLASS" },
        productions_: [0, [3, 1], [3, 1], [6, 1], [6, 0], [7, 1], [7, 2], [8, 1], [8, 1], [9, 2], [11, 1], [11, 1], [14, 2], [14, 2], [16, 1], [16, 1], [16, 1], [16, 1], [16, 1], [22, 3], [23, 1], [23, 1], [23, 1], [23, 1], [23, 1], [23, 1], [23, 1], [23, 1], [23, 1], [23, 1], [23, 1], [35, 3], [15, 1], [15, 1], [15, 1], [40, 1], [40, 1], [37, 1], [37, 1], [37, 1], [41, 2], [42, 1], [43, 1], [43, 1], [46, 4], [48, 5], [50, 1], [50, 2], [51, 3], [52, 1], [52, 1], [53, 4], [54, 3], [44, 1], [44, 1], [44, 1], [44, 1], [44, 1], [57, 1], [57, 2], [45, 5], [60, 1], [60, 1], [63, 2], [63, 0], [65, 2], [66, 2], [66, 0], [67, 1], [56, 4], [68, 2], [68, 0], [69, 0], [69, 2], [70, 1], [70, 3], [72, 2], [74, 3], [77, 2], [77, 0], [79, 1], [79, 0], [80, 1], [81, 5], [82, 5], [83, 1], [83, 1], [83, 1], [84, 1], [84, 2], [85, 5], [86, 2], [88, 1], [88, 0], [89, 3], [90, 1], [90, 1], [90, 1], [90, 1], [91, 1], [91, 2], [92, 1]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
            /* this == yyval */
            var $0 = $$.length - 1;
            switch (yystate) {
                case 9:
                    this.$ = new yy.Comment([new yy.Token($$[$0 - 1])]);
                    break;
                case 10:
                case 11:
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                case 21:
                case 22:
                case 23:
                case 24:
                case 25:
                case 26:
                case 27:
                case 28:
                case 29:
                case 30:
                    this.$ = yy.getOperatorFromToken($$[$0]);
                    break;
                case 12:
                    this.$ = new yy.UnaryOperation($$[$0 - 1], $$[$0], yy.UnaryOperatorPosition.Postfix);
                    break;
                case 13:
                    this.$ = new yy.UnaryOperation($$[$0 - 1], $$[$0], yy.UnaryOperatorPosition.Prefix);
                    break;
                case 19:
                    this.$ = new yy.BinaryOperation($$[$0 - 2], $$[$0 - 1], $$[$0]);
                    break;
                case 31:
                    this.$ = new yy.BinaryOperation(new yy.Expr($$[$0 - 2]), $$[$0 - 1], $$[$0]);
                    break;
                case 35:
                case 36:
                case 38:
                case 39:
                case 70:
                case 78:
                case 80:
                case 92:
                case 99:
                    this.$ = $$[$0];
                    break;
                case 37:
                case 66:
                    this.$ = new yy.Expr($$[$0]);
                    break;
                case 40:
                    this.$ = new yy.ExprStatement($$[$0 - 1]);
                    break;
                case 41:
                    this.$ = yy.TypeExpr.fromIdentifier(new yy.Token($$[$0]));
                    break;
                case 44:
                    this.$ = new yy.IfStatement($$[$0 - 2], $$[$0 - 1]);
                    break;
                case 45:
                    this.$ = new yy.ElseIfStatement($$[$0 - 2], $$[$0 - 1]);
                    break;
                case 47:
                    this.$ = $$[$0 - 1] || [];
                    if (typeof $$[$0] !== 'undefined') {
                        this.$ = this.$.concat($$[$0]);
                    }
                    break;
                case 48:
                    this.$ = new yy.ElseStatement([$$[$0 - 1]]);
                    break;
                case 51:
                    var statements = [$$[$0 - 3]];
                    if (Array.isArray($$[$0 - 2])) {
                        statements = statements.concat($$[$0 - 2]);
                    }
                    if (typeof $$[$0 - 1] !== 'undefined') {
                        statements.push($$[$0 - 1]);
                    }
                    this.$ = new yy.Statement(statements);
                    break;
                case 52:
                    this.$ = new yy.ReturnStatement($$[$0 - 1]);
                    break;
                case 58:
                case 88:
                    this.$ = [];
                    break;
                case 59:
                case 89:
                    $$[$0 - 1] = $$[$0 - 1] || [];
                    $$[$0] = $$[$0] || yy.Statement.Empty;
                    this.$ = $$[$0 - 1].concat($$[$0]);
                    break;
                case 60:
                case 90:
                    if ($$[$0 - 2] === '\n' || $$[$0 - 2] === '') {
                        $$[$0 - 2] = [];
                    }
                    $$[$0 - 2] = $$[$0 - 2] || [];
                    this.$ = new yy.Statement($$[$0 - 2]);
                    break;
                case 61:
                case 62:
                    this.$ = yy.getVarDeclModifierByKeyword($$[$0]);
                    break;
                case 63:
                case 77:
                    this.$ = $$[$0 - 1];
                    break;
                case 65:
                    this.$ = [yy.createToken($$[$0 - 1]), $$[$0]];
                    break;
                case 69:
                    this.$ = yy.VarDecl.create({
                        modifier: $$[$0 - 3],
                        varName: $$[$0 - 2][0],
                        typeDecl: $$[$0 - 2][1],
                        assignment: $$[$0 - 1]
                    });
                    break;
                case 73:
                    this.$ = new yy.ParamDecl(new yy.Token($$[$0 - 1]), $$[$0]);
                    break;
                case 74:
                    const decls = [];
                    if (typeof $$[$0] !== 'undefined') {
                        decls.push($$[$0]);
                    }
                    this.$ = yy.ParamDeclList.fromParamDecls(decls);
                    break;
                case 75:
                    this.$ = yy.ParamDeclList.fromParamDecls($$[$0 - 2].paramDecls.concat($$[$0]));
                    break;
                case 76:
                case 91:
                    this.$ = yy.createToken($$[$0]);
                    break;
                case 83:
                    this.$ = yy.FuncDecl.create({
                        funcName: $$[$0 - 4],
                        runtimeParamDecls: $$[$0 - 3],
                        returnTypeDecl: $$[$0 - 2],
                        funcBody: $$[$0 - 1]
                    });
                    break;
                case 84:
                    this.$ = yy.MethodDecl.create({
                        funcName: $$[$0 - 4],
                        runtimeParamDecls: $$[$0 - 3],
                        returnTypeDecl: $$[$0 - 2],
                        funcBody: $$[$0 - 1]
                    });
                    break;
                case 94:
                    this.$ = yy.ClassDecl.create({
                        className: $$[$0 - 2],
                        classBody: $$[$0 - 1]
                    });
                    break;
                case 100:
                    $$[$0 - 1] = $$[$0 - 1] || [];
                    if (!Array.isArray($$[$0 - 1])) {
                        $$[$0 - 1] = [$$[$0 - 1]];
                    }
                    this.$ = $$[$0 - 1].concat($$[$0]);
                    break;
                case 101:
                    if (Array.isArray($$[$0])) {
                        $$[$0] = $$[$0].filter(node => (node !== '\n' &&
                            node !== ''));
                        yy.result.push.apply(yy.result, $$[$0]);
                    }
                    else {
                        yy.result.push($$[$0]);
                    }
                    return this.$;
                    break;
            }
        },
        table: [{ 3: 7, 4: $V0, 5: $V1, 9: 4, 10: $V2, 72: 9, 73: $V3, 81: 5, 86: 10, 87: $V4, 89: 6, 90: 3, 91: 2, 92: 1 }, { 1: [3] }, { 1: [2, 101], 3: 7, 4: $V0, 5: $V1, 9: 4, 10: $V2, 72: 9, 73: $V3, 81: 5, 86: 10, 87: $V4, 89: 6, 90: 15 }, o($V5, [2, 99]), o($V5, [2, 95]), o($V5, [2, 96]), o($V5, [2, 97]), o($V5, [2, 98]), { 3: 16, 4: $V0, 5: $V1 }, { 74: 17, 75: $V6 }, o($V7, [2, 93], { 88: 19, 85: 20, 58: [1, 21] }), o($V8, [2, 1]), o($V8, [2, 2]), { 36: [1, 22] }, { 36: [1, 23] }, o($V5, [2, 100]), o($V8, [2, 9]), o([1, 4, 5, 10, 58, 73, 87], $V9, { 77: 24, 78: $Va }), o($Vb, $Vc, { 70: 26, 69: 27, 36: $Vd }), { 3: 29, 4: $V0, 5: $V1 }, o($V7, [2, 92]), o([5, 10, 59, 61, 62, 73], $Ve, { 6: 30, 4: $Vf }), { 75: [2, 76] }, o([4, 5, 58], [2, 91]), o($V5, $Vg, { 79: 32, 45: 33, 58: $Vh }), { 36: $Vi, 42: 35 }, { 71: [1, 38], 76: [1, 37] }, o($Vb, [2, 74]), o($Vb, [2, 71], { 68: 39, 64: [1, 40] }), o($V5, [2, 94]), o($Vj, $Ve, { 84: 41, 8: 42, 7: 43, 6: 45, 4: $Vf, 5: $Vk }), o($V8, [2, 3]), o([1, 10, 73, 87], $Ve, { 7: 43, 6: 45, 80: 46, 8: 47, 4: $Vf, 5: $Vk }), o($Vl, [2, 80]), o([5, 10, 12, 13, 36, 38, 39, 47, 55, 59, 61, 62], $Ve, { 6: 48, 4: $Vf }), o([1, 4, 5, 10, 58, 59, 61, 62, 73, 87], [2, 78]), o([1, 4, 5, 10, 12, 13, 24, 36, 38, 39, 47, 49, 55, 58, 59, 61, 62, 71, 73, 76, 87], [2, 41]), o([1, 4, 5, 10, 58, 59, 61, 62, 73, 78, 87], [2, 77]), o($Vb, $Vc, { 69: 49, 36: $Vd }), o($Vb, [2, 73]), { 36: $Vi, 42: 50 }, { 4: $Vf, 6: 51, 9: 53, 10: $V2, 56: 54, 59: $Ve, 60: 56, 61: $Vm, 62: $Vn, 72: 57, 73: $V3, 82: 55, 83: 52 }, o($Vo, [2, 88]), o([1, 5, 10, 12, 13, 36, 38, 39, 47, 49, 55, 59, 61, 62, 73, 87], [2, 7], { 6: 60, 4: $Vf }), o($V8, [2, 8]), o($V8, [2, 5]), o($V5, [2, 83]), o($Vl, [2, 82]), o($Vp, $Ve, { 7: 43, 6: 45, 57: 61, 8: 62, 4: $Vf, 5: $Vk }), o($Vb, [2, 75]), o($Vb, [2, 70]), { 59: [1, 63] }, o($Vo, [2, 89]), o($Vo, [2, 85]), o($Vo, [2, 86]), o($Vo, [2, 87]), { 36: [1, 65], 65: 64 }, { 74: 66, 75: $V6 }, { 36: [2, 61] }, { 36: [2, 62] }, o($V8, [2, 6]), { 4: $Vf, 6: 67, 9: 69, 10: $V2, 11: 86, 12: $Vq, 13: $Vr, 14: 84, 15: 77, 22: 85, 35: 79, 36: $Vs, 37: 74, 38: $Vt, 39: $Vu, 40: 78, 41: 70, 44: 68, 46: 76, 47: $Vv, 53: 73, 54: 72, 55: $Vw, 56: 71, 59: $Ve, 60: 56, 61: $Vm, 62: $Vn }, o($Vx, [2, 58]), o($V7, [2, 90]), o($Vy, [2, 67], { 66: 89, 24: [1, 90] }), o($Vz, [2, 64], { 63: 91, 64: [1, 92] }), o([4, 5, 10, 58, 59, 61, 62, 73], $V9, { 77: 93, 78: $Va }), { 59: [1, 94] }, o($Vx, [2, 59]), o($VA, [2, 53]), o($VA, [2, 54]), o($VA, [2, 55]), o($VA, [2, 56]), o($VA, [2, 57]), o($VB, $Ve, { 7: 43, 6: 45, 8: 95, 4: $Vf, 5: $Vk }), { 11: 86, 12: $Vq, 13: $Vr, 14: 84, 15: 77, 22: 85, 35: 79, 36: $Vs, 37: 96, 38: $Vt, 39: $Vu, 40: 78 }, o($VB, $Ve, { 7: 43, 6: 45, 50: 97, 8: 98, 4: $Vf, 5: $Vk }), o([4, 5, 10, 36, 38, 39, 47, 49, 55, 58, 59, 61, 62, 73], [2, 37], { 11: 99, 16: 100, 12: $Vq, 13: $Vr, 17: [1, 101], 18: [1, 102], 19: [1, 103], 20: [1, 104], 21: [1, 105] }), o($VC, [2, 38]), o($VC, [2, 39]), { 11: 86, 12: $Vq, 13: $Vr, 14: 84, 15: 77, 22: 85, 35: 79, 36: $Vs, 37: 106, 38: $Vt, 39: $Vu, 40: 78 }, o($VD, $VE, { 23: 107, 24: [1, 108], 25: [1, 109], 26: [1, 110], 27: [1, 111], 28: [1, 112], 29: [1, 113], 30: [1, 114], 31: [1, 115], 32: [1, 116], 33: [1, 117], 34: [1, 118] }), o($VD, [2, 33]), o($VD, [2, 34]), o($VC, [2, 35]), o($VC, [2, 36]), { 15: 119, 36: $VF, 38: $Vt, 39: $Vu }, o($VC, [2, 10]), o($VC, [2, 11]), o([10, 12, 13, 36, 38, 39, 47, 49, 55, 59, 61, 62, 73], $Ve, { 7: 43, 6: 45, 67: 121, 8: 122, 4: $Vf, 5: $Vk }), { 11: 86, 12: $Vq, 13: $Vr, 14: 84, 15: 77, 22: 85, 35: 79, 36: $Vs, 37: 123, 38: $Vt, 39: $Vu, 40: 78 }, o($Vz, [2, 65]), { 36: $Vi, 42: 124 }, o([4, 5, 10, 59, 61, 62, 73], $Vg, { 45: 33, 79: 125, 58: $Vh }), o($V8, [2, 60]), o($VA, [2, 40]), o($VB, $Ve, { 7: 43, 6: 45, 8: 126, 4: $Vf, 5: $Vk }), o($Vp, $Ve, { 7: 43, 6: 45, 52: 127, 48: 128, 51: 129, 8: 130, 4: $Vf, 5: $Vk, 49: [1, 131] }), o($VA, [2, 46]), o($VC, [2, 12]), { 15: 132, 36: $VF, 38: $Vt, 39: $Vu }, o($VG, [2, 14]), o($VG, [2, 15]), o($VG, [2, 16]), o($VG, [2, 17]), o($VG, [2, 18]), { 9: 69, 10: $V2, 11: 86, 12: $Vq, 13: $Vr, 14: 84, 15: 77, 22: 85, 35: 79, 36: $Vs, 37: 74, 38: $Vt, 39: $Vu, 40: 78, 41: 70, 43: 133, 44: 134, 45: 135, 46: 76, 47: $Vv, 53: 73, 54: 72, 55: $Vw, 56: 71, 58: $Vh, 60: 56, 61: $Vm, 62: $Vn }, { 11: 86, 12: $Vq, 13: $Vr, 14: 84, 15: 77, 22: 85, 35: 79, 36: $Vs, 37: 136, 38: $Vt, 39: $Vu, 40: 78 }, o($VH, [2, 20]), o($VH, [2, 21]), o($VH, [2, 22]), o($VH, [2, 23]), o($VH, [2, 24]), o($VH, [2, 25]), o($VH, [2, 26]), o($VH, [2, 27]), o($VH, [2, 28]), o($VH, [2, 29]), o($VH, [2, 30]), o($VC, [2, 13]), o($VC, $VE), o($Vy, [2, 69]), o($Vy, [2, 68]), o($Vy, [2, 66]), o($Vz, [2, 63]), o($Vj, $Ve, { 7: 43, 6: 45, 8: 47, 80: 137, 4: $Vf, 5: $Vk }), o($VA, [2, 52]), o($VB, $Ve, { 7: 43, 6: 45, 8: 138, 4: $Vf, 5: $Vk }), o($VA, [2, 47]), o($VA, [2, 49]), o($VA, [2, 50]), { 9: 69, 10: $V2, 11: 86, 12: $Vq, 13: $Vr, 14: 84, 15: 77, 22: 85, 35: 79, 36: $Vs, 37: 74, 38: $Vt, 39: $Vu, 40: 78, 41: 70, 43: 140, 44: 134, 45: 135, 46: 76, 47: [1, 139], 53: 73, 54: 72, 55: $Vw, 56: 71, 58: $Vh, 60: 56, 61: $Vm, 62: $Vn }, o($VC, [2, 19]), o($VB, $Ve, { 7: 43, 6: 45, 8: 141, 4: $Vf, 5: $Vk }), o($VA, [2, 42]), o($VA, [2, 43]), o($VC, [2, 31]), o($Vo, [2, 84]), o($VA, [2, 51]), { 11: 86, 12: $Vq, 13: $Vr, 14: 84, 15: 77, 22: 85, 35: 79, 36: $Vs, 37: 142, 38: $Vt, 39: $Vu, 40: 78 }, o($VB, $Ve, { 7: 43, 6: 45, 8: 143, 4: $Vf, 5: $Vk }), o($VA, [2, 44]), { 9: 69, 10: $V2, 11: 86, 12: $Vq, 13: $Vr, 14: 84, 15: 77, 22: 85, 35: 79, 36: $Vs, 37: 74, 38: $Vt, 39: $Vu, 40: 78, 41: 70, 43: 144, 44: 134, 45: 135, 46: 76, 47: $Vv, 53: 73, 54: 72, 55: $Vw, 56: 71, 58: $Vh, 60: 56, 61: $Vm, 62: $Vn }, o($VA, [2, 48]), o($VB, $Ve, { 7: 43, 6: 45, 8: 145, 4: $Vf, 5: $Vk }), o($VA, [2, 45])],
        defaultActions: { 22: [2, 76], 58: [2, 61], 59: [2, 62] },
        parseError: function parseError(str, hash) {
            if (hash.recoverable) {
                this.trace(str);
            }
            else {
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
            }
            else {
                this.parseError = Object.getPrototypeOf(this).parseError;
            }
            function popStack(n) {
                stack.length = stack.length - 2 * n;
                vstack.length = vstack.length - n;
                lstack.length = lstack.length - n;
            }
            _token_stack: function lex() {
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
                }
                else {
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
                    }
                    else {
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
                        }
                        else {
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
        } };
    /* generated by jison-lex 0.3.4 */
    var lexer = (function () {
        var lexer = ({
            EOF: 1,
            parseError: function parseError(str, hash) {
                if (this.yy.parser) {
                    this.yy.parser.parseError(str, hash);
                }
                else {
                    throw new Error(str);
                }
            },
            // resets the lexer, sets new input
            setInput: function (input, yy) {
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
                    this.yylloc.range = [0, 0];
                }
                this.offset = 0;
                return this;
            },
            // consumes and returns one char from the input
            input: function () {
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
                }
                else {
                    this.yylloc.last_column++;
                }
                if (this.options.ranges) {
                    this.yylloc.range[1]++;
                }
                this._input = this._input.slice(1);
                return ch;
            },
            // unshifts one char (or a string) into the input
            unput: function (ch) {
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
            more: function () {
                this._more = true;
                return this;
            },
            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
            reject: function () {
                if (this.options.backtrack_lexer) {
                    this._backtrack = true;
                }
                else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
                return this;
            },
            // retain first n characters of the match
            less: function (n) {
                this.unput(this.match.slice(n));
            },
            // displays already matched input, i.e. for error messages
            pastInput: function () {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },
            // displays upcoming input, i.e. for error messages
            upcomingInput: function () {
                var next = this.match;
                if (next.length < 20) {
                    next += this._input.substr(0, 20 - next.length);
                }
                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
            },
            // displays the character position where the lexing error occurred, i.e. for error messages
            showPosition: function () {
                var pre = this.pastInput();
                var c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^";
            },
            // test the lexed token: return FALSE when not a match, otherwise return token
            test_match: function (match, indexed_rule) {
                var token, lines, backup;
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
                }
                else if (this._backtrack) {
                    // recover context
                    for (var k in backup) {
                        this[k] = backup[k];
                    }
                    return false; // rule action called reject() implying the next rule should be tested instead.
                }
                return false;
            },
            // return next match in input
            next: function () {
                if (this.done) {
                    return this.EOF;
                }
                if (!this._input) {
                    this.done = true;
                }
                var token, match, tempMatch, index;
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
                            }
                            else if (this._backtrack) {
                                match = false;
                                continue; // rule action called reject() implying a rule MISmatch.
                            }
                            else {
                                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                                return false;
                            }
                        }
                        else if (!this.options.flex) {
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
                }
                else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
            },
            // return next match that has a token
            lex: function lex() {
                var r = this.next();
                if (r) {
                    return r;
                }
                else {
                    return this.lex();
                }
            },
            // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
            begin: function begin(condition) {
                this.conditionStack.push(condition);
            },
            // pop the previously active lexer condition state off the condition stack
            popState: function popState() {
                var n = this.conditionStack.length - 1;
                if (n > 0) {
                    return this.conditionStack.pop();
                }
                else {
                    return this.conditionStack[0];
                }
            },
            // produce the lexer rule set which is active for the currently active lexer condition state
            _currentRules: function _currentRules() {
                if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                }
                else {
                    return this.conditions["INITIAL"].rules;
                }
            },
            // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
            topState: function topState(n) {
                n = this.conditionStack.length - 1 - Math.abs(n || 0);
                if (n >= 0) {
                    return this.conditionStack[n];
                }
                else {
                    return "INITIAL";
                }
            },
            // alias for begin(condition)
            pushState: function pushState(condition) {
                this.begin(condition);
            },
            // return the number of states currently on the stack
            stateStackSize: function stateStackSize() {
                return this.conditionStack.length;
            },
            options: {},
            performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
                var YYSTATE = YY_START;
                switch ($avoiding_name_collisions) {
                    case 0:
                        return 10;
                        break;
                    case 1:
                        return 73;
                        break;
                    case 2:
                        return 87;
                        break;
                    case 3:
                        return 61;
                        break;
                    case 4:
                        return 62;
                        break;
                    case 5:
                        return 55;
                        break;
                    case 6:
                        return 47;
                        break;
                    case 7:
                        return 49;
                        break;
                    case 8:
                        return 4;
                        break;
                    case 9:
                        return 36;
                        break;
                    case 10:
                        return 39;
                        break;
                    case 11:
                        return 39;
                        break;
                    case 12:
                        return 39;
                        break;
                    case 13:
                        return 39;
                        break;
                    case 14:
                        return 39;
                        break;
                    case 15:
                        return 39;
                        break;
                    case 16:
                        return 39;
                        break;
                    case 17:
                        return 38;
                        break;
                    case 18:
                        return 31;
                        break;
                    case 19:
                        return 30;
                        break;
                    case 20:
                        return 28;
                        break;
                    case 21:
                        return 29;
                        break;
                    case 22:
                        return 25;
                        break;
                    case 23:
                        return 26;
                        break;
                    case 24:
                        return 27;
                        break;
                    case 25:
                        return 32;
                        break;
                    case 26:
                        return 33;
                        break;
                    case 27:
                        return 34;
                        break;
                    case 28:
                        return 'RIGHT_OP';
                        break;
                    case 29:
                        return 'LEFT_OP';
                        break;
                    case 30:
                        return 12;
                        break;
                    case 31:
                        return 13;
                        break;
                    case 32:
                        return 78;
                        break;
                    case 33:
                        return 'AND_OP';
                        break;
                    case 34:
                        return 'OR_OP';
                        break;
                    case 35:
                        return 'LE_OP';
                        break;
                    case 36:
                        return 'GE_OP';
                        break;
                    case 37:
                        return 'EQ_OP';
                        break;
                    case 38:
                        return 'NE_OP';
                        break;
                    case 39:
                        return 5;
                        break;
                    case 40:
                        return (';');
                        break;
                    case 41:
                        return ('{');
                        break;
                    case 42:
                        return ('}');
                        break;
                    case 43:
                        return (',');
                        break;
                    case 44:
                        return (':');
                        break;
                    case 45:
                        return ('=');
                        break;
                    case 46:
                        return ('(');
                        break;
                    case 47:
                        return (')');
                        break;
                    case 48:
                        return ('[');
                        break;
                    case 49:
                        return (']');
                        break;
                    case 50:
                        return ('.');
                        break;
                    case 51:
                        return ('&');
                        break;
                    case 52:
                        return ('!');
                        break;
                    case 53:
                        return ('~');
                        break;
                    case 54:
                        return ('-');
                        break;
                    case 55:
                        return ('+');
                        break;
                    case 56:
                        return ('*');
                        break;
                    case 57:
                        return ('/');
                        break;
                    case 58:
                        return ('%');
                        break;
                    case 59:
                        return ('<');
                        break;
                    case 60:
                        return ('>');
                        break;
                    case 61:
                        return ('^');
                        break;
                    case 62:
                        return ('|');
                        break;
                    case 63:
                        return ('?');
                        break;
                    case 64:
                        break;
                    case 65:
                        break;
                }
            },
            rules: [/^(?:\/\/(.*))/, /^(?:func\b)/, /^(?:class\b)/, /^(?:let\b)/, /^(?:const\b)/, /^(?:return\b)/, /^(?:if\b)/, /^(?:else\b)/, /^(?:(\n))/, /^(?:([a-zA-Z_])(([a-zA-Z_])|([0-9]))*)/, /^(?:([0-9])+\.([0-9])*(([Ee][+-]?([0-9])+))?([fFlL])?)/, /^(?:([0-9])*\.([0-9])+(([Ee][+-]?([0-9])+))?([fFlL])?)/, /^(?:0[xX]([a-fA-F0-9])+([uUlL]*)?)/, /^(?:0([0-9])+([uUlL]*)?)/, /^(?:([0-9])+([uUlL]*)?)/, /^(?:L?'(\\'|[^'])+')/, /^(?:([0-9])+([Ee][+-]?([0-9])+)([fFlL])?)/, /^(?:L?"(\\"|[^"])*")/, /^(?:>>=)/, /^(?:<<=)/, /^(?:\+=)/, /^(?:-=)/, /^(?:\*=)/, /^(?:\/=)/, /^(?:%=)/, /^(?:&=)/, /^(?:\^=)/, /^(?:\|=)/, /^(?:>>)/, /^(?:<<)/, /^(?:\+\+)/, /^(?:--)/, /^(?:->)/, /^(?:&&)/, /^(?:\|\|)/, /^(?:<=)/, /^(?:>=)/, /^(?:==)/, /^(?:!=)/, /^(?:$)/, /^(?:;)/, /^(?:(\{|<%))/, /^(?:(\}|%>))/, /^(?:,)/, /^(?::)/, /^(?:=)/, /^(?:\()/, /^(?:\))/, /^(?:(\[|<:))/, /^(?:(\]|:>))/, /^(?:\.)/, /^(?:&)/, /^(?:!)/, /^(?:~)/, /^(?:-)/, /^(?:\+)/, /^(?:\*)/, /^(?:\/)/, /^(?:%)/, /^(?:<)/, /^(?:>)/, /^(?:\^)/, /^(?:\|)/, /^(?:\?)/, /^(?:[ \t\v\r\f])/, /^(?:.)/],
            conditions: { "INITIAL": { "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65], "inclusive": true } }
        });
        return lexer;
    })();
    parser.lexer = lexer;
    function Parser() {
        this.yy = {};
    }
    Parser.prototype = parser;
    parser.Parser = Parser;
    return new Parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
    exports.parser = parser;
    exports.Parser = parser.Parser;
    exports.parse = function () { return parser.parse.apply(parser, arguments); };
    exports.main = function commonjsMain(args) {
        if (!args[1]) {
            console.log('Usage: ' + args[0] + ' FILE');
            process.exit(1);
        }
        var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
        return exports.parser.parse(source);
    };
    if (typeof module !== 'undefined' && require.main === module) {
        exports.main(process.argv.slice(1));
    }
}

}).call(this,require('_process'))
},{"_process":59,"fs":57,"path":58}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generatedParser = require("./generatedParser.js");
const ast = require("../ast");
/**
 * This is the parser generated by JISON.
 * We keep this private.
 */
const parser = generatedParser.parser;
function getVarDeclModifierByKeyword(keyword) {
    if (keyword === 'let') {
        return 0 /* Let */;
    }
    else if (keyword === 'const') {
        return 1 /* Const */;
    }
    else {
        throw new Error(`Parsing Error: "${keyword}" is not a legal var decl keyword.`);
    }
}
/**
 * Maps source code tokens to AST operator identifiers.
 */
const operatorMap = {};
// Generate the operator map
Object.keys(ast.OperatorIdent)
    .filter(key => typeof key !== 'string' || key.length < 1)
    .forEach(key => {
    operatorMap[key] = ast.OperatorIdent[key];
});
function getOperatorFromToken(token) {
    return new ast.Operator(operatorMap[token], new ast.Token(token));
}
function parseToArray(sourceCode) {
    for (const typeName in ast) {
        parser.yy[typeName] = ast[typeName];
    }
    parser.yy.createToken = function (rawSource) {
        return new ast.Token(rawSource);
    };
    parser.yy.getVarDeclModifierByKeyword = getVarDeclModifierByKeyword;
    parser.yy.getOperatorFromToken = getOperatorFromToken;
    parser.yy.result = [];
    parser.parse(sourceCode);
    return [].concat(parser.yy.result);
}
exports.parseToArray = parseToArray;
function parseToSourceUnit(name, sourceCode) {
    return new ast.SourceUnit(name, parseToArray(sourceCode));
}
exports.parseToSourceUnit = parseToSourceUnit;

},{"../ast":34,"./generatedParser.js":55}],57:[function(require,module,exports){

},{}],58:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":59}],59:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[6])(6)
});