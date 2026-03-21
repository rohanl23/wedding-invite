gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById("introVideo");

let introDone = false;

// WAIT FOR VIDEO METADATA
video.addEventListener("loadedmetadata", () => {

  const triggerTime = video.duration - 1.5;

  const interval = setInterval(() => {

    if (video.currentTime >= triggerTime && !introDone) {
      introDone = true;
      clearInterval(interval);
      playIntroAnimation();
    }

  }, 100);

});

function playIntroAnimation() {

  // show overlay
  gsap.to(".overlay", {
    opacity: 1,
    duration: 1
  });

  // ganesh fade
  gsap.to(".ganesh", {
    opacity: 1,
    duration: 1,
    delay: 0.2
  });

  // magical reveal
  gsap.to(".line span", {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    stagger: 0.4,
    duration: 1.2,
    ease: "power2.out",
    delay: 0.4
  });

  // unlock scroll AFTER animation
  setTimeout(() => {
    document.body.style.overflow = "auto";
    initScroll();
  }, 2500);
}


// 🔥 CLEAN TRANSITIONS
function initScroll() {

  const panels = gsap.utils.toArray(".panel");

  panels.forEach((panel, i) => {

    if (i === 0) return;

    gsap.fromTo(panel,
      {
        opacity: 0,
        scale: 1.05
      },
      {
        opacity: 1,
        scale: 1,
        scrollTrigger: {
          trigger: panel,
          start: "top 85%",
          end: "top 40%",
          scrub: true
        }
      }
    );

  });

}