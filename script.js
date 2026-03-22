gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById("introVideo");
let introDone = false;
let petalsStarted = false;


// INTRO
video.addEventListener("timeupdate", () => {

  if (!video.duration) return;

  if (video.currentTime >= video.duration - 3 && !introDone) {
    introDone = true;
    playIntroAnimation();
  }

});


function playIntroAnimation() {

  gsap.to(".overlay", { opacity: 1, duration: 1.5 });

  gsap.to(".ganesh", { opacity: 1, duration: 1.5, delay: 0.5 });

  gsap.to(".line span", {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    stagger: 0.8,
    duration: 2
  });

  gsap.to(".scroll-indicator", { opacity: 1, delay: 3 });

  setTimeout(() => {
    document.body.style.overflow = "auto";
    initScroll();
  }, 5000);
}


// 🌼 PETALS FROM TOP
function startPetals() {

  if (petalsStarted) return;
  petalsStarted = true;

  const container = document.querySelector(".petals");

  for (let i = 0; i < 15; i++) {

    const petal = document.createElement("div");
    petal.classList.add("petal");

    petal.style.left = Math.random() * 100 + "%";
    petal.style.top = "0vh"; // 🔥 FIXED

    container.appendChild(petal);

    gsap.to(petal, {
      y: "110vh",
      x: "random(-40,40)",
      duration: "random(8,12)",
      repeat: -1,
      ease: "none",
      delay: Math.random() * 5
    });

  }

}


// trigger on haldi
ScrollTrigger.create({
  trigger: ".haldi",
  start: "top 80%",
  onEnter: startPetals
});


// ✨ TITLES
gsap.utils.toArray(".title span").forEach(el => {
  gsap.to(el, {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    duration: 3,
    scrollTrigger: {
      trigger: el,
      start: "top 70%"
    }
  });
});


// ✨ POETRY ANIMATION
gsap.from(".poetry", {
  opacity: 0,
  y: 30,
  duration: 1.5,
  scrollTrigger: {
    trigger: ".poetry",
    start: "top 80%"
  }
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