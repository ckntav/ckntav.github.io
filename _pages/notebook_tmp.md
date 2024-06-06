---
layout: single
title: notebook_tmp
permalink: /notebook_tmp/
author_profile: true
---

I’m a goldfish when it comes to reusing code snippets and utility functions. This notebook serves as my knowledge repository, where I document and share the techniques and command lines I frequently use but often forget, saving me from endless googling.
{: .notice}

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul> 

<h3 class="archive__subtitle">{{ site.data.ui-text[site.locale].recent_posts | default: "Recent Posts" }}</h3>

{% if paginator %}
  {% assign posts = paginator.posts %}
{% else %}
  {% assign posts = site.posts %}
{% endif %}

{% assign entries_layout = page.entries_layout | default: 'list' %}
<div class="entries-{{ entries_layout }}">
  {% for post in posts %}
    {% include archive-single.html type=entries_layout %}
  {% endfor %}
</div>

{% include paginator.html %}
