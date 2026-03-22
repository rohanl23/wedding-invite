gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById("introVideo");
let introDone = false;
let petalsStarted = false;

// 🔒 LOCK SCROLL INITIALLY
document.body.style.overflow = "hidden";

// INTRO
video.addEventListener("timeupdate", () => {
  if (!video.duration) return;

  if (video.currentTime >= video.duration - 3 && !introDone) {
    introDone = true;
    playIntroAnimation();
  }
});

function playIntroAnimation() {

  const tl = gsap.timeline({
    onComplete: () => {
      document.body.style.overflow = "auto"; // ✅ unlock after intro
      initScroll();
    }
  });

  tl.to(".overlay", { opacity: 1, duration: 1.2 })

    // ✅ GANESH FIRST
    .to(".ganesh", { opacity: 1, duration: 1.2 })

    // ✅ SHLOKA AFTER
    .to(".line span", {
      clipPath: "inset(0 0% 0 0)",
      opacity: 1,
      stagger: 0.6,
      duration: 1.5
    })

    .to(".scroll-indicator", { opacity: 1, duration: 1 }, "-=0.5");
}


// PETALS
function startPetals() {

  if (petalsStarted) return;
  petalsStarted = true;

  const container = document.querySelector(".petals");

  for (let i = 0; i < 15; i++) {

    const petal = document.createElement("div");
    petal.classList.add("petal");

    petal.style.left = Math.random() * 100 + "%";
    petal.style.top = "0vh";

    container.appendChild(petal);

    gsap.to(petal, {
      y: "120vh",
      x: "random(-40,40)",
      duration: "random(6,10)",
      repeat: -1,
      ease: "none",
      delay: Math.random() * 2
    });

  }

}


// 🔒 HALDI SCROLL LOCK
ScrollTrigger.create({
  trigger: ".haldi",
  start: "top 80%",
  onEnter: () => {

    document.body.style.overflow = "hidden"; // lock

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "auto"; // unlock
      }
    });

    tl.to(".haldi-title span", {
      clipPath: "inset(0 0% 0 0)",
      opacity: 1,
      duration: 2
    })

    .from(".haldi .poetry", {
      opacity: 0,
      duration: 1.2
    })

    .from(".datetime-block", {
      opacity: 0,
      y: 20,
      duration: 1
    })

    .from(".venue-block", {
      opacity: 0,
      y: 20,
      duration: 1
    });

    startPetals(); // not part of lock
  }
});


// TITLES
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