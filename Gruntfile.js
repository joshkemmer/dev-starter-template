// Load Grunt
module.exports = function (grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
  
      // Tasks
      sass: { // Begin Sass Plugin
        dist: {
          options: {
            sourcemap: 'none',
            style: 'compressed'
          },
          files: [{
            'styles/main.min.css': 'styles/scss/main.scss'
        }]
        }
      },
      postcss: { // Begin Post CSS Plugin
        options: {
          map: false,
          processors: [
        require('autoprefixer')({
              browsers: ['last 2 versions']
            })
      ]
        },
        dist: {
          src: 'styles/main.min.css'
        }
      },
      uglify: { // Begin JS Uglify Plugin
        build: {
          src: ['js/*.js'],
          dest: 'js/min/script.min.js'
        }
      },
      watch: { // Compile everything into one task with Watch Plugin
        css: {
          files: '**/*.scss',
          tasks: ['sass', 'postcss', 'cssmin']
        },
        js: {
          files: '**/*.js',
          tasks: ['uglify']
        }
      }
    });
    // Load Grunt plugins
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
  
    // Register Grunt tasks
    grunt.registerTask('default', ['watch']);
  };