(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.compiler = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("api"));

},{"api":11}],2:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("ast"));

},{"ast":50}],3:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("codegen/bash/"));

},{"codegen/bash/":87}],4:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("codegen/ecmascript/"));

},{"codegen/ecmascript/":123}],5:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("codegen/typescriptDeclarations/"));

},{"codegen/typescriptDeclarations/":138}],6:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("compiler/parser"));

},{"compiler/parser":140}],7:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("../utils/FactoryRegistry"));
__export(require("../utils/alphabet"));
__export(require("../utils/assert"));
__export(require("../utils/importUtils"));

},{"../utils/FactoryRegistry":141,"../utils/alphabet":142,"../utils/assert":143,"../utils/importUtils":144}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@/compiler/api");
const parser_1 = require("@/compiler/parser");
const ecmascript_1 = require("@/compiler/codegen/ecmascript");
const typescriptDeclarations_1 = require("@/compiler/codegen/typescriptDeclarations");
const bash_1 = require("@/compiler/codegen/bash");
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
            api_1.ICompileTargetIds.create(0 /* EcmaScript */, 'ES5'),
            api_1.ICompileTargetIds.create(1 /* TypeScriptDeclarations */, 'TSD')
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
     * Parses a string of source code into an AST.
     * @param sourceCode The source code to compile.
     * @return The syntax tree.
     */
    parseSourceCode(sourceCode) {
        const sourceUnit = parser_1.parseToSourceUnit(
        // we create the source unit with a unique name:
        `SourceUnit-${++CompilerApi.sourceUnitCount}`, sourceCode);
        return sourceUnit;
    }
    /**
     * Compiles a string of source code to output code.
     * @param sourceCode The source code to compile.
     * @param target The build target to compile to.
     * @return string The output code.
     */
    compileSourceCode(sourceCode, target) {
        const sourceUnit = this.parseSourceCode(sourceCode);
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
            case 1 /* TypeScriptDeclarations */:
                return new typescriptDeclarations_1.CodeGenerator(sourceUnit);
            case 2 /* Bash */:
                return new bash_1.CodeGenerator(sourceUnit);
        }
    }
}
/**
 * An internal counter used to make source unit names as unique as possible.
 */
CompilerApi.sourceUnitCount = 0;
exports.CompilerApi = CompilerApi;

},{"@/compiler/api":1,"@/compiler/codegen/bash":3,"@/compiler/codegen/ecmascript":4,"@/compiler/codegen/typescriptDeclarations":5,"@/compiler/parser":6}],10:[function(require,module,exports){
"use strict";
// tslint:disable:one-line
Object.defineProperty(exports, "__esModule", { value: true });
var ICompileTargetIds;
(function (ICompileTargetIds) {
    let TCompileTarget;
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
    let THumanReadableId;
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

},{}],11:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./CompilerApi"));
__export(require("./CompileTarget"));
__export(require("./ICompileTargetIds"));

},{"./CompileTarget":8,"./CompilerApi":9,"./ICompileTargetIds":10}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
const _1 = require("./");
const Expr_1 = require("./Expr");
class AnonFuncDecl extends Expr_1.default {
    /**
     * Creates a new `AnonFuncDecl` instance.
     */
    constructor(
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
        this.runtimeParamDecls = runtimeParamDecls;
        this.returnTypeDecl = returnTypeDecl;
        this.body = body;
        assert_1.assertAstNodeParam(runtimeParamDecls instanceof _1.ParamDeclList);
        assert_1.assertAstNodeParam(returnTypeDecl instanceof _1.TypeExpr);
        assert_1.assertAstNodeParam(body instanceof _1.Statement);
    }
    /**
     * Creates a new `FuncDecl` instance.
     * @param params Parameters for the function declaration.
     */
    static create(params) {
        return new AnonFuncDecl(params.runtimeParamDecls, params.returnTypeDecl, params.funcBody);
    }
    /**
     * Creates an identical copy of this AST node.
     */
    clone() {
        return new AnonFuncDecl(this.runtimeParamDecls.clone(), this.returnTypeDecl.clone(), this.body.clone());
    }
}
exports.AnonFuncDecl = AnonFuncDecl;
exports.default = AnonFuncDecl;

},{"./":50,"./Expr":22,"./utils/assert":51}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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
    /**
     * Creates an identical copy of this AST node.
     */
    clone() {
        return new BinaryOperation(this.leftOperand.clone(), this.operator.clone(), this.rightOperand.clone());
    }
}
exports.BinaryOperation = BinaryOperation;
exports.default = BinaryOperation;

},{"./Expr":22,"./Operator":33,"./utils/assert":51}],15:[function(require,module,exports){
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
    /**
     * Creates an identical copy of this AST node.
     */
    clone() {
        return new ClassDecl(this.name.clone(), this.body.clone());
    }
}
exports.ClassDecl = ClassDecl;
exports.default = ClassDecl;

},{"./":50,"./utils/assert":51}],16:[function(require,module,exports){
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
    /**
     * Creates an identical copy of this AST node.
     */
    clone() {
        return new Comment(this.lines.map(line => line.clone()));
    }
}
exports.Comment = Comment;
exports.default = Comment;

},{"./":50,"./utils/assert":51}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IfStatement_1 = require("./IfStatement");
class ElseIfStatement extends IfStatement_1.default {
}
exports.ElseIfStatement = ElseIfStatement;
exports.default = ElseIfStatement;

},{"./IfStatement":29}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Statement_1 = require("./Statement");
class ElseStatement extends Statement_1.default {
}
exports.ElseStatement = ElseStatement;
exports.default = ElseStatement;

},{"./Statement":40}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
const _1 = require("./");
class EnumDecl extends _1.BaseNode {
    /**
     * Creates a new `EnumDecl` instance.
     */
    constructor(
    /**
     * The name of the enum itself.
     */
    name, 
    /**
     * The enum body.
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
     * Creates a new `EnumDecl` instance.
     * @param params Parameters for the class declaration.
     */
    static create(params) {
        return new EnumDecl(params.enumName, params.enumBody);
    }
    /**
     * Creates an identical copy of this AST node.
     */
    clone() {
        return new EnumDecl(this.name.clone(), this.body.clone());
    }
}
exports.EnumDecl = EnumDecl;
exports.default = EnumDecl;

},{"./":50,"./utils/assert":51}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
const _1 = require("./");
class EnumMemberDecl extends _1.BaseNode {
    /**
     * Creates a new `EnumMemberDecl` instance.
     */
    constructor(
    /**
     * The name of the enum member.
     */
    name) {
        super();
        this.name = name;
        assert_1.assertAstNodeParam(name instanceof _1.Token);
        this.setParentOf(name, this);
    }
    /**
     * Creates an identical copy of this AST node.
     */
    clone() {
        return new EnumMemberDecl(this.name.clone());
    }
}
exports.EnumMemberDecl = EnumMemberDecl;
exports.default = EnumMemberDecl;

},{"./":50,"./utils/assert":51}],21:[function(require,module,exports){
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
    /**
     * Creates an identical copy of this AST node.
     */
    clone() {
        return new ExportStatement(this.exportedIdentifier.clone());
    }
}
exports.ExportStatement = ExportStatement;
exports.default = ExportStatement;

},{"./":50,"./Statement":40,"./utils/assert":51}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
const _1 = require("./");
class Expr extends _1.BaseNode {
    constructor(content) {
        super();
        this.content = content;
        assert_1.assertAstNodeParam(content instanceof _1.BaseNode ||
            typeof content === 'undefined');
    }
    /**
     * Creates an identical copy of this AST node.
     */
    clone() {
        return new Expr(this.content ? this.content.clone() : undefined);
    }
}
/**
 * An expression with no content whatsoever.
 */
// tslint:disable-next-line:variable-name
Expr.Empty = new Expr();
exports.Expr = Expr;
exports.default = Expr;

},{"./":50,"./utils/assert":51}],23:[function(require,module,exports){
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
    /**
     * Creates an identical copy of this AST node.
     */
    clone() {
        return new ExprList(this.expressions.map(expr => expr.clone()));
    }
}
exports.ExprList = ExprList;
exports.default = ExprList;

},{"./Expr":22,"./utils/assert":51}],24:[function(require,module,exports){
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
    /**
     * Creates an identical copy of this AST node.
     */
    clone() {
        return new ExprStatement(this.expression.clone());
    }
}
// tslint:disable-next-line:variable-name
ExprStatement.Any = class AnyExprStatement extends ExprStatement {
};
exports.ExprStatement = ExprStatement;
exports.default = ExprStatement;

},{"./Expr":22,"./Statement":40,"./utils/assert":51}],25:[function(require,module,exports){
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
    /**
     * Creates an identical copy of this AST node.
     */
    clone() {
        return new FuncCall(this.identifier.clone(), this.parameterList.clone());
    }
}
exports.FuncCall = FuncCall;
exports.default = FuncCall;

},{"./Expr":22,"./ExprList":23,"./Identifier":28,"./utils/assert":51}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
const _1 = require("./");
class FuncDecl extends _1.AnonFuncDecl {
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
        super(runtimeParamDecls, returnTypeDecl, body);
        this.name = name;
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
    /**
     * Creates an identical copy of this AST node.
     */
    clone() {
        return new FuncDecl(this.name.clone(), this.runtimeParamDecls.clone(), this.returnTypeDecl.clone(), this.body.clone());
    }
}
exports.FuncDecl = FuncDecl;
exports.default = FuncDecl;

},{"./":50,"./utils/assert":51}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IContainerNode;
(function (IContainerNode) {
    /**
     * The `IContainerNode` brand symbol.
     * This must be used by implementing classes as the value for `__IContainerNodeBrand__`.
     */
    IContainerNode.BRAND = Symbol('IContainerNodeBrand');
    /**
     * Checks if a certain object implements the `IContainerNode` interface.
     * @param object The object to check.
     */
    function isImplementedBy(object) {
        return object.__IContainerNodeBrand__ === IContainerNode.BRAND;
    }
    IContainerNode.isImplementedBy = isImplementedBy;
})(IContainerNode = exports.IContainerNode || (exports.IContainerNode = {}));
exports.default = IContainerNode;

},{}],28:[function(require,module,exports){
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
    /**
     * Creates an identical copy of this AST node.
     */
    clone() {
        return new Identifier(this.name.clone());
    }
}
exports.Identifier = Identifier;
exports.default = Identifier;

},{"./":50,"./utils/assert":51}],29:[function(require,module,exports){
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
    /**
     * Creates an identical copy of this AST node.
     */
    clone() {
        return new IfStatement(this.condition.clone(), this.body.clone());
    }
}
exports.IfStatement = IfStatement;
exports.default = IfStatement;

},{"./Expr":22,"./Statement":40,"./utils/assert":51}],30:[function(require,module,exports){
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
    /**
     * Creates an identical copy of this AST node.
     */
    clone() {
        return new ImportStatement(this.importPath.clone());
    }
}
exports.ImportStatement = ImportStatement;
exports.default = ImportStatement;

},{"./Statement":40,"./StringLiteral":41,"./utils/assert":51}],31:[function(require,module,exports){
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
     * Creates an identical copy of this AST node.
     */
    clone() {
        return new MethodDecl(this.name.clone(), this.runtimeParamDecls.clone(), this.returnTypeDecl.clone(), this.body.clone());
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

},{"./":50,"./FuncDecl":26,"./utils/assert":51}],32:[function(require,module,exports){
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
    /**
     * Creates an identical copy of this AST node.
     */
    clone() {
        return new NumericExpr(this.contentToken.clone());
    }
}
exports.NumericExpr = NumericExpr;
exports.default = NumericExpr;

},{"./Expr":22,"./Token":42,"./utils/assert":51}],33:[function(require,module,exports){
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
    /**
     * Creates an identical copy of this AST node.
     */
    clone() {
        return new Operator(this.ident, this.text.clone());
    }
}
exports.Operator = Operator;
exports.default = Operator;

},{"./":50,"./utils/assert":51}],34:[function(require,module,exports){
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
    // Comparison
    OperatorIdent[OperatorIdent["=="] = 14] = "==";
    OperatorIdent[OperatorIdent["!="] = 15] = "!=";
    OperatorIdent[OperatorIdent["<="] = 16] = "<=";
    OperatorIdent[OperatorIdent[">="] = 17] = ">=";
    OperatorIdent[OperatorIdent["<"] = 18] = "<";
    OperatorIdent[OperatorIdent[">"] = 19] = ">";
    // Logical
    OperatorIdent[OperatorIdent["&&"] = 20] = "&&";
    OperatorIdent[OperatorIdent["||"] = 21] = "||";
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

},{}],35:[function(require,module,exports){
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
    /**
     * Creates an identical copy of this AST node.
     */
    clone() {
        return new ParamDecl(this.name.clone(), this.typeDecl.clone());
    }
}
exports.ParamDecl = ParamDecl;
exports.default = ParamDecl;

},{"./":50,"./utils/assert":51}],36:[function(require,module,exports){
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
        ///
        /// `IContainerNode` Implementation:
        ///
        // tslint:disable-next-line:variable-name
        this.__IContainerNodeBrand__ = _1.IContainerNode.BRAND;
        assert_1.assertAstNodeParam(Array.isArray(decls));
        decls.forEach(decl => assert_1.assertAstNodeParam(decl instanceof _1.ParamDecl));
    }
    /**
     * Creates an identical copy of this AST node.
     */
    clone() {
        return new ParamDeclList(this.decls.map(decl => decl.clone()));
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
    /**
     * Returns all child nodes of a container node.
     */
    getChildNodes() {
        return [].concat(this.paramDecls);
    }
}
/**
 * A completely empty parameter declaration list.
 */
// tslint:disable-next-line:variable-name
ParamDeclList.Empty = new ParamDeclList([]);
exports.ParamDeclList = ParamDeclList;
exports.default = ParamDeclList;

},{"./":50,"./utils/assert":51}],37:[function(require,module,exports){
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
    /**
     * Creates an identical copy of this AST node.
     */
    clone() {
        return new PrecedenceExpr(this.expr.clone());
    }
}
exports.PrecedenceExpr = PrecedenceExpr;
exports.default = PrecedenceExpr;

},{"./Expr":22,"./utils/assert":51}],38:[function(require,module,exports){
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
    /**
     * Creates an identical copy of this AST node.
     */
    clone() {
        return new ReturnStatement(this.returnValue.clone());
    }
}
/**
 * A return statement with no members.
 */
// tslint:disable-next-line:variable-name
ReturnStatement.Empty = new ReturnStatement();
exports.ReturnStatement = ReturnStatement;
exports.default = ReturnStatement;

},{"./":50,"./utils/assert":51}],39:[function(require,module,exports){
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
        ///
        /// `IContainerNode` Implementation:
        ///
        // tslint:disable-next-line:variable-name
        this.__IContainerNodeBrand__ = _1.IContainerNode.BRAND;
        assert_1.assertAstNodeParam(typeof name === 'string');
        assert_1.assertAstNodeParam(name.length > 0);
        assert_1.assertAstNodeParam(Array.isArray(items));
        items.forEach(item => assert_1.assertAstNodeParam(item instanceof _1.BaseNode));
    }
    /**
     * Creates an identical copy of this AST node.
     */
    clone() {
        return new SourceUnit(this.name, this.items.map(item => item.clone()));
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
    /**
     * Returns all child nodes of a container node.
     */
    getChildNodes() {
        return [].concat(this.items);
    }
}
exports.SourceUnit = SourceUnit;
exports.default = SourceUnit;

},{"./":50,"./utils/assert":51}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
const _1 = require("./");
class Statement extends _1.BaseNode {
    constructor(items) {
        super();
        this.items = items;
        ///
        /// `IContainerNode` Implementation:
        ///
        // tslint:disable-next-line:variable-name
        this.__IContainerNodeBrand__ = _1.IContainerNode.BRAND;
        assert_1.assertAstNodeParam(Array.isArray(items), 'Invalid Argument for ast.Statement: must be an array, is ', 'typeof ', typeof (items), (items ? ', instanceof ' + items.constructor.name : ''));
        items.forEach(item => assert_1.assertAstNodeParam(item instanceof _1.BaseNode));
        items.forEach(item => this.setParentOf(item, this));
    }
    /**
     * Creates an identical copy of this AST node.
     */
    clone() {
        return new Statement(this.items.map(item => item.clone()));
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
    /**
     * Returns all child nodes of a container node.
     */
    getChildNodes() {
        return [].concat(this.nodes);
    }
}
/**
 * A statement with no members.
 */
// tslint:disable-next-line:variable-name
Statement.Empty = new Statement([]);
exports.Statement = Statement;
exports.default = Statement;

},{"./":50,"./utils/assert":51}],41:[function(require,module,exports){
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
    /**
     * Creates an identical copy of this AST node.
     */
    clone() {
        return new StringLiteral(this.contentToken.clone());
    }
}
exports.StringLiteral = StringLiteral;
exports.default = StringLiteral;

},{"./Expr":22,"./Token":42,"./utils/assert":51}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
const _1 = require("./");
class Token extends _1.BaseNode {
    constructor(
    /**
     * The raw value of this token in source code.
     */
    rawValue, 
    /**
     * The start line number of the token in source code.
     */
    startLineNumber, 
    /**
     * The start column number of the token in source code.
     */
    startColumnNumber, 
    /**
     * The end line number of the token in source code.
     */
    endLineNumber, 
    /**
     * The end column number of the token in source code.
     */
    endColumnNumber) {
        super();
        this.rawValue = rawValue;
        this.startLineNumber = startLineNumber;
        this.startColumnNumber = startColumnNumber;
        this.endLineNumber = endLineNumber;
        this.endColumnNumber = endColumnNumber;
        assert_1.assertAstNodeParam(typeof rawValue === 'string');
    }
    /**
     * Creates an identical copy of this AST node.
     */
    clone() {
        return new Token(this.rawValue, this.startLineNumber, this.startColumnNumber, this.endLineNumber, this.endColumnNumber);
    }
}
/**
 * A token with no content whatsoever.
 */
