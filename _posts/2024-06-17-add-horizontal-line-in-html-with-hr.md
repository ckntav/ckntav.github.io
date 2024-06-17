---
title: "add horizontal lines in `HTML` with `<hr>`"
classes: wide
tags:
  - css
  - web development
  - html
---

Horizontal lines help divide content and create sections, improving readability. `HTML` provides an easy way to add horizontal lines using the `<hr>` (horizontal rule) tag.

## Basic usage

The `<hr>` tag is a self-closing HTML element that inserts a horizontal line in your web page:

```html
<p>This is the first paragraph.</p>
<hr>
<p>This is the second paragraph, separated by a horizontal line.</p>
```

Output:
<p>This is the first paragraph.</p>
<hr>
<p>This is the second paragraph, separated by a horizontal line.</p>

## customizing the `<hr>` tag

#### color

Change the color using `CSS`:
```html
<hr style="border: 1px solid black;">
```

Output:
<hr style="border: 1px solid black;">

#### width 

Adjust the width of the line:
```html
<hr style="width: 50%;border: 1px solid black;">
```

Output:
<hr style="width: 50%;border: 1px solid black;">

#### height

Change the thickness of the line:
```html
<hr style="height: 5px;border: 1px solid black;">
```
Output:
<hr style="height: 5px;border: 1px solid black;">

#### centering

Center the line within its container:
```html
<hr style="width: 50%; margin-left: auto; margin-right: auto;border: 1px solid black;">
```
Output:
<hr style="width: 50%; margin-left: auto; margin-right: auto;border: 1px solid black;">

#### combining sites

Combine multiple styles for a customized line:
``` html
<hr style="width: 70%; height: 3px; background-color: blue; border: none;">
```

Output:
<hr style="width: 70%; height: 3px; background-color: blue; border: none;">

## conclusion

The `<hr>` tag is a simple tool for adding horizontal lines to your web pages. Customize it with CSS to enhance your content structure and readability. Experiment with different styles to see how horizontal lines can improve your web design.



