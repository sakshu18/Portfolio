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
  }, 3800);
}

function stopSlider() { clearInterval(sliderInterval); }

startSlider();
if (track) {
  track.addEventListener("mouseenter", stopSlider);
  track.addEventListener("mouseleave", startSlider);
}

// ===== MODAL =====
const modal = document.getElementById("skillsModal");

function openSkillsModal() {
  if (!modal) return;
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeSkillsModal() {
  if (!modal) return;
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

window.addEventListener("click", (e) => { if (e.target === modal) closeSkillsModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeSkillsModal(); });

// ===== TOGGLE OTHER PROJECTS =====
function toggleOtherProjects() {
  const otherProjects = document.getElementById("otherProjects");
  const btn = document.getElementById("otherProjectsBtn");
  
  if (!otherProjects) return;
  
  otherProjects.classList.toggle("show-section");
  
  if (otherProjects.classList.contains("show-section")) {
    btn.textContent = "▲ Hide Other Projects";
    btn.style.background = "linear-gradient(135deg, #2c3e66, #1e293b)";
    setTimeout(() => {
      otherProjects.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  } else {
    btn.textContent = "📁 Other Projects";
    btn.style.background = "linear-gradient(135deg, #1e293b, #2c3e66)";
    
    const moreProjects = document.getElementById("moreProjects");
    const viewMoreBtn = document.getElementById("viewMoreBtn");
    if (moreProjects && moreProjects.classList.contains("show-section")) {
      moreProjects.classList.remove("show-section");
      if (viewMoreBtn) viewMoreBtn.textContent = "📁 View More";
    }
  }
}

// ===== TOGGLE VIEW MORE PROJECTS =====
function toggleViewMore() {
  const moreProjects = document.getElementById("moreProjects");
  const btn = document.getElementById("viewMoreBtn");
  
  if (!moreProjects) return;
  
  moreProjects.classList.toggle("show-section");
  
  if (moreProjects.classList.contains("show-section")) {
    btn.textContent = "▼ View Less";
    setTimeout(() => {
      moreProjects.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  } else {
    btn.textContent = "📁 View More";
  }
}

// ===== SCROLL HANDLER =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");
const allAnimated = document.querySelectorAll(".card, .skill-card, .experience-item, .achievement-card");
const revealElements = document.querySelectorAll(".reveal");

function handleScroll() {
  let current = "";
  const scrollPos = window.scrollY + 120;
  
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollPos >= top && scrollPos < top + height) {
      current = section.getAttribute("id");
    }
    if (section.getBoundingClientRect().top < window.innerHeight - 100) {
      section.classList.add("active");
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove("active");
    const href = link.getAttribute("href")?.substring(1);
    if (href === current) link.classList.add("active");
  });
  
  revealElements.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
  
  allAnimated.forEach((item, i) => {
    if (item.getBoundingClientRect().top < window.innerHeight - 80 && !item.classList.contains("show")) {
      setTimeout(() => item.classList.add("show"), i * 50);
    }
  });
  
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    backToTop.classList.toggle("visible", window.scrollY > 500);
  }
}

let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => { handleScroll(); ticking = false; });
    ticking = true;
  }
});

window.addEventListener("load", () => {
  handleScroll();
  startSlider();
  createBackToTop();
});

// ===== MOBILE MENU =====
const nav = document.getElementById("navLinks");
const hamburger = document.querySelector(".hamburger");

function toggleMenu() {
  nav.classList.toggle("show");
  const spans = document.querySelectorAll(".hamburger span");
  if (nav.classList.contains("show")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
  } else {
    spans.forEach(span => { span.style.transform = "rotate(0)"; span.style.opacity = "1"; });
  }
}

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("show");
    document.querySelectorAll(".hamburger span").forEach(span => {
      span.style.transform = "rotate(0)";
      span.style.opacity = "1";
    });
  });
});

document.addEventListener("click", (e) => {
  if (nav && hamburger && !nav.contains(e.target) && !hamburger.contains(e.target)) {
    nav.classList.remove("show");
    document.querySelectorAll(".hamburger span").forEach(span => {
      span.style.transform = "rotate(0)";
      span.style.opacity = "1";
    });
  }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navbarHeight = 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});

function downloadResume() {
  alert("📄 Resume available upon request. Please email sakshisss2004@gmail.com for the latest copy.");
}

const skillCards = document.querySelectorAll(".skill-card");
skillCards.forEach(card => {
  card.addEventListener("click", () => openSkillsModal());
});

function createBackToTop() {
  if (document.getElementById("backToTop")) return;
  const backToTop = document.createElement('button');
  backToTop.innerHTML = '↑';
  backToTop.id = 'backToTop';
  document.body.appendChild(backToTop);
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

document.querySelectorAll('img').forEach(img => {
  img.addEventListener('contextmenu', (e) => e.preventDefault());
});