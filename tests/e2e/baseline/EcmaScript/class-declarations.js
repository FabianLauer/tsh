/** @class Alpha */
var Alpha = (function() {
	/** @constructor */
	function Alpha() {
	}

	return function() {
		return new Alpha();
	};
})();


/** @class Beta */
var Beta = (function() {
	/** @constructor */
	function Beta() {
		this.foo;
		this.bar;
	}

	return function() {
		return new Beta();
	};
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

	return function() {
		return new Gamma();
	};
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

	return function() {
		return new Delta();
	};
})();


/** @class Epsilon */
var Epsilon = (function() {
	/** @constructor */
	function Epsilon() {
		this.c;
	}

	Epsilon.b;

	Epsilon.prototype.a = function a() {
	}

	return function() {
		return new Epsilon();
	};
})();
