module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				banner: '/**\n' +
				' * <%= pkg.description %>\n' +
				' *\n' +
				' * @author <%= pkg.author.name %>\n' +
				' * @copyright <%= grunt.template.today(\'yyyy\') %>\n' +
				' * @license <%= pkg.license %>\n' +
				' * @version <%= pkg.version %>\n' +
				' */\n'
			},
			dist: {
				src: [
					'src/intro.js',
					'src/<%= pkg.name %>.js',
					'src/outro.js'
				],
				dest: 'lib/<%= pkg.name %>.js'
			}
		},
		eslint: {
			target: [
				'Gruntfile.js',
				'lib/<%= pkg.name %>.js',
				'test/*.js'
			]
		},
		nodeunit: {
			all: ['test/*.js']
		},
		replace: {
			dist: {
				options: {
					patterns: [
						{
							// TODO: Make this a replace-all (i.e. /.../g) rather than a replace-first.
							match: /{{VERSION}}/,
							replacement: '<%= pkg.version %>'
						}
					]
				},
				files: [
					{
						expand: true,
						flatten: true,
						src: [
							'lib/<%= pkg.name %>.js'
						],
						dest: 'lib/'
					}
				]
			}
		},
		watch: {
			js: {
				files: '<%= concat.dist.src %>',
				tasks: 'default'
			},
			pkg: {
				files: 'package.json',
				tasks: 'default'
			}
		}
	});

	// tasks
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-replace');

	grunt.task.registerTask('babili', 'Minifies ES2016+ code', function () {
		const fs = require('fs'),
			path = require('path'),
			data = fs.readFileSync(path.join(__dirname, 'lib', 'thaw-gcd.js'), 'utf8').replace('\'use strict\';', ''), // Stripping 'use strict'; because it's injected
			pkg = require(path.join(__dirname, 'package.json')),
			banner = '/*\n ' + new Date().getFullYear() + ' ' + pkg.author + '\n @version ' + pkg.version + '\n*/\n\'use strict\';';

		try {
			const minified = require('babel-core').transform(data, {sourceFileName: 'thaw-gcd.js', sourceMaps: true, presets: ['minify']});

			fs.writeFileSync(path.join(__dirname, 'lib', 'thaw-gcd.min.js'), banner + minified.code + '\n//# sourceMappingURL=thaw-gcd.min.js.map', 'utf8');
			grunt.log.ok('1 file created.');
			fs.writeFileSync(path.join(__dirname, 'lib', 'thaw-gcd.min.js.map'), JSON.stringify(minified.map), 'utf8');
			grunt.log.ok('1 sourcemap created.');
		} catch (e) {
			console.error(e.stack || e.message || e);
			throw e;
		}
	});

	// aliases
	grunt.registerTask('test', ['eslint', 'nodeunit']);
	grunt.registerTask('build', ['concat', 'replace']);
	grunt.registerTask('default', ['build', 'test', 'babili']);
};
