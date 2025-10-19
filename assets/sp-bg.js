// sp-bg.js — universal background injector (stars + constellations + aurora)
(function(){
  if (window.__spbg_init) return; window.__spbg_init = true;
  const d=document, w=window;
  const prefersReduce = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // CSS
  const CSS_ID='sp-bg-css';
  if(!d.getElementById(CSS_ID)){
    const s=d.createElement('style'); s.id=CSS_ID; s.textContent = `
    .bg-stars{position:fixed;inset:0;z-index:-3;pointer-events:none;opacity:.70;
      background: radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,.9), transparent 60%),
                 radial-gradient(1px 1px at 30% 80%, rgba(255,255,255,.7), transparent 60%),
                 radial-gradient(1px 1px at 70% 30%, rgba(255,255,255,.8), transparent 60%),
                 radial-gradient(1px 1px at 85% 60%, rgba(255,255,255,.8), transparent 60%),
                 radial-gradient(1px 1px at 55% 10%, rgba(255,255,255,.7), transparent 60%),
                 radial-gradient(1px 1px at 15% 55%, rgba(255,255,255,.7), transparent 60%),
                 radial-gradient(1px 1px at 44% 74%, rgba(255,255,255,.7), transparent 60%),
                 radial-gradient(1px 1px at 78% 88%, rgba(255,255,255,.7), transparent 60%);
      filter:drop-shadow(0 0 2px rgba(255,255,255,.25))}
    .sp-constellations{position:fixed;inset:0;z-index:-2;pointer-events:none}
    .bg-aurora{position:fixed;inset:0;z-index:-1;pointer-events:none;opacity:.85;
      background: radial-gradient(45% 35% at 12% 12%,rgba(125,200,255,.40),transparent 62%),
                 radial-gradient(36% 28% at 85% 14%,rgba(155,140,255,.38),transparent 65%),
                 radial-gradient(48% 36% at 78% 88%,rgba(118,221,255,.28),transparent 70%),
                 radial-gradient(26% 22% at 8% 72%,rgba(151,124,255,.22),transparent 66%);
      filter:blur(60px) saturate(130%) brightness(110%); mix-blend-mode:screen;
      animation:spAur 36s linear infinite alternate}
    @keyframes spAur{from{transform:translate3d(-2%,-1%,0) scale(1.02)}to{transform:translate3d(2%,1%,0) scale(1.05)}}
    @media (prefers-reduced-motion: reduce){ .bg-aurora{animation:none} }
    `;
    d.head.appendChild(s);
  }

  // Nodes
  function ensure(sel, tag, cls, attrs){
    let el = d.querySelector(sel);
    if(!el){
      el = d.createElement(tag);
      if(cls) el.className = cls;
      if(attrs) for(const k in attrs) el.setAttribute(k, attrs[k]);
      d.body.prepend(el);
    }
    return el;
  }
  ensure('.bg-stars','div','bg-stars',{'aria-hidden':'true'});
  const canvas = ensure('#constellations','canvas','sp-constellations',{'id':'constellations','aria-hidden':'true'});
  ensure('.bg-aurora','div','bg-aurora',{'aria-hidden':'true'});

  // Constellations painter
  if (w.__spConstellationsInit) return; w.__spConstellationsInit = true;
  const ctx = canvas.getContext('2d',{alpha:true});
  let dpr = Math.max(1, Math.min(2, w.devicePixelRatio || 1));
  let width, height, points, raf;
  function R(a,b){ return a + Math.random()*(b-a); }
  function reset(){
    width = canvas.clientWidth || w.innerWidth;
    height = canvas.clientHeight || w.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    const area = width * height;
    const target = Math.min(120, Math.max(60, Math.floor(area / 12000)));
    points = Array.from({length:target},()=>({ x:R(0,width), y:R(0,height), vx:R(-0.15,0.15), vy:R(-0.15,0.15) }));
  }
  function step(){
    ctx.clearRect(0,0,width,height);
    for(const p of points){
      p.x += p.vx; p.y += p.vy;
      if(p.x < -20) p.x = width+20; else if(p.x > width+20) p.x = -20;
      if(p.y < -20) p.y = height+20; else if(p.y > height+20) p.y = -20;
    }
    const L = Math.min(width,height) * 0.10;
    for(let i=0;i<points.length;i++){
      for(let j=i+1;j<points.length;j++){
        const dx=points[i].x - points[j].x, dy=points[i].y - points[j].y;
        const dist = Math.hypot(dx,dy);
        if(dist < L){
          const a = 1 - (dist/L);
          ctx.strokeStyle = `rgba(180,200,255,${a*0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(step);
  }
  function start(){ if(prefersReduce) return; cancelAnimationFrame(raf); reset(); step(); }
  const ro = new ResizeObserver(start); ro.observe(canvas);
  w.addEventListener('orientationchange', start);
  start();
})();