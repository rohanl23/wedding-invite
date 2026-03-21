gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById("introVideo");

// Try autoplay
video.play().catch(() => {
  showGanesh(); // fallback
});

// When video ends
video.addEventListener("ended", () => {
  showGanesh();
});

// Fallback if video fails
setTimeout(() => {
  if (video.currentTime === 0) {
    showGanesh();
  }
}, 2000);

function showGanesh() {

  // Show overlay
  gsap.to(".overlay", {
    opacity: 1,
    duration: 1.5
  });

  // Animate shloka
  gsap.to(".shloka span", {
    opacity: 1,
    y: 0,
    stagger: 0.5,
    delay: 0.5
  });

  // Enable scroll
  document.body.style.overflow = "auto";

  initScroll();
}

function initScroll() {

  gsap.to(".panel", {
    yPercent: -100,
    stagger: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".panel",
      start: "top top",
      end: "+=3000",
      scrub: 1,
      pin: true
    }
  });

}
