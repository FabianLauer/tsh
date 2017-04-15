/** @class Alpha */
var Alpha = (function() {
	/** @constructor */
	function Alpha() {
	}

	return Alpha;
})();


/** @class Beta */
var Beta = (function() {
	/** @constructor */
	function Beta() {
		this.foo;
		this.bar;
	}

	return Beta;
})();


/** @class Gamma */
var Gamma = (function() {
	/** @constructor */
	function Gamma() {
	}

	Gamma.prototype.alpha = function alpha() {
	}

	Gamma.prototype.beta = function beta() {
	}

	Gamma.prototype.gamma = function gamma() {
	}

	Gamma.prototype.delta = function delta(a, b, c, d, e) {
	}

	return Gamma;
})();


/** @class Delta */
var Delta = (function() {
	/** @constructor */
	function Delta() {
		this.foo;
		this.bar;
	}

	Delta.fibo;
	Delta.nacci;

	return Delta;
})();
