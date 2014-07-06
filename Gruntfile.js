/*global require:true, module:true, __dirname:true */

module.exports = function(grunt) {
  'use strict';

  var DIST = './dist/';

  var src = (grunt.option('env')) ? 'modules/src/' : '';

  // list of js files
  var files = {
    main: {
      compiled: 'modules/main.js',
      list: [
        src + 'js/lib/jquery/jquery-1.*.js',
        src + 'modules/**/!(module|app)*.js',
        src + 'modules/**/module.js',
        src + 'modules/app.js',
        '!' + src + 'modules/**/tests/**/*.js'
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
      dist: './dist/',
      src: './dist/modules/src/'
    },

    // create a local server
    connect: {
      server: {
        options: {
          base: './dist',
          open: true,
          port: 8002,
          hostname : 'localhost'
        }
      }
    },

    // build html
    htmlbuild: {
      build: {
        src: './app/index.html',
        dest: './dist/index.html',
        options: {
          beautify: false,
          relative: false,
          prefix: '/',
          scripts: {
            main: {
              cwd: './app/',
              files: files.main.list
            }
          }
        }
      },
      prod: {
        src: './app/index.html',
        dest: './dist/index.html',
        options: {
          beautify: false,
          relative: false,
          prefix: '/',
          scripts: {
            main: {
              cwd: './dist/',
              files: files.main.list
            }
          }
        }
      }
    },

    // minify html
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true
        },
        expand: true,
        cwd: DIST,
        src: ['**/*.html'],
        dest: DIST
      }
    },

    // replace tasks
    replace: {
      build: {
        src: DIST + 'index.html',
        overwrite: true,
        replacements: [
          {
            from: "<!-- builder:",
            to: "<!-- build:"
          },
          {
            from: "<!-- endbuilder",
            to: "<!-- endbuild"
          }
        ]
      },
      sourcemap : {
        src : DIST + '/modules/main.js',
        overwrite: true,
        replacements: [
          {
            from: "//# sourceMappingURL=/main.js.map",
            to: "//# sourceMappingURL=/modules/main.js.map"
          }
        ]
      }
    },

    // Use min tasks.
    useminPrepare: {
      html: DIST + 'index.html',
      options: {
        dest: DIST
      }
    },

    usemin:{
      html: DIST + 'index.html',
      options: {
        assetsDirs: DIST
      }
    },

    // Concat tasks.
    concat: {},

    // Uglify tasks.
    uglify: {
      /*options: {
        sourceMap: true,
        sourceMapIncludeSources: true,
        sourceMapName: DIST + '/modules/main.js.map'
      }*/
    },

    // File revision tasks.
    filerev: {
      options: {
        length: 4
      },
      dist: {
        files: [{
          src: [
            DIST + '/modules/**/*.js',
            DIST + '/js/lib/**/*.js',
            DIST + '/css/*.{css,map}'
          ]
        }]
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
          src: ['**/*.html', '!index.html', '!build/**/*.html', '!modules/**/tests/**/*.html'],
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
          src: ['**/*.js', '!modules/**/tests/**/*.js'],
          cwd: './app/',
          dest: './dist/'
        }]
      },
      'javascript-prod': {
        files: [{
          expand: true,
          src: ['**/*.js', '!modules/**/tests/**/*.js'],
          cwd: './app/',
          dest: './dist/modules/src/'
        }]
      },
      'javascript-modernizr': {
        files: [{
          expand: true,
          src: ['modernizr.js'],
          cwd: './app/js/lib/',
          dest: './dist/js/lib/'
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

    // hint javascript
    jshint: {
      options: {
        force: true,
        jshintrc: '.jshintrc'
      },
      dev: {
        src: ['./app/modules/{,*/}*.js']
      },
      unit: {
        src: ['./app/modules/**/tests/**/*.js']
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
        files: DIST + 'data/*.json'
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
          style: 'expanded',
          sourcemap: true
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
        files: ['./app/**/*.html', '!./app/build/**/*.html'],
        tasks: ['newer:jshint:dev', 'newer:copy:javascript-dev', 'htmlbuild:build', 'newer:copy:html']
      },
      images: {
        expand: true,
        files: ['./app/img/{,*/}*.{gif,ico,jpeg,jpg,png}', './app/mandator/**/*.{gif,ico,jpeg,jpg,png}'],
        tasks: 'newer:copy:images'
      },
      javascript: {
        expand: true,
        files: './app/**/*.js',
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
    },

    // Unit tests tasks.
    karma : {
      options: {
        browsers: [grunt.option('browser') || 'Chrome'],
        singleRun: grunt.option('singlerun') || false
      },
      unit: {
        configFile : 'config/karma.conf.js'
      }
    },

    // E2E tests tasks.
    shell: {
      /*jshint camelcase:false */
      protractor_webdriver_manager_update: {
        options: {
          stdout: true
        },
        command: require('path').resolve(__dirname, 'node_modules', 'grunt-protractor-runner', 'node_modules', '.bin', 'webdriver-manager') + ' update'
      },
      /*jshint camelcase:false */
      protractor_webdriver_manager_start: {
        options: {
          stdout: false,
          stdin: false
        },
        command: require('path').resolve(__dirname, 'node_modules', 'grunt-protractor-runner', 'node_modules', '.bin', 'webdriver-manager') + ' start'
      }
    },

    protractor: {
      e2e: {
        options: {
          configFile: 'config/protractor.conf.js',
          keepAlive: true,
          args: {}
        }
      }
    },

    concurrent: {
      protractor: ['shell:protractor_webdriver_manager_start', 'protractor:e2e'],
      options: {
        logConcurrentOutput: true
      }
    }

  });

  // TASKS ----------------------------------

  // Default tasks
  grunt.registerTask('default', 'server');

  // Development tasks
  grunt.registerTask('build', [
    'clean',
    'jshint',
    'jsonlint',
    'sass:dev',
    'autoprefixer',
    'modernizr',
    'copy:sass',
    'copy:css',
    'copy:images',
    'copy:json',
    'copy:javascript-dev',
    'copy:html',
    'htmlbuild:build'
  ]);

  // Production tasks
  grunt.registerTask('prod', [
    'clean:dist',
    'jshint:dev',
    'jsonlint',
    'autoprefixer',
    'modernizr',
    'copy:sass',
    'copy:css',
    'copy:images',
    'copy:json',
    'copy:javascript-prod',
    'copy:javascript-modernizr',
    'copy:html',
    'json-minify',
    'htmlbuild:prod',
    'replace:build',
    'useminPrepare',
    'concat',
    'uglify',
    'replace:sourcemap',
    'json-minify:prod',
    'filerev',
    'usemin',
    'clean:src',
    'htmlmin'
  ]);

  // Run server locally tasks.
  grunt.registerTask('run', ['connect:server', 'watch']);

  // Build server locally tasks.
  grunt.registerTask('server', ['build', 'run']);

  // Unit tests tasks.
  grunt.registerTask('ut', ['karma:unit']);

  // E2E tests tasks.
  grunt.registerTask('e2e', [
    'connect:server',
    'shell:protractor_webdriver_manager_update',
    'concurrent:protractor'
  ]);

  /*
    to run build local server:
    grunt server or grunt

    to run build production
    grunt prod -env=prod
    grunt run

    to run karma unit tests:
    grunt ut -browser=PhantomJS

    to run protractor tests:
    grunt e2e
  */
};