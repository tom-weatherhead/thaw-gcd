	// CommonJS, AMD, script tag
	if (typeof exports !== 'undefined') {
		module.exports = gcd;
	} else if (typeof define === 'function' && define.amd) {
		define(() => {
			return gcd;
		});
	} else {
		global.gcd = gcd;
	}
}(typeof window !== 'undefined' ? window : global));
