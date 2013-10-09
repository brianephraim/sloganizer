module.exports = function(grunt) {


  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    replace: {
      head: {
        src: ['test.html'],             // source files array (supports minimatch)
        dest: 'build/page.json',             // destination directory or file
        replacements: [
          { 
            from: 'rel="stylesheet" href="',                   // string replacement
            to: 'rel="stylesheet" href="sloganizer/' 
          },
          { 
            from: 'type="text/javascript" src="',                   // string replacement
            to: 'type="text/javascript" src="sloganizer/' 
          },
          { 
            from: '"',                   // string replacement
            to: '\\"' 
          },  
          { 
            from: /(\r\n|\n|\r)/gm,                   // string replacement
            to: '' 
          },
          { 
            from: /\t/gm,                   // string replacement
            to: ' ' 
          },
          { 
            from: '   ',                   // string replacement
            to: ' ' 
          }, 
          { 
            from: '   ',                   // string replacement
            to: ' ' 
          }, 
          { 
            from: '  ',                   // string replacement
            to: ' ' 
          }, 
          { 
            from: /<!DOCTYPE[\s\S]*<!--gruntUnBuildHeadStart-->/g,      // regex replacement ('Fooo' to 'Mooo')
            to: '{\n"head":"' 
          },
          {
            from: /<!--gruntUnBuildHeadEnd-->[\s\S]*gruntUnBuildBodyStart-->/g,      // regex replacement ('Fooo' to 'Mooo')
            to: '",\n"body":"' 
          },
          {
            from: /<!--gruntUnBuildBodyEnd-->[\s\S]*gruntUnBuildScriptsStart-->/g,      // regex replacement ('Fooo' to 'Mooo')
            to: '",\n"scripts":"' 
          }, 
          {
            from: /<!--gruntUnBuildScriptsEnd-->[\s\S]*/g,      // regex replacement ('Fooo' to 'Mooo')
            to: '"\n}' 
          }
        ]
      }
    }
  });



  grunt.loadNpmTasks('grunt-text-replace');

  // Default task(s).
  grunt.registerTask('default', ['replace']);


};