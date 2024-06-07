---
title: "most-used-git-aliases"
classes: wide
tags:
  - bash
  - alias
  - git
---





```bash
ln -s /path/to/target
```

```r
print("great")
```

❯ alias gst
gst='git status'
❯ alias ga
ga='git add'
❯ alias gc
gc='git commit --verbose'
❯ alias gco
gco='gc -am'
❯ alias update
update='gc -am "update"'
❯ alias ggpush
ggpush='git push origin "$(git_current_branch)"'


check to see all other aliases
cat ~/.oh-my-zsh/plugins/git/git.plugin.zsh