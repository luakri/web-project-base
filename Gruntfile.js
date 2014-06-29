/*global require:true, module:true */

module.exports = function(grunt) {
  'use strict';

  var DIST = './dist/';

  var src = (grunt.option('env')) ? './app/' : '';

  // list of js files
  var files = {
    main: {
      compiled: 'modules/main.js',
      list: [
        src + 'js/lib/jquery/jquery-1.*.js',
        src + 'modules/app.js'
      ]
    },
    modernizr: {
      list: [
        src + 'js/lib/modernizr*.js'
      ]
    }
  };

  // Auto load tasks.
  require('load-grunt-tasks')(grunt);

  // Display tasks timing.
  require('time-grunt')(grunt);

  grunt.initConfig({

    // automatically add prefixes to css
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', '> 1%', 'ie 8', 'ie 9']
      },
      all: {
        files: [{
          expand: true,
          src: ['{,*/}*.css'],
          cwd: './app/css',
          dest: './app/css',
          ext: '.css'
        }]
      }
    },

    // remove a directory
    clean: {
      css: './app/css',
      dist: './dist/'
    },

    // create a local server
    connect: {
      server: {
        options: {
          base: './dist',
          open: true,
          port: 8001,
          hostname : 'localhost'
        }
      }
    },

    // copy files
    copy: {
      css: {
        files: [{
          expand: true,
          src: ['css/{,*/}*'],
          cwd: './app/',
          dest: './dist/'
        }]
      },
      sass: {
        files: [{
          expand: true,
          src: ['sass/{,*/}*'],
          cwd: './app/',
          dest: './dist/'
        }]
      },
      html: {
        files: [{
          expand: true,
          src: ['{,*/}*.html', '!build/{,*/}*.html'],
          cwd: './app/',
          dest: './dist/'
        }]
      },
      images: {
        files: [{
          expand: true,
          src: ['img/{,*/}*.{gif,ico,jpeg,jpg,png}'],
          cwd: './app/',
          dest: './dist/'
        }]
      },
      'javascript-dev': {
        files: [{
          expand: true,
          src: ['**/*.js'],
          cwd: './app/',
          dest: './dist/'
        }]
      },
      'javascript-prod': {
        files: [{
          expand: true,
          src: ['**/*.js', '!**/*.min.js'],
          cwd: './app/modules/',
          dest: './dist/modules/src/'
        }]
      },
      json: {
        files: [{
          expand: true,
          src: ['{,*/}*.json', '!lib/{,*/}*.json'],
          cwd: './app/',
          dest: './dist/'
        }]
      }
    },

    // build html
    htmlbuild: {
      build: {
        src: './app/index.html',
        dest: './dist/index.html',
        options: {
          beautify: true,
          relative: false,
          scripts: {
            main: {
              cwd: './app/',
              files: files.main.list
            },
            modernizr: {
              cwd: './app/',
              files: files.modernizr.list
            }
          }
        }
      },
      prod: {
        src: './app/index.html',
        dest: './dist/index.html',
        options: {
          beautify: true,
          relative: false,
          scripts: {
            main: {
              cwd: './dist',
              files: [files.main.compiled]
            },
            modernizr: {
              cwd: './dist',
              files: [files.modernizr.list]
            }
          }
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        expand: true,
        cwd: './dist',
        src: ['**/*.html'],
        dest: './dist'
      }
    },

    // hint javascript
    jshint: {
      options: {
        force: true,
        jshintrc: '.jshintrc'
      },
      dev: {
        src: ['./app/modules/{,*/}*.js']
      },
      grunt: {
        src: './Gruntfile.js'
      }
    },

    // Modernizr build tasks.
    modernizr: {
      dist: {
        'devFile' : 'remote',
        'outputFile' : './app/js/lib/modernizr.js',
        'extra' : {
          'shiv' : true,
          'printshiv' : false,
          'load' : true,
          'mq' : false,
          'cssclasses' : true
        },
        'extensibility' : {
          'addtest' : false,
          'prefixed' : false,
          'teststyles' : false,
          'testprops' : false,
          'testallprops' : false,
          'hasevents' : false,
          'prefixes' : false,
          'domprefixes' : false
        },
        'uglify' : true,
        'tests' : [],
        'parseFiles' : true,
        'files' : {
          'src': ['./app/modules/{,*/}*.js']
        }
      }
    },

    // lint json.
    jsonlint: {
      dev: {
        src: './app/data/*.json'
      }
    },

    // Minify json.
    'json-minify': {
      prod: {
        files: './app/data/*.json'
      }
    },

    // compile sass as css
    sass: {
      options: {
        sourcemap: true,
        trace: true
      },
      dev: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          src: ['{,*/}*.scss', '!**/_*.scss'],
          cwd: './app/sass/',
          dest: './app/css/',
          ext: '.css'
        }]
      },
      prod: {
        options: {
          style: 'compressed'
        },
        files: [{
          expand: true,
          src: ['{,*/}*.scss', '!**/_*.scss'],
          cwd: './app/sass/',
          dest: './app/css/',
          ext: '.css'
        }]
      }
    },

    // Uglify tasks.
    uglify: {
      prod : {
        options: {
          mangle: true,
          sourceMapPrefix: 3,
          sourceMap: './dist/modules/main.js.map',
          sourceMapRoot: 'src/',
          sourceMappingURL: 'main.js.map'
        },
        files: [
          {
            dest: DIST + files.main.compiled,
            src: files.main.list
          }
        ]
      }
    },

    // Watch tasks.
    watch: {
      livereload : {
        files : [ '/*.js', '/*.css', '/*.html' ]
      },
      grunt: {
        expand: true,
        files: './Gruntfile.js',
        tasks: 'jshint:grunt'
      },
      html: {
        expand: true,
        files: ['./app/{,*/}*.html', '!./app/build/**/*.html'],
        tasks: ['newer:jshint:dev', 'newer:copy:javascript-dev', 'htmlbuild:build', 'newer:copy:html']
      },
      images: {
        expand: true,
        files: ['./app/img/{,*/}*.{gif,ico,jpeg,jpg,png}', './app/mandator/**/*.{gif,ico,jpeg,jpg,png}'],
        tasks: 'newer:copy:images'
      },
      javascript: {
        expand: true,
        files: './app/{,*/}*.js',
        tasks: ['newer:jshint:dev','newer:copy:javascript-dev']
      },
      sass: {
        expand: true,
        files: './app/sass/{,*/}*.scss',
        tasks: ['clean:css', 'sass:dev', 'autoprefixer', 'copy:css']
      },
      json: {
        expand: true,
        files: ['./app/{,*/}*.json', '!./app/lib/**/*.json'],
        tasks: ['newer:jsonlint', 'newer:copy:json']
      }
    }
  });

  // TASKS ----------------------------------

  grunt.registerTask('default', 'server');

  // dev tasks
  grunt.registerTask('build', [
    'clean',
    'jshint:dev',
    'jsonlint',
    'sass:dev',
    'autoprefixer',
    'modernizr',
    'copy:sass',
    'copy:css',
    'copy:html',
    'copy:images',
    'copy:javascript-dev',
    'copy:json',
    'htmlbuild:build'
  ]);

  // prod tasks.
  grunt.registerTask('prod', [
    'clean:dist',
    'jshint:dev',
    'jsonlint',
    'sass:prod',
    'uglify:prod',
    'json-minify:prod',
    'autoprefixer',
    'modernizr',
    'copy:sass',
    'copy:css',
    'copy:html',
    'copy:images',
    'copy:javascript-prod',
    'copy:json',
    'htmlbuild:prod',
    'htmlmin'
  ]);

  // run
  grunt.registerTask('run', ['connect:server', 'watch']);

  // run server locally
  grunt.registerTask('server', ['build', 'run']);

  /*
    to run build local server:
    grunt server or grunt

    to run build production
    grunt prod -env=prod

    grunt run
  */
};