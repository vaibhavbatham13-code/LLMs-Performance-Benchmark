const CHECK_SVG = '<svg viewBox="0 0 12 12"><path d="M1 6l3 3 7-7" stroke="currentColor" stroke-width="1.8" fill="none"/></svg>';
const RATE = 95.6;

const DEV_META = {
  'OpenAI':    {color:'var(--dev-openai)',    soft:'var(--dev-openai-soft)'},
  'Anthropic': {color:'var(--dev-anthropic)', soft:'var(--dev-anthropic-soft)'},
  'Google DeepMind': {color:'var(--dev-google)', soft:'var(--dev-google-soft)'},
};

const MODELS = [
  {
    id:'astra', name:'GPT-6 Astra', developer:'OpenAI',
    release:'2026-09-03', releaseLabel:'Sep 3, 2026',
    modelId:'gpt-6-astra',
    context:1050000, contextLabel:'1.05M tokens (922K max input)',
    maxOutput:128000, maxOutputLabel:'128K tokens',
    inputCost:10, outputCost:50,
    speed:61, speedLabel:'61 tok/s (max effort)',
    intelligence:53,
    arcagiLabel:'62.7% (Standard harness) / 99.9% (Provider Adapter harness)*',
    arcagiValue:62.7,
    terminalbench:59.1, terminalbenchLabel:'59.1% (max effort)',
    modality:'Text + image → text',
    knowledgeCutoff:'April 2026',
    blurb:'OpenAI\'s flagship — first model to hit their "Critical" cybersecurity threshold, with public access deliberately restricted on sensitive tasks.',
    tiers:{coding:3, math:3, everyday:2, speed:1, afford:1},
  },
  {
    id:'sol', name:'GPT-6 Sol', developer:'OpenAI',
    release:'2026-09-22', releaseLabel:'Sep 22, 2026',
    modelId:'gpt-6-sol',
    context:1050000, contextLabel:'1.05M tokens',
    maxOutput:128000, maxOutputLabel:'128K tokens',
    inputCost:2, outputCost:10,
    speed:null, speedLabel:'not yet independently benchmarked',
    intelligence:null, intelligenceLabel:'not yet listed (OpenAI: "roughly level" with GPT-5.6 Sol, ~47)',
    arcagiLabel:'not yet tested', arcagiValue:null,
    terminalbench:null, terminalbenchLabel:'not yet tested (self-reported DeepSWE v1.1: 68.8%)',
    modality:'Text + image → text',
    knowledgeCutoff:'April 20, 2026',
    blurb:'OpenAI\'s new "balanced workhorse" — same tool surface as Astra, priced at half of GPT-5.6 Sol, released the same day as Opus 5.5.',
    tiers:{coding:3, math:2, everyday:3, speed:2, afford:3},
    caveat:'Released 5 days before this page — several benchmarks are pending.',
  },
  {
    id:'opus55', name:'Claude Opus 5.5', developer:'Anthropic',
    release:'2026-09-22', releaseLabel:'Sep 22, 2026',
    modelId:'claude-opus-5-5',
    context:1000000, contextLabel:'1M tokens',
    maxOutput:128000, maxOutputLabel:'128K tokens (300K on Batch API, beta)',
    inputCost:4, outputCost:20,
    speed:91.5, speedLabel:'91.5 tok/s (xhigh effort)',
    intelligence:58,
    arcagiLabel:'pending** (test blocked at launch, unresolved)', arcagiValue:null,
    terminalbench:59.6, terminalbenchLabel:'59.6% (max effort)',
    modality:'Text + image → text',
    knowledgeCutoff:'June 2026',
    blurb:'Anthropic\'s new flagship — highest Artificial Analysis Intelligence Index score measured to date, and 20% cheaper than Opus 5 on every token rate.',
    tiers:{coding:3, math:3, everyday:2, speed:2, afford:2},
  },
  {
    id:'haiku45', name:'Claude Haiku 4.5', developer:'Anthropic',
    release:'2025-10-01', releaseLabel:'Oct 2025',
    modelId:'claude-haiku-4-5-20251001',
    context:200000, contextLabel:'200K tokens',
    maxOutput:64000, maxOutputLabel:'64K tokens',
    inputCost:1, outputCost:5,
    speed:97, speedLabel:'~97 tok/s, ~0.9s to first token',
    intelligence:24,
    arcagiLabel:'not published', arcagiValue:null,
    terminalbench:null, terminalbenchLabel:'not published (SWE-Bench Verified: 73.3%, a different benchmark)',
    modality:'Text + image → text',
    knowledgeCutoff:'—',
    blurb:'Anthropic\'s small, fast model — built for high-volume assistants and quick answers rather than hard reasoning.',
    tiers:{coding:2, math:1, everyday:3, speed:3, afford:3},
  },
  {
    id:'gemini38', name:'Gemini 3.8 Flash', developer:'Google DeepMind',
    release:'2026-09-01', releaseLabel:'Sep 2026',
    modelId:'gemini-3.8-flash†',
    context:1048576, contextLabel:'1,048,576 tokens',
    maxOutput:null, maxOutputLabel:'not confirmed in sources checked',
    inputCost:0.75, outputCost:3.75,
    speed:null, speedLabel:'not independently benchmarked here (Flash-tier models are typically fast)',
    intelligence:null, intelligenceLabel:'not on this Index — LLM Stats composite: 50.1/100‡',
    arcagiLabel:'10.4%', arcagiValue:10.4,
    terminalbench:null, terminalbenchLabel:'not published',
    modality:'Text + image → text',
    knowledgeCutoff:'—',
    blurb:'Google\'s cheapest, largest-context model here — a strong pick for long documents when the budget is the main constraint.',
    tiers:{coding:2, math:2, everyday:3, speed:3, afford:3},
    caveat:'Exact API model string varies by platform (Vertex AI vs AI Studio) — verify before building against it.',
  },
];

