--- 
layout: post
title: Moving to Jekyll
---

<a href="files/2012/03/new_site_1440.png"><img src="files/2012/03/new_site_550.png" title="New Site Design"></a>

Last year in September, I stumbled upon [Octopress](http://octopress.org/), a neat piece of software that lets you create a static (HTML only) blog easily. I downloaded it, and created a little test site. It was pretty neat, but at the time I didn't see the point to create a static site. Why go static when Wordpress and other blogging platforms exist? Despite that, I played with Octopress a bit, fiddling with settings and seeing what results they would produce. In the end, I didn't like the theme that it came with and making an Octopress theme seeemd hard.

Fast forward to this year, [Jekyll](http://jekyllrb.com/) entered the picture. Jekyll does the exact same thing as Octopress, but without the nice, comfy, pre-coded front-end. The idea with Jekyll is that you build the site and Jekyll just assembles it all together. Cool! I could do anything I wanted with Jekyll&hellip;

# Why switch? #
Switching to a static site seems very odd today since there are scripting languages like PHP and Ruby that allow for dynamic websites created with Wordpress, Drupal, and other blog software. Why would I switch when there exists software like those which do the same thing plus much more?

The main reason for me is that I don't particularly like databases. Databases and I don't get along. I never liked having data in one place and then the frontend in another. Jekyll doesn't use a database. It lets me have all my posts in a nice, easily-accessible format that any programming language can interpret.

Another reason that makes using Wordpress for my blog kinda silly is that the server is doing all the work over and over again. Its a pretty boring job for the server to fetch the same posts or the same page over and over again. I think thats kinda silly and inefficient (especially with a slow server). Why not just make pages and content that won't change often static?

# Starting Out #
When, I first started out, I did what anyone would do - I Googled for documentation and tutorials on Jekyll. Luckily, Jekyll comes with [a fair bit](https://github.com/mojombo/jekyll/wiki) of very nice documentation. There are also several nice tutorials on installing Jekyll and even moving Wordpress posts over to Jekyll. [Paul Stamatiou's tutorial](http://paulstamatiou.com/how-to-wordpress-to-jekyll) is a very nice post that explains a fair bit about what he did when he moved to Jekyll.

So, several months ago, I came up with a design for my new blog. I think it was somewhat based off of Twitter's application, but I'm not really sure anymore. It was nice and I was kinda happy with it.

<a href="files/2012/03/old_site_1440.png"><img src="files/2012/03/old_site_550.png" title="Old Site Design"></a>

Though it was nice (and very cute with the stock kitties), the design didn't work out very well on iOS and larger monitors. The design was stretched out and modified into some kind of Twitter client + Reeder inspiration. I'm pretty happy with the result, especially because it's way different than the typical Wordpress-like theme.

# Challenges #
As I said before, Jekyll isn't your "out of the box" blog. In this new design of mine, there was one feature that I wanted that Jekyll didn't support out of the box and several Javascript challenges.

The excerpts bar seen in Reeder was something that I liked, but had no idea how to implement in Jekyll. If you aren't familiar with Reeder, there is a list on the left (much like the one to the left of this article) that lists all the articles in your RSS feeds. After searching through the Jekyll docs, there seemed to be no easy way to do this with just simple pages. Then I discovered the world of Jekyll plugins which opened up a whole new world of possibilities. After reading the small amount of documentation on plugins, I [wrote a little plugin](https://github.com/Tanner/Blog/blob/master/_plugins/RenderExcerpts.rb) to generate the sidebar for me.

One of the Javascript challenges was determing how to do permalinks. I put this off for a while until I found [jQuery Address](http://www.asual.com/jquery/address/) - a nice easy jQuery plugin that does handles permalinks for me.

Another Javascript challenge was the nice iOS style sticky headers for the excerpts bar. After a lot of work, I got them to work almost like the ones seen in iOS, but I was unable to get the headers to "push" one another out of the way at the top of the window. Sad.

# Conclusion #
Making a website in Jekyll was a fun experience and something that gave me a different perspective of the web. Even though we've got cool scripting languages like Ruby and PHP doesn't mean we should abandon the ole' static HTML page.

All of the code and resources for this blog are on [GitHub](https://github.com/Tanner/Blog). I can't say its perfect, but its there for browsing. That said, there may be a few bugs hiding around or a few things I could critique. If you find any, please [contact me](http://0.0.0.0:4000/blog/#!/page/contact).