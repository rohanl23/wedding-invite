gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById("introVideo");
let introDone = false;


// INTRO
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

  gsap.to(".scroll-indicator", {
    opacity: 1,
    duration: 1,
    delay: 3.5
  });

  gsap.to(".arrow", {
    y: 8,
    repeat: -1,
    yoyo: true,
    duration: 1
  });

  setTimeout(() => {
    document.body.style.overflow = "auto";
    initScroll();
    startPetals();
  }, 5000);
}


// 🌼 PETALS FIXED (START ABOVE SCREEN)
function startPetals() {

  const container = document.querySelector(".petals");

  for (let i = 0; i < 15; i++) {

    const petal = document.createElement("div");
    petal.classList.add("petal");

    petal.style.left = Math.random() * 100 + "%";
    petal.style.top = "-20vh"; // 🔥 FIXED START

    container.appendChild(petal);

    gsap.to(petal, {
      y: "120vh",
      x: "random(-40,40)",
      duration: "random(8,12)",
      repeat: -1,
      ease: "none",
      delay: Math.random() * 6
    });

  }

}


// ✨ TITLES ANIMATION (SLOW + ROYAL)
gsap.utils.toArray(".title span").forEach(el => {
  gsap.to(el, {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    duration: 3, // 🔥 slower
    ease: "power2.out",
    scrollTrigger: {
      trigger: el,
      start: "top 70%"
    }
  });
});


// PIN SCROLL
function initScroll() {

  const panels = gsap.utils.toArray(".panel");

  panels.forEach((panel) => {

    ScrollTrigger.create({
      trigger: panel,
      start: "top top",
      end: "+=100%",
      pin: true,
      pinSpacing: false
    });

  });

}