# End 2 End Tests

Tests in this directory work as follows:

1. Get source code from a test case.
2. Parse said source code to an AST.
3. For every available code generator, do:
	1. Generate code from AST
	2. Compare generated code against the baseline for this code generator and source code

The main test code runs in file `runner.ts`.
