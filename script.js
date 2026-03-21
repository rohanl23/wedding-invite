gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById("introVideo");

// FORCE VIDEO PLAY
video.play().catch(() => {
  console.log("Autoplay blocked");
});

// SEAMLESS TRANSITION
video.addEventListener("ended", () => {

  gsap.to("#introVideo", {
    opacity: 0,
    scale: 1.05,
    duration: 1.2,
    ease: "power2.out"
  });

  gsap.to(".ganesh-section", {
    opacity: 1,
    duration: 1.2,
    delay: 0.3
  });

  gsap.to(".shloka span", {
    opacity: 1,
    y: 0,
    stagger: 0.4,
    delay: 1
  });

});

// SCROLL TRANSITION
gsap.to(".panel", {
  yPercent: -100,
  ease: "none",
  stagger: 1,
  scrollTrigger: {
    trigger: "body",
    pin: true,
    scrub: 1,
    end: "+=4000"
  }
});

// TEXT ANIMATION
gsap.utils.toArray(".panel").forEach(panel => {
  gsap.from(panel.querySelector(".content"), {
    opacity: 0,
    y: 50,
    scrollTrigger: {
      trigger: panel,
      start: "top 80%",
      scrub: true
    }
  });
});
