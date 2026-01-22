---
title: "How to get your current viewport width in em?"
date: 2013-02-08T11:44:30.000Z
draft: false
tags: []
type: article
slug: "get-current-viewport-width-em"
---

The answer turned out to be a bit tedious so I tried fixing that. Say hello to [Viewportmarklet](https://github.com/roelven/viewportmarklet): ![](/images/photos/viewportmarklet.png)

Example of the Viewportmarklet

How does it work?
-----------------

The tool is build around the assumption that you need an actual letter m on your canvas in the base font size. The width of that letter m is what the browser will use as 1 em. When working on a frontend project I found myself struggling with the sites current viewport width in em and in pixels. To save myself and others from demotivation problems I build a small tool that helps you to wrap your head around em usage. Check out [the repository on Github](https://github.com/roelven/viewportmarklet).

Help me improve it
------------------

I know the code is not great but for now it's helping me a great deal. If you see any improvements or have any feedback, fork away or let me know in the comments!
