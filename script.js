gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById("introVideo");
let introDone = false;

// 🎬 FIXED INTRO TIMING
video.addEventListener("timeupdate", () => {

  if (!video.duration) return;

  const triggerTime = video.duration - 3;

  if (video.currentTime >= triggerTime && !introDone) {
    introDone = true;
    playIntroAnimation();
  }

});

function playIntroAnimation() {

  gsap.to(".overlay", {
    opacity: 1,
    duration: 1.5
  });

  gsap.to(".ganesh", {
    opacity: 1,
    duration: 1.8,
    delay: 0.4
  });

  gsap.to(".line span", {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    stagger: 0.8,
    duration: 2.2,
    ease: "power1.out",
    delay: 0.8
  });

  setTimeout(() => {
    document.body.style.overflow = "auto";
    initScroll();
  }, 5000);
}


// 🔥 SIMPLE + CLEAN TRANSITIONS (NO WEIRD FEEL)
function initScroll() {

  const panels = gsap.utils.toArray(".panel");

  panels.forEach((panel, i) => {

    if (i === 0) return;

    // next section fades in
    gsap.fromTo(panel,
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: panel,
          start: "top 90%",
          end: "top 40%",
          scrub: true
        }
      }
    );

    // current moves slightly up
    gsap.to(panels[i - 1], {
      y: -50,
      opacity: 0.8,
      scrollTrigger: {
        trigger: panel,
        start: "top 90%",
        end: "top 40%",
        scrub: true
      }
    });

  });

}