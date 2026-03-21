gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById("introVideo");

let introDone = false;

// 🔥 RELIABLE TIMING FIX (NO INTERVAL)
video.addEventListener("timeupdate", () => {

  if (!video.duration) return;

  const triggerTime = video.duration - 3; // 3 sec before end

  if (video.currentTime >= triggerTime && !introDone) {
    introDone = true;
    playIntroAnimation();
  }

});

function playIntroAnimation() {

  // overlay
  gsap.to(".overlay", {
    opacity: 1,
    duration: 1.5
  });

  // ganesh
  gsap.to(".ganesh", {
    opacity: 1,
    duration: 1.8,
    delay: 0.4
  });

  // magical text
  gsap.to(".line span", {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    stagger: 0.8,
    duration: 2.2,
    ease: "power1.out",
    delay: 0.8
  });

  // unlock scroll
  setTimeout(() => {
    document.body.style.overflow = "auto";
    initScroll();
  }, 5000);
}


// scroll (unchanged)
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
          scrub: 1
        }
      }
    );

  });

}