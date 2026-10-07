// ========================================
// CELERITY DRINKS & FOODS - MAIN SCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // MOBILE NAVIGATION
    // ========================================

    const toggle = document.getElementById("menuToggle");
    const nav = document.getElementById("mainNav");
    const header = document.querySelector(".site-header");

    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            nav.classList.toggle("open");
            toggle.classList.toggle("active");

            const isOpen = nav.classList.contains("open");
            toggle.setAttribute("aria-expanded", isOpen);
        });

        // Close mobile menu after clicking a navigation link
        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("open");
                toggle.classList.remove("active");
                toggle.setAttribute("aria-expanded", "false");
            });
        });
    }


    // ========================================
    // HEADER SCROLL EFFECT
    // ========================================

    const updateHeader = () => {
        if (!header) return;

        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader);


    // ========================================
    // AUTOMATIC CURRENT PAGE NAVIGATION
    // ========================================

    let currentPage = window.location.pathname.split("/").pop();

    if (!currentPage) {
        currentPage = "index.html";
    }

    document.querySelectorAll(".main-nav a").forEach(link => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });


    // ========================================
    // AUTO YEAR IN FOOTER
    // ========================================

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    // ========================================
    // SCROLL REVEAL ANIMATIONS
    // ========================================

    const animatedElements = document.querySelectorAll(
        ".section .container > *, " +
        ".product-card, " +
        ".div-card, " +
        ".why-item, " +
        ".page-hero .container > *, " +
        ".footer-grid > div"
    );

    animatedElements.forEach((element, index) => {
        element.classList.add("reveal");

        // Small stagger between elements
        element.style.setProperty(
            "--reveal-delay",
            `${Math.min(index * 60, 300)}ms`
        );
    });

    // Respect users who prefer reduced motion
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
        document.querySelectorAll(".reveal").forEach(element => {
            element.classList.add("visible");
        });
    } else {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        document.querySelectorAll(".reveal").forEach(element => {
            revealObserver.observe(element);
        });
    }


    // ========================================
    // WHATSAPP FLOATING BUTTON
    // ========================================

    // Main Celerity WhatsApp number
    const whatsappNumber = "2349013041084";

    const whatsappMessage =
        "Hello Celerity Drinks & Foods! I would like to make an enquiry about your products/services.";

    // Don't create another button if one already exists
    if (!document.querySelector(".whatsapp-float")) {

        const whatsappButton = document.createElement("a");

        whatsappButton.className = "whatsapp-float";
        whatsappButton.href =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        whatsappButton.target = "_blank";
        whatsappButton.rel = "noopener noreferrer";

        whatsappButton.setAttribute(
            "aria-label",
            "Chat with Celerity Drinks & Foods on WhatsApp"
        );

        whatsappButton.innerHTML = `
            <i class="fa-brands fa-whatsapp"></i>
            <span>Chat on WhatsApp</span>
        `;

        document.body.appendChild(whatsappButton);
    }


    // ========================================
    // ORDER / ENQUIRY BUTTONS
    // ========================================

    /*
        When someone clicks an Order / Enquire / Book button,
        we remember what they were interested in.

        The contact page can use this information later
        to make the enquiry experience smoother.
    */

    const enquiryButtons = document.querySelectorAll(
        'a[href="contact.html"]'
    );

    enquiryButtons.forEach(button => {

        const buttonText = button.textContent.trim().toLowerCase();

        const isEnquiryButton =
            buttonText.includes("order") ||
            buttonText.includes("enquire") ||
            buttonText.includes("book");

        if (!isEnquiryButton) return;

        button.addEventListener("click", () => {

            let enquiryType = "General Enquiry";

            if (
                buttonText.includes("ice")
            ) {
                enquiryType = "Ice Solutions";
            }

            if (
                buttonText.includes("van")
            ) {
                enquiryType = "Coldroom Van Hire";
            }

            if (
                buttonText.includes("order")
            ) {
                const card = button.closest(".product-card");

                if (card) {
                    const productName =
                        card.querySelector("h3");

                    if (productName) {
                        enquiryType =
                            productName.textContent.trim();
                    }
                }
            }

            sessionStorage.setItem(
                "celerityEnquiryType",
                enquiryType
            );
        });
    });


    // ========================================
    // CONTACT FORM - LOAD SAVED ENQUIRY
    // ========================================

    const enquiryField =
        document.querySelector("#enquiryType");

    if (enquiryField) {

        const savedEnquiry =
            sessionStorage.getItem("celerityEnquiryType");

        if (savedEnquiry) {
            enquiryField.value = savedEnquiry;

            // Remove it after using it
            sessionStorage.removeItem("celerityEnquiryType");
        }
    }


    // ========================================
    // CAREERS APPLY BUTTON
    // ========================================

    const applyButtons =
        document.querySelectorAll(".apply-btn");

    applyButtons.forEach(button => {
        button.addEventListener("click", () => {

            const role =
                button.dataset.role || "Career Application";

            sessionStorage.setItem(
                "celerityEnquiryType",
                role
            );
        });
    });


    // ========================================
    // BUTTON RIPPLE EFFECT
    // ========================================

    document.querySelectorAll(".btn").forEach(button => {

        button.addEventListener("click", function (event) {

            const ripple =
                document.createElement("span");

            ripple.classList.add("button-ripple");

            const rect =
                this.getBoundingClientRect();

            const size =
                Math.max(rect.width, rect.height);

            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;

            ripple.style.left =
                `${event.clientX - rect.left - size / 2}px`;

            ripple.style.top =
                `${event.clientY - rect.top - size / 2}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

});