// Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll(".counter")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const duration = 2000
    const increment = target / (duration / 16)
    let current = 0

    const updateCounter = () => {
      current += increment
      if (current < target) {
        counter.textContent = Math.floor(current)
        requestAnimationFrame(updateCounter)
      } else {
        counter.textContent = target
      }
    }

    updateCounter()
  })
}

// Intersection Observer for Counter Animation
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounters()
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

const statsSection = document.querySelector(".stats-cards")
if (statsSection) {
  observer.observe(statsSection)
}

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const mobileMenu = document.querySelector(".mobile-menu")
const mobileMenuClose = document.querySelector(".mobile-menu-close")

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    mobileMenu.classList.add("active")
  })
}

if (mobileMenuClose) {
  mobileMenuClose.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
  })
}

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
    mobileMenu.classList.remove("active")
  }
})

// Accordion Functionality
const accordionHeaders = document.querySelectorAll(".accordion-header")

accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const accordionItem = header.parentElement
    const isActive = accordionItem.classList.contains("active")

    // Close all accordion items
    document.querySelectorAll(".accordion-item").forEach((item) => {
      item.classList.remove("active")
    })

    // Open clicked item if it wasn't active
    if (!isActive) {
      accordionItem.classList.add("active")
    }
  })
})

// Scroll to Top Button
const scrollTopBtn = document.querySelector(".scroll-top")

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add fade-in animation on scroll
const fadeElements = document.querySelectorAll(".stat-card, .icon-box, .accordion-item")

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")
        fadeObserver.unobserve(entry.target)
      }
    })
  },
  {
    threshold: 0.1,
    rootMargin: "0px",
  },
)

fadeElements.forEach((element) => {
  fadeObserver.observe(element)
})