MODELS.forEach(m=>{ m.meta = DEV_META[m.developer]; });

const REASONS = {
  astra: {
    coding:"Ties for the coding lead here — 59.1% on Terminal-Bench 4.0 and OpenAI's own top score on DeepSWE v1.1 (74.1%).",
    math:"Extremely strong on hard math specifically — 98% on FrontierMath Tier 4 — though Opus 5.5 edges it on the broader Intelligence Index (58 vs 53).",
    everyday:"Capable, but this is the priciest and slowest model in the set — overkill for routine chat.",
    speed:"The slowest here at 61 tokens/sec, with responses at higher reasoning effort often taking well over a minute.",
    afford:"The most expensive model in this set — ₹956 / ₹4,780 per 1M input/output tokens.",
  },
  sol: {
    coding:"Purpose-built by OpenAI for \"complex coding and agentic workflows\" — the same tool surface as Astra at a fifth of the price.",
    math:"A solid all-rounder, but OpenAI positions it roughly level with its predecessor rather than a reasoning leap.",
    everyday:"OpenAI's own \"balanced workhorse\" — priced identically to Anthropic's Claude Sonnet 5.",
    speed:"No independent speed numbers yet — it's five days old — but it's positioned as an interactive, everyday model.",
    afford:"Genuinely cheap for a frontier-adjacent model — ₹191 / ₹956 per 1M tokens, half of GPT-5.6 Sol.",
  },
  opus55: {
    coding:"Ties GPT-6 Astra on Terminal-Bench 4.0 (59.6% vs 59.1%) and leads on 6 of 10 Artificial Analysis benchmarks.",
    math:"The highest Intelligence Index verified in this set — 58 — with real strength on Humanity's Last Exam and SciCode.",
    everyday:"A strong generalist, but at ₹382/₹1,912 per 1M tokens it's pricier than the budget tier for routine chat.",
    speed:"Genuinely fast for a reasoning model — up to 91.5 tokens/sec, noticeably quicker than GPT-6 Astra.",
    afford:"Anthropic's flagship, priced 20% below the previous Opus and roughly 40% below Astra on both rates.",
  },
  haiku45: {
    coding:"Solid, not frontier — 73.3% on SWE-Bench Verified, a different and easier benchmark than Terminal-Bench 4.0.",
    math:"Not built for hard reasoning — an Intelligence Index of 24, well below the frontier tier here.",
    everyday:"Anthropic's fastest, cheapest model — built exactly for high-volume everyday assistants and quick answers.",
    speed:"Very fast — around 97 tokens/sec with sub-second time-to-first-token, the snappiest feel in this set.",
    afford:"Cheap — ₹96 / ₹478 per 1M tokens, about a tenth of GPT-6 Astra's rate.",
  },
  gemini38: {
    coding:"Decent for everyday coding, but not benchmarked here against Terminal-Bench 4.0 — capable, not frontier.",
    math:"No verified frontier reasoning score in the sources checked — general-purpose rather than a specialist.",
    everyday:"The cheapest model here by far, with a huge 1M+ token context window — strong for long documents on a tight budget.",
    speed:"Google's Flash line is historically very fast, though this exact version wasn't independently speed-tested here.",
    afford:"The cheapest of the five — ₹72 / ₹359 per 1M input/output tokens.",
  },
};

