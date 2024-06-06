---
title: "merging several dataframes using `plyr::join_all` in R"
classes: wide
tags:
  - R
  - data wrangling
---

Merging multiple dataframes is simple with the `join_all` function in the `plyr` R  package. Here’s a quick guide:

### Install and load `plyr`

```r
install.packages("plyr")
library(plyr)
```

### Using `join_all`

```r
# Sample dataframes
df1 <- data.frame(ID = c(1, 2, 3), Value1 = c("A", "B", "C"))
df2 <- data.frame(ID = c(2, 3, 4), Value2 = c("D", "E", "F"))
df3 <- data.frame(ID = c(1, 3, 4), Value3 = c("G", "H", "I"))

# List of dataframes
dfs <- list(df1, df2, df3)

# Merge all dataframes using join_all
merged_df <- join_all(dfs, by = "ID", type = "full")

print(merged_df)
```

#### Results
```r
  ID Value1  Value2  Value3
1  1      A   <NA>      G
2  2      B      D   <NA>
3  3      C      E      H
4  4   <NA>      F      I
```

- `by = "ID"`: specifies the common column to merge by.
- `type = "full"`: specifies a full join, meaning all rows from all dataframes are included.

### Choosing the type of join

You can also specify other types of joins such as "left", "right", or "inner" depending on your needs:
- Left join: includes all rows from the first dataframe and matches from others.
- Right join: includes all rows from the last dataframe and matches from others.
- Inner join: includes only rows that have matches in all dataframes.

```r
merged_df_inner <- join_all(dfs, by = "ID", type = "inner")
```

`plyr::join_all` makes merging multiple dataframes easy and efficient, with flexible join options to suit your specific needs.