gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById("introVideo");

let introDone = false;
let haldiPlayed = false;


// INTRO
video.addEventListener("timeupdate", () => {

  if (!video.duration) return;

  if (video.currentTime >= video.duration - 3 && !introDone) {
    introDone = true;
    playIntro();
  }

});


function playIntro() {

  gsap.to(".overlay", { opacity: 1, duration: 1.5 });

  gsap.to(".ganesh", {
    opacity: 1,
    duration: 1.5
  });

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


// HALDI SEQUENCE (UPDATED TIMING ONLY)
function playHaldiSequence() {

  if (haldiPlayed) return;
  haldiPlayed = true;

  document.body.style.overflow = "hidden";

  const tl = gsap.timeline({
    onComplete: () => {
      document.body.style.overflow = "auto";
    }
  });

  tl.to(".haldi-title", { opacity: 1, duration: 1.5 })
    .to(".poetry", { opacity: 1, y: -10, duration: 1.2 }, "+=0.4")
    .to(".datetime-block", { opacity: 1, y: -10, duration: 1.2 }, "+=0.4")
    .to(".venue-block", { opacity: 1, y: -10, duration: 1.2 }, "+=0.4");

}


// TRIGGER HALDI
ScrollTrigger.create({
  trigger: ".haldi",
  start: "top center",
  onEnter: playHaldiSequence
});


// PETALS (ONLY START POSITION FIXED)
function startPetals() {

  const container = document.querySelector(".petals");

  for (let i = 0; i < 15; i++) {

    const petal = document.createElement("div");
    petal.classList.add("petal");

    petal.style.left = Math.random() * 100 + "%";
    petal.style.top = "5vh"; // ✅ fixed

    container.appendChild(petal);

    gsap.to(petal, {
      y: "110vh",
      duration: "random(8,12)",
      repeat: -1,
      ease: "none"
    });

  }

}

ScrollTrigger.create({
  trigger: ".haldi",
  start: "top 80%",
  onEnter: startPetals
});


// PIN
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