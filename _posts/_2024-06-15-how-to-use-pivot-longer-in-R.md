---
title: "how to use `pivot_longer()` in R?"
classes: wide
tags:
  - R
  - data wrangling
---

In data analysis, it’s common to encounter datasets that need reshaping to make them suitable for analysis or visualization. The `tidyr` package in R provides convenient functions for transforming your data. One such function is `pivot_longer()`, which is used to convert data from wide format to long format. 
 
### what is wide and long format?
Wide format:
```r
| ID | Jan | Feb | Mar |
|----|-----|-----|-----|
| 1  | 10  | 20  | 30  |
| 2  | 15  | 25  | 35  |
```

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

### using `pivot_longer()`

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
  ID Jan Feb Mar
1  1  10  20  30
2  2  15  25  35
```

Use `pivot_longer()` to transform the data. The function has several parameters, but the most crucial ones are:
  - `cols`: specifies the columns to pivot into longer format.
  - `names_to`: The name of the new key column.
  - `values_to`: The name of the new value column.

```r
long_data <- data %>% 
  pivot_longer(cols = Jan:Mar,
               names_to = "month",
               values_to = "value")

print(long_data)
```

```r
# A tibble: 6 × 3
     ID month value
  <dbl> <chr> <dbl>
1     1 Jan      10
2     1 Feb      20
3     1 Mar      30
4     2 Jan      15
5     2 Feb      25
6     2 Mar      35
```