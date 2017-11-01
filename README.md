# thaw-gcd

[![build status](https://secure.travis-ci.org/tom-weatherhead/thaw-gcd.svg)](http://travis-ci.org/tom-weatherhead/thaw-gcd)  [![downloads](https://img.shields.io/npm/dt/thaw-gcd.svg)](https://www.npmjs.com/package/thaw-gcd)

Euclid's greatest common divisor algorithm as a JavaScript component and npm package.

See https://en.wikipedia.org/wiki/Euclidean_algorithm .

Git installation instructions:

	$ git clone https://github.com/tom-weatherhead/thaw-gcd.git
	$ cd thaw-gcd
	$ npm install -g grunt
	$ npm install
	$ grunt

npm Installation Instructions:

	$ npm install [--save] thaw-gcd

Sample usage of the npm package in a Node.js application:

	$ git init thaw-gcd-client-app
	$ cd thaw-gcd-client-app
	$ npm init -y
	$ npm install --save thaw-gcd
	- Save the following three lines of code in the file index.js :
	
		const gcd = require('thaw-gcd');

		console.log('gcd is', gcd);
		console.log('gcd(35, 84) ===', gcd(35, 84));	// The result should be 7

	$ node index.js

For examples of client-side use of this package, see the "examples" directory.
