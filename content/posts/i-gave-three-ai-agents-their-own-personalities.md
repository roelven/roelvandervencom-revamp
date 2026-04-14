---
title: "I gave three AI agents their own personalities. Here's what actually came of it."
date: 2026-04-13T12:00:00.000Z
draft: false
tags: ["ai", "agents", "automation", "hermes"]
type: article
slug: "i-gave-three-ai-agents-their-own-personalities"
---

For a while I was doing what most people do: one AI assistant, one big context window, everything in one place. Convenient on paper. In practice, it's a bit like asking the same person to be your chef, your accountant, and your personal trainer. The context bleed alone makes everything worse.

I've been running a different setup for a few months now and it's holding up better than anything I've tried before. Three agents, each with a distinct identity and a narrow job. This is the writeup.

---

![Pip, Gary and Mary in Telegram](/images/posts/screenshot-telegram-pip-gary-mary.jpeg)

---

## The thing I tried first

I gave Openclaw a real go. The community around it was active and the promise was there. What kept happening, though, was that I'd build something, and then I'd be maintaining it instead of using it. Not because Openclaw is bad, just because the overhead of keeping a custom setup running was eating exactly the time I was trying to get back. At some point that feedback loop becomes hard to ignore.

So I went looking.

## Why Hermes

[Hermes Agent](https://hermes-agent.nousresearch.com/) is what I landed on, and a few things stand out compared to what I was running before.

The security model feels intentional rather than assembled. The commands you can trigger from within a chat are designed well. But the thing I keep coming back to is how Hermes handles memory over time. Most AI setups treat each session as roughly independent: you start fresh, you rebuild context, you move on. Hermes builds a persistent understanding of who you are and what you're working on across sessions. That's not just a nice-to-have when you're running more than one agent. It's what makes the whole thing coherent.

There's also a command called `/new` that I use constantly. It starts a fresh session and clears the working context, but it doesn't touch the agent's long-term memory. So you get a clean slate without losing what the agent has learned about you. That distinction matters more than it sounds. It's the difference between "restart" and "refresh."

---

## How the setup works technically

All my LLM calls run through the [z.ai coding plan](https://z.ai/subscribe) on GLM-5-turbo. I moved over from GLM-4.7 a while back and the improvement in tool calling quality was noticeable enough that it changed what felt worth building. Reliable tool use is the foundation everything else sits on.

For compression and compaction, I run a local model on my M3 iMac via Ollama:

```yaml
compression:
  provider: custom
  model: qwen2.5:7b-instruct
  base_url: http://localhost:11434/v1
  api_key: ollama
  timeout: 120
```

Local model, local job. Doesn't need to be the sharpest tool in the shed for this.

---

## Profiles and SOUL.md

The feature that made all of this practical is [Hermes profiles](https://hermes-agent.nousresearch.com/docs/user-guide/profiles/). Each profile is a completely isolated agent identity: its own configuration, its own tools, and its own SOUL.md.

SOUL.md is where you define who an agent is. Personality, defaults, areas of ownership, how it should approach its domain. Because each profile reads its own SOUL.md independently, the agents are genuinely separate rather than one model context-switching between roles. That separation is what keeps each agent's judgment sharp within its domain, and it's what makes the whole fleet maintainable.

---

## Meet the team

![Pip, Gary and Mary avatars](/images/posts/three-avatar-profiles-with-names.png)

### Pip

Pip is the flight operator. The conduit between all the Hermes processes: coordinating between agents, handling configuration changes, and serving as a fallback when something breaks. That last part is more useful than it first sounds. When an agent goes unresponsive because a configuration went wrong, you want somewhere to turn that doesn't require logging into a computer. Pip is that redundancy. One agent keeping an eye on the others.

### Gary

Gary is my health coach. He connects to Garmin and pulls all the data my running watch logs, then writes it to disk. He also has a vision tool (via z.ai) that lets me photograph food and get a nutritional estimate logged against my daily intake.

![Gary responding to a dinner photo](/images/posts/gary-responding-to-dinner-photo.png)

Gary has strong opinions about protein. He has shared these opinions with me consistently. I've started cooking differently because of it, which probably says something about either the quality of the feedback or my willingness to take it from something with an avatar. His avatar looks sporty and energetic. He is also, objectively, exhausted. He tracks macros at 2am with the cheerfulness of someone who has never once questioned whether this is normal.

### Mary

Mary handles the household layer, and she's become quietly indispensable in the way that the best infrastructure always does: you notice when it's missing, not when it's there.

She subscribes to our local waste collection service and tells me when trash is collected. She tracks ventilation filter changes. And here's the part I didn't explicitly build: she reminds me a week before the filter deadline, not on the day, because she reasoned that a same-day reminder doesn't leave time to order a replacement. That inference came from her. I just set the job.

Mary connects to the family Google Calendar and factors in appointments when scheduling reminders. She and Gary each have their own Google account and email address, which gives them real calendar and email integration without either of them bleeding into the other's domain.

What I'm working on next with Mary is prescription management. The rough shape of it: she tracks when I receive a prescription or supplement order, calculates when I'll need a refill based on dosage, and handles the reorder as much as possible. I want to delegate that whole chain. The framework is there, it's mostly a matter of wiring it up.

---

## What this has actually taught me

The honest version: the part that surprised me most wasn't any specific feature. It was how much the specialization itself does the work.

Gary doesn't know about trash collection schedules. Mary doesn't know my VO2 max. Pip doesn't have opinions about protein. Because each of them operates in a tight domain with a matching SOUL.md and the right tools, their outputs are consistent and their context stays clean. When I use `/new` to start a fresh session with Gary, he doesn't forget my health history. He just drops the working context from the last conversation and picks up from what he knows. That's the right behavior.

I've also learned to use Obsidian as a coordination layer across all three. All agents default to writing their plans and reports into a folder in my vault, which means I can check any agent's output on any device without digging through chat history. Small structural choice, compounds quickly.

The generalist approach has an obvious appeal: one place, one interface, less to think about. But in practice it creates a context management problem that grows over time, and you end up managing the system instead of using it. That's what drove me away from my previous setup. A small number of focused agents, each owning their domain, with a coordinator at the center, is the architecture that's actually been giving time back rather than taking it.

Whether that stays true as the agents get more capable, I don't know. This is very much my current thinking. But for now, it's the thing that's working.
