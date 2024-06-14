library(tidyverse)

data <- data.frame(ID = c(1, 2),
                   Jan = c(10, 15),
                   Feb = c(20, 25),
                   Mar = c(30, 35))
print(data)

long_data <- data %>% 
  pivot_longer(cols = Jan:Mar,
               names_to = "month",
               values_to = "value")

print(long_data)
