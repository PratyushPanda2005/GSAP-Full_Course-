gsap.registerPlugin(ScrollTrigger)

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.box',
        markers: true,
        start: "top 80%",
        end: "top 30%",
        scrub: true
    }
})

tl.to(".box", {x: 500, duration: 3})
    .to(".box", {y: 200, duration: 3})
    .to(".box", {x: 0, duration: 3})

// gsap.to(".square", {
//     x: 700,
//     duration: 3,
//     scrollTrigger: {
//         trigger: ".square",
//         start: "top 80%",
//         end: "top 30%",
//         // what this means is when the top of the trigger element that is the square meets the center of the viewport thats when the animation starts
//         scrub: 4,
//         // 4 seconds of smoothing
//         toggleActions:"restart none none none",
//         // play pause resume reverse restart reset complete none
//         // any event can be used for any action
//         // it takes four different keywords which wll be four different actions that will be triggered by four different events

//         //default --> play none none none

//         //   onEnter    onLeave    onEnterBack  onLeaveBack
//         markers: true,
//         // you can setup your own markers
//         toggleClass : "red"
//     }
// })