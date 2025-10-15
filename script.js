// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Affirmations
const affirmations = [
  "You light up every room you walk into.",
  "Your kindness changes the people around you.",
  "Even on tough days, your courage is real.",
  "I believe in you. Fully. Always.",
  "Resting is brave. Healing is brave.",
  "You don’t have to do it all today—you’re enough."
];
let affIndex = 0;
const affText = document.getElementById("affirmationText");
document.getElementById("nextAffirmation").addEventListener("click", () => {
  affIndex = (affIndex + 1) % affirmations.length;
  affText.textContent = affirmations[affIndex];
});
document.getElementById("prevAffirmation").addEventListener("click", () => {
  affIndex = (affIndex - 1 + affirmations.length) % affirmations.length;
  affText.textContent = affirmations[affIndex];
});

// Gallery lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
document.querySelectorAll(".grid img").forEach(img => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.style.display = "flex";
    lightbox.setAttribute("aria-hidden", "false");
  });
});
document.getElementById("closeLightbox").addEventListener("click", () => {
  lightbox.style.display = "none";
  lightbox.setAttribute("aria-hidden", "true");
});
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
    lightbox.setAttribute("aria-hidden", "true");
  }
});

// Confetti
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
let W, H, pieces;
function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function makePieces(n = 140) {
  const colors = ["#7a5cff", "#ff7ab6", "#ffd166", "#06d6a0", "#118ab2"];
  pieces = Array.from({ length: n }, () => ({
    x: Math.random() * W,
    y: Math.random() * -H,
    r: 2 + Math.random() * 4,
    d: 2 + Math.random() * 3,
    tilt: Math.random() * 10,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  pieces.forEach(p => {
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.y += p.d;
    p.x += Math.sin(p.y * 0.02);
    if (p.y > H + 20) {
      p.y = -20;
      p.x = Math.random() * W;
    }
  });
  requestAnimationFrame(draw);
}

document.getElementById("celebrateBtn").addEventListener("click", () => {
  makePieces(180);
  draw();
  // gentle pulse on button
  const btn = document.getElementById("celebrateBtn");
  btn.style.transform = "scale(1.03)";
  setTimeout(() => (btn.style.transform = ""), 500);
});
