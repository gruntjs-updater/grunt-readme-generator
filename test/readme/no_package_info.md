```js
readme_generator: {
  no_package_info: {
    options: {
      generate_title: false,
      has_travis: true,
      output: "test/no_package_info.md",
      table_of_contents: true,
      readme_folder: "test/readme",
      changelog_folder: "test/changelogs",
      changelog_version_prefix: "",
      toc_extra_links: ["[Tip Me ![](http://i.imgur.com/C0P9DIx.gif?1)](https://www.gittip.com/aponxi/)", "[Donate Me! ![](http://i.imgur.com/2tqfhMO.png?1)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=VBUW4M9LKTR62)"],
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
  },
}
```