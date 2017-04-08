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
		'swift',
		true,
		[].join('\n')
	);

	var recompile = function () { compile(sourceEditor, compiledEditor); }

	// compile once on start
	recompile()

	// bind events
	sourceEditor.onDidType(recompile)
	sourceEditor.onDidPaste(recompile)
	sourceEditor.onDidBlurEditor(recompile)
}


function compile(sourceEditor, compiledEditor) {
	var compiled = compiler.CompilerApi.create()
		.compileSourceCode(sourceEditor.getValue(), 0);
	compiledEditor.setValue(compiled)
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
