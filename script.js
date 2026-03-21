gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById("introVideo");
let introDone = false;


// 🎬 INTRO TIMING
video.addEventListener("timeupdate", () => {

  if (!video.duration) return;

  const triggerTime = video.duration - 3;

  if (video.currentTime >= triggerTime && !introDone) {
    introDone = true;
    playIntroAnimation();
  }

});


function playIntroAnimation() {

  gsap.to(".overlay", { opacity: 1, duration: 1.5 });

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


// 🔥 MASTER SCROLL EXPERIENCE
function initScroll() {

  const panels = gsap.utils.toArray(".panel");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: document.body,
      start: "top top",
      end: "+=" + (panels.length * 100) + "%",
      scrub: 1,
      pin: true
    }
  });


  // 👉 INTRO → FIRST PAGE
  tl.to(".intro", {
    opacity: 0,
    duration: 1
  });


  panels.forEach((panel, i) => {

    // fade in current
    tl.from(panel, {
      opacity: 0,
      duration: 1
    });

    // fade out after
    if (i !== panels.length - 1) {
      tl.to(panel, {
        opacity: 0,
        duration: 1
      });
    }

  });

}