/* =========================
 LOADER
========================= */
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  if (!preloader) return;

  // First page load only
  if (!sessionStorage.getItem("firstLoadDone")) {
    sessionStorage.setItem("firstLoadDone", "true");

    setTimeout(() => {
      preloader.classList.add("hide");
    }, 1000);

  } else {
    // Hide instantly on other pages
    preloader.style.display = "none";
    preloader.classList.add("hide");
  }
});
/* =========================
   MOBILE MENU TOGGLE
========================= */
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

/* =========================
   CLOSE MOBILE MENU ON LINK CLICK
========================= */
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", (e) => {

    /* Prevent Programs from closing menu */
    if (link.classList.contains("programs-toggle") && window.innerWidth <= 991) {
      e.preventDefault();
      return;
    }

    navLinks.classList.remove("active");
  });
});

/* =========================
   STICKY NAVBAR SHADOW
========================= */
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");

  if (window.scrollY > 50) {
    header.style.background = "rgba(0,0,0,0.85)";
    header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.4)";
  } else {
    header.style.background = "rgba(0,0,0,0.5)";
    header.style.boxShadow = "none";
  }
});
/* =========================
   GLASS NAVBAR ON SCROLL
========================= */
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
/* =========================
   ACTIVE NAV LINK ON SCROLL
========================= */
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// imageopen
function openImage(img){
  document.getElementById("popup").style.display = "flex";
  document.getElementById("popupImg").src = img.src;
}

function closeImage(){
  document.getElementById("popup").style.display = "none";
}
// instabtn
const instaBtn = document.getElementById("instaBtn");
const footer = document.getElementById("footer");

window.addEventListener("scroll", () => {
  const footerTop = footer.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;

  if (footerTop < screenHeight) {
    instaBtn.classList.add("hide");
  } else {
    instaBtn.classList.remove("hide");
  }
});
// =========================
// PREMIUM HERO SLIDER FINAL
// =========================

document.addEventListener("DOMContentLoaded", () => {

  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const hero = document.querySelector(".hero");

  let index = 0;
  let autoSlide;

  // ✅ Safety check (IMPORTANT)
  if (!slides || slides.length === 0) return;

  // =========================
  // RESET ANIMATIONS
  // =========================
  function resetAnimations(slide) {
    if (!slide) return;

    const animatedElements = slide.querySelectorAll(
      ".hero-title, .hero-fade, .hero-btn-animate"
    );

    animatedElements.forEach((el) => {
      el.style.animation = "none";
      void el.offsetHeight; // force reflow
      el.style.animation = "";
    });
  }

  // =========================
  // SHOW SLIDE
  // =========================
  function showSlide(i) {
    slides.forEach((slide) => slide.classList.remove("active"));

    slides[i].classList.add("active");
    resetAnimations(slides[i]);
  }

  // =========================
  // NEXT / PREV
  // =========================
  function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
  }

  function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  }

  // =========================
  // AUTO SLIDE
  // =========================
  function startAutoSlide() {
    clearInterval(autoSlide);

    autoSlide = setInterval(() => {
      nextSlide();
    }, 5000);
  }

  // ✅ START AUTOMATIC SLIDER (IMPORTANT FIX)
  startAutoSlide();

  // =========================
  // BUTTON EVENTS
  // =========================
  nextBtn?.addEventListener("click", () => {
    nextSlide();
    startAutoSlide(); // reset timer
  });

  prevBtn?.addEventListener("click", () => {
    prevSlide();
    startAutoSlide(); // reset timer
  });

  // =========================
  // IMAGE LOADING EFFECT
  // =========================
  document.querySelectorAll(".slide img").forEach((img) => {
    if (img.complete) {
      img.classList.add("loaded");
    } else {
      img.addEventListener("load", () => {
        img.classList.add("loaded");
      });
    }
  });

  // =========================
  // MOBILE SWIPE SUPPORT
  // =========================
  let startX = 0;

  hero?.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  hero?.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
      nextSlide();
      startAutoSlide();
    }

    if (endX - startX > 50) {
      prevSlide();
      startAutoSlide();
    }
  }, { passive: true });

  // =========================
  // PAUSE WHEN TAB NOT ACTIVE
  // =========================
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearInterval(autoSlide);
    } else {
      startAutoSlide();
    }
  });

  // =========================
  // INIT FIRST SLIDE
  // =========================
  showSlide(index);

});
  // =========================
  // SAFE SCROLL REVEAL
  // =========================
