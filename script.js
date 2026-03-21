gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById("introVideo");
let introDone = false;


// 🎬 INTRO
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


// 🔥 PINNED EXPERIENCE
function initScroll() {

  const panels = gsap.utils.toArray(".panel");

  panels.forEach((panel, i) => {

    // PIN EACH SECTION
    ScrollTrigger.create({
      trigger: panel,
      start: "top top",
      end: "+=100%",
      pin: true,
      pinSpacing: false
    });

    // FADE IN
    gsap.from(panel, {
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: panel,
        start: "top 80%",
        end: "top 30%",
        scrub: true
      }
    });

  });

}