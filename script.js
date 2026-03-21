gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById("introVideo");

// 🔥 FORCE PLAY
video.muted = true;
video.play().catch(() => {
  console.log("Autoplay failed → fallback");
  showGanesh();
});

// 🔥 ALWAYS TRIGGER (FIX)
video.onended = showGanesh;

// 🔥 BACKUP (IMPORTANT)
setTimeout(() => {
  showGanesh();
}, 3000);

function showGanesh() {

  // prevent multiple triggers
  if (document.body.classList.contains("started")) return;
  document.body.classList.add("started");

  // show overlay
  gsap.to(".overlay", {
    opacity: 1,
    duration: 1.5
  });

  // animate text
  gsap.to(".shloka span", {
    opacity: 1,
    y: 0,
    stagger: 0.5,
    delay: 0.5
  });

  // unlock scroll
  document.body.style.overflow = "auto";

  initScroll();
}

function initScroll() {

  const panels = gsap.utils.toArray(".panel");

  gsap.to(panels, {
    yPercent: -100 * (panels.length - 1), // ✅ FIXED (NO EXTRA BLACK SCREEN)
    ease: "none",
    scrollTrigger: {
      trigger: ".panel",
      start: "top top",
      end: () => "+=" + window.innerHeight * panels.length,
      scrub: 1,
      pin: true
    }
  });

}
