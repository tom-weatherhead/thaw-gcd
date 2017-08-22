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
	foo: function (test) {
		// test.expect(?);

		test.equal(gcd(35, 84),                                7,      "Should be 7");

		test.done();
	}
};
