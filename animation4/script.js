gsap.to(".card1", {
    y: 100,
    duration: 1,
    scrollTrigger: {
        trigger: ".card3",
        start: "top 40",
        end: "top 70",
        scrub: true,
        markers: true
    }
});

gsap.to(".card2", {
    y: 100,
    duration: 1,
    scrollTrigger: {
        trigger: ".card3",
        start: "top 40",
        end: "top 70",
        scrub: true,
        markers: true
    }
});

gsap.to(".card3", {
    y: 100,
    duration: 1,
    scrollTrigger: {
        trigger: ".card3",
        start: "top 40",
        end: "top 70",
        scrub: true,
        markers: true
    }
});