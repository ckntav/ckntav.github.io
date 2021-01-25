---
layout: post
title: "Merge several dataframes in a list"
categories:
tags: [r]
---

``` r
df_list <- list()
```

Fill df_list then

``` r
df_list %>% reduce(full_join, by = "key_column")
```
key_column is the common column name shared by all dataframes