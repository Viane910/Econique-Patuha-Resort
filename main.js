document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const closeDrawer = document.getElementById("close-drawer");
  const overlay = document.getElementById("mobile-menu-overlay");

  function openDrawer() {
    mobileDrawer.classList.add("open");
    overlay.classList.add("active");
    hamburgerMenu.classList.add("active");
  }

  function closeDrawerFunction() {
    mobileDrawer.classList.remove("open");
    overlay.classList.remove("active");
    hamburgerMenu.classList.remove("active");
  }

  hamburgerMenu.addEventListener("click", openDrawer);
  closeDrawer.addEventListener("click", closeDrawerFunction);
  overlay.addEventListener("click", closeDrawerFunction);

  const drawerMenuItems = document.querySelectorAll(".drawer-menu-item");
  drawerMenuItems.forEach((item) => {
    item.addEventListener("click", function () {
      closeDrawerFunction();
    });
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && mobileDrawer.classList.contains("open")) {
      closeDrawerFunction();
    }
  });

  // Animasi transisi section saat scroll
  function revealSectionsOnScroll() {
    const sections = document.querySelectorAll("section");
    const triggerBottom = window.innerHeight * 0.85;
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < triggerBottom) {
        section.classList.add("visible");
      } else {
        section.classList.remove("visible");
      }
    });
  }
  window.addEventListener("scroll", revealSectionsOnScroll);
  window.addEventListener("DOMContentLoaded", revealSectionsOnScroll);

  // Gallery popup feature
  const galleryImgs = document.querySelectorAll(".gallery-img");
  const popupOverlay = document.getElementById("popup-overlay");
  const popupImg = document.getElementById("popup-img");
  const popupClose = document.getElementById("popup-close");

  galleryImgs.forEach((img) => {
    img.addEventListener("click", function () {
      popupImg.src = this.src;
      popupOverlay.classList.add("active");
    });
    img.addEventListener("touchstart", function () {
      popupImg.src = this.src;
      popupOverlay.classList.add("active");
    });
  });

  function closePopup() {
    popupOverlay.classList.remove("active");
    popupImg.src = "";
  }
  popupOverlay.addEventListener("click", function (e) {
    if (e.target === popupOverlay || e.target === popupClose) {
      closePopup();
    }
  });
  document.addEventListener("keydown", function (e) {
    if (
      popupOverlay.classList.contains("active") &&
      (e.key === "Escape" || e.key === "Esc")
    ) {
      closePopup();
    }
  });
});
