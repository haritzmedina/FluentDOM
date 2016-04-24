module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/*.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        jasmine : {
            // Your project's source files
            src : 'src/*.js',
            // Your Jasmine spec files
            specs : 'test/*spec.js',
            // Your spec helper files
            //helpers : 'test/helpers/*.js',
            timeout : 10000,
            junit : {
                output : 'junit/'
            },
            phantomjs : {
                'ignore-ssl-errors' : true
            }
        }

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'jasmine']);

};
