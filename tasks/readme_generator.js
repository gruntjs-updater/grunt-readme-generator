// Generated by CoffeeScript 1.6.2
"use strict";
var fs;

fs = require('fs');

module.exports = function(grunt) {
  var append, append_to_file, back_to_top, generate_TOC, generate_banner, generate_footer, generate_release_history, generate_title, get_latest_changelog, make_anchor, pkg;

  pkg = grunt.config.get(['pkg']);
  append_to_file = function(output, content) {
    return fs.appendFileSync(output, content);
  };
  make_anchor = function(string) {
    var str;

    console.log(string);
    str = string.replace(/\s+/g, '-').toLowerCase();
    return str = "#" + str;
  };
  back_to_top = function() {
    var result, str;

    str = make_anchor(pkg.name);
    str += "-";
    return result = "[Back To Top](" + str + ")";
  };
  get_latest_changelog = function(prefix, changelog_folder) {
    var latest, versions_found;

    versions_found = [];
    grunt.file.recurse(changelog_folder, function(abspath, rootdir, subdir, filename) {
      var version;

      if (filename.substring(0, prefix.length) === prefix) {
        version = filename.slice(prefix.length, -3);
        return versions_found.push(version);
      }
    });
    if (versions_found.length > 0) {
      versions_found.sort();
      latest = versions_found[versions_found.length(-1)];
      return latest;
    } else {
      grunt.fail.error("No changelogs are present. Please write a changelog file or fix prefixes.");
      return false;
    }
  };
  generate_banner = function(path, banner_file, output) {
    var f;

    f = path + "/" + banner_file;
    if (!grunt.file.exists(f)) {
      return grunt.fail.error("Source file \"" + f + "\" not found.");
    } else {
      append_to_file(output, grunt.file.read(f));
      return append_to_file(output, "\n");
    }
  };
  generate_TOC = function(files, toc_extra_links, changelog_insert_before, output) {
    var ex, file, i, link, release_title, title, _i, _len;

    append_to_file(output, "## Jump to Section\n\n");
    console.dir(files);
    for (file in files) {
      title = files[file];
      if (file === changelog_insert_before) {
        release_title = make_anchor("Release History");
        append_to_file(output, "* [#Release History](" + release_title + ")\n");
      }
      link = make_anchor(title);
      append_to_file(output, "* [" + title + "](" + link + ")\n");
    }
    if (toc_extra_links.length > 0) {
      for (_i = 0, _len = toc_extra_links.length; _i < _len; _i++) {
        i = toc_extra_links[_i];
        ex = i;
        append_to_file(output, "* " + ex + "\n");
      }
    }
    return append_to_file(output, "\n");
  };
  generate_title = function(output, travis, username) {
    var desc, title, tra;

    title = pkg.name;
    desc = pkg.description;
    append_to_file(output, "# " + title + " ");
    if (travis) {
      tra = "[![Build Status](https://secure.travis-ci.org/" + username + "/" + title + ".png?branch=master)](http://travis-ci.org/" + username + "/" + title + ")";
      append_to_file(output, "" + tra);
    }
    return append_to_file(output, "\n\n> " + desc + "\n\n");
  };
  append = function(path, file, title, output) {
    var f, top;

    append_to_file(output, "## " + title + "\n");
    top = back_to_top();
    append_to_file(output, "" + top + "\n\n");
    f = path + "/" + file;
    if (!grunt.file.exists(f)) {
      return grunt.fail.error("Source file \"" + f + "\" not found.");
    } else {
      return append_to_file(output, grunt.file.read(f));
    }
  };
  generate_release_history = function(prefix, changelog_folder, output) {
    var latest, latest_file, top;

    append_to_file(output, "## Release History\n");
    top = back_to_top();
    append_to_file(output, "" + top + "\n\n");
    append_to_file(output, "You can find [all the changelogs here](./" + changelog_folder + ").\n");
    latest = get_latest_changelog(prefix, changelog_folder);
    latest_file = prefix + latest + ".md";
    append_to_file(output, "### Latest changelog is for [" + latest + "](" + changelog_folder + "/latest_file):");
    if (!grunt.file.exists(latest_file)) {
      return grunt.fail.error("Changelog file \"" + latest_file + "\" not found.");
    } else {
      return append_to_file(output, grunt.file.read(latest_file));
    }
  };
  generate_footer = function(output) {
    var date, str;

    date = new Date();
    str = "\n--------\nThis readme has been automatically generated by [readme generator](https://github.com/aponxi/grunt-readme-generator) on " + date + ".";
    return append_to_file(output, str);
  };
  return grunt.registerMultiTask("readme_generator", "Generate Readme File", function() {
    var file, files, options, title;

    options = this.options({
      github_username: "aponxi",
      output: "README.md",
      table_of_contents: true,
      readme_folder: "readme",
      changelog_folder: "changelogs",
      changelog_version_prefix: "v",
      changelog_insert_before: "legal.md",
      toc_extra_links: [],
      banner: null,
      has_travis: true
    });
    grunt.file.write(options.output, "");
    files = this.data.order;
    if (options.banner != null) {
      generate_banner(options.readme_folder, options.banner, options.output);
    }
    generate_title(options.output, options.has_travis, options.github_username);
    generate_TOC(files, options.toc_extra_links, options.changelog_insert_before, options.output);
    for (file in files) {
      title = files[file];
      console.log("file: ", file);
      console.log("title: ", title);
    }
    generate_footer(options.output);
    return grunt.log.writeln("File \"" + options.output + "\" created.");
  });
};
