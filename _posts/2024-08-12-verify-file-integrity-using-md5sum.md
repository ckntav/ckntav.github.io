---
title: "verifying file integrity using md5sum"
classes: wide
tags:
  - bash
---

Ensuring file integrity is crucial, especially when transferring or downloading files. One way to verify this in Linux is by using the `md5sum -c` command, which checks whether a file’s MD5 checksum matches the expected value.

### what is an md5 checksum?

An MD5 checksum is a 128-bit hash that serves as a fingerprint for a file. If the checksum of your downloaded file matches the provided one, the file is likely unaltered.

### how to use md5sum `-c`?

1. obtain the md5 checksum file:
The checksum file typically looks like this:

```bash
d41d8cd98f00b204e9800998ecf8427e  filename.txt
```

2. verify the file:
Place the checksum file in the same directory as the files to verify, and run:
```bash
md5sum -c file_md5
```

If the file is intact, you’ll see:
```bash
filename.txt: OK
```

If a file fails the check, it will be marked as “FAILED.”