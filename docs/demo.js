
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
		
		function compile(sourceEditor, compiledEditor) {
			clearCompileProblems();
tryCatch((function () {
			var api = compiler.CompilerApi.create();
return api.compileSourceCode(sourceEditor.getValue(), 0);

		}), (function (compiledCode) {
			compiledEditor.setValue(tryBeautifyJavaScript(compiledCode));

		}), (function (err) {
			renderCompileProblem(err);

		}));

		}
		
		function tryBeautifyJavaScript(jsCode) {
			return tryCatch((function () {
			return window.js_beautify(jsCode);

		}), (function (formattedCode) {
			return formattedCode;

		}), (function () {
			return jsCode;

		}));

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
		