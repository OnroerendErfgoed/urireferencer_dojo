/*jshint node:true*/
module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt, [ 'grunt-*' ]);
	var path = require('path');

	grunt.initConfig({
		jshint: {
			all: ['Gruntfile.js', './*.js'],
			options: {
				jshintrc: './.jshintrc'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('build', [ 'jshint']);
	grunt.registerTask('default', ['jshint']);
};