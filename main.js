document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu functionality
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const closeDrawer = document.getElementById("close-drawer");
  const overlay = document.getElementById("mobile-menu-overlay");

  function openDrawer() {
    if (mobileDrawer && overlay && hamburgerMenu) {
      mobileDrawer.classList.add("open");
      overlay.classList.add("active");
      hamburgerMenu.classList.add("active");
    }
  }

  function closeDrawerFunction() {
    if (mobileDrawer && overlay && hamburgerMenu) {
      mobileDrawer.classList.remove("open");
      overlay.classList.remove("active");
      hamburgerMenu.classList.remove("active");
    }
  }

  // Add event listeners with null checks
  if (hamburgerMenu) {
    hamburgerMenu.addEventListener("click", openDrawer);
  }
  if (closeDrawer) {
    closeDrawer.addEventListener("click", closeDrawerFunction);
  }
  if (overlay) {
    overlay.addEventListener("click", closeDrawerFunction);
  }

  const drawerMenuItems = document.querySelectorAll(".drawer-menu-item");
  drawerMenuItems.forEach((item) => {
    item.addEventListener("click", function () {
      closeDrawerFunction();
    });
  });

  window.addEventListener("resize", function () {
    if (
      window.innerWidth > 768 &&
      mobileDrawer &&
      mobileDrawer.classList.contains("open")
    ) {
      closeDrawerFunction();
    }
  });

  // Section scroll animation
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
  // Call immediately to check initial state
  revealSectionsOnScroll();

  // Gallery popup functionality - Fixed version
  function initializeGalleryPopup() {
    const galleryImgs = document.querySelectorAll(".gallery-img");
    const popupOverlay = document.getElementById("popup-overlay");
    const popupImg = document.getElementById("popup-img");
    const popupClose = document.getElementById("popup-close");

    // Check if all required elements exist
    if (!popupOverlay || !popupImg) {
      console.warn(
        "Popup elements not found. Make sure popup-overlay and popup-img elements exist in HTML."
      );
      return;
    }

    function openPopup(imageSrc) {
      if (imageSrc) {
        popupImg.src = imageSrc;
        popupOverlay.classList.add("active");
        // Prevent body scrolling when popup is open
        document.body.style.overflow = "hidden";
      }
    }

    function closePopup() {
      popupOverlay.classList.remove("active");
      popupImg.src = "";
      // Restore body scrolling
      document.body.style.overflow = "";
    }

    // Add click listeners to gallery images
    galleryImgs.forEach((img) => {
      // Remove any existing listeners to prevent duplicates
      img.removeEventListener("click", handleImageClick);
      img.removeEventListener("touchstart", handleImageTouch);

      function handleImageClick(e) {
        e.preventDefault();
        e.stopPropagation();
        openPopup(this.src);
      }

      function handleImageTouch(e) {
        e.preventDefault();
        openPopup(this.src);
      }

      img.addEventListener("click", handleImageClick);
      img.addEventListener("touchstart", handleImageTouch, { passive: false });
    });

    // Close popup when clicking overlay or close button
    popupOverlay.addEventListener("click", function (e) {
      if (e.target === popupOverlay || e.target === popupClose) {
        closePopup();
      }
    });

    // Close popup with Escape key
    document.addEventListener("keydown", function (e) {
      if (
        popupOverlay.classList.contains("active") &&
        (e.key === "Escape" || e.key === "Esc")
      ) {
        closePopup();
      }
    });

    // Close popup when clicking the close button specifically
    if (popupClose) {
      popupClose.addEventListener("click", function (e) {
        e.stopPropagation();
        closePopup();
      });
    }
  }

  // Initialize gallery popup
  initializeGalleryPopup();

  // Re-initialize gallery popup when new images are dynamically added
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "childList") {
        const addedNodes = Array.from(mutation.addedNodes);
        const hasNewGalleryImages = addedNodes.some(
          (node) =>
            node.nodeType === 1 &&
            (node.classList?.contains("gallery-img") ||
              node.querySelector?.(".gallery-img"))
        );

        if (hasNewGalleryImages) {
          // Small delay to ensure DOM is fully updated
          setTimeout(initializeGalleryPopup, 100);
        }
      }
    });
  });

  // Start observing changes to the document
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});
