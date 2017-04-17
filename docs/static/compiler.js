(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.compiler = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("api"));

},{"api":9}],2:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("ast"));

},{"ast":42}],3:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("codegen/ecmascript/"));

},{"codegen/ecmascript/":74}],4:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("compiler/parser"));

},{"compiler/parser":76}],5:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("../utils/FactoryRegistry"));
__export(require("../utils/alphabet"));
__export(require("../utils/assert"));
__export(require("../utils/importUtils"));

},{"../utils/FactoryRegistry":77,"../utils/alphabet":78,"../utils/assert":79,"../utils/importUtils":80}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],7:[function(require,module,exports){
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
        const sourceUnit = parser_1.parseToSourceUnit(
        // we create the source unit with a unique name:
        `SourceUnit-${++CompilerApi.sourceUnitCount}`, sourceCode);
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
/**
 * An internal counter used to make source unit names as unique as possible.
 */
CompilerApi.sourceUnitCount = 0;
exports.CompilerApi = CompilerApi;

},{"@/compiler/api":1,"@/compiler/codegen/ecmascript":3,"@/compiler/parser":4}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./CompilerApi"));
__export(require("./CompileTarget"));
__export(require("./ICompileTargetIds"));

},{"./CompileTarget":6,"./CompilerApi":7,"./ICompileTargetIds":8}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
const Expr_1 = require("./Expr");
const Operator_1 = require("./Operator");
class BinaryOperation extends Expr_1.default {
    constructor(leftOperand, operator, rightOperand) {
        super();
        this.leftOperand = leftOperand;
        this.operator = operator;
        this.rightOperand = rightOperand;
        assert_1.assertAstNodeParam(leftOperand instanceof Expr_1.default);
        assert_1.assertAstNodeParam(operator instanceof Operator_1.default);
        assert_1.assertAstNodeParam(rightOperand instanceof Expr_1.default);
    }
}
exports.BinaryOperation = BinaryOperation;
exports.default = BinaryOperation;

},{"./Expr":17,"./Operator":27,"./utils/assert":43}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
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
        assert_1.assertAstNodeParam(name instanceof _1.Token);
        assert_1.assertAstNodeParam(body instanceof _1.Statement);
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

},{"./":42,"./utils/assert":43}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
const _1 = require("./");
class Comment extends _1.BaseNode {
    constructor(
        /**
         * The comment's complete text as it was in the source code.
         */
        lines) {
        super();
        this.lines = lines;
        assert_1.assertAstNodeParam(Array.isArray(lines));
        lines.forEach(line => assert_1.assertAstNodeParam(line instanceof _1.Token));
    }
}
exports.Comment = Comment;
exports.default = Comment;

},{"./":42,"./utils/assert":43}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IfStatement_1 = require("./IfStatement");
class ElseIfStatement extends IfStatement_1.default {
}
exports.ElseIfStatement = ElseIfStatement;
exports.default = ElseIfStatement;

},{"./IfStatement":23}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Statement_1 = require("./Statement");
class ElseStatement extends Statement_1.default {
}
exports.ElseStatement = ElseStatement;
exports.default = ElseStatement;

},{"./Statement":34}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
const _1 = require("./");
const Statement_1 = require("./Statement");
class ExportStatement extends Statement_1.default {
    constructor(
        /**
         * The identifier to be exported.
         */
        exportedIdentifier) {
        super([exportedIdentifier]);
        this.exportedIdentifier = exportedIdentifier;
        assert_1.assertAstNodeParam(exportedIdentifier instanceof _1.Identifier);
    }
}
exports.ExportStatement = ExportStatement;
exports.default = ExportStatement;

},{"./":42,"./Statement":34,"./utils/assert":43}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
const _1 = require("./");
class Expr extends _1.BaseNode {
    constructor(content = undefined) {
        super();
        this.content = content;
        assert_1.assertAstNodeParam(content instanceof _1.BaseNode ||
            typeof content === 'undefined');
    }
}
/**
 * An expression with no content whatsoever.
 */
// tslint:disable-next-line:variable-name
Expr.Empty = new Expr();
exports.Expr = Expr;
exports.default = Expr;

},{"./":42,"./utils/assert":43}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
const Expr_1 = require("./Expr");
class ExprList extends Expr_1.default {
    constructor(
        /**
         * The actual expressions in the list.
         * The order of this array represents the order that expressions have in source code.
         */
        expressions) {
        super();
        this.expressions = expressions;
        assert_1.assertAstNodeParam(Array.isArray(expressions));
        expressions.forEach(expr => expr instanceof Expr_1.default);
    }
}
exports.ExprList = ExprList;
exports.default = ExprList;

},{"./Expr":17,"./utils/assert":43}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
const Expr_1 = require("./Expr");
const Statement_1 = require("./Statement");
class ExprStatement extends Statement_1.default {
    constructor(
        /**
         * The expression wrapped by this expression statement.
         */
        expression) {
        super([expression]);
        this.expression = expression;
        assert_1.assertAstNodeParam(expression instanceof Expr_1.default);
    }
}
// tslint:disable-next-line:variable-name
ExprStatement.Any = class AnyExprStatement extends ExprStatement {
};
exports.ExprStatement = ExprStatement;
exports.default = ExprStatement;

},{"./Expr":17,"./Statement":34,"./utils/assert":43}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
const Expr_1 = require("./Expr");
const ExprList_1 = require("./ExprList");
const Identifier_1 = require("./Identifier");
class FuncCall extends Expr_1.default {
    constructor(
        /**
         * The identifier that identifies the function that is called.
         */
        identifier, 
        /**
         * The list of parameter values passed to the called function.
         */
        parameterList) {
        super();
        this.identifier = identifier;
        this.parameterList = parameterList;
        assert_1.assertAstNodeParam(identifier instanceof Identifier_1.default);
        assert_1.assertAstNodeParam(parameterList instanceof ExprList_1.default);
    }
}
exports.FuncCall = FuncCall;
exports.default = FuncCall;

},{"./Expr":17,"./ExprList":18,"./Identifier":22,"./utils/assert":43}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
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
        assert_1.assertAstNodeParam(name instanceof _1.Token);
        assert_1.assertAstNodeParam(runtimeParamDecls instanceof _1.ParamDeclList);
        assert_1.assertAstNodeParam(returnTypeDecl instanceof _1.TypeExpr);
        assert_1.assertAstNodeParam(body instanceof _1.Statement);
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

},{"./":42,"./utils/assert":43}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
const _1 = require("./");
class Identifier extends _1.Expr {
    constructor(name) {
        super(name);
        this.name = name;
        assert_1.assertAstNodeParam(name instanceof _1.Token);
    }
}
exports.Identifier = Identifier;
exports.default = Identifier;

},{"./":42,"./utils/assert":43}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
const Statement_1 = require("./Statement");
const Expr_1 = require("./Expr");
class IfStatement extends Statement_1.default {
    constructor(condition, body) {
        super([body]);
        this.condition = condition;
        this.body = body;
        assert_1.assertAstNodeParam(condition instanceof Expr_1.default);
        assert_1.assertAstNodeParam(body instanceof Statement_1.default);
        this.setParentOf(condition, this);
        this.setParentOf(body, this);
    }
}
exports.IfStatement = IfStatement;
exports.default = IfStatement;

},{"./Expr":17,"./Statement":34,"./utils/assert":43}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
const Statement_1 = require("./Statement");
const StringLiteral_1 = require("./StringLiteral");
class ImportStatement extends Statement_1.default {
    constructor(
        /**
         * The path of the file to be imported.
         */
        importPath) {
        super([importPath]);
        this.importPath = importPath;
        assert_1.assertAstNodeParam(importPath instanceof StringLiteral_1.default);
    }
}
exports.ImportStatement = ImportStatement;
exports.default = ImportStatement;

},{"./Statement":34,"./StringLiteral":35,"./utils/assert":43}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
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
        assert_1.assertAstNodeParam(name instanceof _1.Token);
        assert_1.assertAstNodeParam(runtimeParamDecls instanceof _1.ParamDeclList);
        assert_1.assertAstNodeParam(returnTypeDecl instanceof _1.TypeExpr);
        assert_1.assertAstNodeParam(body instanceof _1.Statement);
    }
    /**
     * Returns the class declaration in which a method was defined.
     */
    getClass() {
        if (!(this.parent instanceof _1.Statement)) {
            return undefined;
        }
        return this.parent.parent;
    }
}
exports.MethodDecl = MethodDecl;
exports.default = MethodDecl;

},{"./":42,"./FuncDecl":21,"./utils/assert":43}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
const Expr_1 = require("./Expr");
const Token_1 = require("./Token");
class NumericExpr extends Expr_1.default {
    constructor(contentToken) {
        super(contentToken);
        this.contentToken = contentToken;
        assert_1.assertAstNodeParam(contentToken instanceof Token_1.default);
    }
}
exports.NumericExpr = NumericExpr;
exports.default = NumericExpr;

},{"./Expr":17,"./Token":36,"./utils/assert":43}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
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
        assert_1.assertAstNodeParam(_1.OperatorIdent.isValid(ident));
        assert_1.assertAstNodeParam(text instanceof _1.Token);
    }
}
exports.Operator = Operator;
exports.default = Operator;

},{"./":42,"./utils/assert":43}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Enumerates all operators.
 */
var OperatorIdent;
(function (OperatorIdent) {
    // Access
    OperatorIdent[OperatorIdent["."] = 0] = ".";
    // Assignment
    OperatorIdent[OperatorIdent["="] = 1] = "=";
    // Arithmetic Binary
    OperatorIdent[OperatorIdent["+"] = 2] = "+";
    OperatorIdent[OperatorIdent["-"] = 3] = "-";
    OperatorIdent[OperatorIdent["*"] = 4] = "*";
    OperatorIdent[OperatorIdent["/"] = 5] = "/";
    OperatorIdent[OperatorIdent["%"] = 6] = "%";
    OperatorIdent[OperatorIdent["+="] = 7] = "+=";
    OperatorIdent[OperatorIdent["-="] = 8] = "-=";
    OperatorIdent[OperatorIdent["*="] = 9] = "*=";
    OperatorIdent[OperatorIdent["/="] = 10] = "/=";
    OperatorIdent[OperatorIdent["%="] = 11] = "%=";
    // Unary
    OperatorIdent[OperatorIdent["++"] = 12] = "++";
    OperatorIdent[OperatorIdent["--"] = 13] = "--";
})(OperatorIdent = exports.OperatorIdent || (exports.OperatorIdent = {}));
(function (OperatorIdent) {
    /**
     * Checks if a value is a valid `OperatorIdent` value.
     * @param ident The value to check.
     */
    function isValid(ident) {
        return ident in OperatorIdent;
    }
    OperatorIdent.isValid = isValid;
})(OperatorIdent = exports.OperatorIdent || (exports.OperatorIdent = {}));
exports.default = OperatorIdent;

},{}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
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
        assert_1.assertAstNodeParam(name instanceof _1.Token);
        assert_1.assertAstNodeParam(typeDecl instanceof _1.TypeExpr);
    }
}
exports.ParamDecl = ParamDecl;
exports.default = ParamDecl;

},{"./":42,"./utils/assert":43}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
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
        assert_1.assertAstNodeParam(Array.isArray(decls));
        decls.forEach(decl => assert_1.assertAstNodeParam(decl instanceof _1.ParamDecl));
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

},{"./":42,"./utils/assert":43}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
const Expr_1 = require("./Expr");
/**
 * Used to wrap expressions (that includes all kinds of operations) when they need to be
 * evaluated with precedence over other expressions, just like parens in source code.
 * Type parameter `TExpr` can be used to specify the wrapped expression's type.
 */
