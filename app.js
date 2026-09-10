/* ═══════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════ */
var pageTitles = {
  hub: 'Social Media Agent Workspace',
  analytics: 'Analytics',
  scheduler: 'Scheduler',
  settings: 'Settings'
};

document.querySelectorAll('.nav-btn[data-section]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var id = btn.dataset.section;
    document.querySelectorAll('.nav-btn').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    document.querySelectorAll('.section').forEach(function (s) { s.classList.remove('active'); });
    document.getElementById('sec-' + id).classList.add('active');
    document.getElementById('page-title').textContent = pageTitles[id];
    if (id === 'scheduler') buildCalStrip();
  });
});

/* ═══════════════════════════════════════
   SHARED CHART DEFAULTS
═══════════════════════════════════════ */
var CHART_DEFAULTS = {
  color: '#94a3b8',
  gridColor: '#1e2d42',
  tickColor: '#64748b'
};

/* ═══════════════════════════════════════
   AGENT HUB CHARTS
═══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {

  // Omni-Channel Engagement line chart
  new Chart(document.getElementById('ch1').getContext('2d'), {
    type: 'line',
    data: {
      labels: ['9am', '12pm', '3pm', '6pm', '9pm'],
      datasets: [
        { label: 'X (Twitter)', data: [1200, 3100, 4800, 3600, 2200], borderColor: '#f1f5f9', backgroundColor: 'rgba(241,245,249,0.06)', tension: 0.4, fill: true, pointRadius: 3 },
        { label: 'LinkedIn',    data: [800, 1900, 2700, 2100, 1400],  borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.06)',  tension: 0.4, fill: true, pointRadius: 3 },
        { label: 'Instagram',   data: [2400, 5200, 7900, 6100, 3800], borderColor: '#8b5cf6', backgroundColor: 'rgba(139,92,246,0.06)', tension: 0.4, fill: true, pointRadius: 3 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: true, labels: { color: CHART_DEFAULTS.color, boxWidth: 10, font: { size: 11 } } } },
      scales: {
        x: { ticks: { color: CHART_DEFAULTS.tickColor }, grid: { color: CHART_DEFAULTS.gridColor } },
        y: { ticks: { color: CHART_DEFAULTS.tickColor }, grid: { color: CHART_DEFAULTS.gridColor } }
      }
    }
  });

  // Sentiment doughnut
  new Chart(document.getElementById('ch2').getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: ['Positive', 'Neutral', 'Negative'],
      datasets: [{ data: [62, 25, 13], backgroundColor: ['#10b981', '#64748b', '#f59e0b'], borderWidth: 0, hoverOffset: 5 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '65%',
      plugins: { legend: { position: 'bottom', labels: { color: CHART_DEFAULTS.color, boxWidth: 10, font: { size: 11 }, padding: 8 } } }
    }
  });

  initAnalyticsCharts();
  initTopPosts();
  setTodayDate();
});

/* ═══════════════════════════════════════
   AGENT HUB — GENERATE
═══════════════════════════════════════ */
function runAgent() {
  var txt = document.getElementById('pIn').value.trim();
  var out = document.getElementById('pOut');
  var btn = document.getElementById('genBtn');
  if (!txt) return;

  btn.disabled = true;
  btn.textContent = 'Generating\u2026';
  out.style.display = 'block';
  out.innerHTML = '<span style="color:#64748b">Processing via watsonx infrastructure\u2026</span>';

  setTimeout(function () {
    out.innerHTML =
      '<strong style="color:#8b5cf6">Optimized Draft</strong>\n\n' +
      'Accelerate your operations using multichannel predictive pipelines. ' +
      'Synthesize data streams securely with IBM watsonx \u2014 the enterprise AI platform ' +
      'built for scale, trust, and speed.\n\n' +
      '<span style="color:#60a5fa">#GenerativeAI #Automation #IBM #watsonx</span>';
    btn.disabled = false;
    btn.textContent = 'Generate';
  }, 900);
}

/* ═══════════════════════════════════════
   ANALYTICS — DATA
═══════════════════════════════════════ */
var analyticsData = {
  eng: {
    '7d':  { labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], x: [3.1,4.2,3.8,5.1,4.7,6.2,5.8], li: [2.4,3.1,2.8,3.6,3.3,2.9,3.5], ig: [5.2,6.1,5.8,7.2,6.9,8.1,7.4] },
    '30d': { labels: ['W1','W2','W3','W4'],                       x: [3.8,4.4,4.1,5.2],              li: [2.9,3.3,3.0,3.7],              ig: [6.1,6.8,6.3,7.5] },
    '90d': { labels: ['Jan','Feb','Mar'],                          x: [3.2,4.0,4.8],                  li: [2.5,3.1,3.6],                  ig: [5.4,6.4,7.2] }
  },
  reach: {
    '7d':  { labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], reach: [142000,180000,165000,210000,198000,245000,228000], impr: [410000,520000,480000,615000,580000,710000,660000] },
    '30d': { labels: ['W1','W2','W3','W4'],                       reach: [980000,1120000,1050000,1240000],                   impr: [2800000,3200000,3000000,3600000] }
  }
};

