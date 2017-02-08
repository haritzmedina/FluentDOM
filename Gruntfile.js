module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		concat: {
			dist: {
				src: ['src/FDOMElements.js', 'src/FDOMBuilder.js'],
				dest: 'build/<%= pkg.name %>.js'
			}
		},
		coveralls: {
			options: {
				debug: true,
				coverageDir: 'coverage/',
				dryRun: true,
				force: true,
				recursive: true
			},
			your_target: {
				// LCOV coverage file (can be string, glob or array)
				src: 'coverage/**/*.info',
				options: {
					// Any options for just this target
				}
			}
		},
		eslint: {
			target: ['src/*.js', 'test/*.js']
		},
		jsdoc : {
			dist : {
				src: ['src/*.js', 'test/*.js'],
				options: {
					destination: 'doc'
				}
			}
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js',
				singleRun: true
			}
		},
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: ['src/FDOMElements.js', 'src/FDOMBuilder.js'],
				dest: 'build/<%= pkg.name %>.min.js'
			}
		}
	});

	// Load the plugin that provides the "concat" task.
	grunt.loadNpmTasks('grunt-contrib-concat');

	// Load the plugin that provides the "eslint" task.
	grunt.loadNpmTasks('grunt-eslint');

	// Load the plugin that provides the "jsdoc" task.
	grunt.loadNpmTasks('grunt-jsdoc');

	// Load the plugin that provides the "karma" task.
	grunt.loadNpmTasks('grunt-karma');

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Karma coveralls
	//grunt.loadNpmTasks('grunt-karma-coveralls');

	// Coveralls
	grunt.loadNpmTasks('grunt-coveralls');


	// Default task(s).
	grunt.registerTask('default', ['concat', 'karma', 'uglify', 'eslint', 'coveralls']);

};