class PrecedenceExpr extends Expr_1.default {
    constructor(
        /**
         * The expression that should be evaluated with precedence.
         */
        expr) {
        super(expr);
        this.expr = expr;
        assert_1.assertAstNodeParam(expr instanceof Expr_1.default);
    }
}
exports.PrecedenceExpr = PrecedenceExpr;
exports.default = PrecedenceExpr;

},{"./Expr":17,"./utils/assert":43}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
const _1 = require("./");
class ReturnStatement extends _1.BaseNode {
    constructor(returnValue = _1.Expr.Empty) {
        super();
        this.returnValue = returnValue;
        assert_1.assertAstNodeParam(returnValue instanceof _1.Expr);
    }
}
/**
 * A return statement with no members.
 */
// tslint:disable-next-line:variable-name
ReturnStatement.Empty = new ReturnStatement();
exports.ReturnStatement = ReturnStatement;
exports.default = ReturnStatement;

},{"./":42,"./utils/assert":43}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
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
        assert_1.assertAstNodeParam(typeof name === 'string');
        assert_1.assertAstNodeParam(name.length > 0);
        assert_1.assertAstNodeParam(Array.isArray(items));
        items.forEach(item => assert_1.assertAstNodeParam(item instanceof _1.BaseNode));
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

},{"./":42,"./utils/assert":43}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
const _1 = require("./");
class Statement extends _1.BaseNode {
    constructor(items) {
        super();
        this.items = items;
        assert_1.assertAstNodeParam(Array.isArray(items), 'Invalid Argument for ast.Statement: must be an array');
        items.forEach(item => assert_1.assertAstNodeParam(item instanceof _1.BaseNode));
        items.forEach(item => this.setParentOf(item, this));
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

},{"./":42,"./utils/assert":43}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
const Expr_1 = require("./Expr");
const Token_1 = require("./Token");
class StringLiteral extends Expr_1.default {
    constructor(contentToken) {
        super(contentToken);
        this.contentToken = contentToken;
        assert_1.assertAstNodeParam(contentToken instanceof Token_1.default);
    }
}
exports.StringLiteral = StringLiteral;
exports.default = StringLiteral;

},{"./Expr":17,"./Token":36,"./utils/assert":43}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
const _1 = require("./");
class Token extends _1.BaseNode {
    constructor(
        /**
         * The raw value of this token in source code.
         */
        rawValue) {
        super();
        this.rawValue = rawValue;
        assert_1.assertAstNodeParam(typeof rawValue === 'string');
    }
}
/**
 * A token with no content whatsoever.
 */
// tslint:disable-next-line:variable-name
Token.Empty = new Token('');
exports.Token = Token;
exports.default = Token;

},{"./":42,"./utils/assert":43}],37:[function(require,module,exports){
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

},{"./":42}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
const _1 = require("./");
class UnaryOperation extends _1.Expr {
    constructor(operand, operator, operatorPosition) {
        super();
        this.operand = operand;
        this.operator = operator;
        this.operatorPosition = operatorPosition;
        assert_1.assertAstNodeParam(operand instanceof _1.Expr);
        assert_1.assertAstNodeParam(operator instanceof _1.Operator);
        assert_1.assertAstNodeParam(_1.UnaryOperatorPosition.isValid(operatorPosition));
    }
}
exports.UnaryOperation = UnaryOperation;
exports.default = UnaryOperation;

},{"./":42,"./utils/assert":43}],39:[function(require,module,exports){
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
(function (UnaryOperatorPosition) {
    /**
     * Checks if a value is a valid `UnaryOperatorPosition`.
     * @param position The value to check.
     */
    function isValid(position) {
        return position in UnaryOperatorPosition;
    }
    UnaryOperatorPosition.isValid = isValid;
})(UnaryOperatorPosition = exports.UnaryOperatorPosition || (exports.UnaryOperatorPosition = {}));
exports.default = UnaryOperatorPosition;

},{}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
const _1 = require("./");
class VarDecl extends _1.BaseNode {
    /**
     * Creates a new `VarDecl` instance.
     */
    constructor(
        /**
         * The modifiers with which the variable was declared.
         */
        modifiers, 
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
        this.modifiers = modifiers;
        this.name = name;
        this.typeDecl = typeDecl;
        this.assignment = assignment;
        // validate the var declaration modifiers
        _1.VarDeclModifier.throwUnlessCombinationLegal(this.modifiers);
        assert_1.assertAstNodeParam(name instanceof _1.Token);
        assert_1.assertAstNodeParam(typeDecl instanceof _1.TypeExpr);
        assert_1.assertAstNodeParam(assignment instanceof _1.Expr);
    }
    /**
     * Creates a new `VarDecl` instance.
     * @param params Parameters for the function declaration.
     */
    static create(params) {
        return new VarDecl(params.modifiers, params.varName, params.typeDecl, params.assignment);
    }
}
exports.VarDecl = VarDecl;
exports.default = VarDecl;

},{"./":42,"./utils/assert":43}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Enumerates all available modifiers for variable declarations.
 * Bitmask.
 */
