(function(){
var s=[].slice.call(document.querySelectorAll('.slide')),i=0,sx=null;
var halo=document.createElement('div');
halo.className='cursor-halo';
halo.setAttribute('aria-hidden','true');
document.body.appendChild(halo);
var supportsHalo=window.matchMedia&&window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if(supportsHalo){
 document.addEventListener('pointermove',function(e){if(e.pointerType==='touch')return;halo.style.left=e.clientX+'px';halo.style.top=e.clientY+'px';halo.classList.add('visible')});
 document.addEventListener('pointerleave',function(){halo.classList.remove('visible')});
 document.addEventListener('pointerdown',function(){halo.classList.add('pressed')});
 document.addEventListener('pointerup',function(){halo.classList.remove('pressed')});
}
function R(x,y,w,h,f,r){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="'+f+'" rx="'+(r||0)+'"/>'}
function T(x,y,t,c,a,sz){return '<text x="'+x+'" y="'+y+'" fill="'+(c||'#0e1c2f')+'" text-anchor="'+(a||'start')+'" font-size="'+(sz||15)+'" font-weight="600">'+t+'</text>'}
function fig(st){
 var hooked=st==='hook', clamped=st!=='inspect'&&st!=='rail-off', top=hooked?96:150, o='<svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" font-family="Plex,Arial,sans-serif">';
 o+=R(0,0,640,320,'#f4f6f9',8)+R(40,40,10,240,'#8b97a7')+R(40,60,120,6,'#8b97a7');
 o+='<line x1="0" y1="80" x2="640" y2="80" stroke="#0e1c2f" stroke-width="4"/>'+T(600,68,'Contact wire (25 kV)','#0e1c2f','end');
 o+=R(0,276,640,10,'#5a6779')+R(0,296,640,6,'#c9d0da')+T(600,316,'Rail','#5a6779','end');
 var cx=clamped?470:540, cy=clamped?262:296;
 o+='<path d="M330 270 C 360 310, 420 300, '+cx+' '+(cy+8)+'" fill="none" stroke="#c0392b" stroke-width="5"/>';
 o+=R(cx-14,cy,28,22,clamped?'#0e1c2f':'#b26a00',3)+T(cx,clamped?cy-8:cy+36,'Earth clamp','#0e1c2f','middle',13);
 o+=R(324,top,14,270-top+6,'#f2b705',3)+R(316,top-12,30,14,'#0e1c2f',3);
 o+=T(300,top+40,'Discharge rod','#0e1c2f','end')+T(300,top+60,'(insulated pole)','#5a6779','end',13)+T(352,top-16,'Top clamp','#0e1c2f','start',13);
 o+=T(360,314,'Copper cable','#c0392b','start',13);
 if(st==='test')o+='<line x1="520" y1="120" x2="342" y2="'+(top-4)+'" stroke="#8b97a7" stroke-width="7" stroke-linecap="round"/>'+T(530,122,'Metal tube','#0e1c2f','start');
 if(hooked)o+='<circle cx="331" cy="80" r="10" fill="none" stroke="#c0392b" stroke-width="3"/>';
 return o+'</svg>'}
[].forEach.call(document.querySelectorAll('[data-fig]'),function(e){e.innerHTML=fig(e.getAttribute('data-fig'))});
function go(n){i=Math.max(0,Math.min(s.length-1,n));s.forEach(function(e,k){e.classList.toggle('active',k===i)});history.replaceState(null,'','#'+(i+1))}
document.addEventListener('keydown',function(e){var k=e.key;
 if(k==='ArrowRight'||k==='ArrowDown'||k==='PageDown'||k===' '||k==='Enter'){e.preventDefault();go(i+1)}
 else if(k==='ArrowLeft'||k==='ArrowUp'||k==='PageUp'||k==='Backspace'){e.preventDefault();go(i-1)}
 else if(k==='Home')go(0);else if(k==='End')go(s.length-1);
 else if(k==='f'||k==='F'){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()}});
document.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});
document.addEventListener('touchend',function(e){if(sx===null)return;var d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>50)go(d<0?i+1:i-1);sx=null});
go((parseInt(location.hash.slice(1),10)||1)-1);})();