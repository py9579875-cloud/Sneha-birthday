const startBtn = document.getElementById("startBtn");
const giftBtn = document.getElementById("giftBtn");
const againBtn = document.getElementById("againBtn");
const musicBtn = document.getElementById("musicBtn");
const music = document.getElementById("music");

startBtn.addEventListener("click", () => {
  document.querySelector(".intro").scrollIntoView({ behavior: "smooth" });
  startHearts();
  tryPlayMusic();
});

giftBtn.addEventListener("click", () => {
  launchConfetti();
  document.getElementById("final").scrollIntoView({ behavior: "smooth" });
  startHearts(18);
});

againBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function tryPlayMusic() {
  music.play().then(() => {
    musicBtn.textContent = "❚❚";
  }).catch(() => {
    // Browsers may require a local music file and/or a user gesture.
  });
}

musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play().then(() => musicBtn.textContent = "❚❚").catch(() => {
      alert("Add a file named birthday-song.mp3 beside index.html to use the music button.");
    });
  } else {
    music.pause();
    musicBtn.textContent = "♫";
  }
});

// Reveal sections as the visitor scrolls.
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Local photo uploads. Images are only stored in the browser for this session.
document.querySelectorAll(".photo-input").forEach(input => {
  input.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const slot = input.closest(".photo-slot");
    const reader = new FileReader();

    reader.onload = e => {
      slot.style.backgroundImage = `url("${e.target.result}")`;
      slot.classList.add("has-photo");
      slot.setAttribute("aria-label", "Memory photo");
    };

    reader.readAsDataURL(file);
  });
});

let heartTimer;

function startHearts(count = 8) {
  for (let i = 0; i < count; i++) {
    setTimeout(createHeart, i * 350);
  }

  if (!heartTimer) {
    heartTimer = setInterval(createHeart, 1700);
  }
}

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = Math.random() > .25 ? "♥" : "♡";
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.fontSize = `${10 + Math.random() * 18}px`;
  heart.style.animationDuration = `${5 + Math.random() * 5}s`;
  document.getElementById("hearts").appendChild(heart);

  setTimeout(() => heart.remove(), 11000);
}

function launchConfetti() {
  const container = document.getElementById("confetti");

  for (let i = 0; i < 100; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.animationDelay = `${Math.random() * .8}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    piece.style.width = `${5 + Math.random() * 7}px`;
    piece.style.height = `${8 + Math.random() * 10}px`;
    piece.style.background = ["#f2a7b8", "#ffd9e2", "#e8c78a", "#ffffff"][Math.floor(Math.random() * 4)];
    container.appendChild(piece);

    setTimeout(() => piece.remove(), 5000);
  }
}

startHearts(4);