var VarDeclModifier;
(function (VarDeclModifier) {
    VarDeclModifier[VarDeclModifier["None"] = 0] = "None";
    VarDeclModifier[VarDeclModifier["Let"] = 1] = "Let";
    VarDeclModifier[VarDeclModifier["Const"] = 2] = "Const";
    VarDeclModifier[VarDeclModifier["Static"] = 4] = "Static";
})(VarDeclModifier = exports.VarDeclModifier || (exports.VarDeclModifier = {}));
(function (VarDeclModifier) {
    /**
     * Contains all illegal combinations of var declaration modifiers.
     * @internal
     */
    const illegalCombinations = [
        VarDeclModifier.None,
        VarDeclModifier.Let | VarDeclModifier.Const,
        VarDeclModifier.Let | VarDeclModifier.Const | VarDeclModifier.Static
    ];
    /**
     * Checks if a certain combination of var declaration modifiers is legal.
     * Returns `true` when the combination is legal, `false` when it's not.
     * @param combination The modifier combination to check.
     */
    function isCombinationLegal(combination) {
        return illegalCombinations.indexOf(combination) === -1;
    }
    VarDeclModifier.isCombinationLegal = isCombinationLegal;
    /**
     * Returns a human readable name for a var declaration modifier.
     * @param modifier The modifier to return a human readable name for.
     */
    function getVarDeclModifierAsText(modifier) {
        if (typeof modifier === 'string') {
            return modifier;
        }
        return VarDeclModifier[modifier];
    }
    VarDeclModifier.getVarDeclModifierAsText = getVarDeclModifierAsText;
    /**
     * Returns a human readable version of a var declaration modifier combination.
     * @param combination The modifier combination to return a human readable version of.
     */
    function getVarDeclModifierCombinationAsText(combination) {
        if (typeof combination !== 'number' || combination === VarDeclModifier.None) {
            return '{EMPTY}';
        }
        const modifierNames = [];
        for (let modifier in VarDeclModifier) {
            if (typeof modifier !== 'number') {
                continue;
            }
            modifierNames.push(getVarDeclModifierAsText(modifier));
        }
        return `{${modifierNames.join(', ')}}`;
    }
    VarDeclModifier.getVarDeclModifierCombinationAsText = getVarDeclModifierCombinationAsText;
    /**
     * Throws an error if a var declaration modifier combination is illegal.
     * Does nothing if the combination is legal.
     * @throws
     * @param combination The modifier combination to check.
     */
    function throwUnlessCombinationLegal(combination) {
        if (isCombinationLegal(combination)) {
            return;
        }
        const combinationString = getVarDeclModifierCombinationAsText(combination);
        throw new Error(`Illegal VarDeclModifier combination: ${combinationString}`);
    }
    VarDeclModifier.throwUnlessCombinationLegal = throwUnlessCombinationLegal;
    /**
     * Combines multiple var declaration modifiers and returns the combination.
     * @throws
     * @param firstModifier
     * @param modifiers
     */
    function combine(firstModifier, ...modifiers) {
        modifiers.unshift(firstModifier);
        // calculate the combination
        let combination = 0;
        for (let modifier of modifiers) {
            combination |= modifier;
        }
        // validate the combination before returning it
        throwUnlessCombinationLegal(combination);
        return combination;
    }
    VarDeclModifier.combine = combine;
    /**
     * Checks if two var declaration modifier combinations are equal.
     * @param combinationA The var declaration modifier combination to compare with `combinationB`.
     * @param combinationB The var declaration modifier combination to compare with `combinationA`.
     * @return Returns `true` when `combinationA` and `combinationB` are equal, `false` if not.
     */
    function areCombinationsEqual(combinationA, combinationB) {
        return combinationA === combinationB;
    }
    VarDeclModifier.areCombinationsEqual = areCombinationsEqual;
    /**
     * Checks whether a var declaration modifier combination contains a certain var
     * declaration modifier.
     * @param combination The combination to search `modifier` in.
     * @param modifier The modifier to search in `combination`.
     */
    function doesCombinationContain(combination, modifier) {
        return (combination & modifier) !== 0;
    }
    VarDeclModifier.doesCombinationContain = doesCombinationContain;
})(VarDeclModifier = exports.VarDeclModifier || (exports.VarDeclModifier = {}));
exports.default = VarDeclModifier;

},{}],42:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/// AST Node Types
__export(require("./BaseNode"));
__export(require("./BinaryOperation"));
__export(require("./ClassDecl"));
__export(require("./Comment"));
__export(require("./ElseIfStatement"));
__export(require("./ElseStatement"));
__export(require("./ExportStatement"));
__export(require("./Expr"));
__export(require("./ExprList"));
__export(require("./ExprStatement"));
__export(require("./FuncCall"));
__export(require("./FuncDecl"));
__export(require("./Identifier"));
__export(require("./IfStatement"));
__export(require("./ImportStatement"));
__export(require("./MethodDecl"));
__export(require("./NumericExpr"));
__export(require("./Operator"));
__export(require("./OperatorIdent"));
__export(require("./ParamDecl"));
__export(require("./ParamDeclList"));
__export(require("./PrecedenceExpr"));
__export(require("./ReturnStatement"));
__export(require("./SourceUnit"));
__export(require("./Statement"));
__export(require("./StringLiteral"));
__export(require("./Token"));
__export(require("./TypeExpression"));
__export(require("./UnaryOperation"));
__export(require("./UnaryOperatorPosition"));
__export(require("./VarDecl"));
__export(require("./VarDeclModifier"));

},{"./BaseNode":10,"./BinaryOperation":11,"./ClassDecl":12,"./Comment":13,"./ElseIfStatement":14,"./ElseStatement":15,"./ExportStatement":16,"./Expr":17,"./ExprList":18,"./ExprStatement":19,"./FuncCall":20,"./FuncDecl":21,"./Identifier":22,"./IfStatement":23,"./ImportStatement":24,"./MethodDecl":25,"./NumericExpr":26,"./Operator":27,"./OperatorIdent":28,"./ParamDecl":29,"./ParamDeclList":30,"./PrecedenceExpr":31,"./ReturnStatement":32,"./SourceUnit":33,"./Statement":34,"./StringLiteral":35,"./Token":36,"./TypeExpression":37,"./UnaryOperation":38,"./UnaryOperatorPosition":39,"./VarDecl":40,"./VarDeclModifier":41}],43:[function(require,module,exports){
///
/// ast/utils/assert.ts
/// Utilities for assertions in the AST module.
///
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@/utils");
/**
 * An exception that is thrown if an AST node parameter assertion fails.
 */
class AstNodeParamAssertionException extends Error {
}
exports.AstNodeParamAssertionException = AstNodeParamAssertionException;
/**
 * Asserts a parameter value passed to an AST node.
 * Throws an `AssertionException` if `condition` is not `true`.
 * @param condition The condition to assert.
 * @param message Optional message parts to be included in the `AssertionException`'s message if the assertion fails.
 * @throws AssertionException
 */
function assertAstNodeParam(condition, ...message) {
    utils_1.configurableAssert(condition, errorMessage => {
        return new AstNodeParamAssertionException(errorMessage);
    }, 'AST node parameter assertion failed.', ...message);
}
exports.assertAstNodeParam = assertAstNodeParam;

},{"@/utils":5}],44:[function(require,module,exports){
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

},{}],45:[function(require,module,exports){
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

},{"./BaseGenerator":44,"./factory":46}],46:[function(require,module,exports){
///
/// factory.ts
/// Functions to register and instantiate EcmaScript code generators.
///
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FactoryRegistry_1 = require("../../utils/FactoryRegistry");
/**
 * The factory registry used to instantiate code generators.
 * @internal
 */
const factory = FactoryRegistry_1.FactoryRegistry.create();
/**
 * Class decorator used to register a code generator.
 * @param ratingFunc A function that determines how relevant the registered code
 *                   generator is for any given AST node. The higher the rating
 *                   that this function returns, the more likely the code
 *                   generator is to be used for a given AST node.
 */
exports.register = factory.registerClass.bind(factory);
/**
 * Finds the best matching code generator for the given AST node, then attempts
 * to instantiate such a code generator.
 * Throws if no matching code generator could be found.
 * @throws
 * @param astNode The AST node to instantiate a code generator for.
 * @return The code generator created for the given AST node.
 */
exports.createForAstNode = factory.create.bind(factory);

},{"../../utils/FactoryRegistry":77}],47:[function(require,module,exports){
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

},{"../BaseGenerator":44,"../factory":46}],48:[function(require,module,exports){
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
let BinaryOperationCodeGenerator = class BinaryOperationCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        let operatorCode = factory_1.createForAstNode(astNode.operator).toString();
        if (operatorCode !== '.') {
            operatorCode = ` ${operatorCode} `;
        }
        return [
            factory_1.createForAstNode(astNode.leftOperand),
            operatorCode,
            factory_1.createForAstNode(astNode.rightOperand)
        ].join('');
    }
};
BinaryOperationCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.BinaryOperation ? 1 : 0)
], BinaryOperationCodeGenerator);
exports.BinaryOperationCodeGenerator = BinaryOperationCodeGenerator;

},{"../BaseGenerator":44,"../factory":46,"@/compiler/ast":2}],49:[function(require,module,exports){
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
        const instanceVarDecls = astNode.body.nodes.filter(node => (node instanceof ast_1.VarDecl &&
            !ast_1.VarDeclModifier.doesCombinationContain(node.modifiers, ast_1.VarDeclModifier.Static)));
        const staticVarDecls = astNode.body.nodes.filter(node => (node instanceof ast_1.VarDecl &&
            ast_1.VarDeclModifier.doesCombinationContain(node.modifiers, ast_1.VarDeclModifier.Static)));
        const methodDecls = astNode.body.nodes.filter(node => (node instanceof ast_1.MethodDecl));
        return `
		/** @class ${className} */
		var ${className} = (function() {
			/** @constructor */
			function ${className}() {
				${instanceVarDecls.map(factory_1.createForAstNode).join('')}
			}

			${staticVarDecls.map(factory_1.createForAstNode).join('')}

			${methodDecls.map(factory_1.createForAstNode).join('')}

			return ${className};
		})();

		`;
    }
};
ClassDeclCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.ClassDecl ? Infinity : 0)
], ClassDeclCodeGenerator);
exports.ClassDeclCodeGenerator = ClassDeclCodeGenerator;

},{"../BaseGenerator":44,"../factory":46,"@/compiler/ast":2}],50:[function(require,module,exports){
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
        const isStatic = ast_1.VarDeclModifier.doesCombinationContain(astNode.modifiers, ast_1.VarDeclModifier.Static);
        if (isStatic) {
            return this.generateStaticVarDeclarationKeyword(astNode);
        }
        else {
            return this.generateInstanceVarDeclarationKeyword();
        }
    }
    generateInstanceVarDeclarationKeyword() {
        return 'this.';
    }
    generateStaticVarDeclarationKeyword(astNode) {
        const varName = astNode.name.rawValue;
        const classDecl = astNode.parent.parent;
        if (!(classDecl instanceof ast_1.ClassDecl)) {
            throw new Error(`cannot find class for static var decl '${varName}'`);
        }
        const className = classDecl.name.rawValue;
        return `${className}.`;
    }
};
ClassVarDeclCodeGenerator = __decorate([
    factory_1.register(node => (node instanceof ast_1.VarDecl &&
        node.parent instanceof ast_1.Statement &&
        node.parent.parent instanceof ast_1.ClassDecl) ? 10 : 0)
], ClassVarDeclCodeGenerator);
exports.ClassVarDeclCodeGenerator = ClassVarDeclCodeGenerator;

},{"../factory":46,"./VarDeclCodeGenerator":72,"@/compiler/ast":2}],51:[function(require,module,exports){
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

},{"../BaseGenerator":44,"../factory":46,"@/compiler/ast":2}],52:[function(require,module,exports){
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

},{"../factory":46,"./BaseConditionalStatementCodeGenerator":47,"@/compiler/ast":2}],53:[function(require,module,exports){
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

},{"../BaseGenerator":44,"../factory":46,"@/compiler/ast":2}],54:[function(require,module,exports){
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

},{"../BaseGenerator":44,"../factory":46,"@/compiler/ast":2}],55:[function(require,module,exports){
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
let ExportStatementCodeGenerator = class ExportStatementCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        const exportedName = astNode.exportedIdentifier.name.rawValue;
        return `exports['${exportedName}'] = ${exportedName};\n`;
    }
};
ExportStatementCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.ExportStatement ? Infinity : 0)
], ExportStatementCodeGenerator);
exports.ExportStatementCodeGenerator = ExportStatementCodeGenerator;

},{"../BaseGenerator":44,"../factory":46,"@/compiler/ast":2}],56:[function(require,module,exports){
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
        if (typeof astNode.content !== 'string') {
            return '';
        }
        return astNode.content.toString();
    }
};
ExprCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.Expr ? 1 : 0)
], ExprCodeGenerator);
exports.ExprCodeGenerator = ExprCodeGenerator;

},{"../BaseGenerator":44,"../factory":46,"@/compiler/ast":2}],57:[function(require,module,exports){
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
let ExprListCodeGenerator = class ExprListCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        return astNode.expressions.map(factory_1.createForAstNode).join(', ');
    }
};
ExprListCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.ExprList ? Infinity : 0)
], ExprListCodeGenerator);
exports.ExprListCodeGenerator = ExprListCodeGenerator;

},{"../BaseGenerator":44,"../factory":46,"@/compiler/ast":2}],58:[function(require,module,exports){
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

},{"../BaseGenerator":44,"../factory":46,"@/compiler/ast":2}],59:[function(require,module,exports){
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
let ExprListCodeGenerator = class ExprListCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        return [
            factory_1.createForAstNode(astNode.identifier),
            '(', factory_1.createForAstNode(astNode.parameterList), ')'
        ];
    }
};
ExprListCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.FuncCall ? Infinity : 0)
], ExprListCodeGenerator);
exports.ExprListCodeGenerator = ExprListCodeGenerator;

},{"../BaseGenerator":44,"../factory":46,"@/compiler/ast":2}],60:[function(require,module,exports){
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
    factory_1.register(node => (node instanceof ast_1.FuncDecl && !(node instanceof ast_1.MethodDecl)
        ? Infinity
        : 0))
], FuncDeclCodeGenerator);
exports.FuncDeclCodeGenerator = FuncDeclCodeGenerator;

},{"../BaseGenerator":44,"../factory":46,"@/compiler/ast":2}],61:[function(require,module,exports){
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

},{"../factory":46,"./BaseConditionalStatementCodeGenerator":47,"@/compiler/ast":2}],62:[function(require,module,exports){
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
let ImportStatementCodeGenerator = class ImportStatementCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        const importPath = astNode.importPath.contentToken.rawValue;
        return [
            `var __import = require('${importPath}');`,
            'for (var key in __import) global[key] = __import[key];',
            // append an extra line so generated code is easier to read:
            ''
        ].join('\n');
    }
};
ImportStatementCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.ImportStatement ? Infinity : 0)
], ImportStatementCodeGenerator);
exports.ImportStatementCodeGenerator = ImportStatementCodeGenerator;

},{"../BaseGenerator":44,"../factory":46,"@/compiler/ast":2}],63:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const FuncDeclCodeGenerator_1 = require("./FuncDeclCodeGenerator");
const factory_1 = require("../factory");
const ast_1 = require("@/compiler/ast");
let MethodDeclCodeGenerator = class MethodDeclCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        const methodName = astNode.name.rawValue;
        const classDecl = astNode.getClass();
        if (!(classDecl instanceof ast_1.ClassDecl)) {
            throw new Error(`cannot find class for method '${methodName}'`);
        }
        const className = classDecl.name.rawValue;
        return [
            `${className}.prototype.${methodName} = `,
            new FuncDeclCodeGenerator_1.FuncDeclCodeGenerator(astNode).generateCode().trim(),
            '\n'
        ].join('');
    }
};
MethodDeclCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.MethodDecl ? Infinity : 0)
], MethodDeclCodeGenerator);
exports.MethodDeclCodeGenerator = MethodDeclCodeGenerator;

},{"../BaseGenerator":44,"../factory":46,"./FuncDeclCodeGenerator":60,"@/compiler/ast":2}],64:[function(require,module,exports){
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
let OperatorCodeGenerator = class OperatorCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        if (typeof astNode.ident === 'string') {
            return astNode.ident;
        }
        return ast_1.OperatorIdent[astNode.ident];
    }
};
OperatorCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.Operator ? 1 : 0)
], OperatorCodeGenerator);
exports.OperatorCodeGenerator = OperatorCodeGenerator;

},{"../BaseGenerator":44,"../factory":46,"@/compiler/ast":2}],65:[function(require,module,exports){
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

},{"../BaseGenerator":44,"../factory":46,"@/compiler/ast":2}],66:[function(require,module,exports){
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
let PrecedenceExprCodeGenerator = class PrecedenceExprCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        return ['(', factory_1.createForAstNode(astNode.expr), ')'];
    }
};
PrecedenceExprCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.PrecedenceExpr ? Infinity : 0)
], PrecedenceExprCodeGenerator);
exports.PrecedenceExprCodeGenerator = PrecedenceExprCodeGenerator;

},{"../BaseGenerator":44,"../factory":46,"@/compiler/ast":2}],67:[function(require,module,exports){
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
        return `return ${factory_1.createForAstNode(astNode.returnValue)};\n`;
    }
};
ReturnStatementCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.ReturnStatement ? Infinity : 0)
], ReturnStatementCodeGenerator);
exports.ReturnStatementCodeGenerator = ReturnStatementCodeGenerator;

},{"../BaseGenerator":44,"../factory":46,"@/compiler/ast":2}],68:[function(require,module,exports){
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

},{"../BaseGenerator":44,"../factory":46,"@/compiler/ast":2}],69:[function(require,module,exports){
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
let StringLiteralCodeGenerator = class StringLiteralCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        return `"${astNode.contentToken.rawValue}"`;
    }
};
StringLiteralCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.StringLiteral ? Infinity : 0)
], StringLiteralCodeGenerator);
exports.StringLiteralCodeGenerator = StringLiteralCodeGenerator;

},{"../BaseGenerator":44,"../factory":46,"@/compiler/ast":2}],70:[function(require,module,exports){
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
let TokenCodeGenerator = class TokenCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        return astNode.rawValue;
    }
};
TokenCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.Token ? 1 : 0)
], TokenCodeGenerator);
exports.TokenCodeGenerator = TokenCodeGenerator;

},{"../BaseGenerator":44,"../factory":46,"@/compiler/ast":2}],71:[function(require,module,exports){
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
let UnaryOperationCodeGenerator = class UnaryOperationCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        const parts = [
            factory_1.createForAstNode(astNode.operand),
            factory_1.createForAstNode(astNode.operator)
        ];
        // The `parts` array is in `Postfix` order by default. We need to reverse it if
        // the operation's order is `Prefix`, otherwise we can just return the array.
        if (astNode.operatorPosition === ast_1.UnaryOperatorPosition.Prefix) {
            return parts.reverse();
        }
        return parts;
    }
};
UnaryOperationCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.UnaryOperation ? Infinity : 0)
], UnaryOperationCodeGenerator);
exports.UnaryOperationCodeGenerator = UnaryOperationCodeGenerator;

},{"../BaseGenerator":44,"../factory":46,"@/compiler/ast":2}],72:[function(require,module,exports){
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

},{"../BaseGenerator":44,"../factory":46,"@/compiler/ast":2}],73:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./BaseConditionalStatementCodeGenerator");
require("./BinaryOperationCodeGenerator");
require("./ClassDeclCodeGenerator");
require("./ClassVarDeclCodeGenerator");
require("./CommentCodeGenerator");
require("./ElseIfStatementCodeGenerator");
require("./ElseStatementCodeGenerator");
require("./EmptyStatementCodeGenerator");
require("./ExportStatementCodeGenerator");
require("./ExprCodeGenerator");
require("./ExprListCodeGenerator");
require("./ExprStatementCodeGenerator");
require("./FuncCallCodeGenerator");
require("./FuncDeclCodeGenerator");
require("./IfStatementCodeGenerator");
require("./ImportStatementCodeGenerator");
require("./MethodDeclCodeGenerator");
require("./OperatorCodeGenerator");
require("./ParamDeclListCodeGenerator");
require("./PrecedenceExprCodeGenerator");
require("./ReturnStatementCodeGenerator");
require("./StatementCodeGenerator");
require("./StringLiteralCodeGenerator");
require("./TokenCodeGenerator");
require("./UnaryOperationCodeGenerator");
require("./VarDeclCodeGenerator");

},{"./BaseConditionalStatementCodeGenerator":47,"./BinaryOperationCodeGenerator":48,"./ClassDeclCodeGenerator":49,"./ClassVarDeclCodeGenerator":50,"./CommentCodeGenerator":51,"./ElseIfStatementCodeGenerator":52,"./ElseStatementCodeGenerator":53,"./EmptyStatementCodeGenerator":54,"./ExportStatementCodeGenerator":55,"./ExprCodeGenerator":56,"./ExprListCodeGenerator":57,"./ExprStatementCodeGenerator":58,"./FuncCallCodeGenerator":59,"./FuncDeclCodeGenerator":60,"./IfStatementCodeGenerator":61,"./ImportStatementCodeGenerator":62,"./MethodDeclCodeGenerator":63,"./OperatorCodeGenerator":64,"./ParamDeclListCodeGenerator":65,"./PrecedenceExprCodeGenerator":66,"./ReturnStatementCodeGenerator":67,"./StatementCodeGenerator":68,"./StringLiteralCodeGenerator":69,"./TokenCodeGenerator":70,"./UnaryOperationCodeGenerator":71,"./VarDeclCodeGenerator":72}],74:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// Make sure all concrete generators are imported.
// Since they register themselves using the `factory.ts` functions, there's
// no need to interact with them here in any other way.
require("./generator/");
// Import and export the public types in this module.
__export(require("./CodeGenerator"));

},{"./CodeGenerator":45,"./generator/":73}],75:[function(require,module,exports){
(function (process){
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
var generatedParser = (function () {
    var o = function (k, v, o, l) { for (o = o || {}, l = k.length; l--; o[k[l]] = v)
        ; return o; }, $V0 = [1, 15], $V1 = [1, 16], $V2 = [1, 10], $V3 = [1, 17], $V4 = [1, 18], $V5 = [1, 13], $V6 = [1, 14], $V7 = [1, 8], $V8 = [1, 4, 5, 10, 88, 100, 104, 105, 107], $V9 = [1, 22], $Va = [4, 5], $Vb = [1, 27], $Vc = [1, 29], $Vd = [1, 4, 5, 10, 12, 13, 17, 47, 48, 50, 60, 62, 68, 72, 74, 75, 82, 88, 100, 104, 105, 107], $Ve = [2, 102], $Vf = [1, 33], $Vg = [18, 53], $Vh = [2, 95], $Vi = [1, 36], $Vj = [2, 4], $Vk = [1, 39], $Vl = [4, 5, 10, 12, 13, 17, 18, 20, 21, 22, 23, 24, 25, 47, 48, 50, 53, 60, 62, 68, 71, 72, 74, 75, 82, 88], $Vm = [2, 104], $Vn = [1, 44], $Vo = [1, 46], $Vp = [10, 72, 74, 75, 82, 88], $Vq = [1, 54], $Vr = [1, 4, 5, 10, 72, 74, 75, 82, 88, 100, 104, 105, 107], $Vs = [1, 70], $Vt = [1, 71], $Vu = [4, 10, 72, 74, 75, 82, 88], $Vv = [10, 12, 13, 17, 47, 48, 50, 60, 68, 72, 74, 75], $Vw = [1, 78], $Vx = [1, 111], $Vy = [1, 112], $Vz = [1, 95], $VA = [1, 106], $VB = [1, 96], $VC = [1, 92], $VD = [4, 10, 12, 13, 17, 47, 48, 50, 60, 68, 72, 74, 75], $VE = [4, 5, 10, 12, 13, 17, 47, 48, 50, 60, 62, 68, 72, 74, 75, 82, 88], $VF = [2, 87], $VG = [1, 114], $VH = [4, 5, 10, 12, 13, 17, 31, 47, 48, 50, 60, 62, 68, 72, 74, 75, 82, 88], $VI = [4, 5, 10, 72, 74, 75, 82, 88], $VJ = [4, 5, 10, 12, 13, 17, 47, 48, 50, 60, 62, 68, 72, 74, 75], $VK = [10, 12, 13, 17, 47, 48, 50, 60, 62, 68, 72, 74, 75], $VL = [1, 121], $VM = [1, 124], $VN = [4, 5, 10, 12, 13, 17, 18, 47, 48, 50, 53, 60, 62, 68, 72, 74, 75], $VO = [1, 128], $VP = [1, 129], $VQ = [1, 130], $VR = [1, 131], $VS = [1, 132], $VT = [1, 133], $VU = [2, 48], $VV = [2, 39], $VW = [2, 45], $VX = [2, 14], $VY = [2, 24], $VZ = [12, 13, 17, 47, 48, 50], $V_ = [1, 175], $V$ = [20, 21, 22, 23, 24, 25, 53], $V01 = [4, 5, 10, 12, 13, 17, 18, 47, 48, 50, 53, 60, 62, 68, 71, 72, 74, 75, 82, 88];
    var parser = { trace: function trace() { },
        yy: {},
        symbols_: { "error": 2, "nl_or_eof": 3, "NL": 4, "EOF": 5, "maybe_nl": 6, "maybe_nls": 7, "maybe_nl_or_eof": 8, "comment": 9, "SL_COMMENT": 10, "unary_operator": 11, "INC_OP": 12, "DEC_OP": 13, "atomic_unary_operation": 14, "primary_expr": 15, "unary_operation": 16, "(": 17, ")": 18, "binary_operator": 19, ".": 20, "+": 21, "-": 22, "*": 23, "/": 24, "%": 25, "atomic_binary_operation": 26, "expression": 27, "precedence_expr_list": 28, "binary_operation": 29, "assignment_operator": 30, "=": 31, "MUL_ASSIGN": 32, "DIV_ASSIGN": 33, "MOD_ASSIGN": 34, "ADD_ASSIGN": 35, "SUB_ASSIGN": 36, "LEFT_ASSIGN": 37, "RIGHT_ASSIGN": 38, "AND_ASSIGN": 39, "XOR_ASSIGN": 40, "OR_ASSIGN": 41, "atomic_assignment_expr": 42, "identifier": 43, "assignment_expr": 44, "func_call_expr": 45, "string_literal": 46, "STRING_LITERAL": 47, "IDENTIFIER": 48, "atomic_primary_expr": 49, "CONSTANT": 50, "operation": 51, "expr_list": 52, ",": 53, "expression_statement": 54, "type_expr": 55, "conditional_body": 56, "statement": 57, "compound_statement": 58, "conditional_if_statement": 59, "IF": 60, "conditional_else_if_statement": 61, "ELSE": 62, "conditional_maybe_else_if_statements": 63, "conditional_else_statement": 64, "conditional_maybe_else_statement": 65, "conditional_statement": 66, "return_statement": 67, "RETURN": 68, "var_decl": 69, "statements": 70, "{": 71, "}": 72, "var_decl_modifier": 73, "LET": 74, "CONST": 75, "var_decl_type_decl": 76, ":": 77, "var_decl_name_and_maybe_type_decl": 78, "var_decl_maybe_assignment": 79, "var_decl_end": 80, "static_var_decl_modifier": 81, "STATIC": 82, "static_var_decl": 83, "param_decl_type_expr": 84, "param_decl": 85, "param_decl_list": 86, "func_ident": 87, "FUNCTION": 88, "func_param_decl_list": 89, "func_return_expr": 90, "ARR": 91, "func_body": 92, "func_decl_end": 93, "func_decl": 94, "method_decl": 95, "class_body_statement": 96, "class_body_statements": 97, "class_body_compound_statement": 98, "class_ident": 99, "CLASS": 100, "class_body": 101, "class_decl": 102, "import_statement": 103, "IMPORT": 104, "EXPORT": 105, "root_grammar": 106, "export_statement": 107, "root_grammar_list": 108, "root": 109, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 4: "NL", 5: "EOF", 10: "SL_COMMENT", 12: "INC_OP", 13: "DEC_OP", 17: "(", 18: ")", 20: ".", 21: "+", 22: "-", 23: "*", 24: "/", 25: "%", 31: "=", 32: "MUL_ASSIGN", 33: "DIV_ASSIGN", 34: "MOD_ASSIGN", 35: "ADD_ASSIGN", 36: "SUB_ASSIGN", 37: "LEFT_ASSIGN", 38: "RIGHT_ASSIGN", 39: "AND_ASSIGN", 40: "XOR_ASSIGN", 41: "OR_ASSIGN", 47: "STRING_LITERAL", 48: "IDENTIFIER", 50: "CONSTANT", 53: ",", 60: "IF", 62: "ELSE", 68: "RETURN", 71: "{", 72: "}", 74: "LET", 75: "CONST", 77: ":", 82: "STATIC", 88: "FUNCTION", 91: "ARR", 100: "CLASS", 104: "IMPORT", 105: "EXPORT", 107: "export_statement" },
        productions_: [0, [3, 1], [3, 1], [6, 1], [6, 0], [7, 1], [7, 2], [8, 1], [8, 1], [9, 2], [11, 1], [11, 1], [14, 2], [14, 2], [16, 1], [16, 3], [19, 1], [19, 1], [19, 1], [19, 1], [19, 1], [19, 1], [26, 3], [26, 3], [29, 1], [29, 3], [30, 1], [30, 1], [30, 1], [30, 1], [30, 1], [30, 1], [30, 1], [30, 1], [30, 1], [30, 1], [30, 1], [42, 3], [42, 3], [44, 1], [44, 3], [45, 3], [45, 2], [46, 1], [43, 1], [49, 1], [49, 1], [49, 1], [15, 1], [15, 3], [51, 1], [51, 1], [27, 1], [27, 1], [27, 1], [27, 1], [52, 1], [52, 3], [28, 3], [54, 2], [54, 2], [55, 1], [56, 1], [56, 1], [59, 4], [61, 5], [63, 1], [63, 2], [64, 3], [65, 1], [65, 1], [66, 4], [67, 3], [57, 1], [57, 1], [57, 1], [57, 1], [57, 1], [70, 1], [70, 2], [58, 5], [73, 1], [73, 1], [76, 2], [76, 0], [78, 2], [79, 2], [79, 0], [80, 1], [69, 4], [81, 2], [81, 2], [83, 4], [84, 2], [84, 0], [85, 0], [85, 2], [86, 1], [86, 3], [87, 2], [89, 3], [90, 2], [90, 0], [92, 1], [92, 0], [93, 1], [94, 5], [95, 5], [96, 1], [96, 1], [96, 1], [96, 1], [97, 1], [97, 2], [98, 5], [99, 2], [101, 1], [101, 0], [102, 3], [103, 3], [103, 3], [106, 1], [106, 1], [106, 1], [106, 1], [106, 1], [106, 1], [108, 1], [108, 2], [109, 1]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
            /* this == yyval */
            var $0 = $$.length - 1;
            switch (yystate) {
                case 9:
                    this.$ = new yy.Comment([new yy.Token($$[$0 - 1])]);
                    break;
                case 10:
                case 11:
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                case 21:
                case 26:
                case 27:
                case 28:
                case 29:
                case 30:
                case 31:
                case 32:
                case 33:
                case 34:
                case 35:
                case 36:
                    this.$ = yy.getOperatorFromToken($$[$0]);
                    break;
                case 12:
                    this.$ = new yy.UnaryOperation($$[$0 - 1], $$[$0], yy.UnaryOperatorPosition.Postfix);
                    break;
                case 13:
                    this.$ = new yy.UnaryOperation($$[$0], $$[$0 - 1], yy.UnaryOperatorPosition.Prefix);
                    break;
                case 14:
                case 24:
                case 39:
                case 45:
                case 47:
                case 48:
                case 50:
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 83:
                case 93:
                case 101:
                case 103:
                case 116:
                case 127:
                    this.$ = $$[$0];
                    break;
                case 15:
                case 25:
                case 40:
                case 49:
                    this.$ = new yy.PrecedenceExpr($$[$0 - 1]);
                    break;
                case 22:
                case 23:
                case 37:
                case 38:
                    this.$ = new yy.BinaryOperation($$[$0 - 2], $$[$0 - 1], $$[$0]);
                    break;
                case 41:
                    this.$ = new yy.FuncCall($$[$0 - 2], new yy.ExprList([]));
                    break;
                case 42:
                    var params;
                    if ($$[$0].expr instanceof yy.ExprList) {
                        params = new yy.ExprList($$[$0].expr.expressions);
                    }
                    else {
                        params = new yy.ExprList([$$[$0].expr]);
                    }
                    this.$ = new yy.FuncCall($$[$0 - 1], params);
                    break;
                case 43:
                    /*
                        We replace the quotes by slicing them away. This is trivial since the quotes
                        are *always* the first and last character in the `STRING_LITERAL` terminal.
                        The `.trim()` before the `.slice(...)` shouldn't be necessary, but we're
                        rather safe than sorry.
                    */
                    var content = new yy.Token(($$[$0]).trim().slice(1, -1));
                    this.$ = new yy.StringLiteral(content);
                    break;
                case 44:
                    this.$ = new yy.Identifier(new yy.Token($$[$0]));
                    break;
                case 46:
                    this.$ = new yy.NumericExpr(new yy.Token($$[$0]));
                    break;
                case 56:
                    const exprs = [];
                    if (typeof $$[$0] !== 'undefined') {
                        exprs.push($$[$0]);
                    }
                    this.$ = new yy.ExprList(exprs);
                    break;
                case 57:
                    this.$ = new yy.ExprList($$[$0 - 2].expressions.concat($$[$0]));
                    break;
                case 58:
                    if ($$[$0 - 1].expressions.length === 1) {
                        this.$ = new yy.PrecedenceExpr($$[$0 - 1].expressions[0]);
                    }
                    else {
                        this.$ = new yy.PrecedenceExpr($$[$0 - 1]);
                    }
                    break;
                case 59:
                    if ($$[$0 - 1].expressions.length === 1) {
                        this.$ = new yy.ExprStatement($$[$0 - 1].expressions[0]);
                    }
                    else {
                        this.$ = new yy.ExprStatement($$[$0 - 1]);
                    }
                    break;
                case 60:
                    this.$ = new yy.ExprStatement($$[$0 - 1]);
                    break;
                case 61:
                    this.$ = yy.TypeExpr.fromIdentifier(new yy.Token($$[$0]));
                    break;
                case 64:
                    this.$ = new yy.IfStatement($$[$0 - 2], $$[$0 - 1]);
                    break;
                case 65:
                    this.$ = new yy.ElseIfStatement($$[$0 - 2], $$[$0 - 1]);
                    break;
                case 67:
                    this.$ = $$[$0 - 1] || [];
                    if (typeof $$[$0] !== 'undefined') {
                        this.$ = this.$.concat($$[$0]);
                    }
                    break;
                case 68:
                    this.$ = new yy.ElseStatement([$$[$0 - 1]]);
                    break;
                case 71:
                    var statements = [$$[$0 - 3]];
                    if (Array.isArray($$[$0 - 2])) {
                        statements = statements.concat($$[$0 - 2]);
                    }
                    if (typeof $$[$0 - 1] !== 'undefined') {
                        statements.push($$[$0 - 1]);
                    }
                    this.$ = new yy.Statement(statements);
                    break;
                case 72:
                    this.$ = new yy.ReturnStatement($$[$0 - 1]);
                    break;
                case 78:
                case 112:
                    this.$ = [];
                    break;
                case 79:
                case 113:
                    $$[$0 - 1] = $$[$0 - 1] || [];
                    $$[$0] = $$[$0] || yy.Statement.Empty;
                    this.$ = $$[$0 - 1].concat($$[$0]);
                    break;
                case 80:
                case 114:
                    if ($$[$0 - 2] === '\n' || $$[$0 - 2] === '') {
                        $$[$0 - 2] = [];
                    }
                    $$[$0 - 2] = $$[$0 - 2] || [];
                    this.$ = new yy.Statement($$[$0 - 2]);
                    break;
                case 81:
                case 82:
                case 90:
                case 91:
                    this.$ = yy.getVarDeclModifierByKeyword($$[$0]);
                    break;
                case 85:
                    this.$ = [yy.createToken($$[$0 - 1]), $$[$0]];
                    break;
                case 86:
                    this.$ = new yy.Expr($$[$0]);
                    break;
                case 89:
                    this.$ = yy.VarDecl.create({
                        modifiers: yy.VarDeclModifier.combine($$[$0 - 3]),
                        varName: $$[$0 - 2][0],
                        typeDecl: $$[$0 - 2][1],
                        assignment: $$[$0 - 1]
                    });
                    break;
                case 92:
                    this.$ = yy.VarDecl.create({
                        modifiers: yy.VarDeclModifier.combine(yy.VarDeclModifier.Static, $$[$0 - 3]),
                        varName: $$[$0 - 2][0],
                        typeDecl: $$[$0 - 2][1],
                        assignment: $$[$0 - 1]
                    });
                    break;
                case 96:
                    this.$ = new yy.ParamDecl(new yy.Token($$[$0 - 1]), $$[$0]);
                    break;
                case 97:
                    const decls = [];
                    if (typeof $$[$0] !== 'undefined') {
                        decls.push($$[$0]);
                    }
                    this.$ = yy.ParamDeclList.fromParamDecls(decls);
                    break;
                case 98:
                    this.$ = yy.ParamDeclList.fromParamDecls($$[$0 - 2].paramDecls.concat($$[$0]));
                    break;
                case 99:
                case 115:
                    this.$ = yy.createToken($$[$0]);
                    break;
                case 100:
                    this.$ = $$[$0 - 1];
                    break;
                case 106:
                    this.$ = yy.FuncDecl.create({
                        funcName: $$[$0 - 4],
                        runtimeParamDecls: $$[$0 - 3],
                        returnTypeDecl: $$[$0 - 2],
                        funcBody: $$[$0 - 1]
                    });
                    break;
                case 107:
                    this.$ = yy.MethodDecl.create({
                        funcName: $$[$0 - 4],
                        runtimeParamDecls: $$[$0 - 3],
                        returnTypeDecl: $$[$0 - 2],
                        funcBody: $$[$0 - 1]
                    });
                    break;
                case 118:
                    this.$ = yy.ClassDecl.create({
                        className: $$[$0 - 2],
                        classBody: $$[$0 - 1]
                    });
                    break;
                case 119:
                    this.$ = new yy.ImportStatement($$[$0 - 1]);
                    break;
                case 120:
                    this.$ = new yy.ExportStatement($$[$0 - 1]);
                    break;
                case 128:
                    $$[$0 - 1] = $$[$0 - 1] || [];
                    if (!Array.isArray($$[$0 - 1])) {
                        $$[$0 - 1] = [$$[$0 - 1]];
                    }
                    this.$ = $$[$0 - 1].concat($$[$0]);
                    break;
                case 129:
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
        table: [{ 3: 9, 4: $V0, 5: $V1, 9: 4, 10: $V2, 87: 11, 88: $V3, 94: 5, 99: 12, 100: $V4, 102: 6, 103: 7, 104: $V5, 105: $V6, 106: 3, 107: $V7, 108: 2, 109: 1 }, { 1: [3] }, { 1: [2, 129], 3: 9, 4: $V0, 5: $V1, 9: 4, 10: $V2, 87: 11, 88: $V3, 94: 5, 99: 12, 100: $V4, 102: 6, 103: 7, 104: $V5, 105: $V6, 106: 19, 107: $V7 }, o($V8, [2, 127]), o($V8, [2, 121]), o($V8, [2, 122]), o($V8, [2, 123]), o($V8, [2, 124]), o($V8, [2, 125]), o($V8, [2, 126]), { 3: 20, 4: $V0, 5: $V1 }, { 17: $V9, 89: 21 }, o($Va, [2, 117], { 101: 23, 98: 24, 71: [1, 25] }), { 46: 26, 47: $Vb }, { 43: 28, 48: $Vc }, o($Vd, [2, 1]), o($Vd, [2, 2]), { 48: [1, 30] }, { 48: [1, 31] }, o($V8, [2, 128]), o($Vd, [2, 9]), o([1, 4, 5, 10, 71, 88, 100, 104, 105, 107], $Ve, { 90: 32, 91: $Vf }), o($Vg, $Vh, { 86: 34, 85: 35, 48: $Vi }), { 3: 37, 4: $V0, 5: $V1 }, o($Va, [2, 116]), o([5, 10, 72, 74, 75, 82, 88], $Vj, { 6: 38, 4: $Vk }), { 3: 40, 4: $V0, 5: $V1 }, o($Vl, [2, 43]), { 3: 41, 4: $V0, 5: $V1 }, o([4, 5, 10, 12, 13, 17, 18, 20, 21, 22, 23, 24, 25, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 47, 48, 50, 53, 60, 62, 68, 71, 72, 74, 75, 82, 88], [2, 44]), { 17: [2, 99] }, o([4, 5, 71], [2, 115]), o($V8, $Vm, { 92: 42, 58: 43, 71: $Vn }), { 48: $Vo, 55: 45 }, { 18: [1, 47], 53: [1, 48] }, o($Vg, [2, 97]), o($Vg, [2, 94], { 84: 49, 77: [1, 50] }), o($V8, [2, 118]), o($Vp, $Vj, { 97: 51, 8: 52, 7: 53, 6: 55, 4: $Vk, 5: $Vq }), o($Vd, [2, 3]), o($V8, [2, 119]), o($V8, [2, 120]), o([1, 10, 88, 100, 104, 105, 107], $Vj, { 7: 53, 6: 55, 93: 56, 8: 57, 4: $Vk, 5: $Vq }), o($Vr, [2, 103]), o([5, 10, 12, 13, 17, 47, 48, 50, 60, 68, 72, 74, 75], $Vj, { 6: 58, 4: $Vk }), o([1, 4, 5, 10, 71, 72, 74, 75, 82, 88, 100, 104, 105, 107], [2, 101]), o([1, 4, 5, 10, 12, 13, 17, 18, 31, 47, 48, 50, 53, 60, 62, 68, 71, 72, 74, 75, 82, 88, 100, 104, 105, 107], [2, 61]), o([1, 4, 5, 10, 71, 72, 74, 75, 82, 88, 91, 100, 104, 105, 107], [2, 100]), o($Vg, $Vh, { 85: 59, 48: $Vi }), o($Vg, [2, 96]), { 48: $Vo, 55: 60 }, { 4: $Vk, 6: 61, 9: 63, 10: $V2, 69: 64, 72: $Vj, 73: 67, 74: $Vs, 75: $Vt, 81: 68, 82: [1, 72], 83: 65, 87: 69, 88: $V3, 95: 66, 96: 62 }, o($Vu, [2, 112]), o([1, 5, 10, 12, 13, 17, 47, 48, 50, 60, 62, 68, 72, 74, 75, 82, 88, 100, 104, 105, 107], [2, 7], { 6: 73, 4: $Vk }), o($Vd, [2, 8]), o($Vd, [2, 5]), o($V8, [2, 106]), o($Vr, [2, 105]), o($Vv, $Vj, { 7: 53, 6: 55, 70: 74, 8: 75, 4: $Vk, 5: $Vq }), o($Vg, [2, 98]), o($Vg, [2, 93]), { 72: [1, 76] }, o($Vu, [2, 113]), o($Vu, [2, 108]), o($Vu, [2, 109]), o($Vu, [2, 110]), o($Vu, [2, 111]), { 48: $Vw, 78: 77 }, { 48: $Vw, 78: 79 }, { 17: $V9, 89: 80 }, { 48: [2, 81] }, { 48: [2, 82] }, { 74: [1, 81], 75: [1, 82] }, o($Vd, [2, 6]), { 4: $Vk, 6: 83, 9: 85, 10: $V2, 11: 110, 12: $Vx, 13: $Vy, 14: 108, 15: 97, 16: 102, 17: $Vz, 26: 109, 27: 94, 28: 91, 29: 103, 42: 104, 43: 105, 44: 99, 45: 100, 46: 107, 47: $Vb, 48: $Vc, 49: 101, 50: $VA, 51: 98, 52: 90, 54: 86, 57: 84, 59: 93, 60: $VB, 66: 89, 67: 88, 68: $VC, 69: 87, 72: $Vj, 73: 67, 74: $Vs, 75: $Vt }, o($VD, [2, 78]), o($Va, [2, 114]), o($VE, $VF, { 79: 113, 31: $VG }), o($VH, [2, 84], { 76: 115, 77: [1, 116] }), o($VI, $VF, { 79: 117, 31: $VG }), o([4, 5, 10, 71, 72, 74, 75, 82, 88], $Ve, { 90: 118, 91: $Vf }), { 48: [2, 90] }, { 48: [2, 91] }, { 72: [1, 119] }, o($VD, [2, 79]), o($VJ, [2, 73]), o($VJ, [2, 74]), o($VJ, [2, 75]), o($VJ, [2, 76]), o($VJ, [2, 77]), o($VK, $Vj, { 7: 53, 6: 55, 8: 120, 4: $Vk, 5: $Vq, 53: $VL }), o($VK, $Vj, { 7: 53, 6: 55, 8: 122, 4: $Vk, 5: $Vq }), { 11: 110, 12: $Vx, 13: $Vy, 14: 108, 15: 97, 16: 102, 17: $VM, 26: 109, 27: 123, 29: 103, 42: 104, 43: 105, 44: 99, 45: 100, 46: 107, 47: $Vb, 48: $Vc, 49: 101, 50: $VA, 51: 98 }, o($VK, $Vj, { 7: 53, 6: 55, 63: 125, 8: 126, 4: $Vk, 5: $Vq }), o($VN, [2, 56], { 19: 127, 20: $VO, 21: $VP, 22: $VQ, 23: $VR, 24: $VS, 25: $VT }), { 11: 110, 12: $Vx, 13: $Vy, 14: 137, 15: 97, 16: 102, 17: $VM, 26: 138, 27: 94, 29: 103, 42: 136, 43: 105, 44: 99, 45: 100, 46: 107, 47: $Vb, 48: $Vc, 49: 135, 50: $VA, 51: 98, 52: 134 }, { 11: 110, 12: $Vx, 13: $Vy, 14: 108, 15: 97, 16: 102, 17: $VM, 26: 109, 27: 139, 29: 103, 42: 104, 43: 105, 44: 99, 45: 100, 46: 107, 47: $Vb, 48: $Vc, 49: 101, 50: $VA, 51: 98 }, o([4, 5, 10, 17, 18, 20, 21, 22, 23, 24, 25, 47, 48, 50, 53, 60, 62, 68, 71, 72, 74, 75, 82, 88], [2, 52], { 11: 140, 12: $Vx, 13: $Vy }), o($Vl, [2, 53]), o($Vl, [2, 54]), o($Vl, [2, 55]), o($Vl, $VU), o($Vl, [2, 50]), o($Vl, [2, 51]), o($Vl, $VV), o([4, 5, 10, 12, 13, 18, 20, 21, 22, 23, 24, 25, 47, 48, 50, 53, 60, 62, 68, 71, 72, 74, 75, 82, 88], $VW, { 28: 142, 30: 143, 17: [1, 141], 31: [1, 144], 32: [1, 145], 33: [1, 146], 34: [1, 147], 35: [1, 148], 36: [1, 149], 37: [1, 150], 38: [1, 151], 39: [1, 152], 40: [1, 153], 41: [1, 154] }), o($Vl, [2, 46]), o($Vl, [2, 47]), o($Vl, $VX), o($Vl, $VY), { 15: 155, 17: [1, 156], 43: 157, 46: 107, 47: $Vb, 48: $Vc, 49: 101, 50: $VA }, o($Vl, [2, 10]), o($Vl, [2, 11]), o([10, 12, 13, 17, 47, 48, 50, 60, 62, 68, 72, 74, 75, 82, 88], $Vj, { 7: 53, 6: 55, 80: 158, 8: 159, 4: $Vk, 5: $Vq }), { 11: 110, 12: $Vx, 13: $Vy, 14: 108, 15: 97, 16: 102, 17: $VM, 26: 109, 27: 160, 29: 103, 42: 104, 43: 105, 44: 99, 45: 100, 46: 107, 47: $Vb, 48: $Vc, 49: 101, 50: $VA, 51: 98 }, o($VH, [2, 85]), { 48: $Vo, 55: 161 }, o($Vp, $Vj, { 7: 53, 6: 55, 8: 159, 80: 162, 4: $Vk, 5: $Vq }), o($VI, $Vm, { 58: 43, 92: 163, 71: $Vn }), o($Vd, [2, 80]), o($VJ, [2, 59]), { 11: 110, 12: $Vx, 13: $Vy, 14: 108, 15: 97, 16: 102, 17: $VM, 26: 109, 27: 164, 29: 103, 42: 104, 43: 105, 44: 99, 45: 100, 46: 107, 47: $Vb, 48: $Vc, 49: 101, 50: $VA, 51: 98 }, o($VJ, [2, 60]), o($VK, $Vj, { 7: 53, 6: 55, 19: 127, 8: 165, 4: $Vk, 5: $Vq, 20: $VO, 21: $VP, 22: $VQ, 23: $VR, 24: $VS, 25: $VT }), { 11: 110, 12: $Vx, 13: $Vy, 14: 137, 15: 97, 16: 102, 17: $VM, 26: 138, 27: 166, 29: 103, 42: 136, 43: 105, 44: 99, 45: 100, 46: 107, 47: $Vb, 48: $Vc, 49: 135, 50: $VA, 51: 98 }, o($Vv, $Vj, { 7: 53, 6: 55, 65: 167, 61: 168, 64: 169, 8: 170, 4: $Vk, 5: $Vq, 62: [1, 171] }), o($VJ, [2, 66]), { 11: 110, 12: $Vx, 13: $Vy, 14: 108, 15: 97, 16: 102, 17: $Vz, 26: 109, 27: 172, 28: 173, 29: 103, 42: 104, 43: 105, 44: 99, 45: 100, 46: 107, 47: $Vb, 48: $Vc, 49: 101, 50: $VA, 51: 98 }, o($VZ, [2, 16]), o($VZ, [2, 17]), o($VZ, [2, 18]), o($VZ, [2, 19]), o($VZ, [2, 20]), o($VZ, [2, 21]), { 18: [1, 174], 53: $VL }, o([12, 13, 20, 21, 22, 23, 24, 25, 53], $VU, { 18: $V_ }), o($V$, $VV, { 18: [1, 176] }), o($V$, $VX, { 18: [1, 177] }), o($V$, $VY, { 18: [1, 178] }), { 9: 85, 10: $V2, 11: 110, 12: $Vx, 13: $Vy, 14: 108, 15: 97, 16: 102, 17: $Vz, 19: 127, 20: $VO, 21: $VP, 22: $VQ, 23: $VR, 24: $VS, 25: $VT, 26: 109, 27: 94, 28: 91, 29: 103, 42: 104, 43: 105, 44: 99, 45: 100, 46: 107, 47: $Vb, 48: $Vc, 49: 101, 50: $VA, 51: 98, 52: 90, 54: 86, 56: 179, 57: 180, 58: 181, 59: 93, 60: $VB, 66: 89, 67: 88, 68: $VC, 69: 87, 71: $Vn, 73: 67, 74: $Vs, 75: $Vt }, o($Vl, [2, 12]), { 11: 110, 12: $Vx, 13: $Vy, 14: 108, 15: 97, 16: 102, 17: $VM, 18: [1, 182], 26: 109, 27: 94, 29: 103, 42: 104, 43: 105, 44: 99, 45: 100, 46: 107, 47: $Vb, 48: $Vc, 49: 101, 50: $VA, 51: 98, 52: 134 }, o($Vl, [2, 42]), { 11: 110, 12: $Vx, 13: $Vy, 14: 108, 15: 97, 16: 102, 17: $Vz, 26: 109, 27: 183, 28: 184, 29: 103, 42: 104, 43: 105, 44: 99, 45: 100, 46: 107, 47: $Vb, 48: $Vc, 49: 101, 50: $VA, 51: 98 }, o($VZ, [2, 26]), o($VZ, [2, 27]), o($VZ, [2, 28]), o($VZ, [2, 29]), o($VZ, [2, 30]), o($VZ, [2, 31]), o($VZ, [2, 32]), o($VZ, [2, 33]), o($VZ, [2, 34]), o($VZ, [2, 35]), o($VZ, [2, 36]), o($Vl, [2, 13]), { 43: 157, 46: 107, 47: $Vb, 48: $Vc, 49: 185, 50: $VA }, o($Vl, $VW), o($VE, [2, 89]), o($VE, [2, 88]), o($VE, [2, 86], { 19: 127, 20: $VO, 21: $VP, 22: $VQ, 23: $VR, 24: $VS, 25: $VT }), o($VH, [2, 83]), o($Vu, [2, 92]), o($Vp, $Vj, { 7: 53, 6: 55, 8: 57, 93: 186, 4: $Vk, 5: $Vq }), o($VN, [2, 57], { 19: 127, 20: $VO, 21: $VP, 22: $VQ, 23: $VR, 24: $VS, 25: $VT }), o($VJ, [2, 72]), { 19: 127, 20: $VO, 21: $VP, 22: $VQ, 23: $VR, 24: $VS, 25: $VT }, o($VK, $Vj, { 7: 53, 6: 55, 8: 187, 4: $Vk, 5: $Vq }), o($VJ, [2, 67]), o($VJ, [2, 69]), o($VJ, [2, 70]), { 9: 85, 10: $V2, 11: 110, 12: $Vx, 13: $Vy, 14: 108, 15: 97, 16: 102, 17: $Vz, 26: 109, 27: 94, 28: 91, 29: 103, 42: 104, 43: 105, 44: 99, 45: 100, 46: 107, 47: $Vb, 48: $Vc, 49: 101, 50: $VA, 51: 98, 52: 90, 54: 86, 56: 189, 57: 180, 58: 181, 59: 93, 60: [1, 188], 66: 89, 67: 88, 68: $VC, 69: 87, 71: $Vn, 73: 67, 74: $Vs, 75: $Vt }, o($V01, [2, 22], { 19: 127, 20: $VO, 21: $VP, 22: $VQ, 23: $VR, 24: $VS, 25: $VT }), o($Vl, [2, 23]), o($Vl, [2, 58]), o($Vl, [2, 49]), o($Vl, [2, 40]), o($Vl, [2, 15]), o($Vl, [2, 25]), o($VK, $Vj, { 7: 53, 6: 55, 8: 190, 4: $Vk, 5: $Vq }), o($VJ, [2, 62]), o($VJ, [2, 63]), o($Vl, [2, 41]), o($V01, [2, 37], { 19: 127, 20: $VO, 21: $VP, 22: $VQ, 23: $VR, 24: $VS, 25: $VT }), o($Vl, [2, 38]), { 18: $V_ }, o($Vu, [2, 107]), o($VJ, [2, 71]), { 11: 110, 12: $Vx, 13: $Vy, 14: 108, 15: 97, 16: 102, 17: $VM, 26: 109, 27: 191, 29: 103, 42: 104, 43: 105, 44: 99, 45: 100, 46: 107, 47: $Vb, 48: $Vc, 49: 101, 50: $VA, 51: 98 }, o($VK, $Vj, { 7: 53, 6: 55, 8: 192, 4: $Vk, 5: $Vq }), o($VJ, [2, 64]), { 9: 85, 10: $V2, 11: 110, 12: $Vx, 13: $Vy, 14: 108, 15: 97, 16: 102, 17: $Vz, 19: 127, 20: $VO, 21: $VP, 22: $VQ, 23: $VR, 24: $VS, 25: $VT, 26: 109, 27: 94, 28: 91, 29: 103, 42: 104, 43: 105, 44: 99, 45: 100, 46: 107, 47: $Vb, 48: $Vc, 49: 101, 50: $VA, 51: 98, 52: 90, 54: 86, 56: 193, 57: 180, 58: 181, 59: 93, 60: $VB, 66: 89, 67: 88, 68: $VC, 69: 87, 71: $Vn, 73: 67, 74: $Vs, 75: $Vt }, o($VJ, [2, 68]), o($VK, $Vj, { 7: 53, 6: 55, 8: 194, 4: $Vk, 5: $Vq }), o($VJ, [2, 65])],
        defaultActions: { 30: [2, 99], 70: [2, 81], 71: [2, 82], 81: [2, 90], 82: [2, 91] },
        parseError: function parseError(str, hash) {
            if (hash.recoverable) {
                this.trace(str);
            }
            else {
                function _parseError(msg, hash) {
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
            }
            else {
                this.parseError = Object.getPrototypeOf(this).parseError;
            }
            function popStack(n) {
                stack.length = stack.length - 2 * n;
                vstack.length = vstack.length - n;
                lstack.length = lstack.length - n;
            }
            _token_stack: var lex = function () {
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
                        return 104;
                        break;
                    case 2:
                        return 105;
                        break;
                    case 3:
                        return 88;
                        break;
                    case 4:
                        return 100;
                        break;
                    case 5:
                        return 74;
                        break;
                    case 6:
                        return 75;
                        break;
                    case 7:
                        return 82;
                        break;
                    case 8:
                        return 68;
                        break;
                    case 9:
                        return 60;
                        break;
                    case 10:
                        return 62;
                        break;
                    case 11:
                        return 4;
                        break;
                    case 12:
                        return 48;
                        break;
                    case 13:
                        return 50;
                        break;
                    case 14:
                        return 50;
                        break;
                    case 15:
                        return 50;
                        break;
                    case 16:
                        return 50;
                        break;
                    case 17:
                        return 50;
                        break;
                    case 18:
                        return 50;
                        break;
                    case 19:
                        return 50;
                        break;
                    case 20:
                        return 47;
                        break;
                    case 21:
                        return 38;
                        break;
                    case 22:
                        return 37;
                        break;
                    case 23:
                        return 35;
                        break;
                    case 24:
                        return 36;
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
                        return 39;
                        break;
                    case 29:
                        return 40;
                        break;
                    case 30:
                        return 41;
                        break;
                    case 31:
                        return 'RIGHT_OP';
                        break;
                    case 32:
                        return 'LEFT_OP';
                        break;
                    case 33:
                        return 12;
                        break;
                    case 34:
                        return 13;
                        break;
                    case 35:
                        return 91;
                        break;
                    case 36:
                        return 'AND_OP';
                        break;
                    case 37:
                        return 'OR_OP';
                        break;
                    case 38:
                        return 'LE_OP';
                        break;
                    case 39:
                        return 'GE_OP';
                        break;
                    case 40:
                        return 'EQ_OP';
                        break;
                    case 41:
                        return 'NE_OP';
                        break;
                    case 42:
                        return 5;
                        break;
                    case 43:
                        return (';');
                        break;
                    case 44:
                        return ('{');
                        break;
                    case 45:
                        return ('}');
                        break;
                    case 46:
                        return (',');
                        break;
                    case 47:
                        return (':');
                        break;
                    case 48:
                        return ('=');
                        break;
                    case 49:
                        return ('(');
                        break;
                    case 50:
                        return (')');
                        break;
                    case 51:
                        return ('[');
                        break;
                    case 52:
                        return (']');
                        break;
                    case 53:
                        return ('.');
                        break;
                    case 54:
                        return ('&');
                        break;
                    case 55:
                        return ('!');
                        break;
                    case 56:
                        return ('~');
                        break;
                    case 57:
                        return ('-');
                        break;
                    case 58:
                        return ('+');
                        break;
                    case 59:
                        return ('*');
                        break;
                    case 60:
                        return ('/');
                        break;
                    case 61:
                        return ('%');
                        break;
                    case 62:
                        return ('<');
                        break;
                    case 63:
                        return ('>');
                        break;
                    case 64:
                        return ('^');
                        break;
                    case 65:
                        return ('|');
                        break;
                    case 66:
                        return ('?');
                        break;
                    case 67:
                        break;
                    case 68:
                        break;
                }
            },
            rules: [/^(?:\/\/(.*))/, /^(?:import\b)/, /^(?:export\b)/, /^(?:func\b)/, /^(?:class\b)/, /^(?:let\b)/, /^(?:const\b)/, /^(?:static\b)/, /^(?:return\b)/, /^(?:if\b)/, /^(?:else\b)/, /^(?:(\n))/, /^(?:([a-zA-Z_])(([a-zA-Z_])|([0-9]))*)/, /^(?:([0-9])+\.([0-9])*(([Ee][+-]?([0-9])+))?([fFlL])?)/, /^(?:([0-9])*\.([0-9])+(([Ee][+-]?([0-9])+))?([fFlL])?)/, /^(?:0[xX]([a-fA-F0-9])+([uUlL]*)?)/, /^(?:0([0-9])+([uUlL]*)?)/, /^(?:([0-9])+([uUlL]*)?)/, /^(?:L?'(\\'|[^'])+')/, /^(?:([0-9])+([Ee][+-]?([0-9])+)([fFlL])?)/, /^(?:L?"(\\"|[^"])*")/, /^(?:>>=)/, /^(?:<<=)/, /^(?:\+=)/, /^(?:-=)/, /^(?:\*=)/, /^(?:\/=)/, /^(?:%=)/, /^(?:&=)/, /^(?:\^=)/, /^(?:\|=)/, /^(?:>>)/, /^(?:<<)/, /^(?:\+\+)/, /^(?:--)/, /^(?:->)/, /^(?:&&)/, /^(?:\|\|)/, /^(?:<=)/, /^(?:>=)/, /^(?:==)/, /^(?:!=)/, /^(?:$)/, /^(?:;)/, /^(?:(\{|<%))/, /^(?:(\}|%>))/, /^(?:,)/, /^(?::)/, /^(?:=)/, /^(?:\()/, /^(?:\))/, /^(?:(\[|<:))/, /^(?:(\]|:>))/, /^(?:\.)/, /^(?:&)/, /^(?:!)/, /^(?:~)/, /^(?:-)/, /^(?:\+)/, /^(?:\*)/, /^(?:\/)/, /^(?:%)/, /^(?:<)/, /^(?:>)/, /^(?:\^)/, /^(?:\|)/, /^(?:\?)/, /^(?:[ \t\v\r\f])/, /^(?:.)/],
            conditions: { "INITIAL": { "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68], "inclusive": true } }
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
    exports.parser = generatedParser;
    exports.Parser = generatedParser.Parser;
    exports.parse = function () { return generatedParser.parse.apply(generatedParser, arguments); };
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
},{"_process":83,"fs":81,"path":82}],76:[function(require,module,exports){
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
        return ast.VarDeclModifier.Let;
    }
    else if (keyword === 'const') {
        return ast.VarDeclModifier.Const;
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
    .filter(key => !isNaN(parseInt(key, 10)))
    .forEach(key => {
    const operator = ast.OperatorIdent[key];
    operatorMap[operator] = operator;
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

},{"../ast":42,"./generatedParser.js":75}],77:[function(require,module,exports){
///
/// FactoryRegistry
///
/// Contains a factory implementation that creates objects depending on
/// their relevance to a given context.
///
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Abstract factory implementation.
 * Type parameter `TContext` defines the context type. Contexts are passed to both rating functions and
 * constructor functions.
 * Type parameter `TProduct` defines the type of objects that are created by a factory.
 */
class FactoryRegistry {
    ///
    /// Internals:
    ///
    /**
     * @see Static method `FactoryRegistry.create()`.
     */
    constructor() {
        /**
         * Contains all registered constructor functions and their rating functions.
         */
        this.registry = [];
        // nothing to do
    }
    ///
    /// Public Interface:
    ///
    /**
     * Creates a new `FactoryRegistry` instance.
     */
    static create() {
        return new FactoryRegistry();
    }
    /**
     * Register a constructor function.
     * @param ratingFunc The function used to determine whether the registered constructor function is
     *                   relevant for a given construction context.
     * @param constructorFunc The function that creates an object instance if the result of `ratingFunc`
     *                        has determined that this constructor function is relevant for the given
     *                        construction context.
     */
    register(ratingFunc, constructorFunc) {
        this.registry.push({ ratingFunc, constructorFunc });
    }
    /**
     * Class decorator that registers the decorated class as a constructor function.
     * The decorated class must instantiate to an instance of `TProduct`.
     * @param ratingFunc The function used to determine whether the registered constructor function is
     *                   relevant for a given construction context.
     */
    registerClass(ratingFunc) {
        return (classConstructor) => {
            this.register(ratingFunc, params => new classConstructor(params));
        };
    }
    /**
     * Creates an instance of `TProduct` based on the context passed into this method.
     * @param context The context to create a product for.
     */
    create(context) {
        const constructorFunc = this.findConstructorForContext(context);
        return constructorFunc.call(undefined, context);
    }
    /**
     * Creates a function that can be used to sort arrays of `IRegistryRecord`s by their rating for a
     * given context. The function is meant to be passed into `Array.prototype.sort()`.
     * @param context The context to create a sorter function for.
     */
    createRatingSorter(context) {
        return (a, b) => {
            const orderA = a.ratingFunc(context);
            const orderB = b.ratingFunc(context);
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
     * Finds the best matching constructor function for a given context and returns it.
     * @throws
     * @param context The context to find a constructor function for.
     * @return The constructor function for the given context.
     */
    findConstructorForContext(context) {
        const list = this.registry
            .filter(registered => (registered.ratingFunc(context) || 0) > 0)
            .sort(this.createRatingSorter(context));
        if (list.length < 1) {
            throw new Error('Unable to find matching constructor for context.');
        }
        // the first item in `list` is the item with the best match
        return list[0].constructorFunc;
    }
}
exports.FactoryRegistry = FactoryRegistry;
exports.default = FactoryRegistry;

},{}],78:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alphabet = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g',
    'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u',
    'v', 'w', 'x', 'y', 'z'
];
/**
 * Returns the alphabet as an array of all lowercase letters.
 */
function getLowercaseAlphabet() {
    return [].concat(alphabet);
}
exports.getLowercaseAlphabet = getLowercaseAlphabet;
/**
 * Returns the alphabet as an array of all uppercase letters.
 */
function getUppercaseAlphabet() {
    return getLowercaseAlphabet().map(c => c.toUpperCase());
}
exports.getUppercaseAlphabet = getUppercaseAlphabet;

},{}],79:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * An exception that is thrown if an assertion fails.
 */
class AssertionException extends Error {
}
exports.AssertionException = AssertionException;
/**
 * Asserts a condition and throws an exception if `condition` is not `true`.
 * The exception that is thrown when the assertion fails is created by param `createError`.
 * @param condition The condition to assert.
 * @param createError A function that creates an exception when the assertion fails.
 * @param message Optional message parts to be included in the `AssertionException`'s message if the assertion fails.
 * @throws TError
 */
function configurableAssert(condition, createError, ...message) {
    if (condition) {
        return;
    }
    throw createError(message.join(' '));
}
exports.configurableAssert = configurableAssert;
/**
 * Asserts a condition. Throws an `AssertionException` if `condition` is not `true`.
 * @param condition The condition to assert.
 * @param message Optional message parts to be included in the `AssertionException`'s message if the assertion fails.
 * @throws AssertionException
 */
function assert(condition, ...message) {
    configurableAssert(condition, errorMessage => new AssertionException(`Assertion failed. ${errorMessage}`), ...message);
}
exports.assert = assert;

},{}],80:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
/**
 * Import all files from a directory synchronously.
 * The type parameter `TExports` can be used to describe the format of the imported
 * files, for example:
 * @example
 *     const tests = importFromDirectorySync<{ run: () => void }>(__dirname + '/tests/')
 *     tests.forEach(test => test.run())
 * @param directoryPath The directory to import from.
 * @param filter Optional. A function to filter which files are imported. The function is
 *               called once per file. When the return value evaluates to `true`, the file
 *               is imported, otherwise it will be omitted.
 */
function importFromDirectorySync(directoryPath, filter = () => true) {
    return (fs_1.readdirSync(`${directoryPath}/`) || [])
        .map(filename => `${directoryPath}/${filename}`)
        .filter(filename => fs_1.statSync(filename).isFile())
        .filter(filter)
        .map(filename => require(filename).default);
}
exports.importFromDirectorySync = importFromDirectorySync;

},{"fs":81}],81:[function(require,module,exports){

},{}],82:[function(require,module,exports){
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
},{"_process":83}],83:[function(require,module,exports){
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

},{}]},{},[7])(7)
});