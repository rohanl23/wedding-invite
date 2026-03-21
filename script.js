gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById("introVideo");

let introDone = false;

video.addEventListener("loadedmetadata", () => {

  const triggerTime = video.duration - 1; // 🔥 START EARLIER

  const interval = setInterval(() => {

    if (video.currentTime >= triggerTime && !introDone) {
      introDone = true;
      clearInterval(interval);
      playIntroAnimation();
    }

  }, 100);

});

function playIntroAnimation() {

  // overlay
  gsap.to(".overlay", {
    opacity: 1,
    duration: 1.2
  });

  // ganesh
  gsap.to(".ganesh", {
    opacity: 1,
    duration: 1.5,
    delay: 0.3
  });

  // 🔥 SLOWER MAGICAL REVEAL
  gsap.to(".line span", {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    stagger: 0.6,        // slower gap between lines
    duration: 1.6,       // slower reveal
    ease: "power2.out",
    delay: 0.6
  });

  // unlock scroll AFTER full animation
  setTimeout(() => {
    document.body.style.overflow = "auto";
    initScroll();
  }, 3500); // increased delay

}


// scroll (same)
function initScroll() {

  const panels = gsap.utils.toArray(".panel");

  panels.forEach((panel, i) => {

    if (i === 0) return;

    gsap.fromTo(panel,
      { opacity: 0, scale: 1.05 },
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