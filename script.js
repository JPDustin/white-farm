// ==========================================
// PARALLAX SCROLLING EFFECTS
// ==========================================

function parallaxScroll() {
  const scrolled = window.pageYOffset;

  // Parallax backgrounds
  const parallaxElements = document.querySelectorAll(".parallax-bg");
  parallaxElements.forEach((element) => {
    // Skip parallax effect for image-parallax and transition-quote sections
    if (
      element.closest(".image-parallax") ||
      element.closest(".transition-quote")
    )
      return;

    const speed = element.classList.contains("parallax-slow")
      ? 0.5
      : element.classList.contains("parallax-medium")
      ? 0.3
      : 0.7;

    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });

  // Optional cinematic fade blending between sections
  const sections = document.querySelectorAll(".story-section");
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const fadePoint = window.innerHeight * 0.8;
    const opacity = 1 - Math.max(0, (rect.top - fadePoint) / fadePoint);
    section.style.opacity = Math.max(0.2, Math.min(1, opacity));
  });
}

// ==========================================
// FADE IN ON SCROLL
// ==========================================

function fadeInOnScroll() {
  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight * 0.85 && elementBottom > 0) {
      element.classList.add("visible");
    }
  });
}

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

function navbarScroll() {
  const navbar = document.getElementById("navbar");
  if (window.pageYOffset > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

// ==========================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ==========================================

function smoothScrollLinks() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navHeight = document.getElementById("navbar").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          navHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    });
  });
}

// ==========================================
// ACTIVE NAVIGATION HIGHLIGHT
// ==========================================

function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const scrollPosition = window.pageYOffset + 200;
    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

// ==========================================
// ANIMATE STATS ON SCROLL
// ==========================================

function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number");
  statNumbers.forEach((stat) => {
    if (stat.dataset.animated) return;

    const rect = stat.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      stat.dataset.animated = "true";
      const finalValue = stat.textContent;
      const isNumber = !isNaN(parseFloat(finalValue));

      if (isNumber) {
        const value = parseFloat(finalValue);
        const duration = 2000;
        const steps = 60;
        const stepValue = value / steps;
        let currentValue = 0;

        const interval = setInterval(() => {
          currentValue += stepValue;
          if (currentValue >= value) {
            stat.textContent = finalValue;
            clearInterval(interval);
          } else {
            stat.textContent = Math.floor(currentValue).toString();
          }
        }, duration / steps);
      }
    }
  });
}

// ==========================================
// LAZY LOAD IMAGES
// ==========================================

function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]");
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        obs.unobserve(img);
      }
    });
  });
  images.forEach((img) => observer.observe(img));
}

// ==========================================
// PARALLAX MOUSE MOVEMENT (SUBTLE)
// ==========================================

function parallaxMouse() {
  const cards = document.querySelectorAll(
    ".experience-card, .feature-item, .legacy-item"
  );
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
    });
  });
}

// ==========================================
// TIMELINE PROGRESS INDICATOR
// ==========================================

function updateTimelineProgress() {
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = scrollTop / docHeight;
  const timeline = document.getElementById("timeline");
  if (timeline) timeline.style.height = `${progress * 80}%`;
}

// ==========================================
// SCROLL PROGRESS BAR (TOP STRIP)
// ==========================================

function createScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.id = "scroll-progress";
  progressBar.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        height: 3px;
        background: linear-gradient(90deg, #654321, #D4A574);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const scrollable =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / scrollable) * 100;
    progressBar.style.width = scrolled + "%";
  });
}

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================

function setupMobileMenu() {
  const nav = document.querySelector(".nav-menu");
  const navContainer = document.querySelector(".nav-container");
  const hamburger = document.createElement("button");
  hamburger.classList.add("hamburger");
  hamburger.innerHTML = `<span></span><span></span><span></span>`;
  hamburger.style.cssText = `
        display: none; flex-direction: column; gap: 5px;
        background: none; border: none; cursor: pointer; padding: 10px;
    `;

  hamburger.querySelectorAll("span").forEach((span) => {
    span.style.cssText = `width:25px;height:3px;background:#654321;transition:all 0.3s ease;`;
  });

  const style = document.createElement("style");
  style.textContent = `
        @media (max-width: 768px) {
            .hamburger { display:flex !important; }
            .nav-menu {
                position:absolute; top:100%; left:0; right:0;
                background:white; flex-direction:column;
                padding:2rem; box-shadow:0 10px 30px rgba(0,0,0,0.1);
                display:none;
            }
            .nav-menu.active { display:flex !important; }
        }
    `;
  document.head.appendChild(style);

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
    hamburger.classList.toggle("active");
  });
  navContainer.appendChild(hamburger);

  document.querySelectorAll(".nav-link").forEach((link) =>
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      hamburger.classList.remove("active");
    })
  );
}

