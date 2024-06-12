---
title: "combining data frames by row using `dplyr::bind_rows`"
classes: wide
tags:
  - R
  - data wrangling
---

When working with multiple data frames in R, it is often necessary to combine them into a single data frame for analysis. The `dplyr` package offers a convenient function, `bind_rows`, to accomplish this task efficiently.

## example scenario

Let's say we have a list of data frames, each representing sales data from different regions. We want to combine these data frames into a single data frame for further analysis.

### step 1: load the necessary libraries

First, ensure you have the `dplyr` package installed and loaded:

```r
# Install dplyr if you haven't already
install.packages("dplyr")

# Load dplyr
library(dplyr)
```

### step 2: create sample dataframes

For demonstration purposes, let’s create three sample data frames:

```r
# Sample data frames
df1 <- data.frame(
  Region = "North",
  Sales = c(100, 150, 200)
)

df2 <- data.frame(
  Region = "South",
  Sales = c(80, 120, 160)
)

df3 <- data.frame(
  Region = "West",
  Sales = c(90, 130, 170)
)

# Combine these data frames into a list
df_list <- list(df1, df2, df3)
```

### step 3: combine data frames using `bind_rows`

Now, use the bind_rows function from dplyr to combine the data frames in the list:
```r
# Combine data frames
combined_df <- bind_rows(df_list)

# Display the combined data frame
print(combined_df)
```

The resulting combined_df will look like this:
```r
  Region Sales
1  North   100
2  North   150
3  North   200
4  South    80
5  South   120
6  South   160
7   West    90
8   West   130
9   West   170
```