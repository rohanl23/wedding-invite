gsap.registerPlugin(ScrollTrigger);

// 🔥 ALWAYS SHOW GANESH AFTER 3 SEC (NO DEPENDENCY ON VIDEO)
setTimeout(() => {

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

  initScroll();

}, 3000);

// 🔥 SCROLL FIX (NO BLACK SCREEN)
function initScroll() {

  const panels = gsap.utils.toArray(".panel");

  gsap.to(panels, {
    yPercent: -100 * (panels.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: panels[0],
      start: "top top",
      end: () => "+=" + window.innerHeight * (panels.length - 1),
      scrub: 1,
      pin: true
    }
  });

}