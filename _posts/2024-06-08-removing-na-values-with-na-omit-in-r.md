---
title: "removing NA values with `na.omit` in R"
classes: wide
tags:
  - R
  - data wrangling
---

When working with data in R, you may encounter missing values (NAs) that need to be removed to perform certain analyses. The `na.omit` function is a convenient way to exclude these missing values from your dataset.

## ## Using `na.omit`
The `na.omit` function removes all rows from a data frame or matrix that contain at least one NA value. Here's how to use it:

### Example with a data frame

Let's create a sample data frame with some NA values:

```r
# Sample data frame with NA values
data <- data.frame(
  A = c(1, 2, NA, 4),
  B = c(NA, 2, 3, 4),
  C = c(1, NA, 3, 4)
)

# Print the original data
print("Original Data:")
print(data)
```

To remove rows with NA values, simply apply na.omit:

```r
# Remove rows with NA values
clean_data <- na.omit(data)

# Print the cleaned data
print("Cleaned Data:")
print(clean_data)
```

### Output
The original data contains some rows with NA values:
```r
Original Data:
   A  B  C
1  1 NA  1
2  2  2 NA
3 NA  3  3
4  4  4  4
```

After using `na.omit`, the cleaned data frame excludes these rows:
```r
Cleaned Data:
  A B C
4 4 4 4
```
