// ===== SKILLS SLIDER =====
let index = 0;
const track = document.getElementById("skillsTrack");
const slides = document.querySelectorAll(".skills-slide");

let sliderInterval;

function startSlider() {
  if (!track || slides.length <= 1) return;

  sliderInterval = setInterval(() => {
    index++;
    if (index >= slides.length) index = 0;

    track.style.transform = `translateX(-${index * 100}%)`;
  }, 3000);
}

function stopSlider() {
  clearInterval(sliderInterval);
}

// start slider
startSlider();

// pause on hover (better UX)
if (track) {
  track.addEventListener("mouseenter", stopSlider);
  track.addEventListener("mouseleave", startSlider);
}


// ===== MODAL =====
const modal = document.getElementById("skillsModal");

function openSkillsModal() {
  if (!modal) return;
  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // prevent background scroll
}

function closeSkillsModal() {
  if (!modal) return;
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// close on outside click
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeSkillsModal();
  }
});

// close on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeSkillsModal();
  }
});


// ===== TOGGLE PROJECTS =====
function toggleOthers() {
  const sec = document.getElementById("other-projects");
  const btn = document.getElementById("otherBtn");

  sec.classList.toggle("show-section");

  btn.textContent = sec.classList.contains("show-section")
    ? "Hide Projects"
    : "Other Projects";
}

function toggleMore() {
  const sec = document.getElementById("more-projects");
  const btn = document.getElementById("moreBtn");

  sec.classList.toggle("show-section");

  btn.textContent = sec.classList.contains("show-section")
    ? "View Less"
    : "View More";
}


// ===== SCROLL + NAV + REVEAL (OPTIMIZED) =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");
const cards = document.querySelectorAll(".card, .skill-card");

let ticking = false;

function handleScroll() {
  let current = "";

  sections.forEach(section => {
    const top = section.offsetTop - 150;
    const height = section.offsetHeight;

    if (scrollY >= top && scrollY < top + height) {
      current = section.getAttribute("id");
    }

    // reveal sections
    if (section.getBoundingClientRect().top < window.innerHeight - 100) {
      section.classList.add("active");
    }
  });

  // nav active link
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });

  // stagger card animation (only once)
  cards.forEach((card, i) => {
    if (
      card.getBoundingClientRect().top < window.innerHeight - 80 &&
      !card.classList.contains("show")
    ) {
      setTimeout(() => {
        card.classList.add("show");
      }, i * 100);
    }
  });
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScroll();
      ticking = false;
    });
    ticking = true;
  }
});


// ===== MOBILE MENU =====
const nav = document.getElementById("navLinks");
const hamburger = document.querySelector(".hamburger");

function toggleMenu() {
  nav.classList.toggle("show");
}

// close after clicking link
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("show");
  });
});

// close when clicking outside
document.addEventListener("click", (e) => {
  if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
    nav.classList.remove("show");
  }
});