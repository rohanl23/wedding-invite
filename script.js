gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById("introVideo");

let introDone = false;

video.addEventListener("loadedmetadata", () => {

  const triggerTime = video.duration - 5; // 🔥 MUCH EARLIER START

  const interval = setInterval(() => {

    if (video.currentTime >= triggerTime && !introDone) {
      introDone = true;
      clearInterval(interval);
      playIntroAnimation();
    }

  }, 100);

});

function playIntroAnimation() {

  // overlay fade
  gsap.to(".overlay", {
    opacity: 1,
    duration: 1.5
  });

  // ganesh fade
  gsap.to(".ganesh", {
    opacity: 1,
    duration: 1.8,
    delay: 0.4
  });

  // 🔥 VERY SLOW, MAGICAL TEXT
  gsap.to(".line span", {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    stagger: 0.8,        // slower gap between lines
    duration: 2.2,       // slower reveal
    ease: "power1.out",  // softer motion
    delay: 0.8
  });

  // unlock scroll after full animation
  setTimeout(() => {
    document.body.style.overflow = "auto";
    initScroll();
  }, 5000); // longer lock for cinematic feel

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
          scrub: true
        }
      }
    );

  });

}
