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

function stopSlider() {
  clearInterval(sliderInterval);
}

// Initialize slider
startSlider();

// Pause on hover for better UX
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
  document.body.style.paddingRight = "10px"; // Prevent layout shift
}

function closeSkillsModal() {
  if (!modal) return;
  modal.style.display = "none";
  document.body.style.overflow = "auto";
  document.body.style.paddingRight = "0";
}

// Close modal on outside click
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeSkillsModal();
  }
});

// Close modal on ESC key
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
    ? "▲ Hide Projects" 
    : "📁 Other Projects";
  
  // Smooth scroll to section when opening
  if (sec.classList.contains("show-section")) {
    setTimeout(() => {
      sec.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }
}

function toggleMore() {
  const sec = document.getElementById("more-projects");
  const btn = document.getElementById("moreBtn");
  
  sec.classList.toggle("show-section");
  
  btn.textContent = sec.classList.contains("show-section") 
    ? "▼ View Less" 
    : "📁 View More";
}

// ===== SCROLL + NAV + REVEAL (OPTIMIZED) =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");
const cards = document.querySelectorAll(".card, .skill-card");
const revealElements = document.querySelectorAll(".reveal");

let ticking = false;

function handleScroll() {
  let current = "";
  const scrollPos = window.scrollY + 150;
  
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    
    if (scrollPos >= top && scrollPos < top + height) {
      current = section.getAttribute("id");
    }
    
    // Reveal sections when they come into view
    if (section.getBoundingClientRect().top < window.innerHeight - 100) {
      section.classList.add("active");
    }
  });
  
  // Update active nav link
  navLinks.forEach(link => {
    link.classList.remove("active");
    const href = link.getAttribute("href")?.substring(1);
    if (href === current) {
      link.classList.add("active");
    }
  });
  
  // Reveal elements
  revealElements.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
  
  // Stagger card animations
  cards.forEach((card, i) => {
    if (
      card.getBoundingClientRect().top < window.innerHeight - 80 &&
      !card.classList.contains("show")
    ) {
      setTimeout(() => {
        card.classList.add("show");
      }, i * 80);
    }
  });
}

// Throttled scroll handler
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScroll();
      ticking = false;
    });
    ticking = true;
  }
});

// Initial call
window.addEventListener("load", () => {
  handleScroll();
  startSlider();
});

// ===== MOBILE MENU =====
const nav = document.getElementById("navLinks");
const hamburger = document.querySelector(".hamburger");

function toggleMenu() {
  nav.classList.toggle("show");
  
  // Animate hamburger icon
  if (nav.classList.contains("show")) {
    document.querySelectorAll(".hamburger span").forEach((span, i) => {
      if (i === 0) span.style.transform = "rotate(45deg) translate(5px, 5px)";
      if (i === 1) span.style.opacity = "0";
      if (i === 2) span.style.transform = "rotate(-45deg) translate(5px, -5px)";
    });
  } else {
    document.querySelectorAll(".hamburger span").forEach((span, i) => {
      span.style.transform = "rotate(0)";
      span.style.opacity = "1";
    });
  }
}

// Close menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("show");
    // Reset hamburger icon
    document.querySelectorAll(".hamburger span").forEach(span => {
      span.style.transform = "rotate(0)";
      span.style.opacity = "1";
    });
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (nav && hamburger && !nav.contains(e.target) && !hamburger.contains(e.target)) {
    nav.classList.remove("show");
    // Reset hamburger icon
    document.querySelectorAll(".hamburger span").forEach(span => {
      span.style.transform = "rotate(0)";
      span.style.opacity = "1";
    });
  }
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== RESUME BUTTON =====
const resumeBtn = document.querySelector(".resume-btn .btn");
if (resumeBtn) {
  resumeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("📄 Resume available upon request. Please email sakshisss2004@gmail.com for the latest copy.");
  });
}

// ===== ADD HOVER EFFECT TO SKILL CARDS =====
const skillCards = document.querySelectorAll(".skill-card");
skillCards.forEach(card => {
  card.addEventListener("click", () => {
    openSkillsModal();
  });
});

// ===== PREVENT CONTEXT MENU ON IMAGES =====
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('contextmenu', (e) => e.preventDefault());
});

// ===== ADD LOADING ANIMATION =====
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

// ===== BACK TO TOP BUTTON (Optional Feature) =====
const backToTop = document.createElement('button');
backToTop.innerHTML = '↑';
backToTop.id = 'backToTop';
backToTop.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1e293b, #2c3e66);
  color: white;
  border: none;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 999;
  font-size: 24px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.style.opacity = '1';
    backToTop.style.visibility = 'visible';
  } else {
    backToTop.style.opacity = '0';
    backToTop.style.visibility = 'hidden';
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});