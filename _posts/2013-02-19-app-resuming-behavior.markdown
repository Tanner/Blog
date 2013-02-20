--- 
layout: post
title: App Resuming Behavior
date: February 20, 2013 5:01 pm
---
A few days ago I was using Tweedle on my Nexus 4. Tweedle is well made Android Twitter client. It has a simple interface and does the job simply without any fuss.

I have always noticed that it would not retain a drafted tweet that I was working on. I would switch applications to reference whatever it is I wanted to talk about and come back to Tweedle to find that my post was gone.

I expressed my confusion about this to the creator of Tweedle and apparently the application does retain your draft if you switch back to Tweedle via the recent apps screen.

What was I doing? Switching by going to the home screen, and relaunching the application from there.

This confused me as I have not noticed any other application on Android or iOS that has this behavior.

The developer's reasoning was interesting.

> I chose to make the experience from the launcher always consistent.[^1]

Consistency is a good *sometimes*. For this scenario, it is not. 

The developer gave a bit more reasoning to why it was this way.

> Would you prefer that if you looked at a tweet detail ten hours ago I return you to it when you relaunch it from the launcher?[^2]

I expected the application to resume back where I was when I left it. It did not.

Why did I expect it to act this way? Most of my reasons point to the way iOS applications function as all of my smart phones before now have been iPhones. I'm still learning the quirks and the "ways of Android."

Given what the developer said, I tried a few more Android apps to see how they functioned.

Messaging does not do it. Talk does not do it. Along with Foursquare, Facebook, Google+, and even Twitter.

I find this slightly ironic as the developer was redesigning the timeline view to match the built-in Messaging application for "consistency".

Users should be able to expect your application to act similarly to other applications for your platform. I don't want to have to remember to use the recent apps switcher or that I have to press a button to save.

I just want the app to be there for me. I don't want to feel like I'm working for it.

I took a look at Google's Android docs to see if they mentioned anything. Their training guides on the [activity lifecycle](http://developer.android.com/training/basics/activity-lifecycle/starting.html) do mention user expectations in relation to resuming (emphesis mine).

> However, it's important that you understand each one and implement those that **ensure your app behaves the way users expect**. Implementing your activity lifecycle methods properly ensures your app behaves well in several ways, including that it:
> 
>  - Does not crash if the user receives a phone call or switches to another app while using your app.
>  - Does not consume valuable system resources when the user is not actively using it.
>  - **Does not lose the user's progress if they leave your app and return to it at a later time.**
>  - Does not crash or lose the user's progress when the screen rotates between landscape and portrait orientation.

I'm happy to see that Google mentions this. I'm not sure why the developer of Tweedle feels that his application is different.

The simple truth is that I expected his application to do perform the same that other applications I have seen perform, it did not, and I suffer as a result; I lost my tweet.

Yes, it's only 140 characters of my life. But it makes me like Tweedle just a little bit less. Even more that the developer won't change it.[^3]

Here's the take away: Design for your user's expectations, not your own. 

[^1]: [https://twitter.com/tweedleapp/status/303551694975926272](https://twitter.com/tweedleapp/status/303551694975926272)

[^2]: [https://twitter.com/tweedleapp/status/303553398173745152](https://twitter.com/tweedleapp/status/303553398173745152)

[^3]: [https://twitter.com/tweedleapp/status/303718473522106368](https://twitter.com/tweedleapp/status/303718473522106368)