gsap.registerPlugin(ScrollTrigger);

// INTRO
setTimeout(() => {

  gsap.to(".overlay", {
    opacity: 1,
    duration: 1.5
  });

  gsap.to(".shloka span", {
    opacity: 1,
    y: 0,
    stagger: 0.4,
    delay: 0.5
  });

  document.body.style.overflow = "auto";

  initScroll();

}, 2500);


// 🔥 REAL TRANSITION EFFECT
function initScroll() {

  const panels = gsap.utils.toArray(".panel");

  panels.forEach((panel, i) => {

    if (i === 0) return;

    gsap.from(panel, {
      opacity: 0,
      scale: 0.95,
      duration: 1,

      scrollTrigger: {
        trigger: panel,
        start: "top 85%",
        end: "top 50%",
        scrub: true
      }
    });

  });

}