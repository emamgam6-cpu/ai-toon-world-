const videos=[
{title:"AI Toon World 01",channel:"AI Toon World",url:"https://youtu.be/bVxuiqEQyPs"},
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
  out+=`<article class="screen"><iframe id="player${i}" src="https://www.youtube.com/embed/${encodeURIComponent(id)}?playsinline=1&rel=0" title="${esc(v.title)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe><div class="screen-info"><span>${esc(v.title)} · ${esc(v.channel)}</span><a href="${safe(v.url)}" target="_blank" rel="noopener">YouTube ↗</a></div></article>`;
 }
 wall.innerHTML=out;
}

function post(i,func,args=[]){const f=document.getElementById("player"+i);if(f)f.contentWindow.postMessage(JSON.stringify({event:"command",func,args}),"*")}

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


function getYoutubeId(rawUrl){
  try{
    const u=new URL(rawUrl.trim());
    const host=u.hostname.replace(/^www\./,'').toLowerCase();
    if(host==='youtu.be') return u.pathname.split('/').filter(Boolean)[0] || '';
    if(host==='youtube.com' || host==='m.youtube.com'){
      if(u.pathname==='/watch') return u.searchParams.get('v') || '';
      if(u.pathname.startsWith('/shorts/')) return u.pathname.split('/')[2] || '';
      if(u.pathname.startsWith('/embed/')) return u.pathname.split('/')[2] || '';
      if(u.pathname.startsWith('/live/')) return u.pathname.split('/')[2] || '';
    }
  }catch(e){}
  return '';
}
function openYoutubeLink(){
  const input=document.getElementById('youtubeUrl');
  const frame=document.getElementById('singleVideo');
  const wrap=document.getElementById('singleVideoWrap');
  const error=document.getElementById('linkError');
  const id=getYoutubeId(input.value);
  error.textContent='';
  if(!id){ wrap.hidden=true; error.textContent='Please paste a valid YouTube video link.'; return; }
  frame.src='https://www.youtube.com/embed/'+encodeURIComponent(id)+'?playsinline=1&rel=0';
  wrap.hidden=false;
  wrap.scrollIntoView({behavior:'smooth',block:'center'});
}
document.addEventListener('DOMContentLoaded',()=>{
  const input=document.getElementById('youtubeUrl');
  if(input) input.addEventListener('keydown',e=>{if(e.key==='Enter') openYoutubeLink();});
});
