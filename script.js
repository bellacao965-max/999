(function(){
const cfg = window.__MUMET_CONFIG || {};
const videoIds = ['dQw4w9WgXcQ','kXYiU_JCYtU','3JZ_D3ELwOQ','lY2yjAdbvdQ','IcrbM1l_BoI','fLexgOxsZu0','5qap5aO4i9A'];
let currentIndex = 0;
function setYt(id){ document.getElementById('ytFrame').src = 'https://www.youtube.com/embed/'+id; }
function randomTrack(){ currentIndex = Math.floor(Math.random()*videoIds.length); setYt(videoIds[currentIndex]); }
document.getElementById('randBtn').addEventListener('click', randomTrack);
document.getElementById('prevBtn').addEventListener('click', ()=>{ currentIndex = (currentIndex-1+videoIds.length)%videoIds.length; setYt(videoIds[currentIndex]); });
document.getElementById('nextBtn').addEventListener('click', ()=>{ currentIndex = (currentIndex+1)%videoIds.length; setYt(videoIds[currentIndex]); });
(function(){ const sel=document.getElementById('playlist'); videoIds.forEach((id,i)=>{ const o=document.createElement('option'); o.value=id; o.textContent = 'Track '+(i+1); sel.appendChild(o); }); sel.addEventListener('change', ()=>{ setYt(sel.value); }); })();
// yt search
document.getElementById('ytSearchBtn').addEventListener('click', async ()=>{ const q=document.getElementById('ytQuery').value.trim(); if(!q) return alert('Masukkan kata pencarian'); const results=document.getElementById('ytResults'); results.innerHTML='<em>Mencari…</em>'; if(cfg.YT_API_KEY){ try{ const r=await fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=6&q='+encodeURIComponent(q)+'&key='+cfg.YT_API_KEY); const j=await r.json(); results.innerHTML=''; if(j.items){ j.items.forEach(it=>{ const vid=it.id.videoId; const title=it.snippet.title; const div=document.createElement('div'); div.className='yt-result'; div.innerHTML='<a href="#" data-id="'+vid+'">'+(title)+'</a>'; div.querySelector('a').addEventListener('click', (e)=>{ e.preventDefault(); setYt(vid); }); results.appendChild(div); }); return; } }catch(e){ console.error(e); } } window.open('https://www.youtube.com/results?search_query='+encodeURIComponent(q),'_blank'); results.innerHTML='<div class="yt-result">Hasil ditampilkan di YouTube (tab baru).</div>'; });
// embed
document.getElementById('showEmbed').addEventListener('click', ()=>{ const v=document.getElementById('embedInput').value.trim(); if(!v) return alert('Masukkan URL atau embed code'); if(v.startsWith('<iframe')||v.includes('instagram')||v.includes('<blockquote')){ document.getElementById('embedOut').innerHTML=v; return; } if(v.includes('tiktok.com')){ document.getElementById('embedOut').innerHTML='<iframe src="'+v+'" style="width:100%;height:500px;border:0"></iframe>'; return; } if(v.includes('instagram.com')){ window.open(v,'_blank'); return; } document.getElementById('embedOut').innerHTML='<a href="'+v+'" target="_blank">'+v+'</a>'; });
// ai demo
document.getElementById('aiBtn').addEventListener('click', ()=>{ const inText=document.getElementById('aiInput').value.trim(); const out=document.getElementById('aiOut'); if(!inText){ out.innerText='Silakan isi pertanyaan.'; return; } const low=inText.toLowerCase(); if(low.includes('lagu')||low.includes('musik')) return out.innerText='Rekomendasi: tekan Random Lagu.'; if(low.includes('motiv')||low.includes('semangat')) return out.innerText='Kamu kuat — lakukan langkah kecil hari ini.'; if(low.includes('siapa')) return out.innerText='Mumet — Sumber Inspirasi.'; out.innerText='AI (demo): '+inText+'\n(Tip: untuk AI nyata, deploy proxy and set PROXY_URL in config.js)'; });
// notifications
let notifyEnabled=false, notifyInterval=null;
document.getElementById('notifyToggle').addEventListener('click', ()=>{ if(!('Notification' in window)){ alert('Browser tidak mendukung notifikasi'); return; } if(Notification.permission==='default'){ Notification.requestPermission().then(p=>{ if(p==='granted') startNotify(); else alert('Notifikasi tidak diizinkan'); }); return; } if(Notification.permission==='granted'){ if(notifyEnabled) stopNotify(); else startNotify(); } });
function startNotify(){ notifyEnabled=true; document.getElementById('notifyToggle').innerText='Matikan Notifikasi'; showMotivation(); notifyInterval=setInterval(showMotivation,3600000); }
function stopNotify(){ notifyEnabled=false; document.getElementById('notifyToggle').innerText='Aktifkan Notifikasi'; clearInterval(notifyInterval); }
function showMotivation(){ const msgs=['Jangan menyerah — mulai lagi hari ini','Satu langkah kecil setiap hari menghasilkan kemajuan','Kegagalan adalah guru terbaik']; const m=msgs[Math.floor(Math.random()*msgs.length)]; if(Notification.permission==='granted') new Notification('Mumet: Motivasi',{body:m}); else alert(m); }
// theme toggle & pwa
const themeToggle=document.getElementById('themeToggle'); themeToggle.addEventListener('click', ()=>{ document.body.classList.toggle('dark'); themeToggle.innerText = document.body.classList.contains('dark') ? '☀️' : '🌙'; });
let deferredPrompt; const installBtn=document.getElementById('installBtn');
window.addEventListener('beforeinstallprompt', (e)=>{ e.preventDefault(); deferredPrompt=e; installBtn.style.display='inline-block'; installBtn.addEventListener('click', async ()=>{ deferredPrompt.prompt(); const choice=await deferredPrompt.userChoice; installBtn.style.display='none'; deferredPrompt=null; }); });
// register sw
if('serviceWorker' in navigator){ navigator.serviceWorker.register('/service-worker.js').catch(()=>console.warn('SW register failed')); }
})();