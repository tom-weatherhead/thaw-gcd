/**
 * Euclid's greatest common divisor algorithm as a JavaScript component
 *
 * @author Tom Weatherhead
 * @copyright 2018
 * @license MIT
 * @version 0.0.0
 */
(function (global) {

	/**
	 * gcd
	 *
	 * @method gcd
	 * @param  {Mixed}   m          String, Int or Float representation of the first number
	 * @param  {Mixed}   n          String, Int or Float representation of the second number
	 * @return {Int}                The greatest common divisor of m and n
	 */
	function gcd (m, n) {
		// See https://en.wikipedia.org/wiki/Euclidean_algorithm

		// TODO: Ensure than m and n are integers. Convert if necessary.
		m = parseInt(m, 10);
		n = parseInt(n, 10);

		if (isNaN(m) || isNaN(n)) {
			throw new Error('Invalid arguments');
		// } else if (m < 0) {
			// return gcd(-m, n);
		} else if (n < 0) {
			return gcd(m, -n);
		} else if (m < n) {
			return gcd(n, m);
		} else if (n === 0) {
			return m;
		} else {
			return gcd(n, m % n);
		}
	}

	// Partial application for functional programming:
	gcd.partial = m => n => gcd(m, n);

	// Node, AMD & window supported

	const version = '0.0.0';

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
