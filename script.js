const videos=[
{title:"AI Toon World 01",channel:"AI Toon World",url:"https://www.youtube.com/watch?v=dQw4w9WgXcQ"},
{title:"AI Toon World 02",channel:"AI Toon World",url:"https://www.youtube.com/watch?v=dQw4w9WgXcQ"},
{title:"Drama Club 01",channel:"Drama Club",url:"https://www.youtube.com/watch?v=dQw4w9WgXcQ"},
{title:"Drama Club 02",channel:"Drama Club",url:"https://www.youtube.com/watch?v=dQw4w9WgXcQ"},
{title:"Flag Country 01",channel:"Flag Country Area",url:"https://www.youtube.com/watch?v=dQw4w9WgXcQ"},
{title:"Flag Country 02",channel:"Flag Country Area",url:"https://www.youtube.com/watch?v=dQw4w9WgXcQ"},
{title:"Video 07",channel:"AI Toon World",url:"https://www.youtube.com/watch?v=dQw4w9WgXcQ"},
{title:"Video 08",channel:"Drama Club",url:"https://www.youtube.com/watch?v=dQw4w9WgXcQ"},
{title:"Video 09",channel:"Flag Country Area",url:"https://www.youtube.com/watch?v=dQw4w9WgXcQ"},
{title:"Video 10",channel:"AI Toon World",url:"https://www.youtube.com/watch?v=dQw4w9WgXcQ"},
{title:"Video 11",channel:"Drama Club",url:"https://www.youtube.com/watch?v=dQw4w9WgXcQ"},
{title:"Video 12",channel:"AI Toon World",url:"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}];
const channels=[
{name:"AI Toon World",handle:"@AIToonWorld",icon:"AI",url:"https://www.youtube.com/"},
{name:"Flag Country Area",handle:"@flagcountryarea",icon:"FC",url:"https://youtube.com/@flagcountryarea?si=OnhGSL46fyZq3FTn"}];

function idFromUrl(url){try{const u=new URL(url);if(u.hostname.includes("youtu.be"))return u.pathname.slice(1);return u.searchParams.get("v")||""}catch(e){return""}}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function safe(url){try{const u=new URL(url);return["http:","https:"].includes(u.protocol)?u.href:"#"}catch(e){return"#"}}

function renderWall(){
 const count=Number(document.getElementById("screenCount").value),wall=document.getElementById("videoWall");let out="";
 for(let i=0;i<count;i++){const v=videos[i%videos.length],id=idFromUrl(v.url);
  out+=`<article class="screen"><iframe id="player${i}" src="https://www.youtube.com/embed/${encodeURIComponent(id)}?enablejsapi=1&autoplay=1&mute=1&playsinline=1&rel=0" title="${esc(v.title)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe><div class="screen-info"><span>${esc(v.title)} · ${esc(v.channel)}</span><button onclick="toggleMute(${i},this)" title="Toggle sound">🔇</button></div></article>`;
 }
 wall.innerHTML=out;
}

function post(i,func,args=[]){const f=document.getElementById("player"+i);if(f)f.contentWindow.postMessage(JSON.stringify({event:"command",func,args}),"*")}
function startAll(){document.querySelectorAll(".screen iframe").forEach((f,i)=>post(i,"mute"));document.querySelectorAll(".screen iframe").forEach((f,i)=>post(i,"playVideo"))}
function stopAll(){document.querySelectorAll(".screen iframe").forEach((f,i)=>post(i,"pauseVideo"))}
function toggleMute(i,btn){const muted=btn.dataset.muted!=="false";if(muted){post(i,"unMute");btn.dataset.muted="false";btn.textContent="🔊"}else{post(i,"mute");btn.dataset.muted="true";btn.textContent="🔇"}}
function toggleMenu(){
  const nav=document.querySelector(".nav nav");
  const btn=document.getElementById("menuBtn");
  const open=nav.classList.toggle("mobile");
  btn.setAttribute("aria-expanded",String(open));
  btn.setAttribute("aria-label",open?"Close menu":"Open menu");
  btn.textContent=open?"✕":"☰";
}
document.querySelectorAll(".nav nav a").forEach(a=>a.addEventListener("click",()=>{
  const nav=document.querySelector(".nav nav");
  const btn=document.getElementById("menuBtn");
  nav.classList.remove("mobile");
  btn.setAttribute("aria-expanded","false");
  btn.setAttribute("aria-label","Open menu");
  btn.textContent="☰";
}));
document.getElementById("channelGrid").innerHTML=channels.map(c=>`<article class="channel"><div class="avatar">${esc(c.icon)}</div><h3>${esc(c.name)}</h3><p>${esc(c.handle)}</p><a href="${safe(c.url)}" target="_blank" rel="noopener">Open Channel ↗</a></article>`).join("");
renderWall();
