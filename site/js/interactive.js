!function(){
// Reading progress bar
var pb=document.createElement('div');
pb.className='reading-progress';
document.body.prepend(pb);
window.addEventListener('scroll',function(){
  var h=document.documentElement.scrollHeight-window.innerHeight;
  pb.style.width=h>0?(window.scrollY/h*100)+'%':'0%';
});

// Back to top button
var bt=document.createElement('a');
bt.className='back-to-top';
bt.innerHTML='<i class="bi bi-arrow-up"></i>';
bt.href='#';
bt.addEventListener('click',function(e){e.preventDefault();window.scrollTo({top:0,behavior:'smooth'})});
document.body.appendChild(bt);
window.addEventListener('scroll',function(){bt.classList.toggle('visible',window.scrollY>400)});

// Estimated reading time
var ac=document.querySelector('.article-content');
if(ac){
  var words=ac.textContent.trim().split(/\s+/).length;
  var mins=Math.max(1,Math.round(words/200));
  var badge=document.createElement('div');
  badge.className='reading-time-badge';
  badge.innerHTML='<i class="bi bi-clock me-1"></i>'+mins+' min read';
  var h1=document.querySelector('article h1, .article-content').closest('article');
  if(h1){var t=h1.querySelector('h1');if(t)t.after(badge)}

  // Auto table of contents
  var headings=ac.querySelectorAll('h2,h3');
  if(headings.length>=3){
    var toc=document.createElement('div');
    toc.className='auto-toc';
    toc.innerHTML='<div class="auto-toc-header" onclick="this.parentElement.classList.toggle(\'collapsed\')"><i class="bi bi-list-ul me-2"></i>Contents <i class="bi bi-chevron-down auto-toc-arrow"></i></div><div class="auto-toc-body"></div>';
    var body=toc.querySelector('.auto-toc-body');
    headings.forEach(function(h,i){
      var id='section-'+i;
      h.id=id;
      var a=document.createElement('a');
      a.href='#'+id;
      a.className='auto-toc-link'+(h.tagName==='H3'?' toc-sub':'');
      a.textContent=h.textContent;
      a.addEventListener('click',function(e){
        e.preventDefault();
        document.getElementById(id).scrollIntoView({behavior:'smooth',block:'start'});
      });
      body.appendChild(a);
    });
    ac.prepend(toc);
  }
}

// Image zoom lightbox
document.querySelectorAll('.article-content img, article img').forEach(function(img){
  if(img.closest('.auto-toc'))return;
  img.style.cursor='zoom-in';
  img.addEventListener('click',function(){
    var overlay=document.createElement('div');
    overlay.className='img-lightbox';
    overlay.innerHTML='<img src="'+this.src+'" alt="'+this.alt+'">';
    overlay.addEventListener('click',function(){this.remove()});
    document.body.appendChild(overlay);
    requestAnimationFrame(function(){overlay.classList.add('active')});
  });
});

// Smooth anchor scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener('click',function(e){
    var t=document.querySelector(this.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'})}
  });
});

// Article link highlight animation on hover
document.querySelectorAll('.article-content a:not(.auto-toc-link)').forEach(function(a){
  if(!a.classList.contains('btn'))a.classList.add('article-link');
});
}();
