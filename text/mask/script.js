gsap.registerPlugin(SplitText);

console.clear();

document.fonts.ready.then(() => {
  gsap.set(".split", { opacity: 1 });

  SplitText.create(".split", {
    type: "words,lines",
    linesClass: "line",
    autoSplit: true,
    mask: "lines",
    onSplit: (self) => {
        gsap.from(self.lines, {
        duration: 4,
        yPercent: 100,
        opacity: 0,
        stagger: 0.1,
        ease: "expo.out",
      });
    }
  });
});

// ------********* Split by words **********----------

// document.fonts.ready.then(() => {
// gsap.set(".split", { opacity: 1 });

// SplitText.create(".split", {
//     type: "words", // Only split words (remove "lines" if you don't need them)
//     wordsClass: "word", // Optional: adds a class to each word
//     onSplit: (self) => {
//       gsap.from(self.words, {
//         duration: 0.8,
//         yPercent: 100,
//         opacity: 0,
//         stagger: 0.1,
//         ease: "expo.out",
//       });
//     }
//   });
// });