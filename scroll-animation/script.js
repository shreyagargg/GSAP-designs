gsap.registerPlugin(ScrollTrigger);

// PAGE 1 animation
gsap.from(".page1 .box", {
    scale: 0.2,
    duration: 2,
    delay: 1,
    scrollTrigger: {
        trigger: ".page1 .box",
        start: "top 80%",
        end: "top 20%",
        // markers: true,
        scrub: true,
    }
});

// PAGE 2 horizontal scroll + pin
gsap.to(".page2 h1", {
    x: "-50%",
    scrollTrigger: {
        trigger: ".page2",
        start: "top top",
        end: "bottom top",     // stops pin when Page2 leaves
        // markers: true,
        scrub: true,
        pin: true
    }
});

// PAGE 3 animation
gsap.from(".page3 .box", {
    scale: 0.2,
    rotate: 520,
    scrollTrigger: {
        trigger: ".page3 .box",
        start: "top 80%",
        end: "top 20%",
        // markers: true,
        scrub: true
    }
});