const revealElements = document.querySelectorAll(
  ".reveal, .reveal-up, .reveal-down, .reveal-left, .reveal-right"
);

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  revealElements.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    const bottom = el.getBoundingClientRect().bottom;

    if (top < windowHeight - 80 && bottom > 50) {
      el.classList.add("active");
    } else {
      // 🔥 IMPORTANT: reset so it can animate again
      el.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll, { passive: true });
window.addEventListener("load", revealOnScroll);

revealOnScroll();

if (typeof showSlide === "function") {
  showSlide(index);
}

if (typeof startAutoSlide === "function") {
  startAutoSlide();
}
;
function openGallery(type) {
  const popup = document.getElementById("popup");
  const content = document.getElementById("popup-content");

  popup.style.display = "flex";

  // 🚀 STOP BACKGROUND SCROLL (IMPORTANT FIX)
  document.body.style.overflow = "hidden";
document.documentElement.style.overflow = "hidden"; // 🔥 ADD THIS
  

  if (type === "embroidery") {
    content.innerHTML = `
      <img src="images/e1.jpeg">
      <img src="images/e2.jpeg">
      <img src="images/e3.jpeg">
      <img src="images/e4.jpeg">
      <img src="images/e5.jpg">
      <img src="images/e6.jpg">
      
    `;
  }

  else if (type === "stitching") {
    content.innerHTML = `
      <img src="images/s1.jpeg">
      <img src="images/s2.jpeg">
      <img src="images/s3.jpeg">
      <img src="images/s4.jpeg">
      <img src="images/s5.jpeg">
      <img src="images/s6.jpeg">
      <img src="images/s7.png">
      <img src="images/s8.png">
    `;
  }

  else if (type === "custom") {
    content.innerHTML = `
      <img src="images/c1.jpeg">
      <img src="images/c2.jpeg">
      <img src="images/c3.jpeg">
      <img src="images/c4.jpeg">
      <img src="images/c5.jpeg">
      <img src="images/c6.jpeg">
      <img src="images/c7.jpeg">
    `;
  }
}
function closeGallery() {
  document.getElementById("popup").style.display = "none";

  // 🚀 RESTORE SCROLL
 document.body.style.overflow = "auto";
document.documentElement.style.overflow = "auto"; // 🔥 ADD THIS
}
  // form submit 
const form = document.querySelector(".contact-form");
const toast = document.getElementById("toast");

if (form) {

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const data = new FormData(form);

  const response = await fetch(form.action, {
    method: "POST",
    body: data,
    headers: { 'Accept': 'application/json' }
  });

  if (response.ok) {
    showToast("✨ Request sent successfully!", "success");
    form.reset();
  } else {
    showToast("❌ Something went wrong!", "error");
  }

});

}

/* TOAST FUNCTION */
function showToast(message, type = "success") {
  toast.innerText = message;

  toast.className = "toast show " + type;

  setTimeout(() => {
  toast.className = "toast";
}, 3000);
}
 // cenamatic 
// document.addEventListener("DOMContentLoaded", () => {
//   const elements = document.querySelectorAll(".cinematic");

//   function revealCinematic() {
//     const windowHeight = window.innerHeight;

//     elements.forEach((el) => {
//       const top = el.getBoundingClientRect().top;

//       if (top < windowHeight - 100) {
//         el.classList.add("active");
//       }
//     });
//   }

//   window.addEventListener("scroll", revealCinematic, { passive: true });
//   window.addEventListener("load", revealCinematic);

//   // run once on start
//   revealCinematic();
// });
