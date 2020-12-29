---
layout: page
title: Notebook
permalink: /notebook/
---

<h3>POST LIST</h3>
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>