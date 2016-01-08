/*jshint node:true*/
module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt, [ 'grunt-*' ]);

  grunt.initConfig({
    jshint: {
      all: ['./*.js', './controllers/*.js', './tests/**/*.js'],
      options: {
        jshintrc: './.jshintrc'
      }
    },
    'http-server': {
      dev: {
        root: '.',
        host: 'localhost',
        port: 8080,
        showDir: true,
        runInBackground: false,
        openBrowser: true
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-http-server');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('run', ['http-server:dev']);
};