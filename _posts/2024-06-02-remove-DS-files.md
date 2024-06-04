---
title: "remove `.DS_Store` files"
classes: wide
tags:
  - alias
  - bash
  - macOS
last_modified_at: "2024-06-03"
---

If you're a macOS user, you might be familiar with the hidden `.DS_Store` files that macOS creates in every directory to store custom attributes of a folder such as the position of icons. While these files can be useful, they often become an annoyance, especially when sharing directories with non-macOS systems.

Here's a simple way to remove all `.DS_Store` files recursively from your current directory and its subdirectories using a bash command.

To remove all `.DS_Store` files, run:
```
find . -name ".DS_Store" -delete
```

For convenience, you can create an alias in your .bash_profile or .zshrc file:
```
alias remDS='find . -name ".DS_Store" -delete'
```

This way, you can simply run `remDS` in your terminal to clean up your directories.

Save the changes to your profile file and reload it:
```
source ~/.bash_profile
# or
source ~/.zshrc
```