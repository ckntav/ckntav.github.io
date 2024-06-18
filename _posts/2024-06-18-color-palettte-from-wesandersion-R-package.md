---
title: "color palette from `wesanderson` R package"
classes: wide
tags:
  - dataviz
  - R
  - color
---

The `wesanderson` R package offers a variety of beautiful color palettes inspired by Wes Anderson’s films, which can bring a unique and appealing aesthetic to your visualizations. In this post, we’ll explore how to generate and use a color palette from this package.


### Load libraries
```r
library(wesanderson)
library(tidyverse)
```

### Generate a color palette of 10 colors using the Zissou1 palette 
```r
palette_zissou1 <- wes_palette(name = "Zissou1", n = 10, type = "continuous")
palette_zissou1
```

![color_palette_zissou1_n10](/assets/images_post/20240618_zissou1_n10.png){: .align-center}

### To retrieve hexadecimal color codes, use `as.vector()`
```r
palette %>% as.vector
```

```r
[1] "#3A9AB2" "#72B2BF" "#95BBB1" "#ADC397" "#CAC96A"
[6] "#DFBF2B" "#E5A208" "#EA8005" "#EE5A03" "#F11B00"
```

### See all palettes
```r
names(wes_palettes)
```
```r
 [1] "BottleRocket1"     "BottleRocket2"     "Rushmore1"        
 [4] "Rushmore"          "Royal1"            "Royal2"           
 [7] "Zissou1"           "Zissou1Continuous" "Darjeeling1"      
[10] "Darjeeling2"       "Chevalier1"        "FantasticFox1"    
[13] "Moonrise1"         "Moonrise2"         "Moonrise3"        
[16] "Cavalcanti1"       "GrandBudapest1"    "GrandBudapest2"   
[19] "IsleofDogs1"       "IsleofDogs2"       "FrenchDispatch"   
[22] "AsteroidCity1"     "AsteroidCity2"     "AsteroidCity3" 
```

### For more information, visit the [wesanderson GitHub page](https://github.com/karthik/wesanderson)