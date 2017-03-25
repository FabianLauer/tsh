import * as cp from 'child_process'


function merge(literals: TemplateStringsArray, ...placeholders: any[]) {
	let tag = ''
	for (let i = 0; i < literals.length; i++) {
		tag += literals[i] || ''
		tag += placeholders[i] || ''
	}
	return tag
}


function factory<T, TScope>(fn: (this: TScope, input: string) => T, scope?: TScope) {
	return function(literals: TemplateStringsArray, ...placeholders: any[]) {
		return <T>fn.call(scope, merge(literals, ...placeholders))
	}
}


export const _ = {
	print(msg: any, ...additionalMsg: any[]) {
		if (typeof msg === 'undefined' && additionalMsg.length < 1)
			return
		additionalMsg.unshift(msg)
		console.log.apply(console, additionalMsg)
	}
}

/**
 * Writes a message to stdout. Shorthand method for `console.log(...)`.
 */
export const print = factory(console.log)

/**
 * Runs a shell command synchronously.
 */
export const sh = factory(input => {
	const [command, ...args] = input.split(/\s+/i)
	const result = cp.spawnSync(command, args, {
		cwd: process.cwd(),
		stdio: 'inherit'
	})
	if (typeof result.error === 'object' && result.error !== null) {
		throw result.error
	}
	return result
})


/**
 * Runs a jake build command synchronously.
 */
export function jake(namespace: string, target: string) {
	return sh `./jake ${namespace}:${target}`
}
