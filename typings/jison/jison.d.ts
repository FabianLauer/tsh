/*! Based on https://github.com/mdarse/rpn/blob/master/lib/jison.d.ts. */
declare module 'jison' {
	interface JisonMap {
		[s: number]: string
	}
	interface JisonLex {
		rules: Array<JisonMap>
	}
	interface JisonBNF {
		start: Array<JisonMap>;
		input: Array<JisonMap>;
		line: Array<JisonMap>;
		exp: Array<JisonMap>;
		operator: Array<JisonMap>;
	}
	class Parser {
		constructor(configuration: string);
		constructor(configuration: { lex: JisonLex; bnf: JisonBNF });
		generate(): string;
	}
}
