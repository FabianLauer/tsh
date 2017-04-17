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
			'//',
			'//                          DEMO',
			'//           - https://github.com/FabianLauer/tsh -',
			'//',
			'// Any code you enter in this window will be compiled to JavaScript on the fly.',
			'// ',
			'',
			'',
			'// import modules:',
			'import "fs"',
			'import "http"',
			'',
			'// import files:',
			'import "./otherFile"',
			'import "../../yet/another/file"',
			'',
			'',
			'class Person {',
			'	// Unlike Swift, `let` variables are mutable.',
			'	// Use `const` for immutable variables and class variables.',
			'	const name',
			'	let spouse: Person',
			'',
			'	static const defaultAge: Int = 0',
			'	let age = defaultAge',
			'',
			'	func describe() -> String {',
			'		return "Person ${name} is ${age} years old."',
			'	}',
			'',
			'	// types are optional:',
			'	func noTypes(a, b, c) {',
			'		// ...',
			'	}',
			'	// and even implementations can be omitted:',
			'	func someTypes(a: String, b, c: Int)',
			'	func allTypes(a: String, b, c: Int) -> Int',
			'}',
			'',
			'// this will make `Person` available when this file is imported',
			'export Person',
			'',
			'func main() -> Void {',
			'	let person: Person = Person()',
			'	let descr: String = person.describe()',
			'',
			'	// parens around conditions are optional:',
			'	if person {',
			'		// ...',
			'	} else if descr {',
			'		// ...',
			'	} else {',
			'		// ...',
			'	}',
			'}',
			''
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
		scrollBeyondLastLine: true,
		readOnly: !!readonly,
		theme: 'vs-light',
		fontSize: 11,
		wordWrap: true,
		folding: true
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
