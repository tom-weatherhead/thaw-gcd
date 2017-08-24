var gcd = require("../lib/thaw-gcd.js");

exports["gcd"] = {
	setUp: function (done) {
		// this.edgecase = ;
		// this.neg      = ;
		// this.byte     = ;
		this.zero     = 0;
		// this.invld    = ;
		// this.huge     = ;
		// this.small    = ;
		done();
	},
	tests: function (test) {
		test.equal(gcd(35, 84),				 7,		"Should be 7");
		test.equal(gcd(24, 80),				 8,		"Should be 8");
		test.equal(gcd(-64, 14),			 2,		"Should be 2");
		test.equal(gcd(31, -120),			 1,		"Should be 1");
		test.equal(gcd(-259, -74),			37,		"Should be 37");
		test.equal(gcd(0, 15),				15,		"Should be 15");
		test.equal(gcd(77, 0),				77,		"Should be 77");
		test.done();
	}
};