let activeDevs = new Set();
let searchTerm = '';
let picked = [];
const recState = {role:null, focus:null, budget:null};

function fmtMoney(usd){ if(usd===null||usd===undefined) return '—'; const inr = Math.round(usd*RATE/10)*10; return '₹'+inr.toLocaleString('en-IN'); }
function fmtBoth(usd){ if(usd===null||usd===undefined) return '—'; return `${fmtMoney(usd)} <span style="color:var(--muted);font-size:10.5px">($${usd})</span>`; }

/* ---------- filters / facets ---------- */
const DEVS = [...new Set(MODELS.map(m=>m.developer))];
function devFacetsHTML(){
  document.getElementById('dev-facets').innerHTML = DEVS.map(d=>{
    const n = MODELS.filter(m=>m.developer===d).length;
    return `<div class="facet-row" data-dev="${d}" onclick="toggleDev('${d}')">
      <span class="box">${CHECK_SVG}</span><span class="swatch" style="background:${DEV_META[d].color}"></span>${d}<span class="count">${n}</span>
    </div>`;
  }).join('');
}
function toggleDev(d){ if(activeDevs.has(d)) activeDevs.delete(d); else activeDevs.add(d); render(); }
function resetFilters(){ activeDevs.clear(); searchTerm=''; document.getElementById('search').value=''; render(); }
function matches(m){
  if(activeDevs.size && !activeDevs.has(m.developer)) return false;
  if(searchTerm){
    const hay=(m.name+' '+m.developer+' '+m.blurb).toLowerCase();
    if(!hay.includes(searchTerm.toLowerCase())) return false;
  }
  return true;
}

/* ---------- picks / tray ---------- */
function togglePick(id){
  const i=picked.indexOf(id);
  if(i>-1) picked.splice(i,1);
  else { if(picked.length>=4) picked.shift(); picked.push(id); }
  render();
}
function clearPicks(){ picked=[]; render(); }
function scrollToCompare(){ document.getElementById('compare-panel').scrollIntoView({behavior:'smooth', block:'start'}); }

/* ---------- glance ---------- */
function renderGlance(){
  document.getElementById('g-total').textContent = MODELS.length;
  const cheapestOut = Math.min(...MODELS.map(m=>m.outputCost));
  document.getElementById('g-cheap').textContent = fmtMoney(cheapestOut);
  const maxCtx = Math.max(...MODELS.map(m=>m.context));
  document.getElementById('g-ctx').textContent = (maxCtx/1000).toFixed(0)+'K tok';
  const maxIntel = Math.max(...MODELS.filter(m=>m.intelligence).map(m=>m.intelligence));
  document.getElementById('g-intel').textContent = maxIntel;
}

