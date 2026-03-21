gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById("introVideo");

// TRY PLAY VIDEO
video.play().then(() => {
  console.log("Video playing");
}).catch(() => {
  console.log("Autoplay blocked");
  showGanesh(); // fallback
});

// IF VIDEO ENDS
video.addEventListener("ended", () => {
  showGanesh();
});

// FALLBACK (if video stuck)
setTimeout(() => {
  if (video.currentTime === 0) {
    showGanesh();
  }
}, 2000);

// MAIN FUNCTION
function showGanesh() {

  // show overlay
  gsap.to(".overlay", {
    opacity: 1,
    duration: 1.5
  });

  // animate text
  gsap.to(".shloka span", {
    opacity: 1,
    y: 0,
    stagger: 0.5,
    delay: 0.5
  });

  // unlock scroll
  document.body.style.overflow = "auto";

  initScroll();
}

// SCROLL EFFECT
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
