---
layout: post
title: Using css flexbox for accessible mobile menus
category: web
technology: css3
tags: flexbox css html accessibility
author: onnimonni
last_modified_at: 2017-01-13 15:40:48 +0200
description: This post will show how css flexbox can help you to create customized menu for mobile without javascript or sacrificing accessibility.
---

Lately I have been working more and more with servers. Today I wanted to switch more into the frontend side of things and decided to give flexbox few hours.

I spend some time talking about this in the [Finnish WordPress related slack channel](https://fi.wordpress.org/chat/) and [@tsipilai](https://twitter.com/tsipilai) had mentioned [flexboxfroggy.com](http://flexboxfroggy.com) as a nice and fun way to learn css flexing.

After I felt like a pro I started to think what I could do with this and stumbled into the menu of this site.

I liked the desktop version but the mobile menu felt odd.

I have seen multiple sites using completely separate menus for mobile and desktop. Usually they are poorly structured too which means that those sites can't be used by screenreaders and are not really accessible. I wish those can now be avoided with flexbox.

This was the starting point:

**Keksi.io desktop menu:**
{% picture_tag src='img/content/2016/keksi-io-desktop-menu.png' alt='Keksi.io Desktop Menu' %}


**Keksi.io mobile menu before flexbox:**
{% picture_tag src='img/content/2016/keksi-io-mobile-menu-without-flex.png' alt='Keksi.io Mobile Menu without flexbox' %}

## Related html sctructure

Here you can see the related structure:

```html
<header class="site-header">
    <div class="branding">
        <a href="/">
            <img class="avatar" src="/logo.png" alt="Cookie Logo">
        </a>
        <h1 class="site-title">
            <a href="/">Keksi.io</a>
        </h1>
    </div>
    <nav class="site-nav">
        <ul>
            <li>
                <a class="page-link" href="/about/">About</a>
            </li>
        </ul>
    </nav>
    <nav class="external-links">
        <ul>
            <li>
                <a href="http://keksi.io/feed.xml" title="Follow RSS feed">
                    <i class="fa fa-fw fa-rss"></i>
                </a>
            </li>
            <li>
                <a href="mailto:hello@keksi.io" title="Email">
                    <i class="fa fa-fw fa-envelope"></i>
                </a>
            </li>
            <li>
                <a href="https://github.com/KeksiLabs" title="Follow on GitHub">
                    <i class="fa fa-fw fa-github"></i>
                </a>
            </li>
            <li>
                <a href="https://twitter.com/keksiengineer" title="Follow on Twitter">
                    <i class="fa fa-fw fa-twitter"></i>
                </a>
            </li>
        </ul>
    </nav>
</header>
```

I wanted to put `site-nav` below `branding` and `external-links` for just mobile menus. Few years ago I did similiar thing for one client with ugly javascript hack and that decision still haunts me in the cold and dark nights of Finland.

In order to reorder the menu elements with `flexbox` I only needed to use `order` and `flex-wrap` directives.

I needed only handful of changes in order to create better experience with flexbox.

```scss
.site-header {
    // Use flexbox
    display: flex;
    // Adjust the empty space between elements
    justify-content: space-between;
    @media (min-width:  600px) {
        // This helps the branding to take more space than the other elements
        // in the desktop view
        .branding {
            flex-grow: 3;
        }
    }
    @media (max-width:  599px) {
        // Instead of keeping everything in the same row allow flexbox to split them
        flex-wrap: wrap;

        // Change elements to custom order
        .branding {
            order: 1;
        }
        .external-links {
            order: 2;
        }
        .site-nav {
            order: 3;

            // Extra: Change the direction of menu items for mobile view
            ul li {
                float: left;
            }
    }
}
```

## Results

Now the elements go just where I wanted. With only tiny amount of css and no frameworks needed.

**Keksi.io mobile menu after using flexbox:**
{% picture_tag src='img/content/2016/keksi-io-mobile-menu-with-flex.png' alt='[Keksi.io Mobile Menu with flexbox' %}
