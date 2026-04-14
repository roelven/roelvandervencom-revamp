---
title: "How I made my project board talk to my AI agents"
date: 2026-03-19T12:00:00.000Z
draft: false
tags: ["ai", "agents", "automation", "planka", "mcp", "homelab"]
image: "/images/posts/how-i-made-my-project-board-talk-to-my-ai-agents.png"
type: article
slug: "how-i-made-my-project-board-talk-to-my-ai-agents"
mastodon_url: "https://social.lol/@roel/116402074528762098"
---

I self-host [Planka](https://planka.app/) on my homelab and use it to manage everything from software side projects to household finances to recurring chores. It's open source, it's fast, and it does what I need without the bloat.

What I wasn't happy with was the friction of keeping it in sync with what I was actually doing. Every time I finished a task, I'd context-switch to a browser tab, find the card, drag it to the right column, maybe update the description. Thirty seconds per card, but across multiple boards and dozens of cards a week, it compounds into overhead rather than organization.

So I built two things: a CLI tool and an MCP server. Both talk to my self-hosted instance, and together they've turned Planka from a place I visit into infrastructure that moves with me.

## The CLI: fast, cheap, and built for agents

The [Planka CLI](https://github.com/roelven/planka-cli) is a single Bash script. No installation, no dependencies beyond curl and Python 3. It wraps Planka's REST API and outputs either human-readable tables or JSON, depending on what's consuming it.

I built it because existing tooling was too token-intensive for AI agents. When an agent needs to check a board, move a card, and update a description, every extra token is cost and latency you don't need. The CLI is deliberately minimal: list boards, list cards, create, move, update, comment, label. Everything pipes cleanly into `jq` for filtering.

In Claude Code, this is where it really clicks. I can ask Claude to check what's on a board, move completed work, and update descriptions through shell commands that resolve in milliseconds. The board just stays current as a side effect of the work itself.

## The MCP server: Planka in every AI conversation

The [MCP server](https://github.com/roelven/another-planka-mcp) solves a different problem. Where the CLI is great inside a terminal, the MCP server makes Planka available to Claude.ai and ChatGPT through the Model Context Protocol. I can be mid-conversation about a project and say "move that card to Done" without leaving the chat.

It's designed with token budgets in mind. Every tool has configurable detail levels (preview, summary, detailed) so you're not dumping an entire board's worth of JSON into a conversation when all you need is a card title and status. I run it in Docker on my homelab alongside Planka itself, reachable remotely via streamable HTTP. If I'm talking to an LLM, I have access to my boards.

## What actually changed

I stopped managing my boards and started letting my AI tools manage them for me. In Claude Code, the agent reads the board, picks up the next task, and moves cards as it goes. In Claude.ai, I can reorganize chores or update financial tracking without opening another tab.

The thing that surprised me most was what happened when I connected these tools to an automated agent loop. The board becomes the coordination layer: I organize what needs to happen, the agent picks it up and works through it, cards move across columns as progress happens. The system does the bookkeeping and I focus on the decisions.

This makes me genuinely happy on a daily basis. Not because the technology is impressive (though the fact that a Bash script and a Python server can create this much leverage is worth noting), but because I've removed a category of friction that was always there and never felt worth solving until the tools existed to solve it cheaply.

## The connectivity piece

Neither tool is particularly complex on its own. The CLI is a thin wrapper around a REST API. The MCP server is a structured bridge between that API and the MCP protocol. What creates the value is the connectivity: Planka running on my homelab, the CLI available in every terminal session, the MCP server reachable from every AI conversation. When you make a system accessible from every context you work in, it becomes part of how you think rather than a place you have to remember to go.

Thanks to the creators of Planka for building something with a clean API that made both of these projects possible in a weekend each.

## If you want to try this

Both repositories are public:

- **[planka-cli](https://github.com/roelven/planka-cli)**: Single-file Bash CLI. Clone it, add your Planka URL and token to `config.env`, and you're running.
- **[another-planka-mcp](https://github.com/roelven/another-planka-mcp)**: Python MCP server with Docker support. Works with Claude Desktop locally or claude.ai remotely via streamable HTTP.

You'll need a self-hosted Planka instance. If you're already running Planka, the setup for both is measured in minutes, not hours.

Are you using Planka with AI agents, or thinking about it? I'd love to hear about it.
