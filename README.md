# Social Media Agent Dashboard

A fully client-side social media management dashboard powered by IBM Watson Bob.  
Built with plain HTML, CSS, and JavaScript — no build tools or frameworks required.

## 🚀 Live Preview

Open `index.html` directly in any browser. No server needed.

## 📁 Project Structure

```
social-media-dashboard/
├── index.html   ← Main HTML (structure & layout)
├── style.css    ← All styles and CSS variables
├── app.js       ← All JavaScript (charts, scheduler, navigation)
└── README.md    ← This file
```

## ✨ Features

### Agent Hub
- Live follower counts across X (Twitter), LinkedIn, Instagram, Facebook
- AI content generation panel (watsonx-style prompt → optimized draft)
- Omni-channel engagement line chart
- Sentiment matrix doughnut chart
- Predictive trending hashtag insights

### Analytics
- KPI cards: Total Reach, Impressions, Avg. Engagement Rate, Link Clicks
- **Overview tab** — Engagement rate over time (7D / 30D / 90D) + Follower Growth bar chart
- **Reach & Impressions tab** — Dual-axis bar chart with range switcher
- **Platform Breakdown tab** — Horizontal followers bar + Engagement share doughnut
- **Top Posts tab** — Table of top 5 performing posts with all metrics

### Scheduler
- 7-day calendar strip (today highlighted, dots show scheduled days)
- Post queue table with platform badge, content preview, date/time, status
- Add-post form: platform, content, date, time, status (Scheduled / Draft)
- Mark posts as Published ✓ or delete 🗑
- Live stats: Scheduled / Drafts / Published / This Week

## 🛠 Dependencies (CDN — requires internet)

| Library | Version | Purpose |
|---|---|---|
| [Chart.js](https://www.chartjs.org/) | 4.4.3 | All charts |
| [Font Awesome](https://fontawesome.com/) | 6.5.1 | Icons |

