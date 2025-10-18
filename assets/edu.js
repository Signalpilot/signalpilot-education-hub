// FILE: /assets/edu.js
(function(){
  const THEME_KEY='sp_theme';
  const btn=document.getElementById('themeToggle');
  const nav=document.getElementById('mainnav');
  const menu=document.getElementById('menuToggle');

  // Respect ?t=light|dark from main site, else saved or system
  const q=new URLSearchParams(location.search);
  const qTheme=(q.get('t')||'').toLowerCase();
  const system = matchMedia('(prefers-color-scheme: light)').matches ? 'light':'dark';
  const initial = (qTheme==='light'||qTheme==='dark') ? qTheme : (localStorage.getItem(THEME_KEY)||system);
  setTheme(initial);

  btn?.addEventListener('click',()=> setTheme(document.documentElement.getAttribute('data-theme')==='light'?'dark':'light'));
  menu?.addEventListener('click',()=>{
    const open = !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    document.documentElement.style.overflow = open ? 'hidden' : '';
  });
  document.addEventListener('click',e=>{
    if(!nav.contains(e.target) && e.target!==menu){ nav.classList.remove('open'); document.documentElement.style.overflow=''; }
  });

  function setTheme(t){
    document.documentElement.setAttribute('data-theme',t);
    localStorage.setItem(THEME_KEY,t);
    let m=document.querySelector('meta[name="theme-color"]');
    if(!m){ m=document.createElement('meta'); m.setAttribute('name','theme-color'); document.head.appendChild(m); }
    m.setAttribute('content', t==='light' ? '#f6f8fc' : '#05070d');
  }

  // Footer year
  const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();

  // Build ToC on article pages
  const toc=document.querySelector('.toc'); 
  if(toc){
    const root = document.querySelector('.prose');
    const hs = root ? root.querySelectorAll('h2, h3') : [];
    const ul=document.createElement('div');
    ul.setAttribute('role','navigation');
    hs.forEach(h=>{
      const id=h.id || h.textContent.toLowerCase().replace(/[^\w]+/g,'-').replace(/(^-|-$)/g,'');
      h.id=id;
      const a=document.createElement('a');
      a.href = '#' + id;
      a.textContent = (h.tagName==='H3' ? '↳ ' : '') + h.textContent;
      ul.appendChild(a);
    });
    const title=document.createElement('h4'); title.textContent='On this page';
    toc.appendChild(title); toc.appendChild(ul);
  }

  // Smooth-ish anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const id=a.getAttribute('href').slice(1); if(!id) return;
      const el=document.getElementById(id); if(!el) return;
      e.preventDefault();
      const y=el.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({top:y,behavior:'smooth'});
      history.replaceState(null,'','#'+id);
    });
  });
})();
