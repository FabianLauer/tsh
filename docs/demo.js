
		/** @class RequireConfigPaths */
		var RequireConfigPaths = (function() {
			/** @constructor */
			function RequireConfigPaths() {
				this.vs = "monaco-editor/vs";

			}

			

			

			return function() {
				return new RequireConfigPaths();
			};
		})();

		
		/** @class RequireConfig */
		var RequireConfig = (function() {
			/** @constructor */
			function RequireConfig() {
				this.paths = RequireConfigPaths();

			}

			

			

			return function() {
				return new RequireConfig();
			};
		})();

		
		function main() {
			require.config(RequireConfig());
require(window.createJSArray('vs/editor/editor.main'), (function () {
			startDemo(monaco);

		}));

		}
		
		function startDemo(monaco) {
			var sourceEditor = createEditor(monaco, "source-container", "swift", false, getSampleCode());
var compiledEditor = createEditor(monaco, "compiled-container", "javascript", true, "");
var lastRun = 0;
var lastRunTimeout;
var recompileAndRun = (function () {
			var result = compile(sourceEditor, compiledEditor);
clearTimeout(lastRunTimeout);
if (result == CompileResult.CompilationSuccessful) {
			var now = Date.now();
if (now - lastRun < 100) {
			lastRunTimeout = setTimeout(recompileAndRun);

		}
else {
			run(compiledEditor.getValue());

		}

		}

		});
recompileAndRun();
sourceEditor.onDidType(recompileAndRun);
sourceEditor.onDidPaste(recompileAndRun);
sourceEditor.onDidBlurEditor(recompileAndRun);
sourceEditor.onDidChangeModelContent(recompileAndRun);

		}
		
		/** @class MonacoEditorOptions */
		var MonacoEditorOptions = (function() {
			/** @constructor */
			function MonacoEditorOptions() {
				this.value;
this.language;
this.readOnly;
this.lineNumbers = true;
this.roundedSelection = false;
this.scrollBeyondLastLine = true;
this.theme = "vs-light";
this.fontSize = 11;
this.wordWrap = true;
this.folding = true;

			}

			

			

			return function() {
				return new MonacoEditorOptions();
			};
		})();

		
		function createEditor(monaco, containerId, language, readOnly, content) {
			var options = MonacoEditorOptions();
options.value = content;
options.language = language;
options.readOnly = readOnly;
return monaco.editor.create(document.getElementById(containerId), options);

		}
		
		/** @enum CompileTarget */
		var CompileTarget = {
			'JavaScript': 'JavaScript',
'TypeScriptDeclaration': 'TypeScriptDeclaration'
		};


		/** @enum CompileResult */
		var CompileResult = {
			'CompilationSuccessful': 'CompilationSuccessful',
'CompilationFailed': 'CompilationFailed'
		};


		function compile(sourceEditor, compiledEditor) {
			clearProblems();
var sourceCode = sourceEditor.getValue();
var code = "";
var compiled = false;
var compiledCode;
var result = CompileResult.CompilationSuccessful;
try {
			compiledCode = compileToTarget(sourceCode, CompileTarget.JavaScript);
compiled = true;

		} catch (err) {
			result = CompileResult.CompilationFailed;
renderProblem(ProblemType.CompileTime, err);

		}if (compiled) {
			code += compiledCode;

		}
try {
			compiledCode = compileToTarget(sourceCode, CompileTarget.TypeScriptDeclaration);
compiled = true;

		} catch {
			compiled = false;
result = CompileResult.CompilationFailed;

		}if (compiled) {
			compiledCode = compiledCode.replace(_new(RegExp, "\t+", "g"), "  ");
code += "\n/* --- TypeScript Declarations --- */\n";
code += "/*\n\n" + compiledCode + "\n*/";

		}
compiledEditor.setValue(tryBeautifyJavaScript(code));
return result;

		}
		
		function run(code) {
			clearOutput();
js = "(function(exports, print, require) {";
js += code;
js += "; main();";
js += "})({}, window.renderOutput, function() { throw new Error('import/reuqire not supported.') })";
try {
			window.runJavaScript(js);

		} catch (runtimeErr) {
			renderProblem(ProblemType.RunTime, runtimeErr);

		}
		}
		
		function compileToTarget(sourceCode, compileTarget) {
			var api = compiler.CompilerApi.create();
var target;
if (compileTarget == CompileTarget.JavaScript) {
			target = 0;

		}
else {
			target = 1;

		}
return api.compileSourceCode(sourceCode, target);

		}
		
		function tryBeautifyJavaScript(jsCode) {
			try {
			return window.js_beautify(jsCode);

		} catch {
			return jsCode;

		}
		}
		
		/** @enum ProblemType */
		var ProblemType = {
			'CompileTime': 'CompileTime',
'RunTime': 'RunTime'
		};


		function getProblemsPanelContentElement() {
			return document.getElementById("problems-panel-content");

		}
		
		function clearProblems() {
			var problemsPanelContent = getProblemsPanelContentElement();
problemsPanelContent.innerHTML = "";
var content = document.createElement("span");
content.innerText = "No problems.";
problemsPanelContent.appendChild(content);

		}
		
		function renderProblem(type, error) {
			var problemsPanelContent = getProblemsPanelContentElement();
problemsPanelContent.innerHTML = "";
var problem = document.createElement("pre");
if (type == ProblemType.CompileTime) {
			problem.innerText = "Compiler Error:";

		}
else {
			problem.innerText = "Runtime Error:";

		}
problem.innerText += "\n" + error.message;
problemsPanelContent.appendChild(problem);
console.warn("Problem:", type, error);

		}
		
		function getOutputPanelContentElement() {
			return document.getElementById("output-panel-content");

		}
		
		function clearOutput() {
			var outputPanelContent = getOutputPanelContentElement();
outputPanelContent.innerHTML = "";

		}
		
		function renderOutput(output) {
			var outputPanelContent = getOutputPanelContentElement();
outputPanelContent.innerHTML += output;
console.log("Output:", output);

		}
		