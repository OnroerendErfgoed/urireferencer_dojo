/*jshint node:true*/
module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt, [ 'grunt-*' ]);

	grunt.initConfig({
		jshint: {
			all: ['./*.js', './controllers/*.js'],
			options: {
				jshintrc: './.jshintrc'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', ['jshint']);
};