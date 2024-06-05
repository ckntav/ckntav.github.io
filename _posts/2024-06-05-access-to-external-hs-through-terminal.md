---
title: "access to external HD through terminal"
classes: wide
tags:
  - macOS
  - bash
---

To access your external hard drive through the terminal on macOS, you can follow these steps:

1. Open the Terminal application.
2. List all of your mounted drives by typing:

    ```sh
    ls /Volumes
    ```

3. Navigate to your desired external drive by using the `cd` command:

    ```sh
    cd /Volumes/YourDriveName
    ```

Replace `YourDriveName` with the actual name of your external hard drive as shown in the list.

This will give you access to your external hard drive directly from the terminal, allowing you to perform various file operations.