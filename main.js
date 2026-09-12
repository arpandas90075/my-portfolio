(function(){
  "use strict";
  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;

  document.getElementById('themeBtn').addEventListener('click', function(){
    var set = root.getAttribute('data-theme');
    var now = set || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    root.setAttribute('data-theme', now === 'dark' ? 'light' : 'dark');
  });

  /* ── language colours ── */
  var LANG = {"JavaScript":"#F2B705","HTML":"#E06A3B","CSS":"#8E6CD0","Python":"#4B8BBE","C":"#8C8FA0","TypeScript":"#3178C6"};
  var ORDER = ["JavaScript","HTML","CSS","Python","C","TypeScript"];

  /* ── every repository, with real byte counts from the GitHub languages API.
        Private repos report only their primary language.                      ── */
  var REPOS = [
    {n:"OMNICONVERT",   v:"public", d:"Universal client-side file converter and smart image reducer — hits an exact target size.", L:{JavaScript:71976,HTML:20070,CSS:16509}},
    {n:"Digiflo",       v:"public", d:"Notes platform for students: semesters, PYQs, moderation queue, role-based access.", L:{JavaScript:37369,CSS:10945,HTML:310}},
    {n:"Naturecraftsnc",v:"public", d:"Handmade-soap storefront with a Google Sheet as the entire backend.", L:{TypeScript:89912,CSS:3232,HTML:1347,JavaScript:1109}},
    {n:"Bank-management-system",v:"public", d:"Accounts, transfers, overdrafts and interest — browser UI plus the original C build.", L:{C:36971,JavaScript:22689,CSS:6398,HTML:5376}},
    {n:"Chess",         v:"public", d:"A playable chess game written from scratch.", L:{JavaScript:97954,CSS:33319,HTML:16191}},
    {n:"Cinescope",     v:"public", d:"Films and series with IMDb, Rotten Tomatoes and Metacritic scores, cast and where to watch.", L:{JavaScript:85913,CSS:19417,HTML:6733}},
    {n:"My-Wallet",     v:"public", d:"Expense tracker with category charts, monthly budgets and 66 unit tests.", L:{JavaScript:35141,CSS:10224,HTML:4629}},
    {n:"EMI-Calculator",v:"public", d:"Reducing-balance EMI maths with canvas charts and a full amortisation schedule.", L:{JavaScript:20556,CSS:6459,HTML:4734}},
    {n:"QR-Code-Maker", v:"public", d:"QR generator with gradients, dot patterns, logo embedding and SVG/PNG export.", L:{JavaScript:25885,CSS:21003,HTML:19040}},
    {n:"Resume-Builder-site",v:"public", d:"Resume builder with 6 templates, custom colours and fonts, PDF download, no signup.", L:{HTML:44959}},
    {n:"GST-Calculator",v:"public", d:"Live GST calculator running on an API.", L:{HTML:36228,JavaScript:35486}},
    {n:"PDF-Merger",    v:"public", d:"Merge multiple PDFs in the browser, with no server-side processing at any point.", L:{CSS:3128,JavaScript:2922,HTML:962}},
    {n:"Online-Exam-Page",v:"public", d:"Exam system with randomised MCQs, a countdown timer and automatic scoring.", L:{JavaScript:4673,CSS:1787,HTML:1549}},
    {n:"STUDENT-GRADE-CALCULATOR",v:"public", d:"Subjects and scores in, instant letter grade, average and pass/fail out.", L:{Python:11875,HTML:4635}},
    {n:"Currency-Converter",v:"public", d:"Converts between currencies using a live exchange-rate API.", L:{Python:13393}},
    {n:"To-do-list-",   v:"public", d:"Minimal dark desktop to-do list that auto-saves to JSON.", L:{Python:8259}},
    {n:"Number-Guessing-Game",v:"public", d:"Tkinter guessing game with higher/lower feedback, hot-cold hints and 7 attempts.", L:{Python:4668}},
    {n:"Calculator",    v:"public", d:"Dark desktop calculator with full keyboard support and zero dependencies.", L:{Python:4273}},
    {n:"Stopwatch",     v:"public", d:"A desktop stopwatch.", L:{Python:3738}},
    {n:"Tic-Tac-Toe",   v:"public", d:"Tic-Tac-Toe in pure C — two players, or against the computer.", L:{C:9447}},
    {n:"Calculator-Using-C",v:"public", d:"A calculator written entirely in C.", L:{C:0}},
    {n:"Digital-Clock", v:"public", d:"A clean digital clock.", L:{HTML:5797}},
    {n:"Contact-book",  v:"public", d:"A straightforward contact manager.", L:{HTML:1129}},
    {n:"my-portfolio",  v:"public", d:"This site, and the hand-built portfolio it grew out of.", L:{HTML:35550,CSS:27198,JavaScript:9811}},
    {n:"TextCraft",     v:"private",d:"Glassmorphic text and readability analysis tool in vanilla JS.", L:{JavaScript:0}},
    {n:"CronicleLive",  v:"private",d:"News channel interface with live headlines from an API.", L:{JavaScript:0}},
    {n:"2048-Game",     v:"private",d:"The sliding-tile game, rebuilt.", L:{JavaScript:0}},
    {n:"WorldWalker",   v:"private",d:"An exploration project, in progress.", L:{JavaScript:0}},
    {n:"GameSite-UI",   v:"private",d:"An immersive gaming site interface.", L:{HTML:0}},
    {n:"Modern-Login-Signup-Page",v:"private",d:"A modern authentication UI.", L:{HTML:0}},
    {n:"Typeflow",      v:"private",d:"A typing project, in progress.", L:{HTML:0}}
  ];

  REPOS.forEach(function(r, i){
    r.i = i;
    r.langs = Object.keys(r.L).sort(function(a,b){ return r.L[b]-r.L[a]; });
    r.bytes = r.langs.reduce(function(s,k){ return s + r.L[k]; }, 0);
  });

  function kb(b){ return b >= 1024 ? Math.round(b/1024) + ' KB' : (b ? '<1 KB' : '—'); }

  /* ── totals, all real ── */
  var totalBytes = 0, byLang = {}, repoCount = {};
  REPOS.forEach(function(r){
    totalBytes += r.bytes;
    r.langs.forEach(function(k){
      byLang[k] = (byLang[k] || 0) + r.L[k];
      repoCount[k] = (repoCount[k] || 0) + 1;
    });
  });
  var totalKb = Math.round(totalBytes/1024);
  document.getElementById('nowKb').textContent = totalKb;
  var railKb = document.querySelector('[data-count="964"]');
  if (railKb) railKb.setAttribute('data-count', String(totalKb));
  document.getElementById('langNote').textContent =
    totalKb.toLocaleString() + ' KB measured, ' + Object.keys(byLang).length + ' languages. Private repos report a primary language only.';

  /* ── stack cards, counts from the same data ── */
  var BLURB = {
    "JavaScript":"The workhorse. DOM, canvas, async — chess move generation, a 2048 board, live API feeds, file conversion in the browser.",
    "HTML":"Semantic structure and layout that survives a phone. Every tool starts as one file you can just open.",
    "CSS":"Layout, animation and dark mode. Glassmorphic where it helps, plain where it doesn't.",
    "Python":"Tkinter desktops with no dependencies, and now the data side of the SIH build: forecast fields, indices, model glue.",
    "C":"Where the fundamentals live. Memory, pointers, and the original terminal builds of the bank system and Tic-Tac-Toe.",
    "TypeScript":"React and Vite on NatureCrafts, where types earn their keep across a cart, a checkout and e-billing."
  };
  var sg = document.getElementById('skillGrid');
  ORDER.forEach(function(l){
    var d = document.createElement('div');
    d.className = 'skill';
    d.innerHTML = '<span class="dot" style="background:' + LANG[l] + '"></span>' +
      '<h4>' + l + ' <small>' + repoCount[l] + ' repos</small></h4>' +
      '<p>' + BLURB[l] + '</p>';
    sg.appendChild(d);
  });
  var nodeJs = document.createElement('div');
  nodeJs.className = 'skill';
  nodeJs.innerHTML = '<span class="dot" style="background:#68A063"></span>' +
    '<h4>Node.js <small>client work</small></h4>' +
    '<p>Where the bots live. Baileys sockets, reconnect logic, queues, and LLM calls that have to answer inside a chat window.</p>';
  sg.appendChild(nodeJs);

  /* ── bytes-by-language bar ── */
  var bar = document.getElementById('langBar'), key = document.getElementById('langKey');
  var sortedLangs = Object.keys(byLang).sort(function(a,b){ return byLang[b]-byLang[a]; });
  sortedLangs.forEach(function(l){
    var pct = byLang[l]/totalBytes*100;
    var s = document.createElement('span');
    s.style.background = LANG[l];
    s.setAttribute('data-w', pct.toFixed(2));
    if (pct >= 9) s.setAttribute('data-n', Math.round(pct) + '%');
    s.title = l + ' — ' + Math.round(byLang[l]/1024) + ' KB across ' + repoCount[l] + ' repos';
    bar.appendChild(s);
    var k = document.createElement('span');
    k.innerHTML = '<i style="background:' + LANG[l] + '"></i>' + l +
      ' <b>' + Math.round(byLang[l]/1024) + ' KB</b>';
    key.appendChild(k);
  });
  function fillBar(){ bar.querySelectorAll('span').forEach(function(s){ s.style.width = s.getAttribute('data-w') + '%'; }); }

  /* ── filters ── */
  var state = {lang:'All', vis:'All', q:'', sort:'curated'};
  function mkBtn(host, label, kind, count, colour){
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'fbtn';
    b.innerHTML = (colour ? '<span class="sw" style="background:' + colour + '"></span>' : '') +
      '<span class="t">' + label + '</span>' +
      (count != null ? '<span class="c">' + count + '</span>' : '');
    b.setAttribute('aria-pressed', String(state[kind] === label));
    b.addEventListener('click', function(){
      state[kind] = label;
      host.querySelectorAll('.fbtn').forEach(function(x){
        x.setAttribute('aria-pressed', String(x.querySelector('.t').textContent === label));
      });
      render();
    });
    host.appendChild(b);
  }
  var lf = document.getElementById('langFilters'), vf = document.getElementById('visFilters');
  mkBtn(lf, 'All', 'lang', REPOS.length, null);
  ORDER.forEach(function(l){ mkBtn(lf, l, 'lang', repoCount[l], LANG[l]); });
  var pubN = REPOS.filter(function(r){ return r.v === 'public'; }).length;
  mkBtn(vf, 'All', 'vis', null, null);
  mkBtn(vf, 'Public', 'vis', pubN, null);
  mkBtn(vf, 'Private', 'vis', REPOS.length - pubN, null);

  document.getElementById('q').addEventListener('input', function(e){ state.q = e.target.value.trim().toLowerCase(); render(); });
  document.getElementById('sort').addEventListener('change', function(e){ state.sort = e.target.value; render(); });

  /* ── rows ── */
  var rows = document.getElementById('rows'), line = document.getElementById('countLine'), tail = document.getElementById('idxTail');
  function render(){
    var list = REPOS.filter(function(r){
      if (state.lang !== 'All' && r.langs.indexOf(state.lang) === -1) return false;
      if (state.vis !== 'All' && r.v !== state.vis.toLowerCase()) return false;
      if (state.q && (r.n + ' ' + r.d + ' ' + r.langs.join(' ')).toLowerCase().indexOf(state.q) === -1) return false;
      return true;
    });
    if (state.sort === 'size') list.sort(function(a,b){ return b.bytes - a.bytes; });
    else if (state.sort === 'name') list.sort(function(a,b){ return a.n.toLowerCase() < b.n.toLowerCase() ? -1 : 1; });
    else if (state.sort === 'langs') list.sort(function(a,b){ return b.langs.length - a.langs.length || b.bytes - a.bytes; });
    else list.sort(function(a,b){ return a.i - b.i; });

    rows.textContent = '';
    if (!list.length){
      rows.innerHTML = '<p class="empty">No repository matches that. Try clearing the search or the filter.</p>';
      line.textContent = ''; tail.textContent = '0 of ' + REPOS.length;
      return;
    }
    list.forEach(function(r, i){
      var pub = r.v === 'public';
      var el = document.createElement(pub ? 'a' : 'div');
      el.className = 'irow';
      if (pub){ el.href = 'https://github.com/arpandas90075/' + r.n; el.target = '_blank'; el.rel = 'noopener'; }

      var chips = r.langs.map(function(l){
        var hit = (state.lang === l) ? ' class="hit"' : '';
        return '<em' + hit + '><i style="background:' + LANG[l] + '"></i>' + l + '</em>';
      }).join('');

      var segs = r.bytes
        ? r.langs.map(function(l){
            return '<i style="width:' + (r.L[l]/r.bytes*100).toFixed(2) + '%;background:' + LANG[l] + '" title="' + l + ' ' + Math.round(r.L[l]/1024) + ' KB"></i>';
          }).join('')
        : '<i style="width:100%;background:var(--line)"></i>';

      el.innerHTML =
        '<span class="n">' + String(i+1).padStart(2,'0') + '</span>' +
        '<span class="nmwrap"><span class="nm"></span><span class="langchips">' + chips + '</span></span>' +
        '<span class="ds"></span>' +
        '<span class="comp"><span class="cbar">' + segs + '</span><span class="csz">' + (r.bytes ? kb(r.bytes) : 'size private') + '</span></span>' +
        '<span class="vis ' + (pub ? 'pub' : 'prv') + '">' + (pub ? 'Public' : 'Private') + '</span>';
      el.querySelector('.nm').textContent = r.n;
      el.querySelector('.ds').textContent = r.d;
      rows.appendChild(el);
    });

    var shownBytes = list.reduce(function(s,r){ return s + r.bytes; }, 0);
    tail.textContent = list.length + ' of ' + REPOS.length + ' repos';
    line.textContent = 'Showing ' + list.length + ' repositories' +
      (state.lang !== 'All' ? ' containing ' + state.lang : '') +
      ' · ' + Math.round(shownBytes/1024).toLocaleString() + ' KB of code' +
      '. Private repos aren’t linkable, but I’m happy to walk you through them.';
  }
  render();

  /* ── hero dot field ── */
  var cv = document.getElementById('dots'), ctx = cv.getContext('2d'), pts = [], raf = 0;
  function accent(){ return getComputedStyle(root).getPropertyValue('--amber').trim() || '#F2B705'; }
  function build(){
    var rect = cv.parentElement.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = rect.width*dpr; cv.height = rect.height*dpr;
    cv.style.width = rect.width + 'px'; cv.style.height = rect.height + 'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
    pts = [];
    var gap = 50, cols = Math.ceil(rect.width/gap), rws = Math.ceil(rect.height/gap);
    for (var i=0;i<=cols;i++) for (var j=0;j<=rws;j++) pts.push({x:i*gap, y:j*gap, p:(i+j)*0.5});
  }
  function draw(t){
    var c = accent();
    ctx.clearRect(0,0,cv.width,cv.height);
    ctx.fillStyle = c;
    for (var i=0;i<pts.length;i++){
      var p = pts[i], w = Math.sin(t/1800 + p.p)*0.5 + 0.5;
      ctx.globalAlpha = 0.09 + 0.2*w;
      ctx.beginPath(); ctx.arc(p.x, p.y, 1 + 0.7*w, 0, 6.284); ctx.fill();
    }
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(draw);
  }
  build();
  if (RM) draw(0); else raf = requestAnimationFrame(draw);
  var rz; window.addEventListener('resize', function(){
    clearTimeout(rz); rz = setTimeout(function(){ build(); if (RM) draw(0); }, 180);
  });

  /* ── date + SIH countdown ── */
  var DEADLINE = new Date('2026-09-30T23:59:59+05:30').getTime();
  try{
    document.getElementById('nowDate').textContent = new Intl.DateTimeFormat('en-GB',
      {timeZone:'Asia/Kolkata', day:'2-digit', month:'short', year:'numeric'}).format(new Date()).toUpperCase();
  }catch(e){}
  var cd = document.getElementById('cd'), nowCd = document.getElementById('nowCd');
  function countdown(){
    var ms = DEADLINE - Date.now();
    if (ms <= 0){
      cd.innerHTML = '<div style="min-width:auto"><b style="font-size:.8rem">SUBMITTED</b><span>Idea stage closed</span></div>';
      nowCd.textContent = 'idea stage closed';
      return;
    }
    var d = Math.floor(ms/864e5), h = Math.floor(ms/36e5)%24, m = Math.floor(ms/6e4)%60, s = Math.floor(ms/1e3)%60;
    nowCd.textContent = d + ' days to submit';
    cd.innerHTML = [[d,'days'],[h,'hrs'],[m,'min'],[s,'sec']].map(function(p){
      return '<div><b>' + String(p[0]).padStart(2,'0') + '</b><span>' + p[1] + '</span></div>';
    }).join('');
  }
  countdown(); setInterval(countdown, 1000);

  /* ── scroll progress + nav ── */
  var prog = document.getElementById('prog');
  function onScroll(){
    var h = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.width = (h > 0 ? (window.scrollY/h)*100 : 0) + '%';
  }
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.topnav a'));
  if ('IntersectionObserver' in window){
    var navObs = new IntersectionObserver(function(es){
      es.forEach(function(e){
        if (!e.isIntersecting) return;
        navLinks.forEach(function(a){ a.classList.toggle('active', a.getAttribute('data-s') === e.target.id); });
      });
    }, {rootMargin:'-45% 0px -50% 0px'});
    ['lab','about','stack','work','index','contact'].forEach(function(id){
      var el = document.getElementById(id); if (el) navObs.observe(el);
    });
  }

  /* ── counters + reveal ── */
  function countUp(el){
    var target = parseInt(el.getAttribute('data-count'), 10);
    var sfx = el.getAttribute('data-suffix') || '';
    if (RM){ el.textContent = target.toLocaleString() + sfx; return; }
    var t0 = null, dur = 1000;
    function step(t){
      if (!t0) t0 = t;
      var k = Math.min((t-t0)/dur, 1); k = 1 - Math.pow(1-k, 3);
      el.textContent = Math.round(target*k).toLocaleString() + (k === 1 ? sfx : '');
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var reveals = document.querySelectorAll('.reveal');
  function activate(el){
    el.classList.add('in');
    el.querySelectorAll('[data-count]').forEach(countUp);
    el.querySelectorAll('.meter-bar i').forEach(function(i){ i.style.width = i.getAttribute('data-fill') + '%'; });
    if (el.classList.contains('langwrap')) fillBar();
  }
  if ('IntersectionObserver' in window){
    var obs = new IntersectionObserver(function(es){
      es.forEach(function(e){ if (e.isIntersecting){ activate(e.target); obs.unobserve(e.target); } });
    }, {rootMargin:'0px 0px -8% 0px', threshold:.06});
    reveals.forEach(function(el){ obs.observe(el); });
  } else { reveals.forEach(activate); }
  setTimeout(function(){ reveals.forEach(function(el){ if (!el.classList.contains('in')) activate(el); }); }, 2600);
})();
