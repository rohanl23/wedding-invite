gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById("introVideo");
let introDone = false;
let petalsStarted = false;

/* INTRO */
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
      document.body.style.overflow = "auto";
      initScroll();
    }
  });

  tl.to(".overlay", { opacity: 1 })
    .to(".ganesh", { opacity: 1 })
    .to(".line span", {
      clipPath: "inset(0 0% 0 0)",
      opacity: 1,
      stagger: 0.5
    })
    .to(".scroll-indicator", { opacity: 1 });
}

/* PETALS */
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
      repeat: -1
    });
  }
}

/* CONFETTI */
function startConfetti() {
  const container = document.querySelector(".confetti-container");

  for (let i = 0; i < 40; i++) {
    const c = document.createElement("div");
    c.classList.add("confetti");

    c.style.left = Math.random() * 100 + "%";
    c.style.background = ["#FFD700", "#fff", "#ff69b4"][Math.floor(Math.random()*3)];

    container.appendChild(c);

    gsap.to(c, {
      y: "120vh",
      x: "random(-100,100)",
      rotation: 360,
      duration: "random(4,7)",
      repeat: -1
    });
  }
}

/* HALDI */
ScrollTrigger.create({
  trigger: ".haldi",
  start: "top 80%",
  onEnter: () => {
    gsap.timeline()
      .to(".haldi-title span", { opacity: 1 })
      .from(".haldi .poetry", { opacity: 0 })
      .from(".datetime-block", { opacity: 0 })
      .from(".venue-block", { opacity: 0 });

    startPetals();
  }
});

/* RING */
ScrollTrigger.create({
  trigger: ".ring",
  start: "top 80%",
  onEnter: () => {

    // RESTORE SPARKLES
    lottie.loadAnimation({
      container: document.getElementById("sparkles"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "./assets/sparkles.json"
    });

    gsap.timeline()
      .to(".ring-title span", { opacity: 1 })
      .from(".ring .poetry", { opacity: 0 })
      .from(".ring .datetime-block", { opacity: 0 })
      .from(".ring .venue-block", { opacity: 0 });
  }
});

/* WEDDING */
ScrollTrigger.create({
  trigger: ".wedding",
  start: "top 80%",
  onEnter: () => {
    startConfetti();

    gsap.timeline()
      .to(".wedding-title span", { opacity: 1 })
      .from(".wedding-subtitle", { opacity: 0 })
      .from(".wedding .datetime-block", { opacity: 0 })
      .from(".wedding .venue-block", { opacity: 0 });
  }
});

/* THANK YOU */
ScrollTrigger.create({
  trigger: ".thankyou",
  start: "top 80%",
  onEnter: () => {

    const tl = gsap.timeline();

    tl.from(".names", {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2
      })
      .from(".spaced-text", {
        opacity: 0,
        y: 20,
        duration: 1
      })
      .from(".thankyou-line", {
        opacity: 0,
        y: 20,
        duration: 1
      })
      .to(".thankyou-logo", {
        opacity: 1,
        clipPath: "circle(75%)",
        duration: 1.2
      })
      .to(".thankyou-logo", {
        scale: 1.05,
        filter: "drop-shadow(0 0 15px white)",
        yoyo: true,
        repeat: -1,
        duration: 1.5
      });

  }
});

/* PIN */
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