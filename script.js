gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById("introVideo");
let introDone = false;

video.addEventListener("timeupdate", () => {
  if (!video.duration) return;

  if (video.currentTime >= video.duration - 3 && !introDone) {
    introDone = true;
    playIntroAnimation();
  }
});

function playIntroAnimation() {
  gsap.timeline({
    onComplete: () => {
      document.body.style.overflow = "auto";
      initScroll();
    }
  })
  .to(".overlay", { opacity: 1 })
  .to(".ganesh", { opacity: 1 })
  .to(".line span", { opacity: 1, stagger: 0.5 })
  .to(".scroll-indicator", { opacity: 1 });
}

// Haldi
ScrollTrigger.create({
  trigger: ".haldi",
  onEnter: () => {
    gsap.timeline()
      .from(".haldi .poetry", { opacity: 0 })
      .from(".datetime-block", { opacity: 0 })
      .from(".venue-block", { opacity: 0 });
  }
});

// Ring
ScrollTrigger.create({
  trigger: ".ring",
  onEnter: () => {
    lottie.loadAnimation({
      container: document.getElementById("sparkles"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "./assets/sparkles.json"
    });

    gsap.timeline()
      .from(".ring .poetry", { opacity: 0 })
      .from(".ring .datetime-block", { opacity: 0 })
      .from(".ring .venue-block", { opacity: 0 });
  }
});

// Wedding
ScrollTrigger.create({
  trigger: ".wedding",
  onEnter: () => {
    gsap.timeline()
      .from(".wedding-subtitle", { opacity: 0 })
      .from(".wedding .datetime-block", { opacity: 0 })
      .from(".wedding .venue-block", { opacity: 0 });
  }
});

function initScroll() {
  document.body.style.overflow = "auto";
}