// ==========================================
// PERFORMANCE HELPERS
// ==========================================

function throttle(func, limit) {
  let inThrottle;
  return function () {
    if (!inThrottle) {
      func.apply(this, arguments);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

function debounce(func, wait) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), wait);
  };
}

// ==========================================
// SCROLL EVENTS
// ==========================================

const throttledScroll = throttle(() => {
  parallaxScroll();
  fadeInOnScroll();
  navbarScroll();
  updateActiveNav();
  animateStats();
  updateTimelineProgress();
}, 10);

window.addEventListener("scroll", throttledScroll);

// ==========================================
// RESIZE EVENT
// ==========================================

const debouncedResize = debounce(() => fadeInOnScroll(), 250);
window.addEventListener("resize", debouncedResize);

// ==========================================
// FADE-IN TRANSITION SECTIONS ON SCROLL
// ==========================================
function fadeInTransitionSections() {
  const transitions = document.querySelectorAll(".transition-quote");
  transitions.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
      section.classList.add("visible");
    }
  });
}

// integrate with scroll handler
window.addEventListener(
  "scroll",
  throttle(() => {
    fadeInTransitionSections();
  }, 50)
);

// also trigger on page load
document.addEventListener("DOMContentLoaded", fadeInTransitionSections);

// ==========================================
// INITIALIZE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  fadeInOnScroll();
  navbarScroll();
  smoothScrollLinks();
  lazyLoadImages();
  parallaxMouse();
  createScrollProgress();
  setupMobileMenu();
  updateTimelineProgress();
  setupRenoGallery();

  // Smooth body fade-in
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

// ==========================================
// RENOVATION GALLERY MODAL
// ==========================================

const renoGalleryPhotos = [
  {
    src: "assets/photos/reno/original-red-barn.webp",
    caption: "Original red barn before renovation",
  },
  {
    src: "assets/photos/reno/original-barn-roadside.webp",
    caption: "Original barn from roadside",
  },
  {
    src: "assets/photos/reno/barn-foundation-winter.webp",
    caption: "Barn foundation work during winter",
  },
  {
    src: "assets/photos/reno/timber-frame-roof-construction.webp",
    caption: "Timber frame roof construction",
  },
  {
    src: "assets/photos/reno/addition-framing-exterior.webp",
    caption: "Framing the new addition",
  },
  {
    src: "assets/photos/reno/covered-porch-timber-frame.webp",
    caption: "Building the outdoor kitchen timber frame",
  },
  {
    src: "assets/photos/reno/porch-timber-frame-fireplace.webp",
    caption: "Porch timber frame with outdoor fireplace",
  },
  {
    src: "assets/photos/reno/outdoor-fireplace-construction.webp",
    caption: "Constructing the outdoor fireplace",
  },
  {
    src: "assets/photos/reno/exterior-construction-tyvek-wrap.webp",
    caption: "Exterior construction",
  },
  {
    src: "assets/photos/reno/completed-porch-stone-pathway.webp",
    caption: "Completed porch with stone pathway",
  },
  {
    src: "assets/photos/reno/barn-interior-exposed-studs.webp",
    caption: "Barn interior with exposed studs",
  },
  {
    src: "assets/photos/reno/attic-framing-exposed-beams.webp",
    caption: "Attic framing with exposed beams",
  },
  {
    src: "assets/photos/reno/radiant-floor-heating.webp",
    caption: "Installing radiant floor heating system",
  },
  {
    src: "assets/photos/reno/interior-insulation-framing.webp",
    caption: "Interior insulation and framing work",
  },
  {
    src: "assets/photos/reno/vaulted-ceiling-wood-planks.webp",
    caption: "Vaulted ceiling with wood planks",
  },
  {
    src: "assets/photos/reno/kitchen-subway-tile-backsplash.webp",
    caption: "Kitchen subway tile backsplash installation",
  },
  {
    src: "assets/photos/reno/kitchen-island-corrugated-metal.webp",
    caption: "Kitchen island with corrugated metal accents",
  },
  {
    src: "assets/photos/reno/interior-construction-01.webp",
    caption: "Interior construction phase",
  },
  {
    src: "assets/photos/reno/interior-construction-02.webp",
    caption: "Interior construction phase",
  },
  {
    src: "assets/photos/reno/interior-construction-03.webp",
    caption: "Interior construction phase",
  },
  {
    src: "assets/photos/reno/interior-construction-04.webp",
    caption: "Interior construction phase",
  },
  {
    src: "assets/photos/reno/interior-construction-05.webp",
    caption: "Interior construction phase",
  },
  {
    src: "assets/photos/reno/interior-construction-06.webp",
    caption: "Interior construction phase",
  },
  {
    src: "assets/photos/reno/interior-construction-07.webp",
    caption: "Interior construction phase",
  },
  {
    src: "assets/photos/reno/interior-construction-08.webp",
    caption: "Interior construction phase",
  },
  {
    src: "assets/photos/reno/interior-construction-09.webp",
    caption: "Interior construction phase",
  },
  {
    src: "assets/photos/reno/interior-construction-10.webp",
    caption: "Interior construction phase",
  },
  {
    src: "assets/photos/reno/interior-construction-11.webp",
    caption: "Interior construction phase",
  },
  {
    src: "assets/photos/reno/interior-construction-12.webp",
    caption: "Interior construction phase",
  },
  {
    src: "assets/photos/reno/interior-construction-13.webp",
    caption: "Interior construction phase",
  },
  {
    src: "assets/photos/reno/interior-construction-14.webp",
    caption: "Interior construction phase",
  },
  {
    src: "assets/photos/reno/interior-construction-15.webp",
    caption: "Interior construction phase",
  },
  {
    src: "assets/photos/reno/interior-construction-16.webp",
    caption: "Interior construction phase",
  },
];

