
library(hrbrthemes)
library(palmerpenguins)
library(ggplot2)
library(viridisLite)

penguin_plot <- penguins %>% 
  ggplot(aes(x = bill_length_mm, y = flipper_length_mm, col = species)) +
  geom_point() +
  scale_color_manual(values = plasma(n = 4))

penguin_plot +
  theme_ipsum() +
  labs(title = "theme_ipsum")

penguin_plot +
  theme_ipsum_rc() +
  labs(title = "theme_ipsum_rc")

library(tidyverse)
library(ggplot2)
library(viridisLite)
library(palmerpenguins)
library(hrbrthemes)

#
penguins %>% 
  ggplot(aes(x = species, y = bill_length_mm, col = species, fill = species)) +
  geom_boxplot(outlier.size = 0.1, notch = FALSE, width = 0.5) +
  theme_ipsum_rc() +
  scale_fill_manual(values = viridis(n = 4)) +
  scale_colour_manual(values = viridis(n = 4)) +
  stat_summary(
    fun = median,          # Specify the function to calculate the median
    geom = "crossbar",        
    aes(group = species),     # Group data by the 'species' to calculate medians separately
    color = "white",       # Choose the color for the median line
    # color = "grey",       # Choose the color for the median line
    size = 0.25,            # Set the thickness of the median line.
    width = 1          # Set the width of the median line
  )

penguins %>% 
  ggplot(aes(x = species, y = bill_length_mm, col = species, fill = species)) +
  geom_boxplot(outlier.size = 0.1, notch = TRUE, notchwidth = 0.8, width = 0.5) +
  theme_ipsum_rc() +
  scale_fill_manual(values = viridis(n = 4)) +
  scale_colour_manual(values = viridis(n = 4)) +
  stat_summary(
    fun = median,          # Specify the function to calculate the median
    geom = "crossbar",        
    aes(group = species),     # Group data by the 'species' to calculate medians separately
    color = "white",       # Choose the color for the median line
    # color = "grey",       # Choose the color for the median line
    size = 0.25,            # Set the thickness of the median line.
    width = 1          # Set the width of the median line
  )
