
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
var recompile = (function () {
			compile(sourceEditor, compiledEditor);

		});
recompile();
sourceEditor.onDidType(recompile);
sourceEditor.onDidPaste(recompile);
sourceEditor.onDidBlurEditor(recompile);
sourceEditor.onDidChangeModelContent(recompile);

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


		function compile(sourceEditor, compiledEditor) {
			clearCompileProblems();
var sourceCode = sourceEditor.getValue();
var code = "";
var compiled = false;
var compiledCode;
try {
			compiledCode = compileToTarget(sourceCode, CompileTarget.JavaScript);
compiled = true;

		} catch (err) {
			renderCompileProblem(err);

		}if (compiled) {
			code += compiledCode;

		}
try {
			compiledCode = compileToTarget(sourceCode, CompileTarget.TypeScriptDeclaration);
compiled = true;

		} catch {
			compiled = false;

		}if (compiled) {
			code += compiledCode.replace(_new(RegExp, "\t+", "g"), "  ");
code += "\n/* --- TypeScript Declarations --- */\n";
code += "/*\n\n" + compiledCode + "\n*/";

		}
compiledEditor.setValue(tryBeautifyJavaScript(code));

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
		
		function getProblemsPanelContentElement() {
			return document.getElementById("problems-panel-content");

		}
		
		function clearCompileProblems() {
			var problemsPanelContent = getProblemsPanelContentElement();
problemsPanelContent.innerHTML = "";
var content = document.createElement("span");
content.innerText = "No problems.";
problemsPanelContent.appendChild(content);

		}
		
		function renderCompileProblem(error) {
			var problemsPanelContent = getProblemsPanelContentElement();
problemsPanelContent.innerHTML = "";
var problem = document.createElement("pre");
problem.innerText = error.message;
problemsPanelContent.appendChild(problem);

		}
		