let currentPhotoIndex = 0;

function openRenoGallery(startIndex = 0) {
  currentPhotoIndex = startIndex;
  const modal = document.getElementById("renoGalleryModal");
  modal.classList.add("active");
  updateModalPhoto();
  document.body.style.overflow = "hidden";
}

function closeRenoGallery() {
  const modal = document.getElementById("renoGalleryModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

function updateModalPhoto() {
  const photo = renoGalleryPhotos[currentPhotoIndex];
  document.getElementById("modalImage").src = photo.src;
  document.getElementById("modalCaption").textContent = photo.caption;
  document.getElementById("modalCounter").textContent = `Photo ${
    currentPhotoIndex + 1
  } of ${renoGalleryPhotos.length}`;
}

function nextPhoto() {
  currentPhotoIndex = (currentPhotoIndex + 1) % renoGalleryPhotos.length;
  updateModalPhoto();
}

function prevPhoto() {
  currentPhotoIndex =
    (currentPhotoIndex - 1 + renoGalleryPhotos.length) %
    renoGalleryPhotos.length;
  updateModalPhoto();
}

function setupRenoGallery() {
  // Open gallery button
  const openButton = document.getElementById("openRenoGallery");
  if (openButton) {
    openButton.addEventListener("click", () => openRenoGallery(0));
  }

  // Close button
  const closeButton = document.getElementById("closeModal");
  if (closeButton) {
    closeButton.addEventListener("click", closeRenoGallery);
  }

  // Navigation buttons
  const nextButton = document.getElementById("nextPhoto");
  const prevButton = document.getElementById("prevPhoto");
  if (nextButton) nextButton.addEventListener("click", nextPhoto);
  if (prevButton) prevButton.addEventListener("click", prevPhoto);

  // Close on background click
  const modal = document.getElementById("renoGalleryModal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeRenoGallery();
      }
    });
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    const modal = document.getElementById("renoGalleryModal");
    if (modal && modal.classList.contains("active")) {
      if (e.key === "Escape") closeRenoGallery();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    }
  });
}

// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log(
  "%c✨ Welcome to The Richard White Farm ✨",
  "font-size:20px;color:#654321;font-weight:bold;"
);
console.log(
  "%cA journey through time from 1780 to today",
  "font-size:14px;color:#D4A574;"
);
