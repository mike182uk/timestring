module.exports = function(grunt) {
  // measure the time each task takes
  require('time-grunt')(grunt);

  // autoload Grunt tasks
  require('load-grunt-tasks')(grunt);

  // main project config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': 'src/<%= pkg.name %>.js'
        }
      }
    },
    jshint: {
      options: {
        jshintrc: true
      },
      files: [
        'Gruntfile.js',
        'src/**/*.js',
      ]
    }
  });

  // user defined tasks
  grunt.registerTask('default', ['jshint', 'uglify']);
};
