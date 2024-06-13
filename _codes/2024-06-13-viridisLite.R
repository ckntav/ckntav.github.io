# Load necessary libraries
library(viridisLite)
library(ggplot2)
library(gridExtra)

# Function to create a bar plot for a given color palette
create_color_plot <- function(palette_func, n_colors, title) {
  colors <- palette_func(n_colors)
  data <- data.frame(
    x = factor(1:n_colors),
    y = rep(1, n_colors),
    colors = colors
  )
  
  ggplot(data, aes(x = x, y = y, fill = colors)) +
    geom_bar(stat = "identity") +
    scale_fill_identity() +
    theme_minimal() +
    theme(
      axis.text.y = element_blank(),
      axis.ticks.y = element_blank(),
      axis.title.y = element_blank(),
      axis.text.x = element_blank(),
      axis.ticks.x = element_blank(),
      axis.title.x = element_blank()
    ) +
    labs(title = title)
}

# Number of colors to display
n_colors <- 25

# Create plots for each color palette
plot_viridis <- create_color_plot(viridis, n_colors, paste0("viridis(n = ", n_colors, ")"))
plot_magma <- create_color_plot(magma, n_colors, paste0("magma(n = ", n_colors, ")"))
plot_plasma <- create_color_plot(plasma, n_colors, paste0("plasma(n = ", n_colors, ")"))
plot_inferno <- create_color_plot(inferno, n_colors, paste0("inferno(n = ", n_colors, ")"))
plot_cividis <- create_color_plot(cividis, n_colors, paste0("cividis(n = ", n_colors, ")"))
plot_rocket <- create_color_plot(rocket, n_colors, paste0("rocket(n = ", n_colors, ")"))
plot_mako <- create_color_plot(mako, n_colors, paste0("mako(n = ", n_colors, ")"))
plot_turbo <- create_color_plot(turbo, n_colors, paste0("turbo(n = ", n_colors, ")"))

# Arrange plots in a grid
grid.arrange(plot_viridis, plot_magma,
             plot_plasma, plot_inferno,
             plot_cividis, plot_rocket,
             plot_mako, plot_turbo,
             ncol = 1)



