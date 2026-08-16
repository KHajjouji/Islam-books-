document.addEventListener('DOMContentLoaded',()=>{
  const h=document.querySelector('[data-header]'),t=document.querySelector('[data-menu-toggle]'),m=document.querySelector('[data-menu]');
  if(h){const s=()=>h.classList.toggle('is-scrolled',window.scrollY>8);s();window.addEventListener('scroll',s,{passive:true})}
  if(t&&m){t.addEventListener('click',()=>{const o=t.getAttribute('aria-expanded')==='true';t.setAttribute('aria-expanded',String(!o));m.classList.toggle('is-open',!o)})}
  document.querySelectorAll('[data-language-switcher]').forEach(s=>{const b=s.querySelector('.language-current');if(!b)return;b.addEventListener('click',()=>{const o=s.classList.toggle('is-open');b.setAttribute('aria-expanded',String(o))})});
  document.querySelectorAll('[data-product-rail]').forEach(r=>{const tr=r.querySelector('[data-product-track]');if(!tr)return;const a=()=>Math.max(tr.clientWidth*.82,260);r.querySelector('.rail-prev')?.addEventListener('click',()=>tr.scrollBy({left:-a(),behavior:'smooth'}));r.querySelector('.rail-next')?.addEventListener('click',()=>tr.scrollBy({left:a(),behavior:'smooth'}))});
  const searchToggle=document.querySelector('[data-search-toggle]'),searchPanel=document.querySelector('[data-search-panel]');
  if(searchToggle&&searchPanel){searchToggle.addEventListener('click',()=>{const open=searchPanel.hasAttribute('hidden');if(open){searchPanel.removeAttribute('hidden');searchPanel.querySelector('input[type="search"]')?.focus()}else{searchPanel.setAttribute('hidden','')}})}
  const filterToggle=document.querySelector('[data-filter-toggle]'),filterForm=document.querySelector('[data-filter-form]');
  if(filterToggle&&filterForm){filterToggle.addEventListener('click',()=>{const open=filterForm.classList.toggle('is-open');filterToggle.setAttribute('aria-expanded',String(open))})}
  document.querySelectorAll('[data-coupon-code]').forEach(el=>{el.setAttribute('title','Tap to copy coupon');el.addEventListener('click',e=>{e.preventDefault();const code=el.getAttribute('data-coupon-code');if(code&&navigator.clipboard){navigator.clipboard.writeText(code);const old=el.textContent;el.textContent='Copied';setTimeout(()=>el.textContent=old,1200)}})});
});
