/**
 * @author Nico Merkel
 * @version 1.0.0 
 * @description API tasks controller used to handel model ressource
 */

const { loadNpmTasks } = require('grunt');

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                options: {
                    paths: [
                        'src/less'
                    ],
                    compress: true,
                    plugins: [
                        new (require('less-plugin-autoprefix'))({
                            browsers: [
                                'last 2 versions',
                                'ie 9'
                            ]
                        })
                    ],
                    banner:
                        '/* !\n' +
                        '*Created By .... \n' +
                        '*@author \n' +
                        '*@copyright\n' +
                        '*@license \n' +
                        '*@version\n' +
                        '*/\n',
                },
                files: {
                    'assets/css/layout.css': 'src/less/layout.less',
                    'assets/css/index.css': 'src/less/index.less',
                    'assets/css/signin.css': 'src/less/signin.less'
                }

            }

        },
        uglify: {
            build: {
                files: {
                    'assets/js/index.min.js': 'src/js/index.js',
                    'assets/js/signin.min.js': 'src/js/signin.js'
                }
            }
        },
        copy: {
            main: {
                files: [
                    {src: 'node_modules/html5sortable/dist/html5sortable.min.js', dest: 'assets/js/html5sortable.min.js'}
                  ],
            },
        },
        watch: {
            scripts: {
                files: [
                    'src/less/**',
                    'src/js/**'
                ],
                tasks: ['less', 'uglify'],
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('build', ['less', 'uglify', 'copy']);
    grunt.registerTask('default', ['watch']);

}