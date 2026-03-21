gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById("introVideo");

video.play().catch(() => showGanesh());

video.addEventListener("ended", showGanesh);

setTimeout(() => {
  if (video.currentTime === 0) showGanesh();
}, 2000);

function showGanesh() {

  gsap.to(".overlay", {
    opacity: 1,
    duration: 1.5
  });

  gsap.to(".shloka span", {
    opacity: 1,
    y: 0,
    stagger: 0.5,
    delay: 0.5
  });

  document.body.style.overflow = "auto";

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
