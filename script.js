gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById("introVideo");

// PLAY VIDEO
video.play().catch(() => {});

// AFTER VIDEO ENDS
video.addEventListener("ended", () => {

  // Show Ganesh
  gsap.to(".overlay", {
    opacity: 1,
    duration: 1.5
  });

  // Animate shloka
  gsap.to(".shloka span", {
    opacity: 1,
    y: 0,
    stagger: 0.5,
    delay: 0.8
  });

  // Enable scroll AFTER intro
  document.body.style.overflowY = "auto";

  initScrollAnimations();
});

// INIT SCROLL
function initScrollAnimations() {

  // MORPH / SLIDE EFFECT
  gsap.to(".panel", {
    yPercent: -100,
    ease: "none",
    stagger: 1,
    scrollTrigger: {
      trigger: ".panel",
      start: "top top",
      end: "+=4000",
      scrub: 1,
      pin: true
    }
  });

  // TEXT FADE-IN
  gsap.utils.toArray(".content").forEach(content => {
    gsap.from(content, {
      opacity: 0,
      y: 40,
      scrollTrigger: {
        trigger: content,
        start: "top 80%",
        scrub: true
      }
    });
  });
}
