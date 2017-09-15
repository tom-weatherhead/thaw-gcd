'use strict';

const fs = require('fs'),
	path = require('path');

module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				banner:	'/**\n' +
						' * <%= pkg.name %>\n' +
						' *\n' +
						' * @copyright <%= grunt.template.today(\'yyyy\') %> <%= pkg.author.name %>\n' +
						' * @license <%= pkg.license %>\n' +
						' * @version <%= pkg.version %>\n' +
						' */\n'
			},
			dist: {
				src: [
					'<banner>',
					'src/intro.js',
					'src/<%= pkg.name %>.js',
					'src/outro.js'
				],
				dest: 'lib/<%= pkg.name %>.es6.js'
			}
		},
		'babel': {
			options: {
				sourceMap: false,
				presets: ['babel-preset-es2015']
			},
			dist: {
				files: {
					'lib/<%= pkg.name %>.js': 'lib/<%= pkg.name %>.es6.js'
				}
			}
		},
		eslint: {
			// ThAW: Why not lint all .js files in the repo?
			target: [
				'*.js',
				'lib/<%= pkg.name %>.es6.js',
				// 'lib/<%= pkg.name %>.js',
				'src/<%= pkg.name %>.js',
				'test/*.js'
			]
		},
		nodeunit: {
			all: ['test/*.js']
		},
		uglify: {
			options: {
				banner: '/*\n<%= grunt.template.today(\'yyyy\') %> <%= pkg.author.name %>\n @version <%= pkg.version %>\n*/',
				output: {
					quote_style: 1		// Use single quotes.
				},
				sourceMap: true,
				sourceMapIncludeSources: true
			},
			target: {
				files: {
					'lib/<%= pkg.name %>.min.js': [ 'lib/<%= pkg.name %>.js' ]
				}
			}
		},
		watch: {
			js: {
				files: '<%= concat.dist.src %>',
				tasks: 'build'
			},
			pkg: {
				files: 'package.json',
				tasks: 'build'
			}
		}
	});

	// Tasks
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.task.registerTask('babili', 'Minifies ES2016+ code', function () {
		var data = fs.readFileSync(path.join(__dirname, 'lib', 'thaw-gcd.es6.js'), 'utf8'),
			minified = require('babel-core').transform(data, {sourceFileName: 'thaw-gcd.es6.js', sourceMaps: true, presets: ['babili']}),
			pkg = require(path.join(__dirname, 'package.json')),
			banner = '/*\n ' + new Date().getFullYear() + ' ' + pkg.author.name + '\n @version ' + pkg.version + '\n*/\n\'use strict\';';

		fs.writeFileSync(path.join(__dirname, 'lib', 'thaw-gcd.es6.min.js'), banner + minified.code + '\n//# sourceMappingURL=thaw-gcd.es6.min.js.map', 'utf8');
		grunt.log.ok('1 file created.');
		fs.writeFileSync(path.join(__dirname, 'lib', 'thaw-gcd.es6.min.js.map'), JSON.stringify(minified.map), 'utf8');
		grunt.log.ok('1 sourcemap created.');
	});

	// aliases
	grunt.registerTask('test', ['eslint', 'nodeunit']);
	grunt.registerTask('build', ['concat', 'babel']);
	grunt.registerTask('default', ['build', 'test', 'babili', 'uglify']);
};
