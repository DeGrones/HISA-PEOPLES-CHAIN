// ===== PAGE NAVIGATION FUNCTIONALITY =====
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show the selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');

        // Scroll to top of page smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    const activeLink = document.querySelector(`[data-page="${pageId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}
// ===== MOBILE MENU FUNCTIONALITY =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
function closeMobileMenu() {
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('mobile-open');
        navMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
        document.body.classList.remove('dropdown-open');
        hamburger.setAttribute('aria-expanded', 'false');
    }

    // Close all dropdowns
    document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
        dropdown.classList.remove('show');
    });
    document.querySelectorAll('.projects-link, .whitepapers-link').forEach(link => {
        link.classList.remove('active');
    });
}
if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = navMenu.classList.contains('mobile-open');

        if (isOpen) {
            closeMobileMenu();
        } else {
            hamburger.classList.add('active');
            navMenu.classList.add('mobile-open');
            navMenu.classList.add('open');
            document.body.classList.add('menu-open');
            hamburger.setAttribute('aria-expanded', 'true');
        }
    });
    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        const isClickInsideMenu = navMenu.contains(e.target);
        const isClickOnHamburger = hamburger.contains(e.target);

        if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('mobile-open')) {
            closeMobileMenu();
        }
    });
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            if (window.innerWidth > 900) {
                closeMobileMenu();
            }
        }, 250);
    });
}

// Close dropdowns when clicking on overlay (mobile)
document.addEventListener('click', function (e) {
    if (document.body.classList.contains('dropdown-open')) {
        // Check if click is outside any dropdown menu
        const isClickInsideDropdown = e.target.closest('.dropdown-menu');
        const isClickOnNavIcon = e.target.closest('.projects-link, .whitepapers-link');

        if (!isClickInsideDropdown && !isClickOnNavIcon) {
            // Close all dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
                dropdown.classList.remove('show');
            });
            document.querySelectorAll('.projects-link, .whitepapers-link').forEach(link => {
                link.classList.remove('active');
            });
            document.body.classList.remove('dropdown-open');
        }
    }
});
// ===== NAVIGATION LINK FUNCTIONALITY =====
// Handle regular nav links (Home)
document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const pageId = this.getAttribute('data-page');

        if (pageId) {
            showPage(pageId);
            closeMobileMenu();
        }
    });
});
// ===== DROPDOWN FUNCTIONALITY (FIXED) =====
document.querySelectorAll('.projects-link, .whitepapers-link').forEach(parentLink => {
    const dropdown = parentLink.querySelector('.dropdown-menu');
    const arrow = parentLink.querySelector('.dropdown-arrow');
    // Function to check if we're in mobile view
    function isMobileView() {
        return window.innerWidth <= 900;
    }
    // Desktop: hover behavior
    if (!isMobileView()) {
        parentLink.addEventListener('mouseenter', function () {
            if (dropdown) {
                dropdown.classList.add('show');
                parentLink.classList.add('active');
            }
        });

        parentLink.addEventListener('mouseleave', function () {
            if (dropdown) {
                dropdown.classList.remove('show');
                parentLink.classList.remove('active');
            }
        });
    }
    // Mobile/Desktop: click behavior for the entire parent link
    parentLink.addEventListener('click', function (e) {
        if (isMobileView()) {
            // Safety check: if we clicked a link inside the dropdown, let it behave naturally
            if (e.target.closest('.dropdown-menu a')) {
                return;
            }

            e.preventDefault();
            e.stopPropagation();

            const isOpen = dropdown && dropdown.classList.contains('show');

            // Close other dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('show');
                }
            });

            document.querySelectorAll('.projects-link, .whitepapers-link').forEach(link => {
                if (link !== parentLink) {
                    link.classList.remove('active');
                }
            });

            // Toggle current dropdown
            if (dropdown) {
                if (isOpen) {
                    dropdown.classList.remove('show');
                    parentLink.classList.remove('active');
                    document.body.classList.remove('dropdown-open');
                } else {
                    dropdown.classList.add('show');
                    parentLink.classList.add('active');
                    document.body.classList.add('dropdown-open');
                }
            }
        }
    });
});
// Handle dropdown menu links
document.querySelectorAll('.dropdown-menu a').forEach(dropdownLink => {
    dropdownLink.addEventListener('click', function (e) {
        // Stop bubbling so parent doesn't toggle
        e.stopPropagation();

        // Close mobile menu eventually (optional, but good for cleanliness)
        // We do NOT prevent default here - let the link navigate
        closeMobileMenu();
    });
});
// ===== MODAL FUNCTIONALITY =====
const exploreEcosystemBtn = document.getElementById('exploreEcosystemBtn');
const viewWhitepapersBtn = document.getElementById('viewWhitepapersBtn');
const ecosystemModal = document.getElementById('ecosystemModal');
const whitepapersModal = document.getElementById('whitepapersModal');
const comingSoonModal = document.getElementById('comingSoonModal');
const closeEcosystemModal = document.getElementById('closeEcosystemModal');
const closeWhitepapersModal = document.getElementById('closeWhitepapersModal');
const closeComingSoonModal = document.getElementById('closeComingSoonModal');
function openModal(modal) {
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}
function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}
// Ecosystem Modal
if (exploreEcosystemBtn) {
    exploreEcosystemBtn.addEventListener('click', () => openModal(ecosystemModal));
}
if (closeEcosystemModal) {
    closeEcosystemModal.addEventListener('click', () => closeModal(ecosystemModal));
}
// Whitepapers Modal
if (viewWhitepapersBtn) {
    viewWhitepapersBtn.addEventListener('click', () => openModal(whitepapersModal));
}
if (closeWhitepapersModal) {
    closeWhitepapersModal.addEventListener('click', () => closeModal(whitepapersModal));
}
// Coming Soon Modal
if (closeComingSoonModal) {
    closeComingSoonModal.addEventListener('click', () => closeModal(comingSoonModal));
}
// Community links
document.querySelectorAll('.community-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(comingSoonModal);
    });
});
// Close modals when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === ecosystemModal) closeModal(ecosystemModal);
    if (event.target === whitepapersModal) closeModal(whitepapersModal);
    if (event.target === comingSoonModal) closeModal(comingSoonModal);
});
// Close modals with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal(ecosystemModal);
        closeModal(whitepapersModal);
        closeModal(comingSoonModal);
    }
});
// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function () {
    // Show home page by default
    showPage('home');
});
