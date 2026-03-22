gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById("introVideo");

let introDone = false;
let petalsStarted = false;

/* ========================= */
/* ROBUST SCROLL LOCK */
/* ========================= */

let scrollLocked = true;

function preventScroll(e) {
  e.preventDefault();
}

function lockScroll() {
  scrollLocked = true;

  document.body.style.overflow = "hidden";

  window.addEventListener("wheel", preventScroll, { passive: false });
  window.addEventListener("touchmove", preventScroll, { passive: false });
}

function unlockScroll() {
  scrollLocked = false;

  document.body.style.overflow = "auto";

  window.removeEventListener("wheel", preventScroll, { passive: false });
  window.removeEventListener("touchmove", preventScroll, { passive: false });
}

/* Start locked */
lockScroll();

/* ========================= */
/* INTRO */
/* ========================= */

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
      unlockScroll(); // unlock AFTER intro finishes
      initScroll();
    }
  });

  tl.to(".overlay", { opacity: 1, duration: 1.2 })
    .to(".ganesh", { opacity: 1, duration: 1.2 })
    .to(".line span", {
      clipPath: "inset(0 0% 0 0)",
      opacity: 1,
      stagger: 0.6,
      duration: 1.5
    })
    .to(".scroll-indicator", { opacity: 1 }, "-=0.5");
}

/* ========================= */
/* PETALS */
/* ========================= */

function startPetals() {
  if (petalsStarted) return;
  petalsStarted = true;

  const container = document.querySelector(".petals");

  for (let i = 0; i < 15; i++) {
    const petal = document.createElement("div");
    petal.classList.add("petal");

    petal.style.left = Math.random() * 100 + "%";
    container.appendChild(petal);

    gsap.to(petal, {
      y: "120vh",
      x: "random(-40,40)",
      duration: "random(6,10)",
      repeat: -1,
      ease: "none"
    });
  }
}

/* ========================= */
/* CONFETTI */
/* ========================= */

function startConfetti() {
  const container = document.querySelector(".confetti-container");

  for (let i = 0; i < 40; i++) {
    const c = document.createElement("div");
    c.classList.add("confetti");

    c.style.left = Math.random() * 100 + "%";
    c.style.background = ["#FFD700", "#FF69B4", "#FFFFFF"][Math.floor(Math.random()*3)];

    container.appendChild(c);

    gsap.to(c, {
      y: "120vh",
      x: "random(-100,100)",
      rotation: 360,
      duration: "random(4,7)",
      repeat: -1,
      ease: "none"
    });
  }
}

/* ========================= */
/* SPARKLES */
/* ========================= */

lottie.loadAnimation({
  container: document.getElementById("sparkles"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "./assets/sparkles.json"
});

/* ========================= */
/* HALDI (LOCKED) */
/* ========================= */

ScrollTrigger.create({
  trigger: ".haldi",
  start: "top top",
  onEnter: () => {

    lockScroll();

    const tl = gsap.timeline({
      onComplete: () => unlockScroll()
    });

    tl.to(".haldi-title span", { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 2 })
      .from(".haldi .poetry", { opacity: 0, y: 20, duration: 1 })
      .from(".haldi .datetime-block", { opacity: 0, y: 20, duration: 1 })
      .to(".haldi .venue-block", { opacity: 1, y: 0, duration: 1 });

    startPetals();
  }
});

/* ========================= */
/* RING (LOCKED) */
/* ========================= */

ScrollTrigger.create({
  trigger: ".ring",
  start: "top top",
  onEnter: () => {

    lockScroll();

    const tl = gsap.timeline({
      onComplete: () => unlockScroll()
    });

    tl.to(".ring-title span", { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 2 })
      .from(".ring .poetry", { opacity: 0, y: 20, duration: 1 })
      .from(".ring .datetime-block", { opacity: 0, y: 20, duration: 1 })
      .to(".ring .venue-block", { opacity: 1, y: 0, duration: 1 });
  }
});

/* ========================= */
/* WEDDING (LOCKED) */
/* ========================= */

ScrollTrigger.create({
  trigger: ".wedding",
  start: "top top",
  onEnter: () => {

    lockScroll();

    startConfetti();

    const tl = gsap.timeline({
      onComplete: () => unlockScroll()
    });

    tl.to(".wedding-title span", { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 2 })
      .from(".wedding-subtitle", { opacity: 0, y: 20, duration: 1 })
      .from(".wedding .datetime-block", { opacity: 0, y: 20, duration: 1 })
      .to(".wedding .venue-block", { opacity: 1, y: 0, duration: 1 });
  }
});

/* ========================= */
/* THANK YOU */
/* ========================= */

ScrollTrigger.create({
  trigger: ".thankyou",
  start: "top top",
  onEnter: () => {

    const tl = gsap.timeline();

    tl.to(".thankyou-logo", {
        opacity: 1,
        clipPath: "circle(75% at 50% 50%)",
        duration: 1.2
      })
      .to(".thankyou-names", { opacity: 1, duration: 1 })
      .to(".thankyou-request", { opacity: 1, duration: 1 })
      .to(".blessings", { opacity: 1, duration: 1 })
      .to(".thankyou-logo", {
        filter: "drop-shadow(0 0 15px rgba(255,255,255,0.8))",
        scale: 1.05,
        duration: 1.5,
        repeat: -1,
        yoyo: true
      });
  }
});

/* ========================= */
/* GLOBAL TITLES */
/* ========================= */

gsap.utils.toArray(".title span").forEach(el => {
  gsap.set(el, { clipPath: "inset(0 100% 0 0)", opacity: 0 });

  gsap.to(el, {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    duration: 2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: el,
      start: "top 75%"
    }
  });
});

/* ========================= */
/* PIN */
/* ========================= */

function initScroll() {
  const panels = gsap.utils.toArray(".panel");

  panels.forEach(panel => {
    ScrollTrigger.create({
      trigger: panel,
      start: "top top",
      end: "+=100%",
      pin: true,
      pinSpacing: false
    });
  });
}
