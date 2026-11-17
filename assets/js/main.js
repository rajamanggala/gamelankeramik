(function(){
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var RATIO=[1,1.149,1.32,1.516,1.741,2,2.3],ac;
/* Synth fallback, used until real recordings exist in assets/audio/ */
function synth(f){try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();var t=ac.currentTime;
[[1,.5],[2.76,.18],[5.4,.08]].forEach(function(p){var o=ac.createOscillator(),g=ac.createGain();o.frequency.value=f*p[0];g.gain.setValueAtTime(p[1],t);g.gain.exponentialRampToValueAtTime(.001,t+1.7/Math.pow(p[0],.4));o.connect(g);g.connect(ac.destination);o.start(t);o.stop(t+1.8)})}catch(e){}}
function play(inst,n,f){var a=new Audio('assets/audio/'+inst+'/'+n+'.mp3');var p=a.play();if(p&&p.catch)p.catch(function(){synth(f)});a.onerror=function(){synth(f)}}
$$('.blades').forEach(function(box){
  var inst=box.dataset.instrument,base=+box.dataset.base,count=+(box.dataset.count||7);
  for(var i=0;i<count;i++){(function(i){var b=document.createElement('button');b.type='button';b.className='blade';
    b.style.setProperty('--i',i);b.style.height=(100-i*(box.classList.contains('sm')?7:8))+'%';b.setAttribute('aria-label',inst+' blade '+(i+1));
    b.addEventListener('click',function(){play(inst,i+1,base*RATIO[i%7]);b.classList.remove('hit');void b.offsetWidth;b.classList.add('hit')});box.appendChild(b)})(i)}
});
/* Stories filter */
var fb=$$('[data-filter]');fb.forEach(function(b){b.addEventListener('click',function(){
  fb.forEach(function(x){x.classList.toggle('active',x===b)});var k=b.dataset.filter;
  $$('[data-type]').forEach(function(c){c.hidden=!(k==='all'||c.dataset.type===k)})})});
/* Article: frequency demo */
var cv=$('#wave');if(cv){var sl=$('#freq'),out=$('#freqOut'),ctx=cv.getContext('2d'),ph=0;
  function draw(){var w=cv.width=cv.clientWidth*2,h=cv.height=320,f=+sl.value;ctx.clearRect(0,0,w,h);ctx.strokeStyle='#F3EDE2';ctx.lineWidth=3;ctx.beginPath();
    var cyc=f/60;for(var x=0;x<w;x++){var y=h/2+Math.sin((x/w)*cyc*2*Math.PI+ph)*h*.36;x?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.stroke();out.textContent=f}
  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  (function loop(){if(!reduce)ph-=.06;draw();requestAnimationFrame(loop)})();
  $('#freqPlay').addEventListener('click',function(){synth(+sl.value)})}
/* Contact form (front-end only; connect to Laravel route later) */
var fm=$('#contactForm');if(fm){fm.addEventListener('submit',function(e){e.preventDefault();fm.classList.add('was-validated');
  if(fm.checkValidity()){$('#formOk').hidden=false;fm.reset();fm.classList.remove('was-validated')}})}
var y=$('#year');if(y)y.textContent=new Date().getFullYear();
})();
