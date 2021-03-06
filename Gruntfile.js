/*
 * Generated on 2015-05-28
 * generator-assemble v0.5.0
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2015 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist'
    },

    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml,scss}'],
        tasks: ['assemble']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
      sass: {
        files: ['<%= config.src %>/templates/{,*/}*.scss'],
        tasks: ['sass', 'cssmin']
      },
      uglify: {
        files: ['<%= config.src %>/assets/js/*.js'],
        tasks: ['uglify']
      },
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },

    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: '<%= config.dist %>/assets',
          layout: '<%= config.src %>/templates/layouts/default.hbs',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= config.src %>/templates/partials/*.hbs',
          plugins: ['assemble-contrib-permalinks','assemble-contrib-sitemap'],
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
        }
      }
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/templates/assets',
          extDot: 'last',
          src: ['*.scss', '!_*.scss'],
          dest: '<%= config.src %>/assets/css',
          ext: '.css'
        }]
      }
    },

    // cssmin: {
    //   target: {
    //     files: [{
    //       expand: true,
    //       cwd: '<%= config.src %>/assets/css',
    //       extDot: 'last',
    //       src: ['*.css', '!*.min.css', '!*.css.map'],
    //       dest: '<%= config.dist %>/assets/css/',
    //       ext: '.min.css'
    //     }]
    //   }
    // },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1,
      },
      target: {
        files: {
          '<%= config.dist %>/assets/css/style.min.css': [
            '<%= config.src %>/assets/css/bootstrap.css',
            '<%= config.src %>/assets/css/bootstrap-theme.css',
            '<%= config.src %>/assets/css/rcarousel.css',
            '<%= config.src %>/assets/css/theme.css'
          ]
        }
      }
    },

    // uglify: {
    //   my_target: {
    //     files: [{
    //       expand: true,
    //       cwd: '<%= config.src %>/assets/js',
    //       extDot: 'last',
    //       src: ['*.js', '!*.min.js'],
    //       dest: '<%= config.dist %>/assets/js/',
    //       ext: '.min.js'
    //     }]
    //   }
    // },

    uglify: {
      options: {
        mangle: {
          except: ['jQuery']
        }
      },
      my_target: {
        files: {
          '<%= config.dist %>/assets/js/script.min.js': [
            '<%= config.src %>/assets/js/jquery-1.11.3.js',
            '<%= config.src %>/assets/js/jquery.ui.core.js',
            '<%= config.src %>/assets/js/jquery.ui.widget.js',
            '<%= config.src %>/assets/js/jquery.ui.rcarousel.js',
            '<%= config.src %>/assets/js/bootstrap.js',
            '<%= config.src %>/assets/js/count-up.js',
            '<%= config.src %>/assets/js/theme.js'
          ]
        }
      }
    },

    copy: {
      fonts: {
        expand: true,
        cwd: '<%= config.src %>/assets/fonts',
        src: '**',
        dest: '<%= config.dist %>/assets/fonts/'
      },
      favicon: {
        files: [
          {expand: true, cwd: '<%= config.src %>/assets/images/', src: 'favicon.ico', dest: '<%= config.dist %>/'}
        ]
      }
    },

    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 4
        },
        files: [{
          expand: true,
          cwd: '<%= config.src %>/assets/images',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= config.dist %>/assets/images/'
        }]
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>/**/*.{html,xml}']

  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('server', [
    'build',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'imagemin',
    'copy',
    'assemble'
  ]);

  grunt.registerTask('default', [
    'build',
  ]);

};
