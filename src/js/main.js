/* Resize NavBar */
const header=document.getElementById('site-header');
function resizeHeader(){
  if(window.scrollY>8) header.classList.add('header--shrink');
  else header.classList.remove('header--shrink');
}
addEventListener('scroll',resizeHeader,{passive:true});
addEventListener('load',resizeHeader);

/* NavBar Position Indicator */
const navLinks = document.querySelectorAll('.nav-list a');
const sections = document.querySelectorAll("main, section");
function positionIndicator() {
  let current = "";
  const headerHeight = header.offsetHeight;
  const scrollPos = window.scrollY + headerHeight + 1;
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (scrollPos >= top && scrollPos < bottom) {
      current = section.id;
    }
  });
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) {
    const lastSection = sections[sections.length - 1];
    current = lastSection.id;
  }
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
};
window.addEventListener("scroll", positionIndicator)

/* Reviews Carousel */
const viewport=document.querySelector('.review-viewport');
const track=document.querySelector('.review-track');
const slides=track? [...track.querySelectorAll('.review')] : [];
let i=0;
function layoutSlides(){
  const w=viewport.clientWidth;
  slides.forEach(s=>{
    s.style.width=w+'px';
    s.style.flex='0 0 '+w+'px';
  });
}
function go(to){
  i=(to+slides.length)%slides.length;
  const w=viewport.clientWidth;
  track.style.transform=`translateX(${-i*w}px)`;
}
document.querySelector('.review-btn.prev')?.addEventListener('click',()=>go(i-1));
document.querySelector('.review-btn.next')?.addEventListener('click',()=>go(i+1));
addEventListener('load',()=>{ layoutSlides(); go(0); });

/* Fade-In on Scroll */
const reveal=[...document.querySelectorAll('.reveal')];
const io = new IntersectionObserver(es=>{
  es.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  }
)} ,{threshold:.15});
reveal.forEach(el=>io.observe(el));
