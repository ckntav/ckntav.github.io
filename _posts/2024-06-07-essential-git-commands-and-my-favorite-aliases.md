---
title: "essential git commands and my favorite aliases"
classes: wide
tags:
  - bash
  - alias
  - git
---

I rely heavily on Git for version control in my projects. Over time, I’ve found certain Git commands to be indispensable and have created aliases to streamline my workflow. Here are the Git commands I use the most and the aliases that make them quicker to execute.

## Git commands and aliases

### git status
Displays the state of the working directory and staging area. It lets you see which changes have been staged, which haven’t, and which files aren’t being tracked by Git.

Set alias: `alias gst='git status'`

### git add
Adds changes in the working directory to the staging area. It tells Git that you want to include updates to a particular file in the next commit.

Set alias: `alias ga='git add'`

### git commit with message
Combines adding all changes and committing them with a message.

Set alias: `alias gco='gc -am'`

Usage example : 
```bash
gco "add post about R boxplot"
```

### git commit with a default update message
Commits all changes with the default message “update”.

Set alias: `alias update='gc -am "update"'`

### git push
Uploads local repository content to a remote repository. It transfers commits from your local repository to a remote one.

Set alias: `alias ggpush='git push origin "$(git_current_branch)"'`

## Setting up aliases

To set up these aliases, you can add them to your shell configuration file (e.g., `.bashrc`, `.zshrc`).

```bash
alias gst='git status'
alias ga='git add'
alias gco='gc -am'
alias update='gc -am "update"'
alias ggpush='git push origin "$(git_current_branch)"'
```

By adding these aliases to your shell configuration, you can save time and make your workflow more efficient. These shortcuts not only reduce the amount of typing but also help keep your focus on coding and data analysis.

nb: Some of these aliases come with [Oh my zsh framework](https://ohmyz.sh/) by default. If installed, all git aliases are available in `~/.oh-my-zsh/plugins/git/git.plugin.zsh`