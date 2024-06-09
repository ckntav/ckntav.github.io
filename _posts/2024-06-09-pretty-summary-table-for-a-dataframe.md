---
title: "pretty summary table of a dataframe with `gt_plt_summary` from `gtExtra` R package"
classes: wide 
tags:
  - dataviz
  - R
  - prettyprint
---

The `gtExtras` R package helps create beautiful data tables. One useful function is `gt_plt_summary`, which generates a summary plot for a dataFrame.


## Example with CO2
```r
library(tidyverse)
library(gtExtras)

CO2 %>% gt_plt_summary(title = "CO2 dataset")
```

![pretty-table-mtcars-dataset](/assets/images_post/20240609_pretty-table-co2-dataset.png){: .align-center}


## Example with mtcars
```r
library(tidyverse)
library(gtExtras)

mtcars %>% gt_plt_summary(title = "mtcars dataset")
```

![pretty-table-mtcars-dataset](/assets/images_post/20240609_pretty-table-mtcars-dataset.png){: .align-center}