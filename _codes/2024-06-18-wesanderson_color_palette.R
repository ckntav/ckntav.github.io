library(wesanderson)
library(tidyverse)

palette_zissou1 <- wes_palette(name = "Zissou1", n = 10, type = "continuous")
palette

palette %>% as.vector

# See all palettes
names(wes_palettes)
