/**
@toc
2. load grunt plugins
3. init
4. setup variables
5. grunt.initConfig
6. register grunt tasks

*/

'use strict';

module.exports = function(grunt) {

	/**
	Load grunt plugins
	@toc 2.
	*/
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-watch');

	/**
	Function that wraps everything to allow dynamically setting/changing grunt options and config later by grunt task. This init function is called once immediately (for using the default grunt options, config, and setup) and then may be called again AFTER updating grunt (command line) options.
	@toc 3.
	@method init
	*/
	function init(params) {
		/**
		Project configuration.
		@toc 5.
		*/
		grunt.initConfig({

      connect: {
        server: {
          options: {
            port: 9000,
            // Change this to '0.0.0.0' to access the server from outside.
            hostname: 'localhost',
            base: '.',
            livereload: 35729
          }
        },
      },

      watch: {
        js: {
          files: ['inspector-gadget.js'],
          tasks: ['dist']
        },
        html: {
          files: ['test-bed.html'],
          tasks: ['dist']
        }
      },

			concat: {
				devCss: {
					src:    [],
					dest:   []
				}
			},
			jshint: {
        options: {
          jshintrc: '.jshintrc'
        },
				beforeconcat:   {
					options: {
						force:	false,
						ignores: ['**.min.js']
					},
					files: {
						src: []
					}
				},
				//quick version - will not fail entire grunt process if there are lint errors
				beforeconcatQ:   {
					options: {
						force:	true,
						ignores: ['**.min.js']
					},
					files: {
						src: ['**.js']
					}
				}
			},
			uglify: {
				options: {
					mangle: false
				},
				build: {
					files:  {},
					src:    'inspector-gadget.js',
					dest:   'inspector-gadget.min.js'
				}
			},
			cssmin: {
				dev: {
					src: ['inspector-gadget.css'],
					dest: 'inspector-gadget.min.css'
				}
			},
			karma: {
				unit: {
					configFile: 'karma.conf.js',
					singleRun: true
				},
				debug: {
					configFile: 'karma.debug.conf.js',
					singleRun: false
        }
			}
		});
		
		
		/**
		register/define grunt tasks
		@toc 6.
		*/
		// Default task(s).
		// grunt.registerTask('default', ['jshint:beforeconcat', 'less:development', 'concat:devJs', 'concat:devCss']);
		grunt.registerTask('dist', ['jshint:beforeconcatQ', 'cssmin', 'uglify:build']);
		grunt.registerTask('serve', ['dist',
                                 'connect:server',
                                 'watch']);
	
	}
	init({});		//initialize here for defaults (init may be called again later within a task)

};
