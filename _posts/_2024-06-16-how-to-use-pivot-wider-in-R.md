---
title: "how to use `pivot_wider()` in R?"
classes: wide
tags:
  - R
  - data wrangling
---

In data analysis, it’s common to encounter datasets that need reshaping to make them suitable for analysis or visualization. The `tidyr` package in R provides convenient functions for transforming your data. One such function is `pivot_wider`, which is used to convert data from long format to wide format. 
 
### what is wide and long format?
Long format:
```r
| ID | Month | Value |
|----|-------|-------|
| 1  | Jan   | 10    |
| 1  | Feb   | 20    |
| 1  | Mar   | 30    |
| 2  | Jan   | 15    |
| 2  | Feb   | 25    |
| 2  | Mar   | 35    |
```

Wide format:
```r
| ID | Jan | Feb | Mar |
|----|-----|-----|-----|
| 1  | 10  | 20  | 30  |
| 2  | 15  | 25  | 35  |
```

### using `pivot_wider()`

Let’s use the following example data frame in wide format:

```r
library(tidyverse)

data <- data.frame(ID = c(1, 2),
                   Jan = c(10, 15),
                   Feb = c(20, 25),
                   Mar = c(30, 35))

print(data)
```

```r
  ID month value
1  1   Jan    10
2  1   Feb    20
3  1   Mar    30
4  2   Jan    15
5  2   Feb    25
6  2   Mar    35
```

Use `pivot_wider()` to transform the data. The function has several parameters, but the most crucial ones are:
  - `names_from`: specifies the column to use for the new column names.
  - `values_from`: specifies the column to use for the new column values.

```r
wide_data <- long_data %>% 
  pivot_wider(names_from = month,
              values_from = value)

print(wider_data)
```

```r
# A tibble: 2 × 4
     ID   Jan   Feb   Mar
  <dbl> <dbl> <dbl> <dbl>
1     1    10    20    30
2     2    15    25    35
```