// tslint:disable-next-line:variable-name
Token.Empty = new Token('');
exports.Token = Token;
exports.default = Token;

},{"./":50,"./utils/assert":51}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
const Statement_1 = require("./Statement");
const Identifier_1 = require("./Identifier");
class TryCatchStatement extends Statement_1.default {
    constructor(attemptStatement, errorHandlerStatement, errorIdentifier) {
        super([attemptStatement, errorHandlerStatement]);
        this.attemptStatement = attemptStatement;
        this.errorHandlerStatement = errorHandlerStatement;
        this.errorIdentifier = errorIdentifier;
        assert_1.assertAstNodeParam(attemptStatement instanceof Statement_1.default);
        assert_1.assertAstNodeParam(errorHandlerStatement instanceof Statement_1.default);
        this.setParentOf(attemptStatement, this);
        this.setParentOf(errorHandlerStatement, this);
        if (errorIdentifier) {
            assert_1.assertAstNodeParam(errorIdentifier instanceof Identifier_1.default);
            this.setParentOf(errorIdentifier, this);
        }
    }
    /**
     * Creates an identical copy of this AST node.
     */
    clone() {
        return new TryCatchStatement(this.attemptStatement.clone(), this.errorHandlerStatement.clone(), this.errorIdentifier.clone());
    }
}
exports.TryCatchStatement = TryCatchStatement;
exports.default = TryCatchStatement;

},{"./Identifier":28,"./Statement":40,"./utils/assert":51}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
const _1 = require("./");
class TypeExpr extends _1.Expr {
    constructor(typeIdentifier) {
        super();
        this.typeIdentifier = typeIdentifier;
        assert_1.assertAstNodeParam(typeIdentifier instanceof _1.Token);
    }
    /**
     * Creates a type expression from an identifier.
     */
    static fromIdentifier(identifier) {
        return new TypeExpr(identifier);
    }
    /**
     * Creates an identical copy of this AST node.
     */
    clone() {
        return new TypeExpr(this.typeIdentifier.clone());
    }
}
/**
 * A type expression with no content whatsoever.
 */
