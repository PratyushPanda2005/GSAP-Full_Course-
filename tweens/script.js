// If you dont have complex animations simply dont use gsap you can use regular css for that

gsap.from('div',{
    opacity: 0,
    duration: 1,
    y: -50
}) // from means it comes from these properties to its original

// gsap.to('div',{
//     opacity: 0,
//     duration: 1,
//     y: -50
// }) // its gonna reverse everything to a opacity 0 and up the content by 50px

