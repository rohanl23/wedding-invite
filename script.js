gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById("introVideo");

let introDone = false;

// 🎬 PERFECT TIMING (RELIABLE)
video.addEventListener("timeupdate", () => {

  if (!video.duration) return;

  const triggerTime = video.duration - 3;

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

  // unlock scroll AFTER animation
  setTimeout(() => {
    document.body.style.overflow = "auto";
    initScroll();
  }, 5000);
}


// 🔥 PREMIUM TRANSITIONS
function initScroll() {

  const panels = gsap.utils.toArray(".panel");

  panels.forEach((panel, i) => {

    if (i === 0) return;

    // next panel enters
    gsap.fromTo(panel,
      {
        y: 100,
        scale: 1.1,
        opacity: 0
      },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: panel,
          start: "top 90%",
          end: "top 30%",
          scrub: 1
        }
      }
    );

    // previous fades
    gsap.to(panels[i - 1], {
      scale: 0.95,
      opacity: 0.6,
      scrollTrigger: {
        trigger: panel,
        start: "top 90%",
        end: "top 30%",
        scrub: 1
      }
    });

  });

}