// tslint:disable-next-line:variable-name
TypeExpr.Empty = new TypeExpr(_1.Token.Empty);
exports.TypeExpr = TypeExpr;
exports.default = TypeExpr;

},{"./":50,"./utils/assert":51}],45:[function(require,module,exports){
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
    /**
     * Creates an identical copy of this AST node.
     */
    clone() {
        return new UnaryOperation(this.operand.clone(), this.operator.clone(), this.operatorPosition);
    }
}
exports.UnaryOperation = UnaryOperation;
exports.default = UnaryOperation;

},{"./":50,"./utils/assert":51}],46:[function(require,module,exports){
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

},{}],47:[function(require,module,exports){
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
    /**
     * Creates an identical copy of this AST node.
     */
    clone() {
        return new VarDecl(this.modifiers, this.name.clone(), this.typeDecl.clone(), this.assignment.clone());
    }
}
exports.VarDecl = VarDecl;
exports.default = VarDecl;

},{"./":50,"./utils/assert":51}],48:[function(require,module,exports){
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
        for (const modifier in VarDeclModifier) {
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
        for (const modifier of modifiers) {
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

},{}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("./utils/assert");
const Statement_1 = require("./Statement");
const ExprList_1 = require("./ExprList");
class WhileStatement extends Statement_1.default {
    constructor(condition, body) {
        super([body]);
        this.condition = condition;
        this.body = body;
        assert_1.assertAstNodeParam(condition instanceof ExprList_1.default);
        assert_1.assertAstNodeParam(body instanceof Statement_1.default);
        this.setParentOf(condition, this);
        this.setParentOf(body, this);
    }
    /**
     * Creates an identical copy of this AST node.
     */
    clone() {
        return new WhileStatement(this.condition.clone(), this.body.clone());
    }
}
exports.WhileStatement = WhileStatement;
exports.default = WhileStatement;

},{"./ExprList":23,"./Statement":40,"./utils/assert":51}],50:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/// Interfaces
__export(require("./IContainerNode"));
/// AST Node Types
__export(require("./BaseNode"));
__export(require("./AnonFuncDecl"));
__export(require("./BinaryOperation"));
__export(require("./ClassDecl"));
__export(require("./Comment"));
__export(require("./EnumDecl"));
__export(require("./EnumMemberDecl"));
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
__export(require("./TryCatchStatement"));
__export(require("./TypeExpression"));
__export(require("./UnaryOperation"));
__export(require("./UnaryOperatorPosition"));
__export(require("./VarDecl"));
__export(require("./VarDeclModifier"));
__export(require("./WhileStatement"));

},{"./AnonFuncDecl":12,"./BaseNode":13,"./BinaryOperation":14,"./ClassDecl":15,"./Comment":16,"./ElseIfStatement":17,"./ElseStatement":18,"./EnumDecl":19,"./EnumMemberDecl":20,"./ExportStatement":21,"./Expr":22,"./ExprList":23,"./ExprStatement":24,"./FuncCall":25,"./FuncDecl":26,"./IContainerNode":27,"./Identifier":28,"./IfStatement":29,"./ImportStatement":30,"./MethodDecl":31,"./NumericExpr":32,"./Operator":33,"./OperatorIdent":34,"./ParamDecl":35,"./ParamDeclList":36,"./PrecedenceExpr":37,"./ReturnStatement":38,"./SourceUnit":39,"./Statement":40,"./StringLiteral":41,"./Token":42,"./TryCatchStatement":43,"./TypeExpression":44,"./UnaryOperation":45,"./UnaryOperatorPosition":46,"./VarDecl":47,"./VarDeclModifier":48,"./WhileStatement":49}],51:[function(require,module,exports){
"use strict";
///
/// ast/utils/assert.ts
/// Utilities for assertions in the AST module.
///
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
    utils_1.configurableAssert(condition, errorMessage => new AstNodeParamAssertionException(errorMessage), 'AST node parameter assertion failed.', ...message);
}
exports.assertAstNodeParam = assertAstNodeParam;

},{"@/utils":7}],52:[function(require,module,exports){
"use strict";
///
/// BaseGenerator.ts
/// Generic base class for bash code generators.
///
Object.defineProperty(exports, "__esModule", { value: true });
/// Class
/**
 * Base class for bash code generators. This class generically implements the
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
        this.outputLanguageName = 'bash';
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

},{}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("./BaseGenerator");
const codeGeneratorFactory_1 = require("./codeGeneratorFactory");
/**
 * Main code generator for the bash compile target.
 */
class CodeGenerator extends BaseGenerator_1.BaseGenerator {
    /**
     * Generates code for a given syntax tree.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(ast) {
        return ast.nodes.map(codeGeneratorFactory_1.createForAstNode).join('');
    }
}
exports.CodeGenerator = CodeGenerator;
exports.default = CodeGenerator;

},{"./BaseGenerator":52,"./codeGeneratorFactory":54}],54:[function(require,module,exports){
"use strict";
///
/// factory.ts
/// Functions to register and instantiate bash code generators.
///
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

},{"../../utils/FactoryRegistry":141}],55:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const codeGeneratorFactory_1 = require("../codeGeneratorFactory");
const ast_1 = require("@/compiler/ast");
let AnonFuncDeclCodeGenerator = class AnonFuncDeclCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        return `# anon func decl #`;
    }
};
AnonFuncDeclCodeGenerator = __decorate([
    codeGeneratorFactory_1.register(node => (node instanceof ast_1.AnonFuncDecl &&
        !(node instanceof ast_1.FuncDecl) &&
        !(node instanceof ast_1.MethodDecl)
        ? Infinity
        : 0))
], AnonFuncDeclCodeGenerator);
exports.AnonFuncDeclCodeGenerator = AnonFuncDeclCodeGenerator;

},{"../BaseGenerator":52,"../codeGeneratorFactory":54,"@/compiler/ast":2}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const codeGeneratorFactory_1 = require("../codeGeneratorFactory");
class BaseConditionalStatementCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        return `${this.getConditionalKeyword()} (${codeGeneratorFactory_1.createForAstNode(astNode.condition)}) {
			${codeGeneratorFactory_1.createForAstNode(astNode.body)}
		}\n`;
    }
}
exports.BaseConditionalStatementCodeGenerator = BaseConditionalStatementCodeGenerator;

},{"../BaseGenerator":52,"../codeGeneratorFactory":54}],57:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const codeGeneratorFactory_1 = require("../codeGeneratorFactory");
const ast_1 = require("@/compiler/ast");
let BinaryOperationCodeGenerator = class BinaryOperationCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        let operatorCode = codeGeneratorFactory_1.createForAstNode(astNode.operator).toString();
        if (operatorCode !== '.') {
            operatorCode = ` ${operatorCode} `;
        }
        return [
            codeGeneratorFactory_1.createForAstNode(astNode.leftOperand),
            operatorCode,
            codeGeneratorFactory_1.createForAstNode(astNode.rightOperand)
        ].join('');
    }
};
BinaryOperationCodeGenerator = __decorate([
    codeGeneratorFactory_1.register(node => node instanceof ast_1.BinaryOperation ? 1 : 0)
], BinaryOperationCodeGenerator);
exports.BinaryOperationCodeGenerator = BinaryOperationCodeGenerator;

},{"../BaseGenerator":52,"../codeGeneratorFactory":54,"@/compiler/ast":2}],58:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const codeGeneratorFactory_1 = require("../codeGeneratorFactory");
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
				${instanceVarDecls.map(codeGeneratorFactory_1.createForAstNode).join('')}
			}

			${staticVarDecls.map(codeGeneratorFactory_1.createForAstNode).join('')}

			${methodDecls.map(codeGeneratorFactory_1.createForAstNode).join('')}

			return function() {
				return new ${className}();
			};
		})();

		`;
    }
};
ClassDeclCodeGenerator = __decorate([
    codeGeneratorFactory_1.register(node => node instanceof ast_1.ClassDecl ? Infinity : 0)
], ClassDeclCodeGenerator);
exports.ClassDeclCodeGenerator = ClassDeclCodeGenerator;

},{"../BaseGenerator":52,"../codeGeneratorFactory":54,"@/compiler/ast":2}],59:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const VarDeclCodeGenerator_1 = require("./VarDeclCodeGenerator");
const codeGeneratorFactory_1 = require("../codeGeneratorFactory");
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
    codeGeneratorFactory_1.register(node => (node instanceof ast_1.VarDecl &&
        node.parent instanceof ast_1.Statement &&
        node.parent.parent instanceof ast_1.ClassDecl) ? 10 : 0)
], ClassVarDeclCodeGenerator);
exports.ClassVarDeclCodeGenerator = ClassVarDeclCodeGenerator;

},{"../codeGeneratorFactory":54,"./VarDeclCodeGenerator":84,"@/compiler/ast":2}],60:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const codeGeneratorFactory_1 = require("../codeGeneratorFactory");
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
    codeGeneratorFactory_1.register(node => node instanceof ast_1.Comment ? Infinity : 0)
], CommentCodeGenerator);
exports.CommentCodeGenerator = CommentCodeGenerator;

},{"../BaseGenerator":52,"../codeGeneratorFactory":54,"@/compiler/ast":2}],61:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseConditionalStatementCodeGenerator_1 = require("./BaseConditionalStatementCodeGenerator");
const codeGeneratorFactory_1 = require("../codeGeneratorFactory");
const ast_1 = require("@/compiler/ast");
let ElseIfStatementCodeGenerator = class ElseIfStatementCodeGenerator extends BaseConditionalStatementCodeGenerator_1.BaseConditionalStatementCodeGenerator {
    getConditionalKeyword() { return 'else if'; }
};
ElseIfStatementCodeGenerator = __decorate([
    codeGeneratorFactory_1.register(node => node instanceof ast_1.ElseIfStatement ? 10 : 0)
], ElseIfStatementCodeGenerator);
exports.ElseIfStatementCodeGenerator = ElseIfStatementCodeGenerator;

},{"../codeGeneratorFactory":54,"./BaseConditionalStatementCodeGenerator":56,"@/compiler/ast":2}],62:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const codeGeneratorFactory_1 = require("../codeGeneratorFactory");
const ast_1 = require("@/compiler/ast");
let ElseStatementCodeGenerator = class ElseStatementCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        return `else {
			${astNode.nodes.map(codeGeneratorFactory_1.createForAstNode).join('')}
		}\n`;
    }
};
ElseStatementCodeGenerator = __decorate([
    codeGeneratorFactory_1.register(node => node instanceof ast_1.ElseStatement ? 1 : 0)
], ElseStatementCodeGenerator);
exports.ElseStatementCodeGenerator = ElseStatementCodeGenerator;

},{"../BaseGenerator":52,"../codeGeneratorFactory":54,"@/compiler/ast":2}],63:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const codeGeneratorFactory_1 = require("../codeGeneratorFactory");
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
    codeGeneratorFactory_1.register(node => node === ast_1.Statement.Empty ? Infinity : 0)
], EmptyStatmenetCodeGenerator);
exports.EmptyStatmenetCodeGenerator = EmptyStatmenetCodeGenerator;

},{"../BaseGenerator":52,"../codeGeneratorFactory":54,"@/compiler/ast":2}],64:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const codeGeneratorFactory_1 = require("../codeGeneratorFactory");
const ast_1 = require("@/compiler/ast");
let EnumDeclCodeGenerator = class EnumDeclCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        const enumName = astNode.name.rawValue;
        const memberDecls = astNode.body.nodes.filter(node => (node instanceof ast_1.EnumMemberDecl));
        return `
		/** @enum ${enumName} */
		var ${enumName} = {
			${memberDecls.map(codeGeneratorFactory_1.createForAstNode).join(',\n')}
		};\n\n`;
    }
};
EnumDeclCodeGenerator = __decorate([
    codeGeneratorFactory_1.register(node => node instanceof ast_1.EnumDecl ? Infinity : 0)
], EnumDeclCodeGenerator);
exports.EnumDeclCodeGenerator = EnumDeclCodeGenerator;

},{"../BaseGenerator":52,"../codeGeneratorFactory":54,"@/compiler/ast":2}],65:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const codeGeneratorFactory_1 = require("../codeGeneratorFactory");
const ast_1 = require("@/compiler/ast");
let EnumMemberDeclCodeGenerator = class EnumMemberDeclCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        const declName = astNode.name.rawValue;
        return `'${declName}': '${declName}'`;
    }
};
EnumMemberDeclCodeGenerator = __decorate([
    codeGeneratorFactory_1.register(node => node instanceof ast_1.EnumMemberDecl ? Infinity : 0)
], EnumMemberDeclCodeGenerator);
exports.EnumMemberDeclCodeGenerator = EnumMemberDeclCodeGenerator;

},{"../BaseGenerator":52,"../codeGeneratorFactory":54,"@/compiler/ast":2}],66:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const codeGeneratorFactory_1 = require("../codeGeneratorFactory");
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
    codeGeneratorFactory_1.register(node => node instanceof ast_1.ExportStatement ? Infinity : 0)
], ExportStatementCodeGenerator);
exports.ExportStatementCodeGenerator = ExportStatementCodeGenerator;

},{"../BaseGenerator":52,"../codeGeneratorFactory":54,"@/compiler/ast":2}],67:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const codeGeneratorFactory_1 = require("../codeGeneratorFactory");
const ast_1 = require("@/compiler/ast");
let ExprCodeGenerator = class ExprCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        if (astNode.content instanceof ast_1.BaseNode) {
            return codeGeneratorFactory_1.createForAstNode(astNode.content);
        }
        if (typeof astNode.content !== 'string') {
            return '';
        }
        return astNode.content.toString();
    }
};
ExprCodeGenerator = __decorate([
    codeGeneratorFactory_1.register(node => node instanceof ast_1.Expr ? 1 : 0)
], ExprCodeGenerator);
exports.ExprCodeGenerator = ExprCodeGenerator;

},{"../BaseGenerator":52,"../codeGeneratorFactory":54,"@/compiler/ast":2}],68:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const codeGeneratorFactory_1 = require("../codeGeneratorFactory");
const ast_1 = require("@/compiler/ast");
let ExprListCodeGenerator = class ExprListCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        return astNode.expressions.map(codeGeneratorFactory_1.createForAstNode).join(', ');
    }
};
ExprListCodeGenerator = __decorate([
    codeGeneratorFactory_1.register(node => node instanceof ast_1.ExprList ? Infinity : 0)
], ExprListCodeGenerator);
exports.ExprListCodeGenerator = ExprListCodeGenerator;

},{"../BaseGenerator":52,"../codeGeneratorFactory":54,"@/compiler/ast":2}],69:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const codeGeneratorFactory_1 = require("../codeGeneratorFactory");
const ast_1 = require("@/compiler/ast");
let ExprCodeGenerator = class ExprCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        return `${codeGeneratorFactory_1.createForAstNode(astNode.expression)};\n`;
    }
};
ExprCodeGenerator = __decorate([
    codeGeneratorFactory_1.register(node => node instanceof ast_1.ExprStatement ? 1 : 0)
], ExprCodeGenerator);
exports.ExprCodeGenerator = ExprCodeGenerator;

},{"../BaseGenerator":52,"../codeGeneratorFactory":54,"@/compiler/ast":2}],70:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const codeGeneratorFactory_1 = require("../codeGeneratorFactory");
const ast_1 = require("@/compiler/ast");
let ExprListCodeGenerator = class ExprListCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        return [
            codeGeneratorFactory_1.createForAstNode(astNode.identifier),
            '(', codeGeneratorFactory_1.createForAstNode(astNode.parameterList), ')'
        ];
    }
};
ExprListCodeGenerator = __decorate([
    codeGeneratorFactory_1.register(node => node instanceof ast_1.FuncCall ? Infinity : 0)
], ExprListCodeGenerator);
exports.ExprListCodeGenerator = ExprListCodeGenerator;

},{"../BaseGenerator":52,"../codeGeneratorFactory":54,"@/compiler/ast":2}],71:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const codeGeneratorFactory_1 = require("../codeGeneratorFactory");
const ast_1 = require("@/compiler/ast");
let FuncDeclCodeGenerator = class FuncDeclCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        return `
		${astNode.name.rawValue}() {
			# parameter declarations:
			${codeGeneratorFactory_1.createForAstNode(astNode.runtimeParamDecls)}

			# function implementation:
			${codeGeneratorFactory_1.createForAstNode(astNode.body)}
		}
		`;
    }
};
FuncDeclCodeGenerator = __decorate([
    codeGeneratorFactory_1.register(node => (node instanceof ast_1.FuncDecl && !(node instanceof ast_1.MethodDecl)
        ? Infinity
        : 0))
], FuncDeclCodeGenerator);
exports.FuncDeclCodeGenerator = FuncDeclCodeGenerator;

},{"../BaseGenerator":52,"../codeGeneratorFactory":54,"@/compiler/ast":2}],72:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseConditionalStatementCodeGenerator_1 = require("./BaseConditionalStatementCodeGenerator");
const codeGeneratorFactory_1 = require("../codeGeneratorFactory");
const ast_1 = require("@/compiler/ast");
let IfStatementCodeGenerator = class IfStatementCodeGenerator extends BaseConditionalStatementCodeGenerator_1.BaseConditionalStatementCodeGenerator {
    getConditionalKeyword() { return 'if'; }
};
IfStatementCodeGenerator = __decorate([
    codeGeneratorFactory_1.register(node => node instanceof ast_1.IfStatement ? 1 : 0)
], IfStatementCodeGenerator);
exports.IfStatementCodeGenerator = IfStatementCodeGenerator;

},{"../codeGeneratorFactory":54,"./BaseConditionalStatementCodeGenerator":56,"@/compiler/ast":2}],73:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const codeGeneratorFactory_1 = require("../codeGeneratorFactory");
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
    codeGeneratorFactory_1.register(node => node instanceof ast_1.ImportStatement ? Infinity : 0)
], ImportStatementCodeGenerator);
exports.ImportStatementCodeGenerator = ImportStatementCodeGenerator;

},{"../BaseGenerator":52,"../codeGeneratorFactory":54,"@/compiler/ast":2}],74:[function(require,module,exports){
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
const codeGeneratorFactory_1 = require("../codeGeneratorFactory");
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
            `${className}_${methodName} = `,
            new FuncDeclCodeGenerator_1.FuncDeclCodeGenerator(astNode).generateCode().trim(),
            '\n'
        ].join('');
    }
};
MethodDeclCodeGenerator = __decorate([
    codeGeneratorFactory_1.register(node => node instanceof ast_1.MethodDecl ? Infinity : 0)
], MethodDeclCodeGenerator);
exports.MethodDeclCodeGenerator = MethodDeclCodeGenerator;

},{"../BaseGenerator":52,"../codeGeneratorFactory":54,"./FuncDeclCodeGenerator":71,"@/compiler/ast":2}],75:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const codeGeneratorFactory_1 = require("../codeGeneratorFactory");
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
    codeGeneratorFactory_1.register(node => node instanceof ast_1.Operator ? 1 : 0)
], OperatorCodeGenerator);
exports.OperatorCodeGenerator = OperatorCodeGenerator;

},{"../BaseGenerator":52,"../codeGeneratorFactory":54,"@/compiler/ast":2}],76:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const codeGeneratorFactory_1 = require("../codeGeneratorFactory");
const ast_1 = require("@/compiler/ast");
let ParamDeclListCodeGenerator = class ParamDeclListCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        return astNode.paramDecls.map((paramDecl, index) => `local ${paramDecl.name.rawValue}=${index}`).join('\n');
    }
};
ParamDeclListCodeGenerator = __decorate([
    codeGeneratorFactory_1.register(node => node instanceof ast_1.ParamDeclList ? Infinity : 0)
], ParamDeclListCodeGenerator);
exports.ParamDeclListCodeGenerator = ParamDeclListCodeGenerator;

},{"../BaseGenerator":52,"../codeGeneratorFactory":54,"@/compiler/ast":2}],77:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const codeGeneratorFactory_1 = require("../codeGeneratorFactory");
const ast_1 = require("@/compiler/ast");
let PrecedenceExprCodeGenerator = class PrecedenceExprCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        return ['(', codeGeneratorFactory_1.createForAstNode(astNode.expr), ')'];
    }
};
PrecedenceExprCodeGenerator = __decorate([
    codeGeneratorFactory_1.register(node => node instanceof ast_1.PrecedenceExpr ? Infinity : 0)
], PrecedenceExprCodeGenerator);
exports.PrecedenceExprCodeGenerator = PrecedenceExprCodeGenerator;

},{"../BaseGenerator":52,"../codeGeneratorFactory":54,"@/compiler/ast":2}],78:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const codeGeneratorFactory_1 = require("../codeGeneratorFactory");
const ast_1 = require("@/compiler/ast");
let ReturnStatementCodeGenerator = class ReturnStatementCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        return `return ${codeGeneratorFactory_1.createForAstNode(astNode.returnValue)};\n`;
    }
};
ReturnStatementCodeGenerator = __decorate([
    codeGeneratorFactory_1.register(node => node instanceof ast_1.ReturnStatement ? Infinity : 0)
], ReturnStatementCodeGenerator);
exports.ReturnStatementCodeGenerator = ReturnStatementCodeGenerator;

},{"../BaseGenerator":52,"../codeGeneratorFactory":54,"@/compiler/ast":2}],79:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const codeGeneratorFactory_1 = require("../codeGeneratorFactory");
const ast_1 = require("@/compiler/ast");
let StatementCodeGenerator = class StatementCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        return astNode.nodes.map(codeGeneratorFactory_1.createForAstNode).join('');
    }
};
StatementCodeGenerator = __decorate([
    codeGeneratorFactory_1.register(node => node instanceof ast_1.Statement ? 1 : 0)
], StatementCodeGenerator);
exports.StatementCodeGenerator = StatementCodeGenerator;

},{"../BaseGenerator":52,"../codeGeneratorFactory":54,"@/compiler/ast":2}],80:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const codeGeneratorFactory_1 = require("../codeGeneratorFactory");
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
    codeGeneratorFactory_1.register(node => node instanceof ast_1.StringLiteral ? Infinity : 0)
], StringLiteralCodeGenerator);
exports.StringLiteralCodeGenerator = StringLiteralCodeGenerator;

},{"../BaseGenerator":52,"../codeGeneratorFactory":54,"@/compiler/ast":2}],81:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const codeGeneratorFactory_1 = require("../codeGeneratorFactory");
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
    codeGeneratorFactory_1.register(node => node instanceof ast_1.Token ? 1 : 0)
], TokenCodeGenerator);
exports.TokenCodeGenerator = TokenCodeGenerator;

},{"../BaseGenerator":52,"../codeGeneratorFactory":54,"@/compiler/ast":2}],82:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const codeGeneratorFactory_1 = require("../codeGeneratorFactory");
const ast_1 = require("@/compiler/ast");
let TryCatchStatementCodeGenerator = class TryCatchStatementCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        let code = this.generateTryBlock(astNode);
        if (astNode.errorIdentifier) {
            code += this.generateCatchBlockWithErrorVariable(astNode);
        }
        else {
            code += this.generateCatchBlockWithoutErrorVariable(astNode);
        }
        return code;
    }
    generateTryBlock(astNode) {
        return `try {
			${codeGeneratorFactory_1.createForAstNode(astNode.attemptStatement)}
		}`;
    }
    generateCatchBlockWithoutErrorVariable(astNode) {
        return ` catch {
			${codeGeneratorFactory_1.createForAstNode(astNode.errorHandlerStatement)}
		}`;
    }
    generateCatchBlockWithErrorVariable(astNode) {
        return ` catch (${astNode.errorIdentifier.name.rawValue}) {
			${codeGeneratorFactory_1.createForAstNode(astNode.errorHandlerStatement)}
		}`;
    }
};
TryCatchStatementCodeGenerator = __decorate([
    codeGeneratorFactory_1.register(node => node instanceof ast_1.TryCatchStatement ? Infinity : 0)
], TryCatchStatementCodeGenerator);
exports.TryCatchStatementCodeGenerator = TryCatchStatementCodeGenerator;

},{"../BaseGenerator":52,"../codeGeneratorFactory":54,"@/compiler/ast":2}],83:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const codeGeneratorFactory_1 = require("../codeGeneratorFactory");
const ast_1 = require("@/compiler/ast");
let UnaryOperationCodeGenerator = class UnaryOperationCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        const parts = [
            codeGeneratorFactory_1.createForAstNode(astNode.operand),
            codeGeneratorFactory_1.createForAstNode(astNode.operator)
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
    codeGeneratorFactory_1.register(node => node instanceof ast_1.UnaryOperation ? Infinity : 0)
], UnaryOperationCodeGenerator);
exports.UnaryOperationCodeGenerator = UnaryOperationCodeGenerator;

},{"../BaseGenerator":52,"../codeGeneratorFactory":54,"@/compiler/ast":2}],84:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const codeGeneratorFactory_1 = require("../codeGeneratorFactory");
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
            assignmentCode = ` = ${codeGeneratorFactory_1.createForAstNode(astNode.assignment)}`;
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
    codeGeneratorFactory_1.register(node => node instanceof ast_1.VarDecl ? 1 : 0)
], VarDeclCodeGenerator);
exports.VarDeclCodeGenerator = VarDeclCodeGenerator;

},{"../BaseGenerator":52,"../codeGeneratorFactory":54,"@/compiler/ast":2}],85:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const codeGeneratorFactory_1 = require("../codeGeneratorFactory");
const ast_1 = require("@/compiler/ast");
let WhileStatementCodeGenerator = class WhileStatementCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        return `while (${codeGeneratorFactory_1.createForAstNode(astNode.condition)}) {
            ${codeGeneratorFactory_1.createForAstNode(astNode.body)}
        }\n`;
    }
};
WhileStatementCodeGenerator = __decorate([
    codeGeneratorFactory_1.register(node => node instanceof ast_1.WhileStatement ? Infinity : 0)
], WhileStatementCodeGenerator);
exports.WhileStatementCodeGenerator = WhileStatementCodeGenerator;

},{"../BaseGenerator":52,"../codeGeneratorFactory":54,"@/compiler/ast":2}],86:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./AnonFuncDeclCodeGenerator");
require("./BaseConditionalStatementCodeGenerator");
require("./BinaryOperationCodeGenerator");
require("./ClassDeclCodeGenerator");
require("./ClassVarDeclCodeGenerator");
require("./CommentCodeGenerator");
require("./ElseIfStatementCodeGenerator");
require("./ElseStatementCodeGenerator");
require("./EmptyStatementCodeGenerator");
require("./EnumDeclCodeGenerator");
require("./EnumMemberDeclCodeGenerator");
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
require("./TryCatchStatementGenerator");
require("./UnaryOperationCodeGenerator");
require("./VarDeclCodeGenerator");
require("./WhileStatementCodeGenerator");

},{"./AnonFuncDeclCodeGenerator":55,"./BaseConditionalStatementCodeGenerator":56,"./BinaryOperationCodeGenerator":57,"./ClassDeclCodeGenerator":58,"./ClassVarDeclCodeGenerator":59,"./CommentCodeGenerator":60,"./ElseIfStatementCodeGenerator":61,"./ElseStatementCodeGenerator":62,"./EmptyStatementCodeGenerator":63,"./EnumDeclCodeGenerator":64,"./EnumMemberDeclCodeGenerator":65,"./ExportStatementCodeGenerator":66,"./ExprCodeGenerator":67,"./ExprListCodeGenerator":68,"./ExprStatementCodeGenerator":69,"./FuncCallCodeGenerator":70,"./FuncDeclCodeGenerator":71,"./IfStatementCodeGenerator":72,"./ImportStatementCodeGenerator":73,"./MethodDeclCodeGenerator":74,"./OperatorCodeGenerator":75,"./ParamDeclListCodeGenerator":76,"./PrecedenceExprCodeGenerator":77,"./ReturnStatementCodeGenerator":78,"./StatementCodeGenerator":79,"./StringLiteralCodeGenerator":80,"./TokenCodeGenerator":81,"./TryCatchStatementGenerator":82,"./UnaryOperationCodeGenerator":83,"./VarDeclCodeGenerator":84,"./WhileStatementCodeGenerator":85}],87:[function(require,module,exports){
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

},{"./CodeGenerator":53,"./generator/":86}],88:[function(require,module,exports){
"use strict";
///
/// BaseGenerator.ts
/// Generic base class for EcmaScript code generators.
///
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

},{}],89:[function(require,module,exports){
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

},{"./BaseGenerator":88,"./factory":90}],90:[function(require,module,exports){
"use strict";
///
/// factory.ts
/// Functions to register and instantiate EcmaScript code generators.
///
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

},{"../../utils/FactoryRegistry":141}],91:[function(require,module,exports){
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
let AnonFuncDeclCodeGenerator = class AnonFuncDeclCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        return `(function (${factory_1.createForAstNode(astNode.runtimeParamDecls)}) {
			${factory_1.createForAstNode(astNode.body)}
		})`;
    }
};
AnonFuncDeclCodeGenerator = __decorate([
    factory_1.register(node => (node instanceof ast_1.AnonFuncDecl &&
        !(node instanceof ast_1.FuncDecl) &&
        !(node instanceof ast_1.MethodDecl)
        ? Infinity
        : 0))
], AnonFuncDeclCodeGenerator);
exports.AnonFuncDeclCodeGenerator = AnonFuncDeclCodeGenerator;

},{"../BaseGenerator":88,"../factory":90,"@/compiler/ast":2}],92:[function(require,module,exports){
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

},{"../BaseGenerator":88,"../factory":90}],93:[function(require,module,exports){
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

},{"../BaseGenerator":88,"../factory":90,"@/compiler/ast":2}],94:[function(require,module,exports){
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

			return function() {
				return new ${className}();
			};
		})();

		`;
    }
};
ClassDeclCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.ClassDecl ? Infinity : 0)
], ClassDeclCodeGenerator);
exports.ClassDeclCodeGenerator = ClassDeclCodeGenerator;

},{"../BaseGenerator":88,"../factory":90,"@/compiler/ast":2}],95:[function(require,module,exports){
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

},{"../factory":90,"./VarDeclCodeGenerator":120,"@/compiler/ast":2}],96:[function(require,module,exports){
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

},{"../BaseGenerator":88,"../factory":90,"@/compiler/ast":2}],97:[function(require,module,exports){
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

},{"../factory":90,"./BaseConditionalStatementCodeGenerator":92,"@/compiler/ast":2}],98:[function(require,module,exports){
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

},{"../BaseGenerator":88,"../factory":90,"@/compiler/ast":2}],99:[function(require,module,exports){
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

},{"../BaseGenerator":88,"../factory":90,"@/compiler/ast":2}],100:[function(require,module,exports){
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
let EnumDeclCodeGenerator = class EnumDeclCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        const enumName = astNode.name.rawValue;
        const memberDecls = astNode.body.nodes.filter(node => (node instanceof ast_1.EnumMemberDecl));
        return `
		/** @enum ${enumName} */
		var ${enumName} = {
			${memberDecls.map(factory_1.createForAstNode).join(',\n')}
		};\n\n`;
    }
};
EnumDeclCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.EnumDecl ? Infinity : 0)
], EnumDeclCodeGenerator);
exports.EnumDeclCodeGenerator = EnumDeclCodeGenerator;

},{"../BaseGenerator":88,"../factory":90,"@/compiler/ast":2}],101:[function(require,module,exports){
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
let EnumMemberDeclCodeGenerator = class EnumMemberDeclCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        const declName = astNode.name.rawValue;
        return `'${declName}': '${declName}'`;
    }
};
EnumMemberDeclCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.EnumMemberDecl ? Infinity : 0)
], EnumMemberDeclCodeGenerator);
exports.EnumMemberDeclCodeGenerator = EnumMemberDeclCodeGenerator;

},{"../BaseGenerator":88,"../factory":90,"@/compiler/ast":2}],102:[function(require,module,exports){
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

},{"../BaseGenerator":88,"../factory":90,"@/compiler/ast":2}],103:[function(require,module,exports){
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

},{"../BaseGenerator":88,"../factory":90,"@/compiler/ast":2}],104:[function(require,module,exports){
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

},{"../BaseGenerator":88,"../factory":90,"@/compiler/ast":2}],105:[function(require,module,exports){
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

},{"../BaseGenerator":88,"../factory":90,"@/compiler/ast":2}],106:[function(require,module,exports){
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

},{"../BaseGenerator":88,"../factory":90,"@/compiler/ast":2}],107:[function(require,module,exports){
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

},{"../BaseGenerator":88,"../factory":90,"@/compiler/ast":2}],108:[function(require,module,exports){
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

},{"../factory":90,"./BaseConditionalStatementCodeGenerator":92,"@/compiler/ast":2}],109:[function(require,module,exports){
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

},{"../BaseGenerator":88,"../factory":90,"@/compiler/ast":2}],110:[function(require,module,exports){
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

},{"../BaseGenerator":88,"../factory":90,"./FuncDeclCodeGenerator":107,"@/compiler/ast":2}],111:[function(require,module,exports){
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

},{"../BaseGenerator":88,"../factory":90,"@/compiler/ast":2}],112:[function(require,module,exports){
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

},{"../BaseGenerator":88,"../factory":90,"@/compiler/ast":2}],113:[function(require,module,exports){
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

},{"../BaseGenerator":88,"../factory":90,"@/compiler/ast":2}],114:[function(require,module,exports){
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

},{"../BaseGenerator":88,"../factory":90,"@/compiler/ast":2}],115:[function(require,module,exports){
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

},{"../BaseGenerator":88,"../factory":90,"@/compiler/ast":2}],116:[function(require,module,exports){
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

},{"../BaseGenerator":88,"../factory":90,"@/compiler/ast":2}],117:[function(require,module,exports){
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

},{"../BaseGenerator":88,"../factory":90,"@/compiler/ast":2}],118:[function(require,module,exports){
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
let TryCatchStatementCodeGenerator = class TryCatchStatementCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        let code = this.generateTryBlock(astNode);
        if (astNode.errorIdentifier) {
            code += this.generateCatchBlockWithErrorVariable(astNode);
        }
        else {
            code += this.generateCatchBlockWithoutErrorVariable(astNode);
        }
        return code;
    }
    generateTryBlock(astNode) {
        return `try {
			${factory_1.createForAstNode(astNode.attemptStatement)}
		}`;
    }
    generateCatchBlockWithoutErrorVariable(astNode) {
        return ` catch {
			${factory_1.createForAstNode(astNode.errorHandlerStatement)}
		}`;
    }
    generateCatchBlockWithErrorVariable(astNode) {
        return ` catch (${astNode.errorIdentifier.name.rawValue}) {
			${factory_1.createForAstNode(astNode.errorHandlerStatement)}
		}`;
    }
};
TryCatchStatementCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.TryCatchStatement ? Infinity : 0)
], TryCatchStatementCodeGenerator);
exports.TryCatchStatementCodeGenerator = TryCatchStatementCodeGenerator;

},{"../BaseGenerator":88,"../factory":90,"@/compiler/ast":2}],119:[function(require,module,exports){
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

},{"../BaseGenerator":88,"../factory":90,"@/compiler/ast":2}],120:[function(require,module,exports){
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

},{"../BaseGenerator":88,"../factory":90,"@/compiler/ast":2}],121:[function(require,module,exports){
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
let WhileStatementCodeGenerator = class WhileStatementCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        return `while (${factory_1.createForAstNode(astNode.condition)}) {
            ${factory_1.createForAstNode(astNode.body)}
        }\n`;
    }
};
WhileStatementCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.WhileStatement ? Infinity : 0)
], WhileStatementCodeGenerator);
exports.WhileStatementCodeGenerator = WhileStatementCodeGenerator;

},{"../BaseGenerator":88,"../factory":90,"@/compiler/ast":2}],122:[function(require,module,exports){
arguments[4][86][0].apply(exports,arguments)
},{"./AnonFuncDeclCodeGenerator":91,"./BaseConditionalStatementCodeGenerator":92,"./BinaryOperationCodeGenerator":93,"./ClassDeclCodeGenerator":94,"./ClassVarDeclCodeGenerator":95,"./CommentCodeGenerator":96,"./ElseIfStatementCodeGenerator":97,"./ElseStatementCodeGenerator":98,"./EmptyStatementCodeGenerator":99,"./EnumDeclCodeGenerator":100,"./EnumMemberDeclCodeGenerator":101,"./ExportStatementCodeGenerator":102,"./ExprCodeGenerator":103,"./ExprListCodeGenerator":104,"./ExprStatementCodeGenerator":105,"./FuncCallCodeGenerator":106,"./FuncDeclCodeGenerator":107,"./IfStatementCodeGenerator":108,"./ImportStatementCodeGenerator":109,"./MethodDeclCodeGenerator":110,"./OperatorCodeGenerator":111,"./ParamDeclListCodeGenerator":112,"./PrecedenceExprCodeGenerator":113,"./ReturnStatementCodeGenerator":114,"./StatementCodeGenerator":115,"./StringLiteralCodeGenerator":116,"./TokenCodeGenerator":117,"./TryCatchStatementGenerator":118,"./UnaryOperationCodeGenerator":119,"./VarDeclCodeGenerator":120,"./WhileStatementCodeGenerator":121,"dup":86}],123:[function(require,module,exports){
arguments[4][87][0].apply(exports,arguments)
},{"./CodeGenerator":89,"./generator/":122,"dup":87}],124:[function(require,module,exports){
"use strict";
///
/// BaseGenerator.ts
/// Generic base class for TypeScript Declaration code generators.
///
Object.defineProperty(exports, "__esModule", { value: true });
/// Class
/**
 * Base class for TypeScriptDeclaration code generators. This class generically implements
 * the `ICodeGenerator` interface, making the implementation of concrete code generators
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
        this.outputLanguageName = 'TypeScriptDeclarations';
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

},{}],125:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("./BaseGenerator");
const factory_1 = require("./factory");
/**
 * Main code generator for the TypeScript Declarations compile target.
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

},{"./BaseGenerator":124,"./factory":126}],126:[function(require,module,exports){
"use strict";
///
/// factory.ts
/// Functions to register and instantiate TypeScript code generators.
///
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

},{"../../utils/FactoryRegistry":141}],127:[function(require,module,exports){
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
        return `export class ${className} {
			${staticVarDecls.map(factory_1.createForAstNode).join('')}
			${instanceVarDecls.map(factory_1.createForAstNode).join('')}
			${methodDecls.map(factory_1.createForAstNode).join('')}
		}\n`;
    }
};
ClassDeclCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.ClassDecl ? Infinity : 0)
], ClassDeclCodeGenerator);
exports.ClassDeclCodeGenerator = ClassDeclCodeGenerator;

},{"../BaseGenerator":124,"../factory":126,"@/compiler/ast":2}],128:[function(require,module,exports){
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
        const isConst = ast_1.VarDeclModifier.doesCombinationContain(astNode.modifiers, ast_1.VarDeclModifier.Const);
        let keywords = 'public ';
        if (isStatic) {
            keywords += 'static ';
        }
        if (isConst) {
            keywords += 'readonly ';
        }
        return keywords;
    }
};
ClassVarDeclCodeGenerator = __decorate([
    factory_1.register(node => (node instanceof ast_1.VarDecl &&
        node.parent instanceof ast_1.Statement &&
        node.parent.parent instanceof ast_1.ClassDecl) ? 10 : 0)
], ClassVarDeclCodeGenerator);
exports.ClassVarDeclCodeGenerator = ClassVarDeclCodeGenerator;

},{"../factory":126,"./VarDeclCodeGenerator":135,"@/compiler/ast":2}],129:[function(require,module,exports){
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
let EnumDeclCodeGenerator = class EnumDeclCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        const className = astNode.name.rawValue;
        const memberDecls = astNode.body.nodes.filter(node => (node instanceof ast_1.EnumMemberDecl));
        return `export enum ${className} {
			${memberDecls.map(factory_1.createForAstNode).join(',\n')}
		}\n\n`;
    }
};
EnumDeclCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.EnumDecl ? Infinity : 0)
], EnumDeclCodeGenerator);
exports.EnumDeclCodeGenerator = EnumDeclCodeGenerator;

},{"../BaseGenerator":124,"../factory":126,"@/compiler/ast":2}],130:[function(require,module,exports){
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
let EnumDeclCodeGenerator = class EnumDeclCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        const declName = astNode.name.rawValue;
        return `${declName}`;
    }
};
EnumDeclCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.EnumMemberDecl ? Infinity : 0)
], EnumDeclCodeGenerator);
exports.EnumDeclCodeGenerator = EnumDeclCodeGenerator;

},{"../BaseGenerator":124,"../factory":126,"@/compiler/ast":2}],131:[function(require,module,exports){
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
        let returnTypeExpr = factory_1.createForAstNode(astNode.returnTypeDecl).toString();
        if (returnTypeExpr.length > 0) {
            returnTypeExpr = `: ${returnTypeExpr}`;
        }
        return `export function ${astNode.name.rawValue}(${factory_1.createForAstNode(astNode.runtimeParamDecls)})${returnTypeExpr};\n`;
    }
};
FuncDeclCodeGenerator = __decorate([
    factory_1.register(node => (node instanceof ast_1.FuncDecl && !(node instanceof ast_1.MethodDecl)
        ? Infinity
        : 0))
], FuncDeclCodeGenerator);
exports.FuncDeclCodeGenerator = FuncDeclCodeGenerator;

},{"../BaseGenerator":124,"../factory":126,"@/compiler/ast":2}],132:[function(require,module,exports){
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
        let returnTypeExpr = factory_1.createForAstNode(astNode.returnTypeDecl).toString();
        if (returnTypeExpr.length > 0) {
            returnTypeExpr = `: ${returnTypeExpr}`;
        }
        return `public ${astNode.name.rawValue}(${factory_1.createForAstNode(astNode.runtimeParamDecls)})${returnTypeExpr};\n`;
    }
};
MethodDeclCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.MethodDecl ? Infinity : 0)
], MethodDeclCodeGenerator);
exports.MethodDeclCodeGenerator = MethodDeclCodeGenerator;

},{"../BaseGenerator":124,"../factory":126,"@/compiler/ast":2}],133:[function(require,module,exports){
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
        return astNode.paramDecls.map(paramDecl => {
            let typeExpr = factory_1.createForAstNode(paramDecl.typeDecl).toString();
            if (typeExpr.length > 0) {
                typeExpr = `: ${typeExpr}`;
            }
            return `${paramDecl.name.rawValue}${typeExpr}`;
        }).join(', ');
    }
};
ParamDeclListCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.ParamDeclList ? Infinity : 0)
], ParamDeclListCodeGenerator);
exports.ParamDeclListCodeGenerator = ParamDeclListCodeGenerator;

},{"../BaseGenerator":124,"../factory":126,"@/compiler/ast":2}],134:[function(require,module,exports){
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
let TypeExprCodeGenerator = class TypeExprCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        let code = astNode.typeIdentifier.rawValue;
        switch (code) {
            default:
                // do nothing
                break;
            case 'Void':
            case 'Any':
            case 'String':
            case 'Int':
            case 'Float':
                code = `TSH.TypeScript.${code}`;
                break;
        }
        return code;
    }
};
TypeExprCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.TypeExpr ? Infinity : 0)
], TypeExprCodeGenerator);
exports.TypeExprCodeGenerator = TypeExprCodeGenerator;

},{"../BaseGenerator":124,"../factory":126,"@/compiler/ast":2}],135:[function(require,module,exports){
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
        return `${this.generateDeclarationKeyword(astNode)}${astNode.name.rawValue};\n`;
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

},{"../BaseGenerator":124,"../factory":126,"@/compiler/ast":2}],136:[function(require,module,exports){
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
let IgnoredCodeGenerator = class IgnoredCodeGenerator extends BaseGenerator_1.default {
    /**
     * Generates code for a given syntax tree.
     * This method is automatically called by the `BaseGenerator` class whenever necessary.
     * @param ast The syntax tree to generate code for.
     */
    generateCodeConcrete(astNode) {
        return '';
    }
};
IgnoredCodeGenerator = __decorate([
    factory_1.register(node => node instanceof ast_1.BaseNode ? 1 : 0)
], IgnoredCodeGenerator);
exports.IgnoredCodeGenerator = IgnoredCodeGenerator;

},{"../BaseGenerator":124,"../factory":126,"@/compiler/ast":2}],137:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./ClassDeclCodeGenerator");
require("./ClassVarDeclCodeGenerator");
require("./EnumDeclCodeGenerator");
require("./EnumMemberDeclCodeGenerator");
require("./FuncDeclCodeGenerator");
require("./MethodDeclCodeGenerator");
require("./ParamDeclListCodeGenerator");
require("./TypeExprCodeGenerator");
require("./VarDeclCodeGenerator");
require("./Z_IgnoredCodeGenerator");

},{"./ClassDeclCodeGenerator":127,"./ClassVarDeclCodeGenerator":128,"./EnumDeclCodeGenerator":129,"./EnumMemberDeclCodeGenerator":130,"./FuncDeclCodeGenerator":131,"./MethodDeclCodeGenerator":132,"./ParamDeclListCodeGenerator":133,"./TypeExprCodeGenerator":134,"./VarDeclCodeGenerator":135,"./Z_IgnoredCodeGenerator":136}],138:[function(require,module,exports){
arguments[4][87][0].apply(exports,arguments)
},{"./CodeGenerator":125,"./generator/":137,"dup":87}],139:[function(require,module,exports){
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
        ; return o; }, $V0 = [1, 17], $V1 = [1, 18], $V2 = [1, 11], $V3 = [1, 19], $V4 = [1, 20], $V5 = [1, 21], $V6 = [1, 15], $V7 = [1, 16], $V8 = [1, 9], $V9 = [1, 4, 5, 10, 108, 121, 130, 133, 134, 136], $Va = [1, 25], $Vb = [4, 5], $Vc = [1, 32], $Vd = [1, 34], $Ve = [1, 4, 5, 10, 12, 13, 17, 55, 56, 58, 70, 72, 79, 82, 84, 88, 92, 94, 95, 102, 108, 121, 130, 133, 134, 136], $Vf = [2, 124], $Vg = [1, 39], $Vh = [18, 63], $Vi = [2, 117], $Vj = [1, 42], $Vk = [2, 4], $Vl = [1, 45], $Vm = [4, 5, 10, 12, 13, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 55, 56, 58, 63, 70, 72, 79, 82, 84, 88, 91, 92, 94, 95, 102, 108], $Vn = [2, 126], $Vo = [1, 52], $Vp = [1, 54], $Vq = [10, 92, 94, 95, 102, 108], $Vr = [1, 62], $Vs = [1, 4, 5, 10, 12, 13, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 55, 56, 58, 63, 70, 72, 79, 82, 84, 88, 91, 92, 94, 95, 102, 108, 121, 130, 133, 134, 136], $Vt = [1, 80], $Vu = [1, 81], $Vv = [4, 10, 92, 94, 95, 102, 108], $Vw = [1, 89], $Vx = [4, 10, 56, 92], $Vy = [1, 94], $Vz = [1, 100], $VA = [4, 10, 56, 63, 92], $VB = [1, 139], $VC = [1, 140], $VD = [1, 118], $VE = [1, 132], $VF = [1, 119], $VG = [1, 115], $VH = [1, 120], $VI = [1, 113], $VJ = [1, 138], $VK = [4, 10, 12, 13, 17, 55, 56, 58, 70, 79, 82, 88, 92, 94, 95, 108], $VL = [4, 5, 10, 12, 13, 17, 55, 56, 58, 70, 72, 79, 82, 84, 88, 92, 94, 95, 102, 108], $VM = [2, 109], $VN = [1, 142], $VO = [4, 5, 10, 12, 13, 17, 39, 55, 56, 58, 70, 72, 79, 82, 84, 88, 92, 94, 95, 102, 108], $VP = [4, 5, 10, 92, 94, 95, 102, 108], $VQ = [4, 5, 10, 12, 13, 17, 55, 56, 58, 70, 72, 79, 82, 84, 88, 92, 94, 95, 108], $VR = [10, 12, 13, 17, 55, 56, 58, 70, 72, 79, 82, 84, 88, 92, 94, 95, 108], $VS = [1, 150], $VT = [1, 153], $VU = [4, 5, 10, 12, 13, 17, 18, 55, 56, 58, 63, 70, 72, 79, 82, 84, 88, 92, 94, 95, 108], $VV = [1, 160], $VW = [1, 161], $VX = [1, 162], $VY = [1, 163], $VZ = [1, 164], $V_ = [1, 165], $V$ = [1, 166], $V01 = [1, 167], $V11 = [1, 168], $V21 = [1, 169], $V31 = [1, 170], $V41 = [1, 171], $V51 = [1, 172], $V61 = [1, 173], $V71 = [2, 56], $V81 = [2, 47], $V91 = [2, 53], $Va1 = [2, 58], $Vb1 = [2, 14], $Vc1 = [2, 32], $Vd1 = [12, 13, 17, 55, 56, 58, 108], $Ve1 = [1, 227], $Vf1 = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 63], $Vg1 = [4, 5, 10, 12, 13, 17, 18, 55, 56, 58, 63, 70, 72, 79, 82, 84, 88, 91, 92, 94, 95, 102, 108];
    var parser = { trace: function trace() { },
        yy: {},
        symbols_: { "error": 2, "nl_or_eof": 3, "NL": 4, "EOF": 5, "maybe_nl": 6, "maybe_nls": 7, "maybe_nl_or_eof": 8, "comment": 9, "SL_COMMENT": 10, "unary_operator": 11, "INC_OP": 12, "DEC_OP": 13, "atomic_unary_operation": 14, "primary_expr": 15, "unary_operation": 16, "(": 17, ")": 18, "binary_operator": 19, ".": 20, "+": 21, "-": 22, "*": 23, "/": 24, "%": 25, "EQ_OP": 26, "NE_OP": 27, "LE_OP": 28, "GE_OP": 29, "<": 30, ">": 31, "AND_OP": 32, "OR_OP": 33, "atomic_binary_operation": 34, "expression": 35, "precedence_expr_list": 36, "binary_operation": 37, "assignment_operator": 38, "=": 39, "MUL_ASSIGN": 40, "DIV_ASSIGN": 41, "MOD_ASSIGN": 42, "ADD_ASSIGN": 43, "SUB_ASSIGN": 44, "LEFT_ASSIGN": 45, "RIGHT_ASSIGN": 46, "AND_ASSIGN": 47, "XOR_ASSIGN": 48, "OR_ASSIGN": 49, "atomic_assignment_expr": 50, "identifier": 51, "assignment_expr": 52, "func_call_expr": 53, "string_literal": 54, "STRING_LITERAL": 55, "IDENTIFIER": 56, "atomic_primary_expr": 57, "CONSTANT": 58, "anon_func_expr": 59, "anon_func_decl": 60, "operation": 61, "expr_list": 62, ",": 63, "expression_statement": 64, "type_expr": 65, "conditional_body": 66, "statement": 67, "compound_statement": 68, "conditional_if_statement": 69, "IF": 70, "conditional_else_if_statement": 71, "ELSE": 72, "conditional_maybe_else_if_statements": 73, "conditional_else_statement": 74, "conditional_maybe_else_statement": 75, "conditional_statement": 76, "while_body": 77, "while_statement": 78, "WHILE": 79, "try_catch_body": 80, "try_statement": 81, "TRY": 82, "catch_statement": 83, "CATCH": 84, "AS": 85, "try_catch_statement": 86, "return_statement": 87, "RETURN": 88, "var_decl": 89, "statements": 90, "{": 91, "}": 92, "var_decl_modifier": 93, "LET": 94, "CONST": 95, "var_decl_type_decl": 96, ":": 97, "var_decl_name_and_maybe_type_decl": 98, "var_decl_maybe_assignment": 99, "var_decl_end": 100, "static_var_decl_modifier": 101, "STATIC": 102, "static_var_decl": 103, "param_decl_type_expr": 104, "param_decl": 105, "param_decl_list": 106, "func_ident": 107, "FUNCTION": 108, "func_param_decl_list": 109, "func_return_expr": 110, "ARR": 111, "func_body": 112, "func_decl_end": 113, "func_decl": 114, "anon_func_ident": 115, "method_decl": 116, "class_body_statement": 117, "class_body_statements": 118, "class_body_compound_statement": 119, "class_ident": 120, "CLASS": 121, "class_body": 122, "class_decl": 123, "enum_member_decl": 124, "enum_member_decl_list": 125, "enum_body_statement": 126, "enum_body_statements": 127, "enum_body_compound_statement": 128, "enum_ident": 129, "ENUM": 130, "enum_decl": 131, "import_statement": 132, "IMPORT": 133, "EXPORT": 134, "root_grammar": 135, "export_statement": 136, "root_grammar_list": 137, "root": 138, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 4: "NL", 5: "EOF", 10: "SL_COMMENT", 12: "INC_OP", 13: "DEC_OP", 17: "(", 18: ")", 20: ".", 21: "+", 22: "-", 23: "*", 24: "/", 25: "%", 26: "EQ_OP", 27: "NE_OP", 28: "LE_OP", 29: "GE_OP", 30: "<", 31: ">", 32: "AND_OP", 33: "OR_OP", 39: "=", 40: "MUL_ASSIGN", 41: "DIV_ASSIGN", 42: "MOD_ASSIGN", 43: "ADD_ASSIGN", 44: "SUB_ASSIGN", 45: "LEFT_ASSIGN", 46: "RIGHT_ASSIGN", 47: "AND_ASSIGN", 48: "XOR_ASSIGN", 49: "OR_ASSIGN", 55: "STRING_LITERAL", 56: "IDENTIFIER", 58: "CONSTANT", 63: ",", 70: "IF", 72: "ELSE", 79: "WHILE", 82: "TRY", 84: "CATCH", 85: "AS", 88: "RETURN", 91: "{", 92: "}", 94: "LET", 95: "CONST", 97: ":", 102: "STATIC", 108: "FUNCTION", 111: "ARR", 121: "CLASS", 130: "ENUM", 133: "IMPORT", 134: "EXPORT", 136: "export_statement" },
        productions_: [0, [3, 1], [3, 1], [6, 1], [6, 0], [7, 1], [7, 2], [8, 1], [8, 1], [9, 2], [11, 1], [11, 1], [14, 2], [14, 2], [16, 1], [16, 3], [19, 1], [19, 1], [19, 1], [19, 1], [19, 1], [19, 1], [19, 1], [19, 1], [19, 1], [19, 1], [19, 1], [19, 1], [19, 1], [19, 1], [34, 3], [34, 3], [37, 1], [37, 3], [38, 1], [38, 1], [38, 1], [38, 1], [38, 1], [38, 1], [38, 1], [38, 1], [38, 1], [38, 1], [38, 1], [50, 3], [50, 3], [52, 1], [52, 3], [53, 3], [53, 2], [54, 1], [51, 1], [57, 1], [57, 1], [57, 1], [15, 1], [15, 3], [59, 1], [59, 3], [61, 1], [61, 1], [35, 1], [35, 1], [35, 1], [35, 1], [35, 1], [62, 1], [62, 3], [36, 3], [64, 2], [64, 2], [65, 1], [66, 1], [66, 1], [69, 4], [71, 5], [73, 1], [73, 2], [74, 3], [75, 1], [75, 1], [76, 4], [77, 1], [77, 1], [78, 4], [80, 1], [80, 1], [81, 3], [83, 3], [83, 5], [86, 2], [87, 3], [67, 1], [67, 1], [67, 1], [67, 1], [67, 1], [67, 1], [67, 1], [90, 1], [90, 2], [68, 5], [93, 1], [93, 1], [96, 2], [96, 0], [98, 2], [99, 2], [99, 0], [100, 1], [89, 4], [101, 2], [101, 2], [103, 4], [104, 2], [104, 0], [105, 0], [105, 2], [106, 1], [106, 3], [107, 2], [109, 3], [110, 2], [110, 0], [112, 1], [112, 0], [113, 1], [114, 5], [115, 1], [60, 5], [116, 5], [117, 1], [117, 1], [117, 1], [117, 1], [118, 1], [118, 2], [119, 5], [120, 2], [122, 1], [122, 0], [123, 3], [124, 1], [124, 2], [125, 1], [125, 4], [126, 1], [126, 1], [126, 1], [127, 1], [127, 2], [128, 5], [129, 2], [131, 3], [132, 3], [132, 3], [135, 1], [135, 1], [135, 1], [135, 1], [135, 1], [135, 1], [135, 1], [137, 1], [137, 2], [138, 1]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
            /* this == yyval */
            var $0 = $$.length - 1;
            switch (yystate) {
                case 9:
                    const commentContent = new yy.Token($$[$0 - 1], _$[$0 - 1].first_line, _$[$0 - 1].first_column, _$[$0 - 1].last_line, _$[$0 - 1].last_column);
                    this.$ = new yy.Comment([commentContent]);
                    break;
                case 10:
                case 11:
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                case 23:
                case 24:
                case 25:
                case 26:
                case 27:
                case 28:
                case 29:
                case 34:
                case 35:
                case 36:
                case 37:
                case 38:
                case 39:
                case 40:
                case 41:
                case 42:
                case 43:
                case 44:
                    this.$ = yy.getOperatorFromToken($$[$0]);
                    break;
                case 12:
                    this.$ = new yy.UnaryOperation($$[$0 - 1], $$[$0], yy.UnaryOperatorPosition.Postfix);
                    break;
                case 13:
                    this.$ = new yy.UnaryOperation($$[$0], $$[$0 - 1], yy.UnaryOperatorPosition.Prefix);
                    break;
                case 14:
                case 32:
                case 47:
                case 53:
                case 55:
                case 56:
                case 58:
                case 60:
                case 61:
                case 62:
                case 63:
                case 64:
                case 65:
                case 66:
                case 105:
                case 115:
                case 123:
                case 125:
                case 140:
                case 164:
                    this.$ = $$[$0];
                    break;
                case 15:
                case 33:
                case 48:
                case 57:
                case 59:
                    this.$ = new yy.PrecedenceExpr($$[$0 - 1]);
                    break;
                case 30:
                case 31:
                case 45:
                case 46:
                    this.$ = new yy.BinaryOperation($$[$0 - 2], $$[$0 - 1], $$[$0]);
                    break;
                case 49:
                    this.$ = new yy.FuncCall($$[$0 - 2], new yy.ExprList([]));
                    break;
                case 50:
                    var params;
                    if ($$[$0].expr instanceof yy.ExprList) {
                        params = new yy.ExprList($$[$0].expr.expressions);
                    }
                    else {
                        params = new yy.ExprList([$$[$0].expr]);
                    }
                    this.$ = new yy.FuncCall($$[$0 - 1], params);
                    break;
                case 51:
                    /*
                        We replace the quotes by slicing them away. This is trivial since the quotes
                        are *always* the first and last character in the `STRING_LITERAL` terminal.
                        The `.trim()` before the `.slice(...)` shouldn't be necessary, but we're
                        rather safe than sorry.
                    */
                    const stringLiteralContent = new yy.Token(($$[$0]).trim().slice(1, -1), _$[$0].first_line, _$[$0].first_column, _$[$0].last_line, _$[$0].last_column);
                    this.$ = new yy.StringLiteral(stringLiteralContent);
                    break;
                case 52:
                    const identifierContent = new yy.Token($$[$0], _$[$0].first_line, _$[$0].first_column, _$[$0].last_line, _$[$0].last_column);
                    this.$ = new yy.Identifier(identifierContent);
                    break;
                case 54:
                    const atomicPrimaryExprContent = new yy.Token($$[$0], _$[$0].first_line, _$[$0].first_column, _$[$0].last_line, _$[$0].last_column);
                    this.$ = new yy.NumericExpr(atomicPrimaryExprContent);
                    break;
                case 67:
                    const exprs = [];
                    if (typeof $$[$0] !== 'undefined') {
                        exprs.push($$[$0]);
                    }
                    this.$ = new yy.ExprList(exprs);
                    break;
                case 68:
                    this.$ = new yy.ExprList($$[$0 - 2].expressions.concat($$[$0]));
                    break;
                case 69:
                    if ($$[$0 - 1].expressions.length === 1) {
                        this.$ = new yy.PrecedenceExpr($$[$0 - 1].expressions[0]);
                    }
                    else {
                        this.$ = new yy.PrecedenceExpr($$[$0 - 1]);
                    }
                    break;
                case 70:
                    if ($$[$0 - 1].expressions.length === 1) {
                        this.$ = new yy.ExprStatement($$[$0 - 1].expressions[0]);
                    }
                    else {
                        this.$ = new yy.ExprStatement($$[$0 - 1]);
                    }
                    break;
                case 71:
                    this.$ = new yy.ExprStatement($$[$0 - 1]);
                    break;
                case 72:
                    const typeExprIdentifierContent = new yy.Token($$[$0], _$[$0].first_line, _$[$0].first_column, _$[$0].last_line, _$[$0].last_column);
                    this.$ = yy.TypeExpr.fromIdentifier(typeExprIdentifierContent);
                    break;
                case 75:
                    this.$ = new yy.IfStatement($$[$0 - 2], $$[$0 - 1]);
                    break;
                case 76:
                    this.$ = new yy.ElseIfStatement($$[$0 - 2], $$[$0 - 1]);
                    break;
                case 78:
                    this.$ = $$[$0 - 1] || [];
                    if (typeof $$[$0] !== 'undefined') {
                        this.$ = this.$.concat($$[$0]);
                    }
                    break;
                case 79:
                    this.$ = new yy.ElseStatement([$$[$0 - 1]]);
                    break;
                case 82:
                    var statements = [$$[$0 - 3]];
                    if (Array.isArray($$[$0 - 2])) {
                        statements = statements.concat($$[$0 - 2]);
                    }
                    if (typeof $$[$0 - 1] !== 'undefined') {
                        statements.push($$[$0 - 1]);
                    }
                    this.$ = new yy.Statement(statements);
                    break;
                case 85:
                    this.$ = new yy.WhileStatement(new yy.ExprList([$$[$0 - 2]]), new yy.Statement([$$[$0 - 1]]));
                    break;
                case 88:
                case 122:
                    this.$ = $$[$0 - 1];
                    break;
                case 89:
                    this.$ = {
                        errorHandlerStatement: $$[$0 - 1],
                        errorIdentifier: undefined
                    };
                    break;
                case 90:
                    this.$ = {
                        errorHandlerStatement: $$[$0 - 1],
                        errorIdentifier: $$[$0 - 2]
                    };
                    break;
                case 91:
                    this.$ = new yy.TryCatchStatement($$[$0 - 1], $$[$0].errorHandlerStatement, $$[$0].errorIdentifier);
                    break;
                case 92:
                    this.$ = new yy.ReturnStatement($$[$0 - 1]);
                    break;
                case 100:
                case 136:
                case 150:
                    this.$ = [];
                    break;
                case 101:
                case 137:
                case 151:
                    $$[$0 - 1] = $$[$0 - 1] || [];
                    $$[$0] = $$[$0] || yy.Statement.Empty;
                    this.$ = $$[$0 - 1].concat($$[$0]);
                    break;
                case 102:
                case 138:
                    if ($$[$0 - 2] === '\n' || $$[$0 - 2] === '') {
                        $$[$0 - 2] = [];
                    }
                    $$[$0 - 2] = $$[$0 - 2] || [];
                    this.$ = new yy.Statement($$[$0 - 2]);
                    break;
                case 103:
                case 104:
                case 112:
                case 113:
                    this.$ = yy.getVarDeclModifierByKeyword($$[$0]);
                    break;
                case 107:
                    const identifierToken = new yy.Token($$[$0 - 1], _$[$0 - 1].first_line, _$[$0 - 1].first_column, _$[$0 - 1].last_line, _$[$0 - 1].last_column);
                    this.$ = [identifierToken, $$[$0]];
                    break;
                case 108:
                    this.$ = new yy.Expr($$[$0]);
                    break;
                case 111:
                    this.$ = yy.VarDecl.create({
                        modifiers: yy.VarDeclModifier.combine($$[$0 - 3]),
                        varName: $$[$0 - 2][0],
                        typeDecl: $$[$0 - 2][1],
                        assignment: $$[$0 - 1]
                    });
                    break;
                case 114:
                    this.$ = yy.VarDecl.create({
                        modifiers: yy.VarDeclModifier.combine(yy.VarDeclModifier.Static, $$[$0 - 3]),
                        varName: $$[$0 - 2][0],
                        typeDecl: $$[$0 - 2][1],
                        assignment: $$[$0 - 1]
                    });
                    break;
                case 118:
                    const nameToken = new yy.Token($$[$0 - 1], _$[$0 - 1].first_line, _$[$0 - 1].first_column, _$[$0 - 1].last_line, _$[$0 - 1].last_column);
                    this.$ = new yy.ParamDecl(nameToken, $$[$0]);
                    break;
                case 119:
                    var decls = [];
                    if (typeof $$[$0] !== 'undefined') {
                        decls.push($$[$0]);
                    }
                    this.$ = yy.ParamDeclList.fromParamDecls(decls);
                    break;
                case 120:
                    this.$ = yy.ParamDeclList.fromParamDecls($$[$0 - 2].paramDecls.concat($$[$0]));
                    break;
                case 121:
                case 139:
                case 153:
                    this.$ = new yy.Token($$[$0], _$[$0].first_line, _$[$0].first_column, _$[$0].last_line, _$[$0].last_column);
                    break;
                case 128:
                    this.$ = yy.FuncDecl.create({
                        funcName: $$[$0 - 4],
                        runtimeParamDecls: $$[$0 - 3],
                        returnTypeDecl: $$[$0 - 2],
                        funcBody: $$[$0 - 1]
                    });
                    break;
                case 130:
                    this.$ = yy.AnonFuncDecl.create({
                        runtimeParamDecls: $$[$0 - 3],
                        returnTypeDecl: $$[$0 - 2],
                        funcBody: $$[$0 - 1]
                    });
                    break;
                case 131:
                    this.$ = yy.MethodDecl.create({
                        funcName: $$[$0 - 4],
                        runtimeParamDecls: $$[$0 - 3],
                        returnTypeDecl: $$[$0 - 2],
                        funcBody: $$[$0 - 1]
                    });
                    break;
                case 142:
                    this.$ = yy.ClassDecl.create({
                        className: $$[$0 - 2],
                        classBody: $$[$0 - 1]
                    });
                    break;
                case 143:
                case 144:
                    this.$ = new yy.EnumMemberDecl(new yy.Token($$[$0]));
                    break;
                case 145:
                    var decls = [];
                    if (typeof $$[$0] !== 'undefined') {
                        decls.push($$[$0]);
                    }
                    this.$ = new yy.Statement(decls);
                    break;
                case 146:
                    this.$ = new yy.Statement([...$$[$0 - 3].nodes, $$[$0]]);
                    break;
                case 152:
                    var nodes = [];
                    $$[$0 - 2].forEach(commentOrStatement => {
                        if (commentOrStatement instanceof yy.Statement) {
                            nodes.push(...commentOrStatement.nodes);
                        }
                        else {
                            nodes.push(commentOrStatement);
                        }
                    });
                    this.$ = new yy.Statement(nodes);
                    break;
                case 154:
                    this.$ = yy.EnumDecl.create({
                        enumName: $$[$0 - 2],
                        enumBody: $$[$0 - 1]
                    });
                    break;
                case 155:
                    this.$ = new yy.ImportStatement($$[$0 - 1]);
                    break;
                case 156:
                    this.$ = new yy.ExportStatement($$[$0 - 1]);
                    break;
                case 165:
                    $$[$0 - 1] = $$[$0 - 1] || [];
                    if (!Array.isArray($$[$0 - 1])) {
                        $$[$0 - 1] = [$$[$0 - 1]];
                    }
                    this.$ = $$[$0 - 1].concat($$[$0]);
                    break;
                case 166:
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
        table: [{ 3: 10, 4: $V0, 5: $V1, 9: 4, 10: $V2, 107: 12, 108: $V3, 114: 5, 120: 13, 121: $V4, 123: 6, 129: 14, 130: $V5, 131: 7, 132: 8, 133: $V6, 134: $V7, 135: 3, 136: $V8, 137: 2, 138: 1 }, { 1: [3] }, { 1: [2, 166], 3: 10, 4: $V0, 5: $V1, 9: 4, 10: $V2, 107: 12, 108: $V3, 114: 5, 120: 13, 121: $V4, 123: 6, 129: 14, 130: $V5, 131: 7, 132: 8, 133: $V6, 134: $V7, 135: 22, 136: $V8 }, o($V9, [2, 164]), o($V9, [2, 157]), o($V9, [2, 158]), o($V9, [2, 159]), o($V9, [2, 160]), o($V9, [2, 161]), o($V9, [2, 162]), o($V9, [2, 163]), { 3: 23, 4: $V0, 5: $V1 }, { 17: $Va, 109: 24 }, o($Vb, [2, 141], { 122: 26, 119: 27, 91: [1, 28] }), { 91: [1, 30], 128: 29 }, { 54: 31, 55: $Vc }, { 51: 33, 56: $Vd }, o($Ve, [2, 1]), o($Ve, [2, 2]), { 56: [1, 35] }, { 56: [1, 36] }, { 56: [1, 37] }, o($V9, [2, 165]), o($Ve, [2, 9]), o([1, 4, 5, 10, 91, 108, 121, 130, 133, 134, 136], $Vf, { 110: 38, 111: $Vg }), o($Vh, $Vi, { 106: 40, 105: 41, 56: $Vj }), { 3: 43, 4: $V0, 5: $V1 }, o($Vb, [2, 140]), o([5, 10, 92, 94, 95, 102, 108], $Vk, { 6: 44, 4: $Vl }), { 3: 46, 4: $V0, 5: $V1 }, o([5, 10, 56, 92], $Vk, { 6: 47, 4: $Vl }), { 3: 48, 4: $V0, 5: $V1 }, o($Vm, [2, 51]), { 3: 49, 4: $V0, 5: $V1 }, o([4, 5, 10, 12, 13, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 55, 56, 58, 63, 70, 72, 79, 82, 84, 88, 91, 92, 94, 95, 102, 108], [2, 52]), { 17: [2, 121] }, o([4, 5, 91], [2, 139]), { 91: [2, 153] }, o($V9, $Vn, { 112: 50, 68: 51, 91: $Vo }), { 56: $Vp, 65: 53 }, { 18: [1, 55], 63: [1, 56] }, o($Vh, [2, 119]), o($Vh, [2, 116], { 104: 57, 97: [1, 58] }), o($V9, [2, 142]), o($Vq, $Vk, { 118: 59, 8: 60, 7: 61, 6: 63, 4: $Vl, 5: $Vr }), o($Vs, [2, 3]), o($V9, [2, 154]), o([10, 56, 92], $Vk, { 7: 61, 6: 63, 127: 64, 8: 65, 4: $Vl, 5: $Vr }), o($V9, [2, 155]), o($V9, [2, 156]), o([1, 10, 108, 121, 130, 133, 134, 136], $Vk, { 7: 61, 6: 63, 113: 66, 8: 67, 4: $Vl, 5: $Vr }), o($Vs, [2, 125]), o([5, 10, 12, 13, 17, 55, 56, 58, 70, 79, 82, 88, 92, 94, 95, 108], $Vk, { 6: 68, 4: $Vl }), o($Vs, [2, 123]), o([1, 4, 5, 10, 12, 13, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 39, 55, 56, 58, 63, 70, 72, 79, 82, 84, 88, 91, 92, 94, 95, 102, 108, 121, 130, 133, 134, 136], [2, 72]), o([1, 4, 5, 10, 12, 13, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 55, 56, 58, 63, 70, 72, 79, 82, 84, 88, 91, 92, 94, 95, 102, 108, 111, 121, 130, 133, 134, 136], [2, 122]), o($Vh, $Vi, { 105: 69, 56: $Vj }), o($Vh, [2, 118]), { 56: $Vp, 65: 70 }, { 4: $Vl, 6: 71, 9: 73, 10: $V2, 89: 74, 92: $Vk, 93: 77, 94: $Vt, 95: $Vu, 101: 78, 102: [1, 82], 103: 75, 107: 79, 108: $V3, 116: 76, 117: 72 }, o($Vv, [2, 136]), o([1, 5, 10, 12, 13, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 55, 56, 58, 63, 70, 72, 79, 82, 84, 88, 91, 92, 94, 95, 102, 108, 121, 130, 133, 134, 136], [2, 7], { 6: 83, 4: $Vl }), o($Vs, [2, 8]), o($Vs, [2, 5]), { 4: $Vl, 6: 84, 9: 86, 10: $V2, 56: $Vw, 92: $Vk, 124: 88, 125: 87, 126: 85 }, o($Vx, [2, 150]), o($V9, [2, 128]), o($Vs, [2, 127]), o([10, 12, 13, 17, 55, 56, 58, 70, 79, 82, 88, 92, 94, 95, 108], $Vk, { 7: 61, 6: 63, 90: 90, 8: 91, 4: $Vl, 5: $Vr }), o($Vh, [2, 120]), o($Vh, [2, 115]), { 92: [1, 92] }, o($Vv, [2, 137]), o($Vv, [2, 132]), o($Vv, [2, 133]), o($Vv, [2, 134]), o($Vv, [2, 135]), { 56: $Vy, 98: 93 }, { 56: $Vy, 98: 95 }, { 17: $Va, 109: 96 }, { 56: [2, 103] }, { 56: [2, 104] }, { 94: [1, 97], 95: [1, 98] }, o($Vs, [2, 6]), o([4, 10, 56], [2, 147], { 92: [1, 99] }), o($Vx, [2, 151]), o([4, 10, 92], [2, 148], { 56: $Vz }), o($Vx, [2, 149], { 63: [1, 101] }), o($VA, [2, 145]), o($VA, [2, 143]), { 4: $Vl, 6: 102, 9: 104, 10: $V2, 11: 137, 12: $VB, 13: $VC, 14: 134, 15: 121, 16: 127, 17: $VD, 34: 135, 35: 117, 36: 112, 37: 128, 50: 129, 51: 130, 52: 123, 53: 124, 54: 133, 55: $Vc, 56: $Vd, 57: 126, 58: $VE, 59: 125, 60: 131, 61: 122, 62: 111, 64: 105, 67: 103, 69: 114, 70: $VF, 76: 108, 78: 109, 79: $VG, 81: 116, 82: $VH, 86: 110, 87: 107, 88: $VI, 89: 106, 92: $Vk, 93: 77, 94: $Vt, 95: $Vu, 108: $VJ, 115: 136 }, o($VK, [2, 100]), o($Vb, [2, 138]), o($VL, $VM, { 99: 141, 39: $VN }), o($VO, [2, 106], { 96: 143, 97: [1, 144] }), o($VP, $VM, { 99: 145, 39: $VN }), o([4, 5, 10, 91, 92, 94, 95, 102, 108], $Vf, { 110: 146, 111: $Vg }), { 56: [2, 112] }, { 56: [2, 113] }, o($Vb, [2, 152]), o($VA, [2, 144]), o([10, 56], $Vk, { 6: 147, 4: $Vl }), { 92: [1, 148] }, o($VK, [2, 101]), o($VQ, [2, 93]), o($VQ, [2, 94]), o($VQ, [2, 95]), o($VQ, [2, 96]), o($VQ, [2, 97]), o($VQ, [2, 98]), o($VQ, [2, 99]), o($VR, $Vk, { 7: 61, 6: 63, 8: 149, 4: $Vl, 5: $Vr, 63: $VS }), o($VR, $Vk, { 7: 61, 6: 63, 8: 151, 4: $Vl, 5: $Vr }), { 11: 137, 12: $VB, 13: $VC, 14: 134, 15: 121, 16: 127, 17: $VT, 34: 135, 35: 152, 37: 128, 50: 129, 51: 130, 52: 123, 53: 124, 54: 133, 55: $Vc, 56: $Vd, 57: 126, 58: $VE, 59: 125, 60: 131, 61: 122, 108: $VJ, 115: 136 }, o($VR, $Vk, { 7: 61, 6: 63, 73: 154, 8: 155, 4: $Vl, 5: $Vr }), { 11: 137, 12: $VB, 13: $VC, 14: 134, 15: 121, 16: 127, 17: $VT, 34: 135, 35: 156, 37: 128, 50: 129, 51: 130, 52: 123, 53: 124, 54: 133, 55: $Vc, 56: $Vd, 57: 126, 58: $VE, 59: 125, 60: 131, 61: 122, 108: $VJ, 115: 136 }, { 83: 157, 84: [1, 158] }, o($VU, [2, 67], { 19: 159, 20: $VV, 21: $VW, 22: $VX, 23: $VY, 24: $VZ, 25: $V_, 26: $V$, 27: $V01, 28: $V11, 29: $V21, 30: $V31, 31: $V41, 32: $V51, 33: $V61 }), { 11: 137, 12: $VB, 13: $VC, 14: 178, 15: 121, 16: 127, 17: $VT, 34: 179, 35: 117, 37: 128, 50: 176, 51: 130, 52: 123, 53: 124, 54: 133, 55: $Vc, 56: $Vd, 57: 175, 58: $VE, 59: 125, 60: 177, 61: 122, 62: 174, 108: $VJ, 115: 136 }, { 11: 137, 12: $VB, 13: $VC, 14: 134, 15: 121, 16: 127, 17: $VT, 34: 135, 35: 180, 37: 128, 50: 129, 51: 130, 52: 123, 53: 124, 54: 133, 55: $Vc, 56: $Vd, 57: 126, 58: $VE, 59: 125, 60: 131, 61: 122, 108: $VJ, 115: 136 }, { 9: 104, 10: $V2, 11: 137, 12: $VB, 13: $VC, 14: 134, 15: 121, 16: 127, 17: $VD, 34: 135, 35: 117, 36: 112, 37: 128, 50: 129, 51: 130, 52: 123, 53: 124, 54: 133, 55: $Vc, 56: $Vd, 57: 126, 58: $VE, 59: 125, 60: 131, 61: 122, 62: 111, 64: 105, 67: 182, 68: 183, 69: 114, 70: $VF, 76: 108, 78: 109, 79: $VG, 80: 181, 81: 116, 82: $VH, 86: 110, 87: 107, 88: $VI, 89: 106, 91: $Vo, 93: 77, 94: $Vt, 95: $Vu, 108: $VJ, 115: 136 }, o([4, 5, 10, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 55, 56, 58, 63, 70, 72, 79, 82, 84, 88, 91, 92, 94, 95, 102, 108], [2, 62], { 11: 184, 12: $VB, 13: $VC }), o($Vm, [2, 63]), o($Vm, [2, 64]), o($Vm, [2, 65]), o($Vm, [2, 66]), o($Vm, $V71), o($Vm, [2, 60]), o($Vm, [2, 61]), o($Vm, $V81), o([4, 5, 10, 12, 13, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 55, 56, 58, 63, 70, 72, 79, 82, 84, 88, 91, 92, 94, 95, 102, 108], $V91, { 36: 186, 38: 187, 17: [1, 185], 39: [1, 188], 40: [1, 189], 41: [1, 190], 42: [1, 191], 43: [1, 192], 44: [1, 193], 45: [1, 194], 46: [1, 195], 47: [1, 196], 48: [1, 197], 49: [1, 198] }), o($Vm, $Va1), o($Vm, [2, 54]), o($Vm, [2, 55]), o($Vm, $Vb1), o($Vm, $Vc1), { 17: $Va, 109: 199 }, { 15: 200, 17: [1, 201], 51: 202, 54: 133, 55: $Vc, 56: $Vd, 57: 126, 58: $VE }, { 17: [2, 129] }, o($Vm, [2, 10]), o($Vm, [2, 11]), o([10, 12, 13, 17, 55, 56, 58, 70, 72, 79, 82, 84, 88, 92, 94, 95, 102, 108], $Vk, { 7: 61, 6: 63, 100: 203, 8: 204, 4: $Vl, 5: $Vr }), { 11: 137, 12: $VB, 13: $VC, 14: 134, 15: 121, 16: 127, 17: $VT, 34: 135, 35: 205, 37: 128, 50: 129, 51: 130, 52: 123, 53: 124, 54: 133, 55: $Vc, 56: $Vd, 57: 126, 58: $VE, 59: 125, 60: 131, 61: 122, 108: $VJ, 115: 136 }, o($VO, [2, 107]), { 56: $Vp, 65: 206 }, o($Vq, $Vk, { 7: 61, 6: 63, 8: 204, 100: 207, 4: $Vl, 5: $Vr }), o($VP, $Vn, { 68: 51, 112: 208, 91: $Vo }), { 9: 210, 10: $V2, 56: $Vw, 124: 209 }, o($Vs, [2, 102]), o($VQ, [2, 70]), { 11: 137, 12: $VB, 13: $VC, 14: 134, 15: 121, 16: 127, 17: $VT, 34: 135, 35: 211, 37: 128, 50: 129, 51: 130, 52: 123, 53: 124, 54: 133, 55: $Vc, 56: $Vd, 57: 126, 58: $VE, 59: 125, 60: 131, 61: 122, 108: $VJ, 115: 136 }, o($VQ, [2, 71]), o($VR, $Vk, { 7: 61, 6: 63, 19: 159, 8: 212, 4: $Vl, 5: $Vr, 20: $VV, 21: $VW, 22: $VX, 23: $VY, 24: $VZ, 25: $V_, 26: $V$, 27: $V01, 28: $V11, 29: $V21, 30: $V31, 31: $V41, 32: $V51, 33: $V61 }), { 11: 137, 12: $VB, 13: $VC, 14: 178, 15: 121, 16: 127, 17: $VT, 34: 179, 35: 213, 37: 128, 50: 176, 51: 130, 52: 123, 53: 124, 54: 133, 55: $Vc, 56: $Vd, 57: 175, 58: $VE, 59: 125, 60: 177, 61: 122, 108: $VJ, 115: 136 }, o([10, 12, 13, 17, 55, 56, 58, 70, 79, 82, 84, 88, 92, 94, 95, 108], $Vk, { 7: 61, 6: 63, 75: 214, 71: 215, 74: 216, 8: 217, 4: $Vl, 5: $Vr, 72: [1, 218] }), o($VQ, [2, 77]), { 9: 104, 10: $V2, 11: 137, 12: $VB, 13: $VC, 14: 134, 15: 121, 16: 127, 17: $VD, 19: 159, 20: $VV, 21: $VW, 22: $VX, 23: $VY, 24: $VZ, 25: $V_, 26: $V$, 27: $V01, 28: $V11, 29: $V21, 30: $V31, 31: $V41, 32: $V51, 33: $V61, 34: 135, 35: 117, 36: 112, 37: 128, 50: 129, 51: 130, 52: 123, 53: 124, 54: 133, 55: $Vc, 56: $Vd, 57: 126, 58: $VE, 59: 125, 60: 131, 61: 122, 62: 111, 64: 105, 67: 220, 68: 221, 69: 114, 70: $VF, 76: 108, 77: 219, 78: 109, 79: $VG, 81: 116, 82: $VH, 86: 110, 87: 107, 88: $VI, 89: 106, 91: $Vo, 93: 77, 94: $Vt, 95: $Vu, 108: $VJ, 115: 136 }, o($VQ, [2, 91]), { 9: 104, 10: $V2, 11: 137, 12: $VB, 13: $VC, 14: 134, 15: 121, 16: 127, 17: $VD, 34: 135, 35: 117, 36: 112, 37: 128, 50: 129, 51: 130, 52: 123, 53: 124, 54: 133, 55: $Vc, 56: $Vd, 57: 126, 58: $VE, 59: 125, 60: 131, 61: 122, 62: 111, 64: 105, 67: 182, 68: 183, 69: 114, 70: $VF, 76: 108, 78: 109, 79: $VG, 80: 222, 81: 116, 82: $VH, 85: [1, 223], 86: 110, 87: 107, 88: $VI, 89: 106, 91: $Vo, 93: 77, 94: $Vt, 95: $Vu, 108: $VJ, 115: 136 }, { 11: 137, 12: $VB, 13: $VC, 14: 134, 15: 121, 16: 127, 17: $VD, 34: 135, 35: 224, 36: 225, 37: 128, 50: 129, 51: 130, 52: 123, 53: 124, 54: 133, 55: $Vc, 56: $Vd, 57: 126, 58: $VE, 59: 125, 60: 131, 61: 122, 108: $VJ, 115: 136 }, o($Vd1, [2, 16]), o($Vd1, [2, 17]), o($Vd1, [2, 18]), o($Vd1, [2, 19]), o($Vd1, [2, 20]), o($Vd1, [2, 21]), o($Vd1, [2, 22]), o($Vd1, [2, 23]), o($Vd1, [2, 24]), o($Vd1, [2, 25]), o($Vd1, [2, 26]), o($Vd1, [2, 27]), o($Vd1, [2, 28]), o($Vd1, [2, 29]), { 18: [1, 226], 63: $VS }, o([12, 13, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 63], $V71, { 18: $Ve1 }), o($Vf1, $V81, { 18: [1, 228] }), o($Vf1, $Va1, { 18: [1, 229] }), o($Vf1, $Vb1, { 18: [1, 230] }), o($Vf1, $Vc1, { 18: [1, 231] }), { 9: 104, 10: $V2, 11: 137, 12: $VB, 13: $VC, 14: 134, 15: 121, 16: 127, 17: $VD, 19: 159, 20: $VV, 21: $VW, 22: $VX, 23: $VY, 24: $VZ, 25: $V_, 26: $V$, 27: $V01, 28: $V11, 29: $V21, 30: $V31, 31: $V41, 32: $V51, 33: $V61, 34: 135, 35: 117, 36: 112, 37: 128, 50: 129, 51: 130, 52: 123, 53: 124, 54: 133, 55: $Vc, 56: $Vd, 57: 126, 58: $VE, 59: 125, 60: 131, 61: 122, 62: 111, 64: 105, 66: 232, 67: 233, 68: 234, 69: 114, 70: $VF, 76: 108, 78: 109, 79: $VG, 81: 116, 82: $VH, 86: 110, 87: 107, 88: $VI, 89: 106, 91: $Vo, 93: 77, 94: $Vt, 95: $Vu, 108: $VJ, 115: 136 }, { 4: $Vl, 5: $Vr, 6: 63, 7: 61, 8: 235, 84: $Vk }, o($VQ, [2, 86]), o($VQ, [2, 87]), o($Vm, [2, 12]), { 11: 137, 12: $VB, 13: $VC, 14: 134, 15: 121, 16: 127, 17: $VT, 18: [1, 236], 34: 135, 35: 117, 37: 128, 50: 129, 51: 130, 52: 123, 53: 124, 54: 133, 55: $Vc, 56: $Vd, 57: 126, 58: $VE, 59: 125, 60: 131, 61: 122, 62: 174, 108: $VJ, 115: 136 }, o($Vm, [2, 50]), { 11: 137, 12: $VB, 13: $VC, 14: 134, 15: 121, 16: 127, 17: $VD, 34: 135, 35: 237, 36: 238, 37: 128, 50: 129, 51: 130, 52: 123, 53: 124, 54: 133, 55: $Vc, 56: $Vd, 57: 126, 58: $VE, 59: 125, 60: 131, 61: 122, 108: $VJ, 115: 136 }, o($Vd1, [2, 34]), o($Vd1, [2, 35]), o($Vd1, [2, 36]), o($Vd1, [2, 37]), o($Vd1, [2, 38]), o($Vd1, [2, 39]), o($Vd1, [2, 40]), o($Vd1, [2, 41]), o($Vd1, [2, 42]), o($Vd1, [2, 43]), o($Vd1, [2, 44]), o($Vm, $Vf, { 110: 239, 111: $Vg }), o($Vm, [2, 13]), { 51: 202, 54: 133, 55: $Vc, 56: $Vd, 57: 240, 58: $VE }, o($Vm, $V91), o($VL, [2, 111]), o($VL, [2, 110]), o($VL, [2, 108], { 19: 159, 20: $VV, 21: $VW, 22: $VX, 23: $VY, 24: $VZ, 25: $V_, 26: $V$, 27: $V01, 28: $V11, 29: $V21, 30: $V31, 31: $V41, 32: $V51, 33: $V61 }), o($VO, [2, 105]), o($Vv, [2, 114]), o($Vq, $Vk, { 7: 61, 6: 63, 8: 67, 113: 241, 4: $Vl, 5: $Vr }), o($VA, [2, 146]), { 56: $Vz }, o($VU, [2, 68], { 19: 159, 20: $VV, 21: $VW, 22: $VX, 23: $VY, 24: $VZ, 25: $V_, 26: $V$, 27: $V01, 28: $V11, 29: $V21, 30: $V31, 31: $V41, 32: $V51, 33: $V61 }), o($VQ, [2, 92]), { 19: 159, 20: $VV, 21: $VW, 22: $VX, 23: $VY, 24: $VZ, 25: $V_, 26: $V$, 27: $V01, 28: $V11, 29: $V21, 30: $V31, 31: $V41, 32: $V51, 33: $V61 }, o($VR, $Vk, { 7: 61, 6: 63, 8: 242, 4: $Vl, 5: $Vr }), o($VQ, [2, 78]), o($VQ, [2, 80]), o($VQ, [2, 81]), { 9: 104, 10: $V2, 11: 137, 12: $VB, 13: $VC, 14: 134, 15: 121, 16: 127, 17: $VD, 34: 135, 35: 117, 36: 112, 37: 128, 50: 129, 51: 130, 52: 123, 53: 124, 54: 133, 55: $Vc, 56: $Vd, 57: 126, 58: $VE, 59: 125, 60: 131, 61: 122, 62: 111, 64: 105, 66: 244, 67: 233, 68: 234, 69: 114, 70: [1, 243], 76: 108, 78: 109, 79: $VG, 81: 116, 82: $VH, 86: 110, 87: 107, 88: $VI, 89: 106, 91: $Vo, 93: 77, 94: $Vt, 95: $Vu, 108: $VJ, 115: 136 }, o($VR, $Vk, { 7: 61, 6: 63, 8: 245, 4: $Vl, 5: $Vr }), o($VQ, [2, 83]), o($VQ, [2, 84]), o($VR, $Vk, { 7: 61, 6: 63, 8: 246, 4: $Vl, 5: $Vr }), { 11: 137, 12: $VB, 13: $VC, 14: 134, 15: 121, 16: 127, 17: $VT, 34: 135, 35: 247, 37: 128, 50: 129, 51: 130, 52: 123, 53: 124, 54: 133, 55: $Vc, 56: $Vd, 57: 126, 58: $VE, 59: 125, 60: 131, 61: 122, 108: $VJ, 115: 136 }, o($Vg1, [2, 30], { 19: 159, 20: $VV, 21: $VW, 22: $VX, 23: $VY, 24: $VZ, 25: $V_, 26: $V$, 27: $V01, 28: $V11, 29: $V21, 30: $V31, 31: $V41, 32: $V51, 33: $V61 }), o($Vm, [2, 31]), o($Vm, [2, 69]), o($Vm, [2, 57]), o($Vm, [2, 48]), o($Vm, [2, 59]), o($Vm, [2, 15]), o($Vm, [2, 33]), o($VR, $Vk, { 7: 61, 6: 63, 8: 248, 4: $Vl, 5: $Vr }), o($VQ, [2, 73]), o($VQ, [2, 74]), { 84: [2, 88] }, o($Vm, [2, 49]), o($Vg1, [2, 45], { 19: 159, 20: $VV, 21: $VW, 22: $VX, 23: $VY, 24: $VZ, 25: $V_, 26: $V$, 27: $V01, 28: $V11, 29: $V21, 30: $V31, 31: $V41, 32: $V51, 33: $V61 }), o($Vm, [2, 46]), o([4, 5, 10, 12, 13, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 55, 56, 58, 63, 70, 72, 79, 82, 84, 88, 92, 94, 95, 102, 108], $Vn, { 68: 51, 112: 249, 91: $Vo }), { 18: $Ve1 }, o($Vv, [2, 131]), o($VQ, [2, 82]), { 11: 137, 12: $VB, 13: $VC, 14: 134, 15: 121, 16: 127, 17: $VT, 34: 135, 35: 250, 37: 128, 50: 129, 51: 130, 52: 123, 53: 124, 54: 133, 55: $Vc, 56: $Vd, 57: 126, 58: $VE, 59: 125, 60: 131, 61: 122, 108: $VJ, 115: 136 }, o($VR, $Vk, { 7: 61, 6: 63, 8: 251, 4: $Vl, 5: $Vr }), o($VQ, [2, 85]), o($VQ, [2, 89]), { 9: 104, 10: $V2, 11: 137, 12: $VB, 13: $VC, 14: 134, 15: 121, 16: 127, 17: $VD, 19: 159, 20: $VV, 21: $VW, 22: $VX, 23: $VY, 24: $VZ, 25: $V_, 26: $V$, 27: $V01, 28: $V11, 29: $V21, 30: $V31, 31: $V41, 32: $V51, 33: $V61, 34: 135, 35: 117, 36: 112, 37: 128, 50: 129, 51: 130, 52: 123, 53: 124, 54: 133, 55: $Vc, 56: $Vd, 57: 126, 58: $VE, 59: 125, 60: 131, 61: 122, 62: 111, 64: 105, 67: 182, 68: 183, 69: 114, 70: $VF, 76: 108, 78: 109, 79: $VG, 80: 252, 81: 116, 82: $VH, 86: 110, 87: 107, 88: $VI, 89: 106, 91: $Vo, 93: 77, 94: $Vt, 95: $Vu, 108: $VJ, 115: 136 }, o($VQ, [2, 75]), o([10, 12, 13, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 55, 56, 58, 63, 70, 72, 79, 82, 84, 88, 91, 92, 94, 95, 102, 108], $Vk, { 7: 61, 6: 63, 8: 67, 113: 253, 4: $Vl, 5: $Vr }), { 9: 104, 10: $V2, 11: 137, 12: $VB, 13: $VC, 14: 134, 15: 121, 16: 127, 17: $VD, 19: 159, 20: $VV, 21: $VW, 22: $VX, 23: $VY, 24: $VZ, 25: $V_, 26: $V$, 27: $V01, 28: $V11, 29: $V21, 30: $V31, 31: $V41, 32: $V51, 33: $V61, 34: 135, 35: 117, 36: 112, 37: 128, 50: 129, 51: 130, 52: 123, 53: 124, 54: 133, 55: $Vc, 56: $Vd, 57: 126, 58: $VE, 59: 125, 60: 131, 61: 122, 62: 111, 64: 105, 66: 254, 67: 233, 68: 234, 69: 114, 70: $VF, 76: 108, 78: 109, 79: $VG, 81: 116, 82: $VH, 86: 110, 87: 107, 88: $VI, 89: 106, 91: $Vo, 93: 77, 94: $Vt, 95: $Vu, 108: $VJ, 115: 136 }, o($VQ, [2, 79]), o($VR, $Vk, { 7: 61, 6: 63, 8: 255, 4: $Vl, 5: $Vr }), o($Vm, [2, 130]), o($VR, $Vk, { 7: 61, 6: 63, 8: 256, 4: $Vl, 5: $Vr }), o($VQ, [2, 90]), o($VQ, [2, 76])],
        defaultActions: { 35: [2, 121], 37: [2, 153], 80: [2, 103], 81: [2, 104], 97: [2, 112], 98: [2, 113], 138: [2, 129], 235: [2, 88] },
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
                        return 133;
                        break;
                    case 2:
                        return 134;
                        break;
                    case 3:
                        return 108;
                        break;
                    case 4:
                        return 121;
                        break;
                    case 5:
                        return 130;
                        break;
                    case 6:
                        return 94;
                        break;
                    case 7:
                        return 95;
                        break;
                    case 8:
                        return 102;
                        break;
                    case 9:
                        return 88;
                        break;
                    case 10:
                        return 70;
                        break;
                    case 11:
                        return 72;
                        break;
                    case 12:
                        return 79;
                        break;
                    case 13:
                        return 82;
                        break;
                    case 14:
                        return 84;
                        break;
                    case 15:
                        return 85;
                        break;
                    case 16:
                        return 4;
                        break;
                    case 17:
                        return 56;
                        break;
                    case 18:
                        return 58;
                        break;
                    case 19:
                        return 58;
                        break;
                    case 20:
                        return 58;
                        break;
                    case 21:
                        return 58;
                        break;
                    case 22:
                        return 58;
                        break;
                    case 23:
                        return 58;
                        break;
                    case 24:
                        return 58;
                        break;
                    case 25:
                        return 55;
                        break;
                    case 26:
                        return 46;
                        break;
                    case 27:
                        return 45;
                        break;
                    case 28:
                        return 43;
                        break;
                    case 29:
                        return 44;
                        break;
                    case 30:
                        return 40;
                        break;
                    case 31:
                        return 41;
                        break;
                    case 32:
                        return 42;
                        break;
                    case 33:
                        return 47;
                        break;
                    case 34:
                        return 48;
                        break;
                    case 35:
                        return 49;
                        break;
                    case 36:
                        return 'RIGHT_OP';
                        break;
                    case 37:
                        return 'LEFT_OP';
                        break;
                    case 38:
                        return 12;
                        break;
                    case 39:
                        return 13;
                        break;
                    case 40:
                        return 111;
                        break;
                    case 41:
                        return 32;
                        break;
                    case 42:
                        return 33;
                        break;
                    case 43:
                        return 28;
                        break;
                    case 44:
                        return 29;
                        break;
                    case 45:
                        return 26;
                        break;
                    case 46:
                        return 27;
                        break;
                    case 47:
                        return 5;
                        break;
                    case 48:
                        return (';');
                        break;
                    case 49:
                        return ('{');
                        break;
                    case 50:
                        return ('}');
                        break;
                    case 51:
                        return (',');
                        break;
                    case 52:
                        return (':');
                        break;
                    case 53:
                        return ('=');
                        break;
                    case 54:
                        return ('(');
                        break;
                    case 55:
                        return (')');
                        break;
                    case 56:
                        return ('[');
                        break;
                    case 57:
                        return (']');
                        break;
                    case 58:
                        return ('.');
                        break;
                    case 59:
                        return ('&');
                        break;
                    case 60:
                        return ('!');
                        break;
                    case 61:
                        return ('~');
                        break;
                    case 62:
                        return ('-');
                        break;
                    case 63:
                        return ('+');
                        break;
                    case 64:
                        return ('*');
                        break;
                    case 65:
                        return ('/');
                        break;
                    case 66:
                        return ('%');
                        break;
                    case 67:
                        return ('<');
                        break;
                    case 68:
                        return ('>');
                        break;
                    case 69:
                        return ('^');
                        break;
                    case 70:
                        return ('|');
                        break;
                    case 71:
                        return ('?');
                        break;
                    case 72:
                        break;
                    case 73: /* ignore bad characters */
                        break;
                }
            },
            rules: [/^(?:\/\/(.*))/, /^(?:import\b)/, /^(?:export\b)/, /^(?:func\b)/, /^(?:class\b)/, /^(?:enum\b)/, /^(?:let\b)/, /^(?:const\b)/, /^(?:static\b)/, /^(?:return\b)/, /^(?:if\b)/, /^(?:else\b)/, /^(?:while\b)/, /^(?:try\b)/, /^(?:catch\b)/, /^(?:as\b)/, /^(?:(\n))/, /^(?:([a-zA-Z_])(([a-zA-Z_])|([0-9]))*)/, /^(?:([0-9])+\.([0-9])*(([Ee][+-]?([0-9])+))?([fFlL])?)/, /^(?:([0-9])*\.([0-9])+(([Ee][+-]?([0-9])+))?([fFlL])?)/, /^(?:0[xX]([a-fA-F0-9])+([uUlL]*)?)/, /^(?:0([0-9])+([uUlL]*)?)/, /^(?:([0-9])+([uUlL]*)?)/, /^(?:L?'(\\'|[^'])+')/, /^(?:([0-9])+([Ee][+-]?([0-9])+)([fFlL])?)/, /^(?:L?"(\\"|[^"])*")/, /^(?:>>=)/, /^(?:<<=)/, /^(?:\+=)/, /^(?:-=)/, /^(?:\*=)/, /^(?:\/=)/, /^(?:%=)/, /^(?:&=)/, /^(?:\^=)/, /^(?:\|=)/, /^(?:>>)/, /^(?:<<)/, /^(?:\+\+)/, /^(?:--)/, /^(?:->)/, /^(?:&&)/, /^(?:\|\|)/, /^(?:<=)/, /^(?:>=)/, /^(?:==)/, /^(?:!=)/, /^(?:$)/, /^(?:;)/, /^(?:(\{|<%))/, /^(?:(\}|%>))/, /^(?:,)/, /^(?::)/, /^(?:=)/, /^(?:\()/, /^(?:\))/, /^(?:(\[|<:))/, /^(?:(\]|:>))/, /^(?:\.)/, /^(?:&)/, /^(?:!)/, /^(?:~)/, /^(?:-)/, /^(?:\+)/, /^(?:\*)/, /^(?:\/)/, /^(?:%)/, /^(?:<)/, /^(?:>)/, /^(?:\^)/, /^(?:\|)/, /^(?:\?)/, /^(?:[ \t\v\r\f])/, /^(?:.)/],
            conditions: { "INITIAL": { "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73], "inclusive": true } }
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
},{"_process":147,"fs":145,"path":146}],140:[function(require,module,exports){
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

},{"../ast":50,"./generatedParser.js":139}],141:[function(require,module,exports){
"use strict";
///
/// FactoryRegistry
///
/// Contains a factory implementation that creates objects depending on
/// their relevance to a given context.
///
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
            // find all constructors that have a rating > 0
            .filter(registered => (registered.ratingFunc(context) || 0) > 0)
            // sort by rating descending
            .sort(this.createRatingSorter(context));
        if (list.length < 1) {
            throw new Error('Unable to find matching constructor for context ' +
                this.tryStringifyContext(context));
        }
        // the first item in `list` is the item with the best match
        return list[0].constructorFunc;
    }
    /**
     * Attempts to stringify a context object for debugging.
     */
    tryStringifyContext(context) {
        try {
            return JSON.stringify(context);
        }
        catch (_a) {
            // ignore error, just return
            return '';
        }
    }
}
exports.FactoryRegistry = FactoryRegistry;
exports.default = FactoryRegistry;

},{}],142:[function(require,module,exports){
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

},{}],143:[function(require,module,exports){
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

},{}],144:[function(require,module,exports){
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

},{"fs":145}],145:[function(require,module,exports){

},{}],146:[function(require,module,exports){
(function (process){
// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

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

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
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
},{"_process":147}],147:[function(require,module,exports){
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
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[9])(9)
});