/* ---------- cards ---------- */
function renderCards(list){
  const grid = document.getElementById('grid');
  if(!list.length){ grid.innerHTML = `<div style="grid-column:1/-1;padding:40px 0;color:var(--muted);border-top:1px solid var(--line);border-bottom:1px solid var(--line);">No models match those filters.</div>`; return; }
  grid.innerHTML = list.map(m=>{
    const isPicked = picked.includes(m.id);
    return `<div class="card ${isPicked?'picked':''}" style="--dev-color:${m.meta.color}; --dev-soft:${m.meta.soft}">
      <div class="card-head">
        <div><div class="card-name">${m.name}</div><div class="card-maker">${m.developer} · ${m.releaseLabel}</div></div>
        <div class="pick" onclick="togglePick('${m.id}')" title="Add to compare">${CHECK_SVG}</div>
      </div>
      <div class="card-body">
        <div class="tag-row"><span class="tag dev">${m.developer}</span></div>
        <div class="price-block">
          <span class="amt">${fmtMoney(m.outputCost)}</span>
          <span class="unit">per 1M output tok<br>($${m.outputCost}) · in: ${fmtMoney(m.inputCost)} ($${m.inputCost})</span>
        </div>
        <div class="spec"><span class="k">context</span><span class="v">${m.contextLabel}</span></div>
        <div class="spec"><span class="k">intelligence</span><span class="v">${m.intelligence ? m.intelligence : m.intelligenceLabel||'—'}</span></div>
        <div class="spec"><span class="k">modality</span><span class="v">${m.modality}</span></div>
        <div class="blurb"><b>${m.developer}: </b>${m.blurb}</div>
        ${m.caveat ? `<div class="caveat">⚠ ${m.caveat}</div>` : ''}
      </div>
    </div>`;
  }).join('');
}

/* ---------- bar charts ---------- */
function barRow(label, value, max, unit, colorVar, pending){
  const pct = pending ? 100 : Math.max(2, Math.min(100, (value/max)*100));
  const valLabel = pending ? 'n/a' : (unit==='%' ? value+'%' : value);
  return `<div class="bar-row">
    <div class="br-label"><span>${label}</span><span class="br-val">${valLabel}</span></div>
    <div class="bar-track"><div class="bar-fill ${pending?'pending':''}" style="width:${pct}%; background:${pending?'transparent':colorVar}"></div></div>
  </div>`;
}
function contextBarRow(label, contextTokens, maxCtx, colorVar){
  const pct = Math.max(2, Math.min(100, (contextTokens/maxCtx)*100));
  const valLabel = (contextTokens/1000).toFixed(0)+'K';
  return `<div class="bar-row">
    <div class="br-label"><span>${label}</span><span class="br-val">${valLabel}</span></div>
    <div class="bar-track"><div class="bar-fill" style="width:${pct}%; background:${colorVar}"></div></div>
  </div>`;
}
function dualBarRow(label, inVal, outVal, maxOut, devColor){
  const inPct = Math.max(2, (inVal/maxOut)*40);
  const outPct = Math.max(2, (outVal/maxOut)*100);
  return `<div class="bar-row">
    <div class="br-label"><span>${label}</span><span class="br-val">₹${Math.round(inVal*RATE)} / ₹${Math.round(outVal*RATE)}</span></div>
    <div class="bar-dual">
      <div class="seg" style="width:${inPct}%; background:${devColor}; opacity:0.5"></div>
      <div class="seg" style="width:${outPct-inPct>0?outPct-inPct:1}%; background:${devColor}"></div>
    </div>
  </div>`;
}

function renderCharts(){
  const wrap = document.getElementById('charts-wrap');
  const maxIntel = Math.max(...MODELS.filter(m=>m.intelligence).map(m=>m.intelligence));
  const maxTB = Math.max(...MODELS.filter(m=>m.terminalbench).map(m=>m.terminalbench));
  const maxSpeed = Math.max(...MODELS.filter(m=>m.speed).map(m=>m.speed));
  const maxCtx = Math.max(...MODELS.map(m=>m.context));
  const maxOutCost = Math.max(...MODELS.map(m=>m.outputCost));

  wrap.innerHTML = `
    <div class="chart-card">
      <div class="chart-title">Intelligence Index (max effort)</div>
      <div class="chart-note">Artificial Analysis composite score — reasoning, knowledge, maths, coding. Higher is better.</div>
      ${MODELS.map(m=>barRow(m.name, m.intelligence, maxIntel, 'n', m.meta.color, !m.intelligence)).join('')}
    </div>
    <div class="chart-card">
      <div class="chart-title">Terminal-Bench 4.0</div>
      <div class="chart-note">Complex terminal-based agent tasks — software, ops, security, data. Higher is better.</div>
      ${MODELS.map(m=>barRow(m.name, m.terminalbench, maxTB, '%', m.meta.color, !m.terminalbench)).join('')}
    </div>
    <div class="chart-card">
      <div class="chart-title">Peak output speed</div>
      <div class="chart-note">Tokens generated per second at the fastest published effort level.</div>
      ${MODELS.map(m=>barRow(m.name, m.speed, maxSpeed, 'n', m.meta.color, !m.speed)).join('')}
    </div>
    <div class="chart-card">
      <div class="chart-title">Context window</div>
      <div class="chart-note">Maximum tokens the model can hold in a single request.</div>
      ${MODELS.map(m=>contextBarRow(m.name, m.context, maxCtx, m.meta.color)).join('')}
    </div>
    <div class="chart-card" style="grid-column:1/-1;">
      <div class="chart-title">Price per 1M tokens (input, light · output, solid)</div>
      <div class="chart-note">All bars scaled to GPT-6 Astra's output rate, the highest in this set. ₹ shown, USD is the real billing currency.</div>
      ${MODELS.map(m=>dualBarRow(m.name, m.inputCost, m.outputCost, maxOutCost, m.meta.color)).join('')}
    </div>
  `;
}

