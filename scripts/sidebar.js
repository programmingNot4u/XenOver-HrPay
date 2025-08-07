// this code handel sidebar and top nav,
// main continer responsiveness also handel by this code base
// conatiner responsiveness mean after colapising it resize the full container

// Initialize Lucide icons
lucide.createIcons();

class DashboardManager {
  constructor() {
    // DOM Elements
    this.sidebar = document.getElementById("sidebar");
    this.sidebarToggle = document.getElementById("sidebarToggle");
    this.mainContent = document.getElementById("mainContent");
    this.mobileOverlay = document.getElementById("mobileOverlay");
    this.userMenuButton = document.getElementById("userMenuButton");
    this.userDropdown = document.getElementById("userDropdown");

    // State
    this.isMobile = window.innerWidth < 1024;
    this.sidebarOpen = !this.isMobile; // Open by default on desktop

    this.init();
  }

  init() {
    this.updateSidebarState();
    this.bindEvents();
  }

  bindEvents() {
    this.sidebarToggle.addEventListener("click", () => this.toggleSidebar());
    this.mobileOverlay.addEventListener("click", () => this.closeSidebar());
    this.userMenuButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleUserDropdown();
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !this.userDropdown.contains(e.target) &&
        !this.userMenuButton.contains(e.target)
      ) {
        this.closeUserDropdown();
      }
    });

    // Handle submenus
    document.querySelectorAll(".submenu-toggle").forEach((toggle) => {
      toggle.addEventListener("click", () => this.toggleSubmenu(toggle));
    });

    // Responsive handling
    window.addEventListener("resize", () => this.handleResize());

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (this.isMobile && this.sidebarOpen) this.closeSidebar();
        this.closeUserDropdown();
      }
    });
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    this.updateSidebarState();
    this.sidebarToggle.setAttribute(
      "aria-expanded",
      this.sidebarOpen.toString()
    );
  }

  closeSidebar() {
    if (this.isMobile) {
      this.sidebarOpen = false;
      this.updateSidebarState();
      this.sidebarToggle.setAttribute("aria-expanded", "false");
    }
  }

  updateSidebarState() {
    if (this.isMobile) {
      // Mobile-specific behavior
      this.mainContent.style.marginLeft = "0";
      if (this.sidebarOpen) {
        this.sidebar.style.transform = "translateX(0)";
        this.sidebar.classList.add("shadow-xl");
        this.mobileOverlay.classList.remove("hidden");
        this.mobileOverlay.style.opacity = "1";
        document.body.classList.add("overflow-hidden");
      } else {
        this.sidebar.style.transform = "translateX(-100%)";
        this.sidebar.classList.remove("shadow-xl");
        this.mobileOverlay.style.opacity = "0";
        setTimeout(() => this.mobileOverlay.classList.add("hidden"), 300);
        document.body.classList.remove("overflow-hidden");
      }
    } else {
      // Desktop behavior
      this.mobileOverlay.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
      if (this.sidebarOpen) {
        this.sidebar.style.transform = "translateX(0)";
        this.mainContent.style.marginLeft = this.sidebar.offsetWidth + "px";
      } else {
        this.sidebar.style.transform = "translateX(-100%)";
        this.mainContent.style.marginLeft = "0";
      }
    }
  }

  handleResize() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth < 1024;

    if (wasMobile !== this.isMobile) {
      this.sidebarOpen = !this.isMobile;
      this.updateSidebarState();
      this.sidebarToggle.setAttribute(
        "aria-expanded",
        this.sidebarOpen.toString()
      );
    } else {
      // Recalculate margin on resize if sidebar is open on desktop
      if (!this.isMobile && this.sidebarOpen) {
        this.mainContent.style.marginLeft = this.sidebar.offsetWidth + "px";
      }
    }
  }

  toggleUserDropdown() {
    const isHidden = this.userDropdown.classList.contains("hidden");
    if (isHidden) {
      this.userDropdown.classList.remove("hidden");
      requestAnimationFrame(() => {
        this.userDropdown.style.opacity = "1";
        this.userDropdown.style.transform = "scale(1)";
      });
    } else {
      this.closeUserDropdown();
    }
    this.userMenuButton.setAttribute("aria-expanded", !isHidden);
  }

  closeUserDropdown() {
    this.userDropdown.style.opacity = "0";
    this.userDropdown.style.transform = "scale(0.95)";
    setTimeout(() => this.userDropdown.classList.add("hidden"), 200);
    this.userMenuButton.setAttribute("aria-expanded", "false");
  }

  toggleSubmenu(toggle) {
    const submenuId = toggle.dataset.submenu + "-submenu";
    const submenu = document.getElementById(submenuId);
    const chevron = toggle.querySelector('[data-lucide="chevron-down"]');
    const isOpen = submenu.classList.contains("open");

    if (isOpen) {
      submenu.classList.remove("open");
      chevron.style.transform = "rotate(0deg)";
      toggle.setAttribute("aria-expanded", "false");
    } else {
      // Optional: Close other open submenus
      // document.querySelectorAll('.submenu.open').forEach(openSubmenu => {
      //     if(openSubmenu !== submenu) {
      //         openSubmenu.classList.remove('open');
      //         // also update its toggle button and icon
      //     }
      // });
      submenu.classList.add("open");
      chevron.style.transform = "rotate(180deg)";
      toggle.setAttribute("aria-expanded", "true");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new DashboardManager();
});

// Toggle the opening and aplication in dashboard

// Get references to the buttons and content sections
const openingsBtn = document.getElementById("openings-btn");
const applicantsBtn = document.getElementById("applicants-btn");
const openingsContent = document.getElementById("openings-content");
const applicantsContent = document.getElementById("applicants-content");

// Define the style classes for active and inactive buttons
const activeClasses = ["bg-orange-500", "text-white", "shadow"];
const inactiveClasses = ["text-gray-600"];

// Add a click event listener to the Openings button
openingsBtn.addEventListener("click", () => {
  // Show openings content and hide applicants content
  openingsContent.classList.remove("hidden");
  applicantsContent.classList.add("hidden");

  // Style the Openings button as active
  openingsBtn.classList.add(...activeClasses);
  openingsBtn.classList.remove(...inactiveClasses);

  // Style the Applicants button as inactive
  applicantsBtn.classList.add(...inactiveClasses);
  applicantsBtn.classList.remove(...activeClasses);
});

// Add a click event listener to the Applicants button
applicantsBtn.addEventListener("click", () => {
  // Show applicants content and hide openings content
  applicantsContent.classList.remove("hidden");
  openingsContent.classList.add("hidden");

  // Style the Applicants button as active
  applicantsBtn.classList.add(...activeClasses);
  applicantsBtn.classList.remove(...inactiveClasses);

  // Style the Openings button as inactive
  openingsBtn.classList.add(...inactiveClasses);
  openingsBtn.classList.remove(...activeClasses);
});