var engChart, growChart, reachChart, platBarChart, platPieChart;

/* ═══════════════════════════════════════
   ANALYTICS — INIT CHARTS
═══════════════════════════════════════ */
function initAnalyticsCharts() {
  var d = analyticsData.eng['7d'];

  engChart = new Chart(document.getElementById('engChart').getContext('2d'), {
    type: 'line',
    data: {
      labels: d.labels,
      datasets: [
        { label: 'X',         data: d.x,  borderColor: '#f1f5f9', backgroundColor: 'rgba(241,245,249,0.05)', tension: 0.4, fill: true, pointRadius: 3 },
        { label: 'LinkedIn',  data: d.li, borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.05)',  tension: 0.4, fill: true, pointRadius: 3 },
        { label: 'Instagram', data: d.ig, borderColor: '#8b5cf6', backgroundColor: 'rgba(139,92,246,0.05)', tension: 0.4, fill: true, pointRadius: 3 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { color: CHART_DEFAULTS.color, boxWidth: 10, font: { size: 11 } } } },
      scales: {
        x: { ticks: { color: CHART_DEFAULTS.tickColor }, grid: { color: CHART_DEFAULTS.gridColor } },
        y: { ticks: { color: CHART_DEFAULTS.tickColor, callback: function (v) { return v + '%'; } }, grid: { color: CHART_DEFAULTS.gridColor } }
      }
    }
  });

  growChart = new Chart(document.getElementById('growChart').getContext('2d'), {
    type: 'bar',
    data: {
      labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      datasets: [
        { label: 'New Followers', data: [420,380,510,460,590,720,680], backgroundColor: 'rgba(59,130,246,0.7)', borderRadius: 4 },
        { label: 'Unfollows',     data: [120,90,140,100,160,200,180],  backgroundColor: 'rgba(239,68,68,0.5)',  borderRadius: 4 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { color: CHART_DEFAULTS.color, boxWidth: 10, font: { size: 11 } } } },
      scales: {
        x: { ticks: { color: CHART_DEFAULTS.tickColor }, grid: { color: CHART_DEFAULTS.gridColor } },
        y: { ticks: { color: CHART_DEFAULTS.tickColor }, grid: { color: CHART_DEFAULTS.gridColor } }
      }
    }
  });

  var rd = analyticsData.reach['7d'];
  reachChart = new Chart(document.getElementById('reachChart').getContext('2d'), {
    type: 'bar',
    data: {
      labels: rd.labels,
      datasets: [
        { label: 'Reach',       data: rd.reach, backgroundColor: 'rgba(139,92,246,0.7)',  borderRadius: 4, yAxisID: 'y'  },
        { label: 'Impressions', data: rd.impr,  backgroundColor: 'rgba(59,130,246,0.45)', borderRadius: 4, yAxisID: 'y1' }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { color: CHART_DEFAULTS.color, boxWidth: 10, font: { size: 11 } } } },
      scales: {
        x:  { ticks: { color: CHART_DEFAULTS.tickColor }, grid: { color: CHART_DEFAULTS.gridColor } },
        y:  { ticks: { color: CHART_DEFAULTS.tickColor, callback: function (v) { return (v / 1000).toFixed(0) + 'K'; } }, grid: { color: CHART_DEFAULTS.gridColor }, position: 'left' },
        y1: { ticks: { color: CHART_DEFAULTS.tickColor, callback: function (v) { return (v / 1000000).toFixed(1) + 'M'; } }, grid: { display: false }, position: 'right' }
      }
    }
  });

  platBarChart = new Chart(document.getElementById('platBarChart').getContext('2d'), {
    type: 'bar',
    data: {
      labels: ['X (Twitter)', 'LinkedIn', 'Instagram', 'Facebook'],
      datasets: [{
        label: 'Followers',
        data: [42800, 18200, 89400, 31500],
        backgroundColor: ['rgba(241,245,249,0.7)', 'rgba(59,130,246,0.7)', 'rgba(139,92,246,0.7)', 'rgba(24,119,242,0.7)'],
        borderRadius: 5
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, indexAxis: 'y',
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: CHART_DEFAULTS.tickColor, callback: function (v) { return (v / 1000).toFixed(0) + 'K'; } }, grid: { color: CHART_DEFAULTS.gridColor } },
        y: { ticks: { color: CHART_DEFAULTS.tickColor }, grid: { color: CHART_DEFAULTS.gridColor } }
      }
    }
  });

  platPieChart = new Chart(document.getElementById('platPieChart').getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: ['X (Twitter)', 'LinkedIn', 'Instagram', 'Facebook'],
      datasets: [{
        data: [28, 18, 38, 16],
        backgroundColor: ['rgba(241,245,249,0.8)', 'rgba(59,130,246,0.8)', 'rgba(139,92,246,0.8)', 'rgba(24,119,242,0.8)'],
        borderWidth: 0, hoverOffset: 5
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '60%',
      plugins: { legend: { position: 'bottom', labels: { color: CHART_DEFAULTS.color, boxWidth: 10, font: { size: 11 }, padding: 8 } } }
    }
  });
}

