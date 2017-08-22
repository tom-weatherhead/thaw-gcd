	/**
	 * gcd
	 *
	 * @method gcd
	 * @param  {Mixed}   m          String, Int or Float representation of the first number
	 * @param  {Mixed}   n          String, Int or Float representation of the second number
	 * @param  {Object}  descriptor [Optional] Flags
	 * @return {Int}                The greatest common divisor of m and n
	 */
	function gcd (m, n, descriptor = {}) {
		let result = 0;

		if (isNaN(m) || isNaN(n)) {
			throw new Error("Invalid arguments");
		}