/* ---------- table ---------- */
let sortKey='name', sortDir=1;
function renderTable(){
  const sorted = [...MODELS].sort((a,b)=>{
    const map = {name:'name', developer:'developer', release:'release', modelId:'modelId',
      context:'context', maxOutput:'maxOutput', inputCost:'inputCost', outputCost:'outputCost',
      speed:'speed', intelligence:'intelligence', arcagi:'arcagiValue', terminalbench:'terminalbench', modality:'modality'};
    const k = map[sortKey]||'name';
    let av=a[k], bv=b[k];
    if(typeof av==='number'||av===null){ av = av===null?-Infinity:av; bv = bv===null?-Infinity:bv; }
    else { av=(av||'').toString().toLowerCase(); bv=(bv||'').toString().toLowerCase(); }
    if(av<bv) return -1*sortDir; if(av>bv) return 1*sortDir; return 0;
  });
  document.getElementById('tbody').innerHTML = sorted.map(m=>{
    const hl = picked.includes(m.id)?'hl':'';
    return `<tr class="${hl}" style="--dev-color:${m.meta.color}; --dev-soft:${m.meta.soft}">
      <td class="name-cell">${m.name}<span class="maker">knowledge cutoff: ${m.knowledgeCutoff}</span></td>
      <td>${m.developer}</td>
      <td>${m.releaseLabel}</td>
      <td>${m.modelId}</td>
      <td>${m.contextLabel}</td>
      <td>${m.maxOutputLabel}</td>
      <td class="price-cell">${fmtBoth(m.inputCost)}</td>
      <td class="price-cell">${fmtBoth(m.outputCost)}</td>
      <td>${m.speedLabel}</td>
      <td>${m.intelligence ? m.intelligence : (m.intelligenceLabel||'—')}</td>
      <td>${m.arcagiLabel}</td>
      <td>${m.terminalbenchLabel}</td>
      <td>${m.modality}</td>
    </tr>`;
  }).join('');
  document.querySelectorAll('thead th').forEach(th=>{
    const arrow = th.querySelector('.arrow');
    if(arrow) arrow.textContent = th.dataset.key===sortKey ? (sortDir===1?'↑':'↓') : '';
  });
}
document.querySelectorAll('thead th[data-key]').forEach(th=>{
  th.addEventListener('click', ()=>{
    const key=th.dataset.key;
    if(sortKey===key) sortDir*=-1; else { sortKey=key; sortDir=1; }
    renderTable();
  });
});

