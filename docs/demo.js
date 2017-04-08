require.config({ paths: { 'vs': 'monaco-editor/vs' } });
require(['vs/editor/editor.main'], function () {
	main(monaco)
});


function main() {
	var sourceEditor = createEditor(
		monaco,
		'source-container',
		'swift',
		false,
		[
			'func main() {',
			'}'
		].join('\n')
	);

	var compiledEditor = createEditor(
		monaco,
		'compiled-container',
		'javascript',
		true,
		[].join('\n')
	);

	var recompile = function () { compile(sourceEditor, compiledEditor); }

	// compile once on start
	recompile();

	// bind events
	sourceEditor.onDidType(recompile);
	sourceEditor.onDidPaste(recompile);
	sourceEditor.onDidBlurEditor(recompile);
	sourceEditor.onDidChangeModelContent(recompile);
}


function compile(sourceEditor, compiledEditor) {
	try {
		var compiled = compiler.CompilerApi.create()
			.compileSourceCode(sourceEditor.getValue(), 0);
		compiledEditor.setValue(tryBeautifyJavaScript(compiled));
	} catch(err) {
		renderCompileProblem(err);
		return
	}
	clearCompileProblems();
}


function tryBeautifyJavaScript(js) {
	if (typeof window.js_beautify === 'function') {
		return window.js_beautify(js);
	}
	return js;
}


function createEditor(monaco, containerId, language, readonly, content) {
	return monaco.editor.create(document.getElementById(containerId), {
		value: content,
		language: language,
		lineNumbers: true,
		roundedSelection: false,
		scrollBeyondLastLine: false,
		readOnly: !!readonly,
		theme: 'vs-light',
	});
}



var problemsPanelContent = document.getElementById('problems-panel-content');


function clearCompileProblems() {
	problemsPanelContent.innerHTML = '';
	var content = document.createElement('span');
	content.innerText = 'No problems.';
	problemsPanelContent.appendChild(content);
}


function renderCompileProblem(error) {
	problemsPanelContent.innerHTML = '';
	var problem = document.createElement('pre');
	problem.innerText = error.message;
	problemsPanelContent.appendChild(problem);
}
