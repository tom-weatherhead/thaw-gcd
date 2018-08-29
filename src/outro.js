	// Node, AMD & window supported

	const version = '{{VERSION}}';

	if (typeof exports !== 'undefined') {
		module.exports = {
			version: version,
			gcd: gcd
		};
	} else if (typeof define === 'function' && define.amd !== void 0) {
		define(() => {
			return {
				version: version,
				gcd: gcd
			};
		});
	} else {
		global.gcd = gcd;
	}
}(typeof window !== 'undefined' ? window : global));
