---
layout: post
title: "Merge several dataframes in a list"
categories:
tags: [r]
---

Start by creating an empty list
``` r
df_list <- list()
```

Fill df_list with dataframes
``` r
df_list[["df_id"]] <- df
```

Merge all dataframes
``` r
df_list %>% reduce(full_join, by = "key_column")
```
key_column is the common column name shared by all dataframes