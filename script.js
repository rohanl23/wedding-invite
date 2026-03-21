gsap.registerPlugin(ScrollTrigger);

const overlay = document.querySelector(".overlay");

// 🔥 SIMPLE + RELIABLE (NO VIDEO DEPENDENCY)
setTimeout(() => {

  // SHOW GANESH
  gsap.to(overlay, {
    opacity: 1,
    duration: 1.5
  });

  gsap.from(".shloka span", {
    opacity: 0,
    y: 20,
    stagger: 0.4,
    delay: 0.5
  });

  // ENABLE SCROLL
  document.body.style.overflow = "auto";

  initScroll();

}, 2500);


// 🔥 CLEAN SCROLL (NO BLACK SCREEN)
function initScroll() {

  const panels = gsap.utils.toArray(".panel");

  panels.forEach((panel, i) => {

    ScrollTrigger.create({
      trigger: panel,
      start: "top top",
      pin: true,
      pinSpacing: false,
      end: "+=100%"
    });

  });

}