/* ═══════════════════════════════════════
   ANALYTICS — RANGE SWITCHER
═══════════════════════════════════════ */
function setRange(btn, chartId) {
  var group = btn.parentElement;
  group.querySelectorAll('.range-btn').forEach(function (b) { b.classList.remove('active'); });
  btn.classList.add('active');
  var range = btn.dataset.range;

  if (chartId === 'eng') {
    var d = analyticsData.eng[range];
    engChart.data.labels = d.labels;
    engChart.data.datasets[0].data = d.x;
    engChart.data.datasets[1].data = d.li;
    engChart.data.datasets[2].data = d.ig;
    engChart.update();
  } else if (chartId === 'reach') {
    var rd = analyticsData.reach[range] || analyticsData.reach['7d'];
    reachChart.data.labels = rd.labels;
    reachChart.data.datasets[0].data = rd.reach;
    reachChart.data.datasets[1].data = rd.impr;
    reachChart.update();
  }
}

/* Analytics tab switching */
document.querySelectorAll('.tab[data-atab]').forEach(function (tab) {
  tab.addEventListener('click', function () {
    document.querySelectorAll('.tab[data-atab]').forEach(function (t) { t.classList.remove('active'); });
    tab.classList.add('active');
    var id = tab.dataset.atab;
    ['overview', 'reach', 'platforms', 'posts'].forEach(function (name) {
      document.getElementById('atab-' + name).style.display = (name === id) ? 'block' : 'none';
    });
  });
});

/* ═══════════════════════════════════════
   ANALYTICS — TOP POSTS TABLE
═══════════════════════════════════════ */
function initTopPosts() {
  var posts = [
    { platform: 'ig', content: '🚀 Accelerate your AI journey with IBM watsonx. The enterprise platform built for trust.', reach: '124K', likes: '8,420', comments: '312', shares: '1,240', rate: '9.1%' },
    { platform: 'x',  content: 'Proud to announce our new multichannel analytics suite. Real-time insights, everywhere.', reach: '89K',  likes: '4,100', comments: '198', shares: '860',   rate: '5.8%' },
    { platform: 'li', content: 'Enterprise AI is no longer a future concept — it is your competitive edge today.',        reach: '62K',  likes: '3,820', comments: '244', shares: '510',   rate: '7.4%' },
    { platform: 'fb', content: 'Join our live webinar this Thursday on Generative AI for Marketing teams.',               reach: '41K',  likes: '1,980', comments: '88',  shares: '320',   rate: '5.1%' },
    { platform: 'x',  content: '#GenerativeAI is transforming content workflows. Here is how leading brands are adapting.', reach: '38K', likes: '2,100', comments: '142', shares: '480',  rate: '7.2%' }
  ];
  var pbMap   = { ig: 'pb-ig', x: 'pb-x', li: 'pb-li', fb: 'pb-fb' };
  var nameMap = { ig: 'Instagram', x: 'X (Twitter)', li: 'LinkedIn', fb: 'Facebook' };
  var tbody = document.getElementById('top-posts-tbody');
  posts.forEach(function (p) {
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td><span class="platform-badge ' + pbMap[p.platform] + '">' + nameMap[p.platform] + '</span></td>' +
      '<td style="max-width:260px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + p.content + '</td>' +
      '<td style="color:var(--accent);font-weight:600;">' + p.reach + '</td>' +
      '<td>' + p.likes + '</td><td>' + p.comments + '</td><td>' + p.shares + '</td>' +
      '<td style="color:var(--green);font-weight:700;">' + p.rate + '</td>';
    tbody.appendChild(tr);
  });
}

/* ═══════════════════════════════════════
   SCHEDULER
═══════════════════════════════════════ */
var schedulerQueue = [];

function setTodayDate() {
  var today = new Date();
  var yyyy = today.getFullYear();
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var dd = String(today.getDate()).padStart(2, '0');
  document.getElementById('sch-date').value = yyyy + '-' + mm + '-' + dd;
}

