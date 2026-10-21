

(() => {
    "use strict"



      /* ========================================================
       01. INITIALIZATION
    ======================================================== */

    const startZidanVerse = () => {
        if (!document.body) return;

        if (document.body.dataset.zvInitialized === "true") {
            return;
        }

        document.body.dataset.zvInitialized = "true";

        const body = document.body;
        const html = document.documentElement;

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        const mobileScreen = window.matchMedia(
            "(max-width: 768px)"
        );

        const tabletScreen = window.matchMedia(
            "(max-width: 1024px)"
        );


        const finePointer = window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        );

        const isReducedMotion = () => reducedMotion.matches;
        const isMobile = () => mobileScreen.matches;
        const isTablet = () => tabletScreen.matches;
        const hasFinePointer = () => finePointer.matches;

        const select = (selector, parent = document) => {
            try {
                return parent.querySelector(selector);
            } catch {
                return null;
            }
        };

        const selectAll = (selector, parent = document) => {
            try {
                return Array.from(parent.querySelectorAll(selector));
            } catch {
                return [];
            }
        };

        const uniqueElements = (elements) => [
            ...new Set(elements.filter(Boolean))
        ];

        const clamp = (value, min, max) => {
            return Math.min(Math.max(value, min), max);
        };

        const cleanupFunctions = [];

        const addCleanup = (callback) => {
            cleanupFunctions.push(callback);
        };

        /* ====================================================
           02. PREMIUM ANIMATION STYLES
        ==================================================== */

        const style = document.createElement("style");

        style.id = "zv-premium-slow-styles";

        style.textContent = `
            /* -----------------------------------------------
               SLOW SCROLL REVEAL
            ----------------------------------------------- */

            [data-zv-reveal] {
                opacity: 0;

                transition:
                    opacity var(--zv-duration, 1600ms)
                    cubic-bezier(.16, 1, .3, 1),

                    transform var(--zv-duration, 1600ms)
                    cubic-bezier(.16, 1, .3, 1);

                transition-delay: var(--zv-delay, 0ms);

                backface-visibility: hidden;
            }

            [data-zv-reveal].zv-visible {
                opacity: 1 !important;
                transform: none !important;
            }

            /* -----------------------------------------------
               HERO ANIMATIONS
            ----------------------------------------------- */

            @keyframes zvHeroUp {
                0% {
                    opacity: 0;
                    transform: translate3d(0, 48px, 0);
                }

                100% {
                    opacity: 1;
                    transform: translate3d(0, 0, 0);
                }
            }

            @keyframes zvHeroLeft {
                0% {
                    opacity: 0;
                    transform: translate3d(-55px, 0, 0);
                }

                100% {
                    opacity: 1;
                    transform: translate3d(0, 0, 0);
                }
            }

            @keyframes zvHeroRight {
                0% {
                    opacity: 0;
                    transform: translate3d(55px, 0, 0);
                }

                100% {
                    opacity: 1;
                    transform: translate3d(0, 0, 0);
                }
            }

            @keyframes zvHeroZoom {
                0% {
                    opacity: 0;
                    transform: scale(.92);
                }

                100% {
                    opacity: 1;
                    transform: scale(1);
                }
            }

            /* -----------------------------------------------
               GOLD ANIMATIONS
            ----------------------------------------------- */

            @keyframes zvGoldPulse {
                0%, 100% {
                    opacity: .72;
                    transform: scale(1);
                }

                50% {
                    opacity: 1;
                    transform: scale(1.3);
                }
            }

            @keyframes zvGoldShine {
                0% {
                    transform: translateX(-160%) skewX(-18deg);
                }

                100% {
                    transform: translateX(250%) skewX(-18deg);
                }
            }

            @keyframes zvFloat {
                0%, 100% {
                    transform: translateY(0);
                }

                50% {
                    transform: translateY(-8px);
                }
            }

            /* -----------------------------------------------
               INTERACTION
            ----------------------------------------------- */

            .zv-hover-card {
                transform-style: preserve-3d;

                transition:
                    transform 450ms cubic-bezier(.16, 1, .3, 1),
                    border-color 450ms ease,
                    box-shadow 450ms ease;
            }

            .zv-touch-active {
                transform: scale(.985);
                transition: transform 220ms ease;
            }

            .zv-image-loaded {
                opacity: 1;
            }

            /* -----------------------------------------------
               SCROLL PROGRESS
            ----------------------------------------------- */

            .zv-scroll-progress {
                position: fixed;
                top: 0;
                left: 0;
                z-index: 10000;

                width: 0%;
                height: 3px;

                pointer-events: none;

                background: linear-gradient(
                    90deg,
                    #8b6a1f,
                    #f4d675,
                    #d4af37
                );

                box-shadow:
                    0 0 12px rgba(212, 175, 55, .35);
            }

            /* -----------------------------------------------
               BACK TO TOP
            ----------------------------------------------- */

            .zv-back-to-top {
                position: fixed;
                right: 22px;
                bottom: 22px;
                z-index: 9998;

                display: grid;
                place-items: center;

                width: 46px;
                height: 46px;

                border: 1px solid rgba(212, 175, 55, .65);
                border-radius: 50%;

                background: rgba(10, 10, 10, .94);
                color: #d4af37;

                font-size: 22px;
                cursor: pointer;

                opacity: 0;
                visibility: hidden;
                transform: translateY(16px);

                transition:
                    opacity 500ms ease,
                    transform 500ms cubic-bezier(.16, 1, .3, 1),
                    visibility 500ms ease,
                    background 400ms ease,
                    color 400ms ease;
            }

            .zv-back-to-top.zv-back-visible {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }

            .zv-back-to-top:hover {
                background: #d4af37;
                color: #090909;
            }

            /* -----------------------------------------------
               DESKTOP CURSOR GLOW
            ----------------------------------------------- */

            .zv-cursor-glow {
                position: fixed;
                top: 0;
                left: 0;
                z-index: 9997;

                width: 180px;
                height: 180px;

                border-radius: 50%;
                pointer-events: none;

                opacity: .12;

                background: radial-gradient(
                    circle,
                    rgba(212, 175, 55, .35) 0%,
                    rgba(212, 175, 55, .12) 30%,
                    transparent 72%
                );

                will-change: transform;
            }

            .zv-counter {
                font-variant-numeric: tabular-nums;
            }

            /* -----------------------------------------------
               MOBILE
            ----------------------------------------------- */

            @media (max-width: 768px) {
                [data-zv-reveal] {
                    backface-visibility: visible;
                }

                .zv-hover-card {
                    transform: none;

                    transition:
                        border-color 350ms ease,
                        box-shadow 350ms ease;
                }

                .zv-back-to-top {
                    right: 15px;
                    bottom: 15px;

                    width: 42px;
                    height: 42px;
                }

                .zv-cursor-glow {
                    display: none;
                }
            }

            /* -----------------------------------------------
               ACCESSIBILITY
            ----------------------------------------------- */

            @media (prefers-reduced-motion: reduce) {
                *,
                *::before,
                *::after {
                    scroll-behavior: auto !important;
                    animation-duration: .01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: .01ms !important;
                }

                [data-zv-reveal] {
                    opacity: 1 !important;
                    transform: none !important;
                }

                .zv-cursor-glow {
                    display: none !important;
                }
            }
        `;

        document.head.appendChild(style);

    }



 /* ====================================================
           03. GLOBAL VARIABLES
        ==================================================== */

        let revealObserver = null;
        let counterObserver = null;
        let sectionObserver = null;

        let scrollTicking = false;
        let cursorFrame = 0;

        const observedRevealElements = new WeakSet();

        const prefersReducedMotion = isReducedMotion();

          /* ====================================================
           04. REVEAL DIRECTIONS
        ==================================================== */

        const revealTransform = (
            direction,
            distance = 45
        ) => {
            switch (direction) {
                case "left":
                    return `translate3d(-${distance}px, 0, 0)`;

                case "right":
                    return `translate3d(${distance}px, 0, 0)`;

                case "down":
                    return `translate3d(0, -${distance}px, 0)`;

                case "zoom":
                    return "scale(.93)";

                case "pop":
                    return "scale(.87)";

                case "fade":
                    return "translate3d(0, 0, 0)";

                case "up":
                default:
                    return `translate3d(0, ${distance}px, 0)`;
            }
        };

        /* ====================================================
           05. SLOW SCROLL REVEAL ENGINE
        ==================================================== */

        if ("IntersectionObserver" in window) {
            revealObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;

                        const element = entry.target;

                        element.classList.add("zv-visible");

                        revealObserver.unobserve(element);
                    });
                },
                {
                    threshold: 0.08,

                    /*
                     * Start reveal a little later.
                     * A more negative bottom margin means
                     * the element enters the reveal zone later.
                     */
                    rootMargin: "0px 0px -90px 0px"
                }
            );
        }

        const registerReveal = (
            element,
            {
                direction = "up",
                distance = 45,
                duration = 2500,
                delay = 300
            } = {}
        ) => {
            if (!element || observedRevealElements.has(element)) {
                return;
            }

            observedRevealElements.add(element);

            if (prefersReducedMotion || !revealObserver) {
                element.classList.add("zv-visible");
                return;
            }

            element.dataset.zvReveal = "true";

            element.style.setProperty(
                "--zv-duration",
                `${duration}ms`
            );

            element.style.setProperty(
                "--zv-delay",
                `${delay}ms`
            );

            const actualDistance = isMobile()
                ? Math.min(distance, 30)
                : distance;

            element.style.transform = revealTransform(
                direction,
                actualDistance
            );

            revealObserver.observe(element);
        };

  /* ====================================================
           06. REVEAL GROUPS — SLOW PREMIUM TIMING
        ==================================================== */

        const revealGroups = [
            {
                selectors: [
                    ".about-section .about-main",
                    ".about-section .about-content",
                    ".about-section .about-text",
                    ".about-section .about-description",
                    ".personal-section .personal-text",
                    ".personal-section .personal-content"
                ],
                direction: "left",
                distance: 58,
                duration: 1750,
                delay: 100
            },

            {
                selectors: [
                    ".about-section .about-highlights",
                    ".about-highlights",
                    ".about-highlights .highlight-item",
                    ".about-section .highlights"
                ],
                direction: "right",
                distance: 58,
                duration: 1750,
                delay: 180
            },

            {
                selectors: [
                    ".about-section .info-item",
                    ".about-section .hobby-box",
                    ".about-section .hobby",
                    ".hobby-box .hobby",
                    ".personal-section .personal-hobby",
                    ".personal-section .hobby",
                    ".about-section .highlight-item"
                ],
                direction: "pop",
                distance: 28,
                duration: 1450,
                stagger: 180
            },

            {
                selectors: [
                    ".business-section .business-heading",
                    ".business-section .section-heading",
                    ".business-section .business-grid",
                    ".business-grid .business-card",
                    ".business-section .business-card",
                    ".business-card"
                ],
                direction: "up",
                distance: 48,
                duration: 1650,
                stagger: 240
            },

            {
                selectors: [
                    ".journey-section .journey-heading",
                    ".journey-section .section-heading",
                    ".journey-section .journey-grid",
                    ".journey-grid .journey-item",
                    ".journey-section .journey-item",
                    ".journey-item"
                ],
                direction: "up",
                distance: 42,
                duration: 1550,
                stagger: 220
            },

            {
                selectors: [
                    ".featured-section .featured-image",
                    ".featured-business .featured-image",
                    ".featured-business img",
                    ".featured-image"
                ],
                direction: "left",
                distance: 62,
                duration: 1950,
                delay: 120
            },

            {
                selectors: [
                    ".featured-section .featured-content",
                    ".featured-business .featured-content",
                    ".featured-content"
                ],
                direction: "right",
                distance: 62,
                duration: 1950,
                delay: 220
            },

            {
                selectors: [
                    ".personal-section .personal-image",
                    ".personal-image"
                ],
                direction: "right",
                distance: 45,
                duration: 1700,
                delay: 120
            },

            {
                selectors: [
                    ".testimonial-section .testimonial-heading",
                    ".testimonial-section .section-heading",
                    ".testimonial-section .testimonial-grid",
                    ".testimonial-grid .testimonial-card",
                    ".testimonial-section .testimonial-card",
                    ".testimonial-card"
                ],
                direction: "up",
                distance: 38,
                duration: 1550,
                stagger: 220
            },

            {
                selectors: [
                    ".contact-section .contact-content",
                    ".contact-section .contact-form",
                    ".contact-section .contact-info",
                    ".contact-section .contact-item",
                    ".contact-section .contact-heading"
                ],
                direction: "up",
                distance: 40,
                duration: 1550,
                stagger: 180
            },

            {
                selectors: [
                    ".footer .footer-brand",
                    ".footer .footer-column",
                    ".footer .footer-bottom"
                ],
                direction: "up",
                distance: 30,
                duration: 1400,
                stagger: 160
            }
        ];

        /* ====================================================
           07. APPLY ALL REVEAL GROUPS
        ==================================================== */

        revealGroups.forEach((group) => {
            const elements = uniqueElements(
                group.selectors.flatMap((selector) => {
                    return selectAll(selector);
                })
            );

            elements.forEach((element, index) => {
                const staggerDelay = group.stagger
                    ? (index % 6) * group.stagger
                    : 0;

                /*
                 * Mobile is also slow, but with a little less
                 * delay so the page remains comfortable to use.
                 */
                const mobileDelay = isMobile()
                    ? Math.round(staggerDelay * 0.7)
                    : staggerDelay;

                registerReveal(element, {
                    direction: group.direction,
                    distance: group.distance,
                    duration: isMobile()
                        ? Math.max(1300, group.duration - 150)
                        : group.duration,
                    delay: (group.delay || 0) + mobileDelay
                });
            });
        });

     /* ====================================================
           08. GENERAL SECTION REVEALS
        ==================================================== */

        const generalSelectors = [
            ".section-label",
            ".section-heading",
            ".section-title",
            ".section-description"
        ];

        const generalElements = uniqueElements(
            generalSelectors.flatMap((selector) => {
                return selectAll(selector);
            })
        );

        generalElements.forEach((element, index) => {
            registerReveal(element, {
                direction: "up",
                distance: 32,
                duration: 1550,
                delay: (index % 3) * 140
            });
        });

     /* ====================================================
           09. HERO ENTRANCE — SLOW CINEMATIC
        ==================================================== */

        const heroContent = select(".hero-content");
        const heroTagline = select(".hero-tagline");
        const heroTitle = select(".hero-title");
        const heroSubtitle = select(".hero-subtitle");
        const heroDescription = select(".hero-description");
        const heroButtons = select(".hero-buttons");

        const heroImage = select(
            ".hero-image-wrapper, .hero-image"
        );

        const heroElements = [
            { element: heroTagline, delay: 200 },
            { element: heroTitle, delay: 420 },
            { element: heroSubtitle, delay: 650 },
            { element: heroDescription, delay: 850 },
            { element: heroButtons, delay: 1050 }
        ];

        const runHeroAnimation = () => {
            if (prefersReducedMotion) return;

            heroElements.forEach(({ element, delay }) => {
                if (!element) return;

                element.style.animation =
                    `zvHeroUp 1650ms cubic-bezier(.16,1,.3,1) ` +
                    `${delay}ms both`;
            });

            if (heroImage) {
                heroImage.style.animation =
                    "zvHeroZoom 2100ms cubic-bezier(.16,1,.3,1) 500ms both";
            }

            if (heroContent && !heroTagline && !heroTitle) {
                heroContent.style.animation =
                    "zvHeroUp 1650ms cubic-bezier(.16,1,.3,1) both";
            }
        };

        runHeroAnimation();

       /* ====================================================
           10. HERO PARALLAX — DESKTOP
        ==================================================== */

        const heroSection = select(".hero-section");

        if (
            heroImage &&
            heroSection &&
            hasFinePointer() &&
            !prefersReducedMotion
        ) {
            let targetX = 0;
            let targetY = 0;

            let currentX = 0;
            let currentY = 0;

            let frame = 0;

            const animateParallax = () => {
                currentX += (targetX - currentX) * 0.055;
                currentY += (targetY - currentY) * 0.055;

                heroImage.style.setProperty(
                    "--zv-parallax-x",
                    `${currentX.toFixed(2)}px`
                );

                heroImage.style.setProperty(
                    "--zv-parallax-y",
                    `${currentY.toFixed(2)}px`
                );

                if (
                    Math.abs(targetX - currentX) > 0.1 ||
                    Math.abs(targetY - currentY) > 0.1
                ) {
                    frame = requestAnimationFrame(animateParallax);
                } else {
                    frame = 0;
                }
            };

            const onPointerMove = (event) => {
                const rect = heroSection.getBoundingClientRect();

                if (!rect.width || !rect.height) return;

                targetX =
                    ((event.clientX - rect.left) / rect.width - 0.5) * 10;

                targetY =
                    ((event.clientY - rect.top) / rect.height - 0.5) * 10;

                if (!frame) {
                    frame = requestAnimationFrame(animateParallax);
                }
            };

            const onPointerLeave = () => {
                targetX = 0;
                targetY = 0;

                if (!frame) {
                    frame = requestAnimationFrame(animateParallax);
                }
            };

            heroSection.addEventListener(
                "pointermove",
                onPointerMove,
                { passive: true }
            );

            heroSection.addEventListener(
                "pointerleave",
                onPointerLeave,
                { passive: true }
            );

            addCleanup(() => {
                heroSection.removeEventListener(
                    "pointermove",
                    onPointerMove
                );

                heroSection.removeEventListener(
                    "pointerleave",
                    onPointerLeave
                );

                cancelAnimationFrame(frame);
            });
        }

         /* ====================================================
           11. DESKTOP CURSOR GLOW
        ==================================================== */

        if (hasFinePointer() && !prefersReducedMotion) {
            const glow = document.createElement("div");

            glow.className = "zv-cursor-glow";
            glow.setAttribute("aria-hidden", "true");

            body.appendChild(glow);

            let mouseX = -200;
            let mouseY = -200;

            let glowX = -200;
            let glowY = -200;

            let glowFrame = 0;

            const onMouseMove = (event) => {
                mouseX = event.clientX;
                mouseY = event.clientY;
            };

            const animateGlow = () => {
                glowX += (mouseX - glowX) * 0.09;
                glowY += (mouseY - glowY) * 0.09;

                glow.style.transform =
                    `translate3d(${glowX - 90}px, ${glowY - 90}px, 0)`;

                glowFrame = requestAnimationFrame(animateGlow);
            };

            document.addEventListener(
                "pointermove",
                onMouseMove,
                { passive: true }
            );

            glowFrame = requestAnimationFrame(animateGlow);

            addCleanup(() => {
                document.removeEventListener(
                    "pointermove",
                    onMouseMove
                );

                cancelAnimationFrame(glowFrame);
                glow.remove();
            });
        }
 /* ====================================================
           12. DESKTOP CARD TILT
        ==================================================== */

        const tiltElements = uniqueElements([
            ...selectAll(".business-card"),
            ...selectAll(".testimonial-card"),
            ...selectAll(".featured-business"),
            ...selectAll(".hobby-box"),
            ...selectAll(".personal-hobby")
        ]);
 
        const attachTilt = () => {
            if (
                !hasFinePointer() ||
                isTablet() ||
                prefersReducedMotion
            ) {
                return;
            }

            tiltElements.forEach((element) => {
                if (element.dataset.zvTilt === "true") return;

                element.dataset.zvTilt = "true";
                element.classList.add("zv-hover-card");

                const onMove = (event) => {
                    const rect = element.getBoundingClientRect();

                    if (!rect.width || !rect.height) return;

                    const x = (event.clientX - rect.left) / rect.width;
                    const y = (event.clientY - rect.top) / rect.height;

                    const rotateY = (x - 0.5) * 4;
                    const rotateX = (0.5 - y) * 4;

                    element.style.transform =
                        `perspective(1000px) ` +
                        `rotateX(${rotateX.toFixed(2)}deg) ` +
                        `rotateY(${rotateY.toFixed(2)}deg) ` +
                        `translateY(-3px)`;
                };

                const onLeave = () => {
                    element.style.transform = "";
                };

                element.addEventListener(
                    "pointermove",
                    onMove,
                    { passive: true }
                );

                element.addEventListener(
                    "pointerleave",
                    onLeave,
                    { passive: true }
                );

                addCleanup(() => {
                    element.removeEventListener("pointermove", onMove);
                    element.removeEventListener("pointerleave", onLeave);
                });
            });
        };

        attachTilt();

        /* ====================================================
           13. BUTTON MAGNETIC EFFECT
        ==================================================== */

        if (
            hasFinePointer() &&
            !isTablet() &&
            !prefersReducedMotion
        ) {
            const buttons = uniqueElements([
                ...selectAll(".hero-buttons a"),
                ...selectAll(".nav-cta"),
                ...selectAll(".nav-cta a"),
                ...selectAll(".contact-section button")
            ]);

            buttons.forEach((button) => {
                const onMove = (event) => {
                    const rect = button.getBoundingClientRect();

                    const dx =
                        event.clientX - (rect.left + rect.width / 2);

                    const dy =
                        event.clientY - (rect.top + rect.height / 2);

                    button.style.transform =
                        `translate3d(${dx * 0.055}px, ${dy * 0.055}px, 0)`;
                };

                const onLeave = () => {
                    button.style.transform = "";
                };

                button.addEventListener(
                    "pointermove",
                    onMove,
                    { passive: true }
                );

                button.addEventListener(
                    "pointerleave",
                    onLeave,
                    { passive: true }
                );

                addCleanup(() => {
                    button.removeEventListener("pointermove", onMove);
                    button.removeEventListener("pointerleave", onLeave);
                });
            });
        }

      /* ====================================================
           14. MOBILE TOUCH FEEDBACK
        ==================================================== */

        const touchElements = uniqueElements([
            ...selectAll(".business-card"),
            ...selectAll(".testimonial-card"),
            ...selectAll(".hobby-box"),
            ...selectAll(".personal-hobby"),
            ...selectAll(".hero-buttons a"),
            ...selectAll(".nav-cta a"),
            ...selectAll(".business-link"),
            ...selectAll(".contact-section button")
        ]);

        touchElements.forEach((element) => {
            const onTouchStart = () => {
                if (isMobile() && !prefersReducedMotion) {
                    element.classList.add("zv-touch-active");
                }
            };

            const onTouchEnd = () => {
                element.classList.remove("zv-touch-active");
            };

            element.addEventListener(
                "touchstart",
                onTouchStart,
                { passive: true }
            );

            element.addEventListener(
                "touchend",
                onTouchEnd,
                { passive: true }
            );

            element.addEventListener(
                "touchcancel",
                onTouchEnd,
                { passive: true }
            );

            addCleanup(() => {
                element.removeEventListener("touchstart", onTouchStart);
                element.removeEventListener("touchend", onTouchEnd);
                element.removeEventListener("touchcancel", onTouchEnd);
            });
        });

         /* ====================================================
           15. SMOOTH ANCHOR SCROLLING
        ==================================================== */

        selectAll('a[href^="#"]').forEach((link) => {
            const href = link.getAttribute("href");

            if (!href || href === "#") return;

            const onClick = (event) => {
                let target;

                try {
                    target = document.querySelector(href);
                } catch {
                    return;
                }

                if (!target) return;

                event.preventDefault();

                const header = select(
                    ".header, header, .navbar"
                );

                const headerHeight = header
                    ? header.getBoundingClientRect().height
                    : 0;

                const targetTop =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight -
                    15;

                window.scrollTo({
                    top: Math.max(0, targetTop),
                    behavior: prefersReducedMotion ? "auto" : "smooth"
                });

                if (history.replaceState) {
                    history.replaceState(null, "", href);
                }
            };

            link.addEventListener("click", onClick);

            addCleanup(() => {
                link.removeEventListener("click", onClick);
            });
        });

       /* ====================================================
           16. MOBILE NAVIGATION
        ==================================================== */

        const menuToggle = select(
            ".menu-toggle, .nav-toggle, .hamburger, .menu-btn"
        );

        const navContainer = select(
            ".navLinks, .nav-links, .navbar-links, .nav-menu"
        );

        if (menuToggle && navContainer) {
            if (!navContainer.id) {
                navContainer.id = "zv-mobile-navigation";
            }

            menuToggle.setAttribute(
                "aria-controls",
                navContainer.id
            );

            const closeMenu = () => {
                navContainer.classList.remove(
                    "active",
                    "open",
                    "show",
                    "nav-open"
                );

                menuToggle.classList.remove("active", "open");

                menuToggle.setAttribute("aria-expanded", "false");
            };

            const toggleMenu = () => {
                const isOpen =
                    navContainer.classList.contains("active") ||
                    navContainer.classList.contains("open") ||
                    navContainer.classList.contains("show") ||
                    navContainer.classList.contains("nav-open");

                closeMenu();

                if (!isOpen) {
                    navContainer.classList.add("active");
                    menuToggle.classList.add("active");

                    menuToggle.setAttribute("aria-expanded", "true");
                }
            };

            menuToggle.addEventListener("click", toggleMenu);

            const onNavClick = (event) => {
                if (event.target.closest("a")) {
                    closeMenu();
                }
            };

            const onKeyDown = (event) => {
                if (event.key === "Escape") {
                    closeMenu();
                }
            };

            navContainer.addEventListener("click", onNavClick);
            document.addEventListener("keydown", onKeyDown);

            addCleanup(() => {
                menuToggle.removeEventListener("click", toggleMenu);
                navContainer.removeEventListener("click", onNavClick);
                document.removeEventListener("keydown", onKeyDown);
            });
        }

  /* ====================================================
           17. ACTIVE NAVIGATION LINK
        ==================================================== */

        const navigationLinks = selectAll(
            '.navLinks a[href^="#"], ' +
            '.nav-links a[href^="#"], ' +
            '.navbar-links a[href^="#"], ' +
            'nav a[href^="#"]'
        );

        const navigationSections = uniqueElements(
            navigationLinks.map((link) => {
                const href = link.getAttribute("href");

                try {
                    return href ? document.querySelector(href) : null;
                } catch {
                    return null;
                }
            })
        );

        if ("IntersectionObserver" in window) {
            sectionObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;

                        const id = entry.target.id;

                        navigationLinks.forEach((link) => {
                            const active =
                                link.getAttribute("href") === `#${id}`;

                            link.classList.toggle("active", active);

                            if (active) {
                                link.setAttribute(
                                    "aria-current",
                                    "location"
                                );
                            } else {
                                link.removeAttribute("aria-current");
                            }
                        });
                    });
                },
                {
                    rootMargin: "-25% 0px -60% 0px",
                    threshold: 0
                }
            );

            navigationSections.forEach((section) => {
                sectionObserver.observe(section);
            });
        }
   /* ====================================================
           18. SCROLL PROGRESS BAR
        ==================================================== */

        let progressBar = select(".zv-scroll-progress");

        if (!progressBar) {
            progressBar = document.createElement("div");

            progressBar.className = "zv-scroll-progress";

            progressBar.setAttribute("aria-hidden", "true");

            body.appendChild(progressBar);
        }

     /* ====================================================
           19. BACK TO TOP
        ==================================================== */

        let backToTop = select(".zv-back-to-top");

        if (!backToTop) {
            backToTop = document.createElement("button");

            backToTop.type = "button";
            backToTop.className = "zv-back-to-top";
            backToTop.textContent = "↑";

            backToTop.setAttribute("aria-label", "Back to top");
            backToTop.setAttribute("title", "Back to top");

            body.appendChild(backToTop);
        }

        const onBackToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? "auto" : "smooth"
            });
        };

        backToTop.addEventListener("click", onBackToTop);

        addCleanup(() => {
            backToTop.removeEventListener("click", onBackToTop);
        });

        /* ====================================================
           20. SCROLL HANDLER
        ==================================================== */








































































































































































        })();