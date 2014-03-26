module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            project: {
                options: {
                    paths: ['source/less'],
                    yuicompress: true
                },
                src: ['source/less/manifest.less'],
                dest: 'deploy/css/style.css'
           }
        },
        jade: {
            compile: {
                options: {
                    data: {
                        debug: false
                    },
                    pretty: true
                },
                files: [{
                    cwd: "source/jade",
                    src: [ "**/*.jade", "!_*.jade"] ,
                    dest: "deploy",
                    expand: true,
                    ext: ".html"
                }]
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            beforeconcat: ['source/js/**/*.js'],
            afterconcat: ['deploy/js/main.js']
        },
        concat: {
            js: {
                src: ['source/js/**/*.js'],
                dest: 'deploy/js/main.js'
            }
        },
        cssmin: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            css: {
                files: {
                    'deploy/css/style.min.css': ['deploy/css/style.css']
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            js: {
                files: {
                    'deploy/js/main.min.js': ['deploy/js/main.js']
                }
            }
        },
        watch: {
            css: {
                files: ['source/less/**/*.less'],
                tasks: ['less', 'cssmin'],
                options: {
                    livereload: true
                },
            },
            html: {
                files: ['source/jade/**/*.jade'],
                tasks: ['jade'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['source/js/**/*.js'],
                tasks: ['jshint:beforeconcat', 'concat', 'uglify', 'jshint:afterconcat'],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('assemble-less');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['less', 'cssmin', 'jade', 'jshint:beforeconcat', 'concat', 'uglify', 'jshint:afterconcat', 'watch']);
}
