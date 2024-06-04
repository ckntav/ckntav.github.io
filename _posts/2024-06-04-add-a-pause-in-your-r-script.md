---
title: "add an interactive pause in your R script"
classes: wide
tags:
  - R
---

When writing R scripts, there are times when you might want to pause the execution to allow the user to read output or perform an intermediate task before continuing. The `readline` function in R can be used to achieve this.


Add the following code snippet to your R script to pause execution and prompt the user to press `[enter]` to continue:

```r
readline(prompt="Press [enter] to continue")
```

Using readline is a simple yet effective way to add interactive pauses in your R scripts. This can be particularly useful during demonstrations, debugging, or when running scripts that require user intervention at specific points.