console.clear(); // Clears the console of any previous logs or errors.


/* ----------------------------
   ✅ Video Setup & iOS Activation
---------------------------- */
const video = document.querySelector(".video-background");
let src = video.currentSrc || video.src;

function once(el, event, fn, opts) {
  const onceFn = function (e) {
    el.removeEventListener(event, onceFn);
    fn.call(this, e);
  };
  el.addEventListener(event, onceFn, opts);
}

once(document.documentElement, "touchstart", () => {
  video.play();
  video.pause();
});

/* ----------------------------
   ✅ ScrollTrigger Setup
---------------------------- */
gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#container",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    // markers: true // optional: for debugging
  }
});

/* ----------------------------
   ✅ Sync video time to scroll
---------------------------- */
once(video, "loadedmetadata", () => {
  tl.fromTo(
    video,
    { currentTime: 0 },
    { currentTime: video.duration || 1 }
  );
});

/* ----------------------------
   ✅ Optional: Blob Loading for iOS reliability
---------------------------- */
setTimeout(() => {
  if ("fetch" in window) {
    fetch(src)
      .then(res => res.blob())
      .then(blob => {
        const blobURL = URL.createObjectURL(blob);
        const current = video.currentTime;

        once(document.documentElement, "touchstart", () => {
          video.play();
          video.pause();
        });

        video.src = blobURL;
        video.currentTime = current + 0.01;
      });
  }
}, 1000);
