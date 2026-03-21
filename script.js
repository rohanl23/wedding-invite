gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById("introVideo");

// ✅ MOBILE DETECTION
if (window.innerWidth < 768) {
  video.style.display = "none";

  showGanesh();
} else {

  // VIDEO ENDS → SHOW GANESH
  video.onended = () => {
    gsap.to("#introVideo", { opacity: 0, duration: 1 });
    showGanesh();
  };

  // FALLBACK (if video fails)
  setTimeout(() => {
    if (video.paused) {
      gsap.to("#introVideo", { opacity: 0, duration: 1 });
      showGanesh();
    }
  }, 2000);
}

// FUNCTION
function showGanesh() {
  gsap.to(".ganesh-section", {
    opacity: 1,
    duration: 1
  });

  gsap.to(".shloka span", {
    opacity: 1,
    y: 0,
    stagger: 0.4,
    delay: 0.5
  });
}

// SCROLL EFFECT
gsap.to(".panel", {
  yPercent: -100,
  ease: "none",
  stagger: 1,
  scrollTrigger: {
    trigger: "body",
    pin: true,
    scrub: 1,
    end: "+=4000"
  }
});

// TEXT ANIMATION
gsap.utils.toArray(".panel").forEach(panel => {
  gsap.from(panel.querySelector(".content"), {
    opacity: 0,
    y: 50,
    scrollTrigger: {
      trigger: panel,
      start: "top 80%",
      scrub: true
    }
  });
});