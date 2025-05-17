console.clear();

gsap.registerPlugin(ScrollTrigger);



const svg = document.querySelector("#svg");
const img = document.querySelector("#img");
const circle = document.querySelector("#circle");
const pad = 4;

let radius = +circle.getAttribute("r");
let imgWidth, imgHeight;

gsap.set(img, {
  scale: 2,
  xPercent: -50,
  yPercent: -50
});

var tl = gsap.timeline({
    scrollTrigger: {  
      trigger: '.image-unmask',
      pin: true,
      start: "top top",
      end: '+=2500',
      //end: "bottom bottom",
      scrub: 0.2,
    },
    defaults: {
      duration: 1
    }
  })
  .to(circle, {
    attr: {
      r: () => radius
    }
  }, 0)
  .to(img, {
    scale: 1,
    opacity: 1,
  }, 0)
  .to("#whiteLayer", {
    alpha: 0,
    ease: "power1.in",
    duration: 1 - 0.25
  }, 0.25)
;
  


window.addEventListener("load", init);
window.addEventListener("resize", resize);

function init() {
      
  imgWidth = img.naturalWidth;
  imgHeight = img.naturalHeight;
    
  resize();  
}

function resize() {
    
  tl.progress(0);
  
  const r = svg.getBoundingClientRect();
  const rectWidth = r.width + pad;
  const rectHeight = r.height + pad;
  
  const rx = rectWidth / imgWidth;
  const ry = rectHeight / imgHeight;
  
  const ratio = Math.max(rx, ry);
  
  const width = imgWidth * ratio;
  const height = imgHeight * ratio;
    
  const dx = rectWidth / 2;
  const dy = rectHeight / 2;
  radius = Math.sqrt(dx * dx + dy * dy);
            
  gsap.set(img, { width, height });
    
  tl.invalidate();
  
  ScrollTrigger.refresh();
  
}