/* ---------- compare panel + radar ---------- */
const RADAR_AXES = [
  {key:'coding', label:'Coding'},
  {key:'math', label:'Math / Reasoning'},
  {key:'speed', label:'Speed'},
  {key:'afford', label:'Affordability'},
  {key:'everyday', label:'Everyday fit'},
];
function polarPoint(cx,cy,r,angle){ return [cx+r*Math.cos(angle), cy+r*Math.sin(angle)]; }
function renderRadar(tools){
  const svg = document.getElementById('radar-svg');
  const cx=130, cy=130, maxR=95, n=RADAR_AXES.length;
  let axisLines='', axisLabels='';
  for(let i=0;i<n;i++){
    const angle = -Math.PI/2 + i*(2*Math.PI/n);
    const [x,y] = polarPoint(cx,cy,maxR,angle);
    axisLines += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#C7D1D6" stroke-width="1"/>`;
    const [lx,ly] = polarPoint(cx,cy,maxR+18,angle);
    axisLabels += `<text x="${lx}" y="${ly}" font-size="9" fill="#5C6A73" text-anchor="middle" font-family="IBM Plex Mono, monospace">${RADAR_AXES[i].label}</text>`;
  }
  let rings='';
  [0.33,0.66,1].forEach(f=>{
    let pts='';
    for(let i=0;i<n;i++){ const angle=-Math.PI/2+i*(2*Math.PI/n); const [x,y]=polarPoint(cx,cy,maxR*f,angle); pts+=`${x},${y} `; }
    rings += `<polygon points="${pts}" fill="none" stroke="#DAE1E4" stroke-width="1"/>`;
  });
  let polys='';
  tools.forEach(m=>{
    let pts='';
    RADAR_AXES.forEach((ax,i)=>{
      const angle=-Math.PI/2+i*(2*Math.PI/n);
      const val = m.tiers[ax.key]/3;
      const [x,y]=polarPoint(cx,cy,maxR*val,angle);
      pts+=`${x},${y} `;
    });
    polys += `<polygon points="${pts}" fill="${m.meta.color}" fill-opacity="0.16" stroke="${m.meta.color}" stroke-width="2"/>`;
  });
  svg.innerHTML = rings+axisLines+polys+axisLabels;

  document.getElementById('radar-legend').innerHTML = tools.map(m=>`<div class="rl-item"><span class="rl-dot" style="background:${m.meta.color}"></span>${m.name}</div>`).join('')
    + `<div style="font-size:10px;color:var(--muted);margin-top:6px;">Axes are rough 1–3 tiers derived from the benchmark and price figures in the table — a quick visual, not a precise score.</div>`;
}

const COMPARE_ROWS = [
  {label:'Developer', get:m=>m.developer},
  {label:'Release date', get:m=>m.releaseLabel},
  {label:'API model ID', get:m=>m.modelId},
  {label:'Context window', get:m=>m.contextLabel},
  {label:'Max output', get:m=>m.maxOutputLabel},
  {label:'Input / 1M', get:m=>fmtBoth(m.inputCost), price:true},
  {label:'Output / 1M', get:m=>fmtBoth(m.outputCost), price:true},
  {label:'Peak output speed', get:m=>m.speedLabel},
  {label:'Intelligence Index', get:m=>m.intelligence||m.intelligenceLabel||'—'},
  {label:'ARC-AGI-3', get:m=>m.arcagiLabel},
  {label:'Terminal-Bench 4.0', get:m=>m.terminalbenchLabel},
  {label:'Modality', get:m=>m.modality},
];
function renderCompare(){
  const panel = document.getElementById('compare-panel');
  if(!picked.length){ panel.classList.remove('show'); return; }
  panel.classList.add('show');
  const tools = picked.map(id=>MODELS.find(m=>m.id===id));
  document.getElementById('compare-sub').textContent = tools.length===1
    ? 'Pick a second model on any card above to see them side by side.'
    : `Comparing ${tools.length} models — pick up to 4 at a time.`;
  renderRadar(tools);

  const grid = document.getElementById('compare-grid');
  grid.style.gridTemplateColumns = `150px repeat(${tools.length}, minmax(190px,1fr))`;
  let html = '<div class="crow"><div class="ccell headcell"></div>';
  tools.forEach(m=>{
    html += `<div class="ccell headcell" style="--dev-color:${m.meta.color}">
      <span class="cname">${m.name}</span><span class="cmaker">${m.developer}</span>
      <button class="remove" onclick="togglePick('${m.id}')">remove</button>
    </div>`;
  });
  html += '</div>';
  COMPARE_ROWS.forEach(row=>{
    html += `<div class="crow"><div class="ccell label">${row.label}</div>`;
    tools.forEach(m=>{ html += `<div class="ccell ${row.price?'price-cell':''}">${row.get(m)}</div>`; });
    html += '</div>';
  });
  grid.innerHTML = html;
}

function renderTray(){
  const tray=document.getElementById('tray');
  if(!picked.length){ tray.classList.remove('show'); return; }
  tray.classList.add('show');
  document.getElementById('tray-chips').innerHTML = picked.map(id=>{
    const m=MODELS.find(x=>x.id===id);
    return `<span class="chip">${m.name}<button onclick="togglePick('${id}')">×</button></span>`;
  }).join('');
}

