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
          'dist/<%= pkg.name %>.min.js': '<%= pkg.name %>.js'
        }
      }
    },
    jshint: {
      options: {
        jshintrc: true
      },
      files: [
        'Gruntfile.js',
        '<%= pkg.name %>.js',
        'test/**/*.js'
      ]
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    }
  });

  // user defined tasks
  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('build', ['uglify']);
  grunt.registerTask('default', ['jshint', 'mochaTest', 'uglify']);
};
