---
title: "exploring directory structure with the `tree` command"
classes: wide
tags:
  - bash
---

The `tree` command is a handy tool for visualizing directory structures in Unix-based systems. When combined with the `--du -h` options, it also displays disk usage in a human-readable format.

### Using `tree --du -h`

```sh
tree --du -h
```

#### Example output
```
.
├── [  4.0K]  directory1
│   ├── [  1.1M]  file1.txt
│   ├── [  512K]  file2.log
│   └── [  2.0K]  subdirectory1
│       └── [  2.0K]  file3.csv
└── [  6.0K]  directory2
    └── [  3.4M]  file4.bin

6 directories, 4 files
```

### Benefits
- visual hierarchy: understand your directory structure at a glance.
- disk usage insight: identify space-consuming files and directories.
- human-readable format: sizes displayed in kb, mb, etc.