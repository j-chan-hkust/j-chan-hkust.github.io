---
title: Cybersecurity in Corporate
description: Cybersecurity in practice
pubDate: Nov 15 2024
tags:
  - cybersecurity
  - corporate
---
Cybersecurity is one of those things where pop culture gives you a really wrong idea about what they do. In the same way a corporate lawyer doesn't really see themselves in Suits, your average cybersecurity analyst doesn't recognize themselves and their day-to-day job in Mr. Robot. While your average analyst and Elliot Anderson are both technologists, what they actually end up doing with this knowledge is quite different.

When I was just starting to get into this field as a fresh grad, I had a lot of misconceptions about what the cybersecurity team spent all day doing. This is how I would lay it out for someone getting into it all.

### Seeing like a corporate

Corporates are corporates because they're really big. As of writing, [Standard Chartered](https://en.wikipedia.org/wiki/Standard_Chartered) has 83,000 employees. That is a so much people. If you pulled a random person out of that 83 thousand, and asked me what I thought they did all day, and how it contributes to the companies success, I would probably give you a blank stare. 

Corporates also have to deal with a lot of different problems. _mr claude to help draft obscure corporate questions here, like "whats the tax code of japan", "obscure valuation question from accounting", etc._

This is one of the fundamental problem of management — answering this fundamental question of "how does this person contribute to us achieving our goals[^1]".

One of the ways they figure this stuff out is by abstracting away problems by giving them to someone else and making it their responsibility. As the CEO of the company, my problem is no longer "how do I understand every detail about what we do", and instead becomes "how do I structure the responsibilities, and quantify and reward the performance of the people under me"[^2]. This can then repeat at a level below, until you get to the point where a job can be realistically done by one person.

One of the big things that makes all of this work is legibility. For example, as the head of APAC, how would I get the answer to my question "are we making money?", or "are the number of mistakes we're making is going down?" in a game of telephone with thousands of employees[^3]?

This is the fundamental thing that makes enterprise software really hard and really shit. You need to make a data model that everyone can use, that works across many different edge-cases, and this data needs to be compatible such that it can be aggregated into an overall answer.

### Corporate Risk

It's in the context of this problem that we have corporate risk. Doing business involves taking risks. For historical reasons, banking is particularly sensitive to measuring risk but that is a topic for other people[^6]. Risk fundamentally exists to answer the question "hey what are the things that could go wrong?", "how likely?", "how bad would it be?"[^4].

And thus you have swathes of people who's job it is to hop around the business and quantify all the potential problems a company might have. Their job is to take questions like _mr claude please come up with a bunch of questions that a risk function might have!!! For example, "what happens to our position if a trade war gets declared" "what happens if we're a target of a cybersecurity attack?", "what happens if this region has an earthquake"_, collect them all, quantify them, and then add them all up so that management has an idea how much things could go wrong. 

As risk functions mature, they usually start developing play books of common things to worry about, which will also include easy fixes to de-risk certain activities, which they'll require that you do.

This is what cybersecurity is.

### Cybersecurity as a risk function

This is why the day-to-day life of a cybersecurity analyst is more similar to your average risk officer. Your fundamental problem is more like combing through all the ways things are set up in your organization, all the vendors you use, all the data you consume, and checking them against a big list of "things that can go wrong". Your day to day is traversing through lists of problems, making sure easy fixes get fixed, making sure that unavoidable risks get quantified and tracked properly.

It's pure happenstance that you need to be also need to be technologically savvy to understand what's going on.

### Shift Left

One of the obvious problems with this model is that the people checking the product aren't the same people building the product. Which means a lot of ink gets spilt over arguing if a specific finding is actually a problem, how bad it is, how it should be fixed, etc.

The shift left movement aims to fix this problem by making sure that the massive list of concerns that the cybersecurity team will use is being thrown at solutions earlier. Developers end up learning what the cybersecurity team doesn't like, and the cybersecurity team better learns what tradeoffs developers make.

---
### Ok, but what about red team hackers?

Red team hackers[^5] tend to not survive that long in corporates, because they start running out of easy problems. Once they run out of problems to solve, the team is unable to justify their existence, and is usually scaled down/disbanded, until the next time management feels like having a red team.

### What about cybersecurity research labs?

Cybersecurity research labs aren't corporates. They're closer to journalism than they are to corporate risk.

[^1]: Usually making money
[^2]: Managers will also have some concerns that they have to deal with themselves.
[^3]: Who, by the way, might be acting on their own interests, and not the companies
[^4]: This is made harder due to the fact that the people who do the work, are incentivized to downplay the negative possibilities. I want my work to be highly valued, hence why would I want to highlight risks?
[^5]: aka people's whose job it is to find problems with existing implementations
[^6]: link patio