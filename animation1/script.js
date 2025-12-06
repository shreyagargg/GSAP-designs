const btn = document.querySelectorAll('button');
for (const b of btn) {
    b.addEventListener('click', function (e) {
        const color = b.dataset.color;
        document.body.style.backgroundColor = color;
    })
}

function randomMovement(target, finalX, delay) {

    const tl = gsap.timeline({ delay: delay });

    // random wiggle steps
    for (let i = 0; i < 5; i++) {
        tl.to(target, {
            duration: 0.4,
            x: "+=" + gsap.utils.random(-200, 200),
            y: "+=" + gsap.utils.random(-150, 150),
            rotation: "+=" + gsap.utils.random(-90, 90),
            ease: "power1.inOut"
        });
    }

    // final smooth movement to the right position
    tl.to(target, {
        duration: 2,
        x: finalX,
        y: 0,
        rotation: 360,
        scale: 0.2,
        borderRadius: "50%",
        ease: "power3.out"
    });

}

// randomMovement(".box", 1200, 1);
// randomMovement(".box1", 1150, 2);
// randomMovement(".box2", 1100, 3);
// randomMovement(".box3", 1050, 4);
// randomMovement(".box4", 1000, 5);




gsap.to(".box", {
    duration: 2,
    delay: 1,
    x: 1200,
    borderRadius: "50%",
    rotation: 360,
    scale: 0.2,
    yoyo: true,
    repeat: 4
});

gsap.to(".box1", {
    duration: 2,
    delay: 2,
    x: 1150,
    borderRadius: "50%",
    rotation: 360,
    scale: 0.2,
    yoyo: true,
    repeat: 4
});

gsap.to(".box2", {
    duration: 2,
    delay: 3,
    x: 1100,
    borderRadius: "50%",
    rotation: 360,
    scale: 0.2,
    yoyo: true,
    repeat: 4
});

gsap.to(".box3", {
    duration: 2,
    delay: 4,
    x: 1050,
    borderRadius: "50%",
    rotation: 360,
    scale: 0.2,
    yoyo: true,
    repeat: 4
});

gsap.to(".box4", {
    duration: 2,
    delay: 5,
    x: 1000,
    borderRadius: "50%",
    rotation: 360,
    scale: 0.2,
    yoyo: true,
    repeat: 4
});