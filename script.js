gsap.registerPlugin(ScrollTrigger);

// 🔥 INTRO TIMELINE (CONTROL EVERYTHING)
const tl = gsap.timeline({
  onComplete: () => {
    document.body.style.overflow = "auto";
    initScroll();
  }
});

// SHOW OVERLAY
tl.to(".overlay", {
  opacity: 1,
  duration: 1.2
});

// 🔥 LEFT → RIGHT TEXT REVEAL
tl.to(".line span", {
  x: 0,
  stagger: 0.5,
  duration: 1,
  ease: "power3.out"
}, "-=0.5");


// 🔥 MORPH-LIKE SCROLL
function initScroll() {

  const panels = gsap.utils.toArray(".panel");

  panels.forEach((panel, i) => {

    if (i === 0) return;

    gsap.fromTo(panel,
      {
        scale: 1.1,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
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