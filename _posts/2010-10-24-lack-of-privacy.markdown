--- 
layout: post
title: Lack of Privacy?
tags: 
- entropy
- math
- latex
- tex
- harmless
- font
- size
- metrics
- birthday
- general
- bits
- unique
- electronic
- track
- time
- data
- panopticlick
- eff
- frontier
- foundation
- electronic-frontier-foundation
- information
date: October 24, 2010, 10:39 AM
categories: 
- english-1101
- technology
---
Every time we fill out a registration form or a survey, we always fill in basic information - our name, address, birthday, and perhaps how many pets we have. All generic information we think is harmless.

The "harmless", everyday information that we release to anyone is in fact not harmless. At least not immediately. It is possible to a few tidbits of general information about somebody - their last name, birthday, and perhaps how many pets they have - to narrow down who they are. The Electronic Frontier Foundation wrote [an article](http://www.eff.org/deeplinks/2009/09/what-information-personally-identifiable) about using such general information to find a single person. In fact, the EFF also wrote [another article](https://www.eff.org/deeplinks/2010/01/primer-information-theory-and-privacy) on how to mathematical determine how much information is necessary to pinpoint a person in the world.

Personally I find it very interesting to read the second article detailing about the specific mathematical methods used. The methods they use are quite simple. Basing the idea of narrowing down from a large set of data to a smaller set of data can be modeled using entropy. The article describes entropy saying "you can think of entropy being generalization of the number of different possibilities there are for a random variable". Entropy is measured using "bits" and can generally be found by using this formula:

Delta S = -log_2Pr(X=x)

The required number of bits to successfully say you are "unique" is ~32 bits of information. So if I want to figure out how many bits of information I get by being a male on the planet Earth I simply do this:

S = -log_2(3 415 000 000  /6 790 000 000) = 0.99152 bits

Where the first large number, 3.415 billion, is the number of male humans in the world ([WolframAlpha](http://www.wolframalpha.com/input/?i=world+male+population)) and the second number, 6.79 billion, is the number of humans in the world totally ([WolframAlpha](http://www.wolframalpha.com/input/?i=world+population)). In the end, I am left with 0.99 bits of information which is not a lot towards singling me out. Sorry.

Here is the point where I thought it would be very neat to use some of the information I have out on the internet such as the fact that I go to the Georgia Institute of Technology, that I am a freshman, that I am a male, or that I was born in April. However I am unable to find exact numbers revealing the exact number of incoming freshman who came to Tech this year. Until then, I am unable to have fun.

The Electronic Frontier Foundation put this theory into some practicality by creating [Panopticlick](https://panopticlick.eff.org/). Panopticlick uses information freely provided from your browser to determine how unique your browser is. The metrics used are information such as the resolution of your screen, your operating system, or what fonts you have installed. In the big, scary picture, the uniqueness of your browser also could, but is not to my knowledge being actively used anywhere to track your browser. This can be scary, but you have to keep in mind you could adjust any of the metrics by installing a new font, changing your resolution, or by booting into Linux than your normal operating system. Effective and cool but not reliable is what I would call it.

What makes you unique? 
