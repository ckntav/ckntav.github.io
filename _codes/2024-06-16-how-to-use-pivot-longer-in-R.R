library(tidyverse)

long_data <- data.frame(ID = c(1, 1, 1, 2, 2, 2),
                        month = c("Jan", "Feb", "Mar", "Jan", "Feb", "Mar"),
                        value = c(10, 20, 30, 15, 25, 35))

print(long_data)

wide_data <- long_data %>% 
  pivot_wider(names_from = month,
              values_from = value)

print(wide_data)


knitr::kable(head(mtcars[, 1:4]), "simple")