function addPost() {
  var platform = document.getElementById('sch-platform').value;
  var content  = document.getElementById('sch-content').value.trim();
  var date     = document.getElementById('sch-date').value;
  var time     = document.getElementById('sch-time').value;
  var status   = document.getElementById('sch-status').value;

  if (!content) { alert('Please enter post content.'); return; }
  if (!date)    { alert('Please select a date.'); return; }

  schedulerQueue.push({ id: Date.now(), platform: platform, content: content, date: date, time: time, status: status });
  schedulerQueue.sort(function (a, b) { return (a.date + a.time).localeCompare(b.date + b.time); });

  document.getElementById('sch-content').value = '';
  renderQueue();
  buildCalStrip();
}

function deletePost(id) {
  schedulerQueue = schedulerQueue.filter(function (p) { return p.id !== id; });
  renderQueue();
  buildCalStrip();
}

function markPublished(id) {
  var p = schedulerQueue.find(function (p) { return p.id === id; });
  if (p) p.status = 'published';
  renderQueue();
}

var platformBadge = { x: 'pb-x', linkedin: 'pb-li', instagram: 'pb-ig', facebook: 'pb-fb' };
var platformName  = { x: '𝕏', linkedin: 'LinkedIn', instagram: 'Instagram', facebook: 'Facebook' };
var statusClass   = { scheduled: 'sb-scheduled', draft: 'sb-draft', published: 'sb-published' };

function renderQueue() {
  var tbody = document.getElementById('queue-tbody');
  var empty = document.getElementById('queue-empty');
  tbody.innerHTML = '';

  if (schedulerQueue.length === 0) {
    empty.style.display = 'block';
  } else {
    empty.style.display = 'none';
    schedulerQueue.forEach(function (p) {
      var tr = document.createElement('tr');
      var dateDisp = p.date
        ? new Date(p.date + 'T' + (p.time || '00:00')).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' + (p.time || '')
        : '—';
      var snippet = p.content.length > 60 ? p.content.slice(0, 60) + '\u2026' : p.content;
      tr.innerHTML =
        '<td><span class="platform-badge ' + (platformBadge[p.platform] || '') + '">' + (platformName[p.platform] || p.platform) + '</span></td>' +
        '<td style="color:var(--text);">' + snippet + '</td>' +
        '<td style="font-size:0.78rem;color:var(--muted);white-space:nowrap;">' + dateDisp + '</td>' +
        '<td><span class="status-badge ' + (statusClass[p.status] || '') + '">' + p.status.charAt(0).toUpperCase() + p.status.slice(1) + '</span></td>' +
        '<td>' +
          (p.status !== 'published' ? '<button class="del-btn" title="Mark published" onclick="markPublished(' + p.id + ')"><i class="fa-solid fa-check"></i></button>' : '') +
          '<button class="del-btn" title="Delete" onclick="deletePost(' + p.id + ')"><i class="fa-solid fa-trash"></i></button>' +
        '</td>';
      tbody.appendChild(tr);
    });
  }

  document.getElementById('queue-count').textContent = schedulerQueue.length + ' post' + (schedulerQueue.length !== 1 ? 's' : '');

  var sched   = schedulerQueue.filter(function (p) { return p.status === 'scheduled'; }).length;
  var draft   = schedulerQueue.filter(function (p) { return p.status === 'draft'; }).length;
  var pub     = schedulerQueue.filter(function (p) { return p.status === 'published'; }).length;
  var now     = new Date();
  var weekEnd = new Date(now); weekEnd.setDate(now.getDate() + 7);
  var week    = schedulerQueue.filter(function (p) { var d = new Date(p.date); return d >= now && d <= weekEnd; }).length;

  document.getElementById('stat-scheduled').textContent = sched;
  document.getElementById('stat-drafts').textContent    = draft;
  document.getElementById('stat-published').textContent = pub;
  document.getElementById('stat-week').textContent      = week;
}

function buildCalStrip() {
  var strip = document.getElementById('cal-strip');
  strip.innerHTML = '';
  var days  = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var today = new Date();

  for (var i = 0; i < 7; i++) {
    var d = new Date(today);
    d.setDate(today.getDate() + i);
    var iso      = d.toISOString().slice(0, 10);
    var hasPosts = schedulerQueue.some(function (p) { return p.date === iso; });
    var isToday  = (i === 0);
    var div      = document.createElement('div');
    div.className = 'cal-day' + (isToday ? ' today' : '');
    div.innerHTML =
      '<div class="day-name">' + days[d.getDay()] + '</div>' +
      '<div class="day-num">' + d.getDate() + '</div>' +
      '<div class="day-dot' + (hasPosts ? '' : ' empty') + '"></div>';
    strip.appendChild(div);
  }

  var s    = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  var e    = new Date(today); e.setDate(today.getDate() + 6);
  var eStr = e.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  document.getElementById('week-range').textContent = s + ' \u2013 ' + eStr;
}
