# LLM Comparison & Recommender

A single-page, no-build-step comparison tool for current frontier and budget LLMs — spec sheet, benchmark charts, and a 3-question recommender that matches a model to your role, focus area, and budget.

**📅 Data snapshot: September 27, 2026.** LLM pricing and benchmark scores change within weeks — treat every figure on this page as a dated snapshot, not a live feed, and re-check each provider's own pricing/model pages before relying on it for a real decision.

**[Live demo →](https://YOUR-USERNAME.github.io/llm-comparison-tool/)** <!-- update after enabling GitHub Pages -->

## What it does

- **Spec cards** for 5 models (GPT-6 Astra, GPT-6 Sol, Claude Opus 5.5, Claude Haiku 4.5, Gemini 3.8 Flash), color-coded by developer
- **Find your match** — answer 3 questions (who you are / what you'll use it for / your budget) and get a ranked recommendation with reasoning grounded in the actual benchmark and pricing numbers, not a black-box score
- **Bar charts** for Intelligence Index, Terminal-Bench 4.0, output speed, context window, and price
- **Radar chart** for side-by-side comparison of any 2–4 picked models
- **Full sortable table** — developer, release date, API model ID, context window, max output tokens, input/output cost, peak output speed, Intelligence Index, ARC-AGI-3, Terminal-Bench 4.0, modality

## Why the numbers have caveats

A few benchmark figures on this page are genuinely contested or incomplete as of the snapshot date, and the page says so rather than smoothing it over:

- **GPT-6 Astra's ARC-AGI-3 score is two different numbers** depending on test harness (62.7% standard vs 99.9% with a "Provider Adapter" harness) — not a range, two different tests.
- **Claude Opus 5.5 has no verified ARC-AGI-3 score** at snapshot time — Anthropic's test requests were flagged by ARC Prize's anti-abuse system at launch.
- **GPT-6 Sol was 5 days old** at snapshot time, so several independent benchmarks simply hadn't been run yet.

## Sources

Pricing and specs are pulled from each vendor's own API/model documentation (OpenAI, Anthropic, Google), cross-checked against [Artificial Analysis](https://artificialanalysis.ai) and [ARC Prize](https://arcprize.org) where available.

## Tech

Single self-contained `index.html` — vanilla HTML/CSS/JS, no framework, no build step, no dependencies. Fonts loaded from Google Fonts (Fraunces + IBM Plex Mono).

## Run it locally

Just open `index.html` in a browser, or serve the folder with any static file server.
