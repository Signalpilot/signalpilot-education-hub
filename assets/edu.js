
// edu.js — site-wide behaviors for Education Hub
(function(){
  // 1) Theme toggle with handoff from main site via ?t= param
  const KEY='sp_theme';
  const q=new URLSearchParams(location.search);
  const qTheme=(q.get('t')==='light'||q.get('t')==='dark')?q.get('t'):null;
  const system = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light':'dark';
  setTheme(qTheme || localStorage.getItem(KEY) || system);
  function setTheme(t){ document.documentElement.setAttribute('data-theme',t); localStorage.setItem(KEY,t); }
  document.getElementById('themeToggle')?.addEventListener('click',()=>{
    const cur=document.documentElement.getAttribute('data-theme')==='light'?'light':'dark';
    setTheme(cur==='light'?'dark':'light');
  });

  // 2) Mobile menu
  const menuBtn=document.getElementById('menuToggle');
  const nav=document.getElementById('mainnav');
  let backdrop=document.querySelector('.nav-backdrop');
  if(!backdrop){ backdrop=document.createElement('div'); backdrop.className='nav-backdrop'; document.body.appendChild(backdrop); }
  function lock(lock){ document.documentElement.style.overflow = lock ? 'hidden' : ''; document.body.style.touchAction = lock ? 'none' : ''; }
  function open(){ nav?.classList.add('open'); backdrop.classList.add('show'); menuBtn?.setAttribute('aria-expanded','true'); lock(true); }
  function close(){ nav?.classList.remove('open'); backdrop.classList.remove('show'); menuBtn?.setAttribute('aria-expanded','false'); lock(false); }
  menuBtn?.addEventListener('click',()=>{ (nav.classList.contains('open')?close:open)(); });
  backdrop?.addEventListener('click', close);
  document.querySelectorAll('#mainnav a').forEach(a=>a.addEventListener('click', close));

  // 3) Build ToC from h2/h3
  const toc = document.querySelector('aside.toc');
  if(toc){
    const hs = document.querySelectorAll('.prose h2, .prose h3');
    if(hs.length){
      const box = document.createElement('div');
      const title = document.createElement('h3'); title.textContent = 'On this page'; box.appendChild(title);
      hs.forEach(h => {
        if(!h.id){
          const id = h.textContent.trim().toLowerCase().replace(/[^\w\s-]/g,'').replace(/\s+/g,'-');
          h.id = id;
        }
        const a=document.createElement('a'); a.href='#'+h.id; a.textContent = h.textContent;
        if(h.tagName==='H3') a.style.marginLeft='.5rem';
        box.appendChild(a);
      });
      toc.appendChild(box);
    }
  }

  // 4) Footer year
  (function(){ var y=document.getElementById('year'); if(y) y.textContent = new Date().getFullYear(); })();

  // 5) One-and-done brand background
  (function(w,d){ if(w.__spbg_loaded) return; w.__spbg_loaded=true;
    var s=d.createElement('script'); s.src='/assets/sp-bg.js'; s.defer=true; d.head.appendChild(s);
  })(window,document);
})();
