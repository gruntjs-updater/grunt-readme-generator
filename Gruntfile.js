// Generated by CoffeeScript 1.6.2
"use strict";module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ["Gruntfile.js", "tasks/*.js", "<%= nodeunit.tests %>"],
      options: {
        jshintrc: ".jshintrc"
      }
    },
    clean: {
      tests: ["tmp"]
    },
    readme_generator: {
      default_options: {
        options: {
          output: "test/readme.md",
          table_of_contents: true,
          readme_folder: "test/readme",
          changelog_folder: "changelogs",
          changelog_version_prefix: "v",
          toc_extra_links: ["[Tip Me ![](http://i.imgur.com/C0P9DIx.gif?1)](https://www.gittip.com/aponxi/)", "[Donate Me![](http://i.imgur.com/2tqfhMO.png?1)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=VBUW4M9LKTR62)"],
          banner: "banner.md"
        },
        order: {
          "installation.md": "Installation",
          "usage.md": "Usage",
          "options.md": "Options",
          "example.md": "Example",
          "output.md": "Example Output",
          "building-and-testing.md": "Building and Testing",
          "legal.md": "Legal Mambo Jambo"
        }
      }
    },
    nodeunit: {
      tests: ["test/*_test.js"]
    }
  });
  grunt.loadTasks("tasks");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-nodeunit");
  grunt.registerTask("test", ["clean", "readme_generator"]);
  return grunt.registerTask("default", ["jshint", "test"]);
};