/* ---------- recommender ---------- */
document.querySelectorAll('.rec-group').forEach(group=>{
  const key = group.dataset.key;
  group.querySelectorAll('.rec-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      group.querySelectorAll('.rec-btn').forEach(b=>b.classList.remove('sel'));
      btn.classList.add('sel');
      recState[key] = btn.dataset.value;
      document.getElementById('rec-submit').disabled = !(recState.role && recState.focus && recState.budget);
    });
  });
});

const FOCUS_WEIGHTS = {
  coding:   {coding:3, math:1, everyday:1, speed:1, afford:1},
  math:     {coding:1, math:3, everyday:1, speed:0.5, afford:1},
  writing:  {coding:1, math:1.5, everyday:2.5, speed:1, afford:1.5},
  everyday: {coding:0.5, math:0.5, everyday:3, speed:2, afford:2},
};
const BUDGET_MULT = {tight:3, moderate:1.5, flexible:1, none:0.4};

function runRecommender(){
  const w = {...FOCUS_WEIGHTS[recState.focus]};
  w.afford = w.afford * BUDGET_MULT[recState.budget];
  if(recState.role==='student') w.afford += 1;
  if(recState.role==='developer') w.coding += 0.5;
  if(recState.role==='founder'){ w.afford += 0.5; w.speed += 0.5; }
  if(recState.role==='researcher') w.math += 1;

  const scored = MODELS.map(m=>{
    const contrib = {};
    let total = 0;
    Object.keys(w).forEach(dim=>{
      const c = (m.tiers[dim]||0) * w[dim];
      contrib[dim] = c;
      total += c;
    });
    return {model:m, total, contrib};
  }).sort((a,b)=>b.total-a.total);

  const top2 = scored.slice(0,2);
  const roleLabel = {student:'a student', developer:'a developer', founder:'a founder or small team', researcher:'a researcher'}[recState.role];
  const focusLabel = {coding:'coding & software work', math:'maths & deep research', writing:'writing & everyday knowledge work', everyday:'quick everyday tasks'}[recState.focus];
  const budgetLabel = {tight:'a very tight budget', moderate:'a moderate, cost-conscious budget', flexible:'a flexible budget', none:'no real budget constraint'}[recState.budget];

  const resultEl = document.getElementById('rec-result');
  resultEl.classList.add('show');
  resultEl.innerHTML = `
    <div class="rec-summary">As ${roleLabel} focused on <b style="color:var(--ink)">${focusLabel}</b> with ${budgetLabel}, here's how the five stack up for you:</div>
    <div class="rec-cards">
      ${top2.map((s,i)=>{
        const m = s.model;
        const dims = Object.keys(s.contrib).sort((a,b)=>s.contrib[b]-s.contrib[a]).slice(0,2);
        return `<div class="rec-card" style="--dev-color:${m.meta.color}">
          <div class="rc-badge">${i===0?'★ BEST MATCH':'RUNNER-UP'}</div>
          <div class="rc-name">${m.name}</div>
          <div class="rc-dev">${m.developer} · ${fmtMoney(m.outputCost)} ($${m.outputCost}) per 1M output tokens</div>
          <ul>${dims.map(d=>`<li>${REASONS[m.id][d]}</li>`).join('')}</ul>
        </div>`;
      }).join('')}
    </div>
    <p style="font-size:11px;color:var(--muted);margin-top:16px;">Scores are our own weighting of the real benchmark and pricing figures below, adjusted for what you told us — not a vendor ranking. <a href="#" onclick="document.querySelector('.table-wrap').scrollIntoView({behavior:'smooth'});return false;">See the full spec sheet ↓</a></p>
  `;
}

/* ---------- master render ---------- */
function render(){
  document.querySelectorAll('.facet-row[data-dev]').forEach(row=>{
    row.classList.toggle('active', activeDevs.has(row.dataset.dev));
  });
  const list = MODELS.filter(matches);
  renderCards(list);
  renderTray();
  renderCompare();
  renderTable();
}
document.getElementById('search').addEventListener('input', e=>{ searchTerm=e.target.value; render(); });

devFacetsHTML();
renderGlance();
renderCharts();
renderTable();
render();
