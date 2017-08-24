// thaw-gcd/examples/script.js

// To disable an eslint warning or error for an entire file, use this syntax: /* eslint no-alert: 0 */

// See https://stackoverflow.com/questions/34764287/turning-off-eslint-rule-for-a-specific-file

'use strict';

$('#btnGCD').click(function () {			// eslint-disable-line no-undef
	let m = $('#m').val();					// eslint-disable-line no-undef
	let n = $('#n').val();					// eslint-disable-line no-undef

	console.log('#btnGCD click');
	console.log('m ===', m, '; n ===', n);
	
	let result = gcd(m, n);

	console.log('gcd ===', result);
	$('#result').val(result);				// eslint-disable-line no-undef
});
