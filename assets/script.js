
(function(){
  const el = document.documentElement;
  const toggle = () => {
    const next = el.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    el.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };
  const saved = localStorage.getItem('theme');
  el.setAttribute('data-theme', saved || 'dark');
  const btn = document.getElementById('theme-toggle');
  if(btn){ btn.addEventListener('click', toggle); }
})();
