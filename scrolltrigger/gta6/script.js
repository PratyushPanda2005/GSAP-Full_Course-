import { logoData } from "./logo.js";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  const heroImgContainer = document.querySelector(".hero-img-container");
  const heroImgLogo = document.querySelector(".hero-img-logo");
  const heroImgCopy = document.querySelector(".hero-img-copy");
  const fadeOverlay = document.querySelector(".fade-overlay");
  const svgOverlay = document.querySelector(".overlay");
  const overlayCopy = document.querySelector("h1");

  const initialOverlayScale = 10000;

  const logoContainer = document.querySelector(".logo-container");
  const logoMask = document.getElementById("logoMask");

  logoMask.setAttribute("d", logoData);

  const logoDimensions = logoContainer.getBoundingClientRect();
  const logoBoundingBox = logoMask.getBBox();

  const horizontalScaleRatio = logoDimensions.width / logoBoundingBox.width;
  const verticalScaleRatio = logoDimensions.height / logoBoundingBox.height;

  const logoScaleFactor = Math.min(horizontalScaleRatio, verticalScaleRatio);

  const logoHorizontalPosition =
    logoDimensions.left +
    (logoDimensions.width - logoBoundingBox.width * logoScaleFactor) / 2 -
    logoBoundingBox.x * logoScaleFactor;

  const logoVerticalPosition =
    logoDimensions.top +
    (logoDimensions.height - logoBoundingBox.height * logoScaleFactor) / 2 -
    logoBoundingBox.y * logoScaleFactor;

  logoMask.setAttribute(
    "transform",
    `translate(${logoHorizontalPosition}, ${logoVerticalPosition}) scale(${logoScaleFactor})`
  );

  ScrollTrigger.create({
    trigger: ".hero",
    start: "top top", // Top of svg when meets top of screen
    end: `${window.innerHeight * 5}px`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    onUpdate: (self) => {
      const scrollProgress = self.progress;
      const fadeOpacity = 1 - scrollProgress * (1 / 0.15);

      if (scrollProgress <= 0.15) {
        gsap.set([heroImgLogo, heroImgCopy], {
          opacity: fadeOpacity,
        });
      } else {
        gsap.set([heroImgLogo, heroImgCopy], {
          opacity: 0,
        });
      }

      if (scrollProgress <= 0.85) {
        const normalizedProgress = scrollProgress * (1 / 0.85);
        const heroImgContainerScale = 1.5 - 0.5 * normalizedProgress;
        const overlayScale =
          initialOverlayScale *
          Math.pow(1 / initialOverlayScale, normalizedProgress);
        let fadeOverlayOpacity = 0;

        gsap.set(heroImgContainer, {
          scale: heroImgContainerScale,
        });

        gsap.set(svgOverlay, {
          scale: overlayScale,
        });

        if (scrollProgress >= 0.25) {
          fadeOverlayOpacity = Math.min(1, (scrollProgress - 0.25) * (1 / 0.4));
        }

        gsap.set(fadeOverlay, {
          opacity: fadeOverlayOpacity,
        });
      }

      if (scrollProgress >= 0.6 && scrollProgress <= 0.85) {
        const overlayCopyRevealProgress = (scrollProgress - 0.6) * (1 / 0.25);

        const gradientSpread = 100;
        const gradientBottomPosition = 240 - overlayCopyRevealProgress * 280;
        const gradientTopPosition = gradientBottomPosition - gradientSpread;
        const overlayCopyScale = 1.25 - 0.25 * overlayCopyRevealProgress;

        overlayCopy.style.background = `linear-gradient(to bottom, #111117 0%, #111117 ${gradientTopPosition}%, #e66461 ${gradientBottomPosition}%, #e66461 100%)`;

        overlayCopy.style.backgroundClip = "text";

        gsap.set(overlayCopy, {
          scale: overlayCopyScale,
          opacity: overlayCopyRevealProgress,
        });
      } else if (scrollProgress < 0.6) {
        gsap.set(overlayCopy, {
          opacity: 0,
        });
      }
    },
  });
});
