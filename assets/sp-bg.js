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
    .bg-aurora{position:fixed;inset:0;z-index:-1;pointer-events:none;opacity:.75;
      background: radial-gradient(45% 35% at 12% 12%,rgba(125,200,255,.35),transparent 62%),
                 radial-gradient(36% 28% at 85% 14%,rgba(155,140,255,.33),transparent 65%),
                 radial-gradient(48% 36% at 78% 88%,rgba(118,221,255,.24),transparent 70%),
                 radial-gradient(26% 22% at 8% 72%,rgba(151,124,255,.18),transparent 66%);
      filter:blur(40px) saturate(120%); mix-blend-mode:screen;
      animation:spAur 36s linear infinite alternate;
      will-change:transform}
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
    // OPTIMIZED: Reduced point count from 60-120 to 30-50 for better performance
    const target = Math.min(50, Math.max(30, Math.floor(area / 20000)));
    points = Array.from({length:target},()=>({ x:R(0,width), y:R(0,height), vx:R(-0.1,0.1), vy:R(-0.1,0.1) }));
  }
  let lastFrame = 0;
  const frameInterval = 1000 / 30; // 30fps instead of 60fps
  function step(timestamp){
    if (timestamp - lastFrame < frameInterval) {
      raf = requestAnimationFrame(step);
      return;
    }
    lastFrame = timestamp;
    ctx.clearRect(0,0,width,height);
    for(const p of points){
      p.x += p.vx; p.y += p.vy;
      if(p.x < -20) p.x = width+20; else if(p.x > width+20) p.x = -20;
      if(p.y < -20) p.y = height+20; else if(p.y > height+20) p.y = -20;
    }
    // OPTIMIZED: Increased threshold to draw fewer lines
    const L = Math.min(width,height) * 0.12;
    const Lsq = L * L; // Use squared distance to avoid sqrt
    let lineCount = 0;
    const maxLines = 30; // Limit total lines drawn
    for(let i=0;i<points.length && lineCount < maxLines;i++){
      for(let j=i+1;j<points.length && lineCount < maxLines;j++){
        const dx=points[i].x - points[j].x, dy=points[i].y - points[j].y;
        const distSq = dx*dx + dy*dy;
        if(distSq < Lsq){
          const dist = Math.sqrt(distSq);
          const a = 1 - (dist/L);
          ctx.strokeStyle = `rgba(180,200,255,${a*0.3})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
          lineCount++;
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