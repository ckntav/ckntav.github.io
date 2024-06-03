---
layout: posts
title: "Untrack specific files in Git"
classes: wide
tags:
  - bash
  - git
---

When working on a project with Git, there are times when you may want to stop tracking certain files that are already being tracked. This might be necessary if those files are generated automatically, contain sensitive information, or simply don’t need to be version-controlled anymore. Here’s a step-by-step guide to help you unfollow files in Git.

## Understanding the .gitignore File

The .gitignore file is used to tell Git which files (or patterns) it should ignore. However, simply adding files to .gitignore will not stop Git from tracking files that are already being tracked.


## Stopping Git from Tracking a File

To stop tracking a file that is currently being tracked, you need to use the git rm --cached command. This command removes the file from the index, but leaves it in your working directory. Here’s how you can do it:

```
git rm --cached <file>
git rm -r --cached <folder>
```

For example, to stop tracking a file named `debug.log`, you would run:

```
git rm --cached debug.log
```

To stop tracking a folder named `logs`, you would run:

```
git rm -r --cached logs
```

## Update .gitignore

After removing the file from the index, add it to your `.gitignore` file to ensure that Git ignores it in future changes:

```
echo 'debug.log' >> .gitignore
```

## Verify

To ensure that Git is no longer tracking the file, you can use the git status command. The file should not appear in the list of tracked files.

```
git status
```

The files or folders should no longer appear in the list of tracked items.

By following these steps, you can keep your repository clean and focused on the files that matter.

For more details, visit the [official Git documentation](https://git-scm.com/docs/git-rm).