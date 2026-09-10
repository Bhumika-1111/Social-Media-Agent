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

## 🌐 Uploading to GitHub Pages

1. Create a new GitHub repository
2. Upload all 4 files (`index.html`, `style.css`, `app.js`, `README.md`)
3. Go to **Settings → Pages → Branch: main → Save**
4. Your dashboard will be live at `https://<your-username>.github.io/<repo-name>/`

## 🌐 Uploading to Netlify / Vercel

- **Netlify**: Drag & drop the project folder at [netlify.com/drop](https://app.netlify.com/drop)
- **Vercel**: `npx vercel` in the project folder, or import via GitHub

## 📄 License

MIT — free to use and modify.
