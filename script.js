/* ============================================================
   ZIDANVERSE — COMPLETE PREMIUM PORTFOLIO JAVASCRIPT
   VERSION 2.0 — SLOW & SMOOTH EDITION

   01. Initialization
   02. Animation styles
   03. Global helpers
   04. Reveal directions
   05. Slow scroll reveal engine
   06. About & highlights
   07. Hobby stagger
   08. Business cards stagger
   09. Journey reveal
   10. Featured business reveal
   11. Testimonials
   12. Contact & footer
   13. Hero entrance
   14. Hero parallax
   15. Desktop cursor glow
   16. Desktop 3D tilt
   17. Button interaction
   18. Mobile touch feedback
   19. Smooth navigation
   20. Mobile menu
   21. Active navigation
   22. Scroll progress
   23. Back to top
   24. Journey dots
   25. Image loading
   26. Number counters
   27. Custom reveal support
   28. Custom stagger support
   29. Floating elements
   30. Contact form focus
   31. External link safety
   32. Reduced motion support
   33. Responsive handling
   34. Cleanup
   35. DOM initialization
============================================================ */

(() => {
    "use strict";

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
                duration = 1600,
                delay = 0
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

        const updateScrollUI = () => {
            const scrollTop = window.scrollY || html.scrollTop || 0;

            const maxScroll =
                html.scrollHeight - window.innerHeight;

            const progress = maxScroll > 0
                ? clamp((scrollTop / maxScroll) * 100, 0, 100)
                : 0;

            progressBar.style.width = `${progress}%`;

            backToTop.classList.toggle(
                "zv-back-visible",
                scrollTop > 450
            );

            scrollTicking = false;
        };

        const onScroll = () => {
            if (scrollTicking) return;

            scrollTicking = true;

            requestAnimationFrame(updateScrollUI);
        };

        window.addEventListener("scroll", onScroll, {
            passive: true
        });

        window.addEventListener("resize", onScroll, {
            passive: true
        });

        updateScrollUI();

        addCleanup(() => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        });

        /* ====================================================
           21. JOURNEY DOTS
        ==================================================== */

        const journeyDots = uniqueElements([
            ...selectAll(".journey-dot"),
            ...selectAll(".journey-item .dot")
        ]);

        journeyDots.forEach((dot) => {
            if (prefersReducedMotion) return;

            dot.style.animation =
                "zvGoldPulse 3.5s ease-in-out infinite";
        });

        /* ====================================================
           22. IMAGE LOADING
        ==================================================== */

        selectAll("img").forEach((image) => {
            const onLoad = () => {
                image.classList.add("zv-image-loaded");
            };

            if (image.complete && image.naturalWidth > 0) {
                onLoad();
            } else {
                image.addEventListener("load", onLoad, {
                    once: true
                });
            }

            addCleanup(() => {
                image.removeEventListener("load", onLoad);
            });
        });

        /* ====================================================
           23. OPTIONAL NUMBER COUNTERS

           Example:
           <span data-zv-count="100">0</span>
        ==================================================== */

        const counterElements = selectAll("[data-zv-count]");

        const animateCounter = (element) => {
            if (element.dataset.zvCounterDone === "true") {
                return;
            }

            const target = Number(element.dataset.zvCount);

            if (!Number.isFinite(target)) return;

            element.dataset.zvCounterDone = "true";

            if (prefersReducedMotion) {
                element.textContent = String(target);
                return;
            }

            const duration = isMobile() ? 1500 : 1900;
            const startTime = performance.now();

            const originalText = element.textContent.trim();

            const prefix = originalText.match(/^[^\d-]*/)?.[0] || "";
            const suffix = originalText.match(/[^\d]*$/)?.[0] || "";

            const update = (now) => {
                const progress = clamp(
                    (now - startTime) / duration,
                    0,
                    1
                );

                const eased = 1 - Math.pow(1 - progress, 4);

                const value = Math.round(target * eased);

                element.textContent = `${prefix}${value}${suffix}`;

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    element.textContent = `${prefix}${target}${suffix}`;
                }
            };

            requestAnimationFrame(update);
        };

        if ("IntersectionObserver" in window) {
            counterObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;

                        animateCounter(entry.target);

                        counterObserver.unobserve(entry.target);
                    });
                },
                {
                    threshold: 0.5
                }
            );

            counterElements.forEach((element) => {
                counterObserver.observe(element);
            });
        } else {
            counterElements.forEach(animateCounter);
        }

        /* ====================================================
           24. CUSTOM REVEAL ATTRIBUTES
        ==================================================== */

        selectAll("[data-zv-animation]").forEach((element) => {
            registerReveal(element, {
                direction: element.dataset.zvAnimation || "up",

                distance: clamp(
                    Number(element.dataset.zvDistance || 45),
                    0,
                    100
                ),

                duration: clamp(
                    Number(element.dataset.zvDuration || 1600),
                    100,
                    4000
                ),

                delay: clamp(
                    Number(element.dataset.zvDelay || 0),
                    0,
                    3000
                )
            });
        });

        /* ====================================================
           25. CUSTOM STAGGER GROUPS
        ==================================================== */

        selectAll("[data-zv-stagger]").forEach((container) => {
            const delayStep = clamp(
                Number(container.dataset.zvStagger) || 180,
                0,
                500
            );

            Array.from(container.children).forEach((child, index) => {
                registerReveal(child, {
                    direction: "up",
                    distance: 35,
                    duration: 1550,
                    delay: index * delayStep
                });
            });
        });

        /* ====================================================
           26. OPTIONAL FLOATING ELEMENTS
        ==================================================== */

        selectAll("[data-zv-float]").forEach((element, index) => {
            if (prefersReducedMotion || isMobile()) return;

            const duration = 5 + (index % 3);

            element.style.animation =
                `zvFloat ${duration}s ease-in-out infinite`;

            element.style.animationDelay =
                `${(index % 4) * 0.35}s`;
        });

        /* ====================================================
           27. CONTACT FORM FOCUS
        ==================================================== */

        selectAll(".contact-form, .contact-section form").forEach(
            (form) => {
                selectAll("input, textarea, select", form).forEach(
                    (input) => {
                        const onFocus = () => {
                            input.dataset.zvFocused = "true";
                        };

                        const onBlur = () => {
                            delete input.dataset.zvFocused;
                        };

                        input.addEventListener("focus", onFocus);
                        input.addEventListener("blur", onBlur);

                        addCleanup(() => {
                            input.removeEventListener("focus", onFocus);
                            input.removeEventListener("blur", onBlur);
                        });
                    }
                );
            }
        );

        /* ====================================================
           28. EXTERNAL LINK SAFETY
        ==================================================== */

        selectAll('a[target="_blank"]').forEach((link) => {
            const rel = new Set(
                (link.getAttribute("rel") || "")
                    .split(/\s+/)
                    .filter(Boolean)
            );

            rel.add("noopener");
            rel.add("noreferrer");

            link.setAttribute("rel", [...rel].join(" "));
        });

        /* ====================================================
           29. REDUCED MOTION SUPPORT
        ==================================================== */

        const onMotionChange = () => {
            if (!isReducedMotion()) return;

            selectAll("[data-zv-reveal]").forEach((element) => {
                element.classList.add("zv-visible");
                element.style.opacity = "1";
                element.style.transform = "none";
            });

            if (revealObserver) {
                revealObserver.disconnect();
            }
        };

        if (reducedMotion.addEventListener) {
            reducedMotion.addEventListener("change", onMotionChange);
        } else if (reducedMotion.addListener) {
            reducedMotion.addListener(onMotionChange);
        }

        addCleanup(() => {
            if (reducedMotion.removeEventListener) {
                reducedMotion.removeEventListener(
                    "change",
                    onMotionChange
                );
            } else if (reducedMotion.removeListener) {
                reducedMotion.removeListener(onMotionChange);
            }
        });

        /* ====================================================
           30. RESPONSIVE HANDLING
        ==================================================== */

        const onResize = () => {
            if (isTablet()) {
                tiltElements.forEach((element) => {
                    element.style.transform = "";
                });
            }

            updateScrollUI();
        };

        window.addEventListener("resize", onResize, {
            passive: true
        });

        addCleanup(() => {
            window.removeEventListener("resize", onResize);
        });

        /* ====================================================
           31. OBSERVER FALLBACK
        ==================================================== */

        if (!("IntersectionObserver" in window)) {
            selectAll("[data-zv-reveal]").forEach((element) => {
                element.classList.add("zv-visible");
                element.style.opacity = "1";
                element.style.transform = "none";
            });
        }

        /* ====================================================
           32. PAGE READY
        ==================================================== */

        body.classList.add("zv-js-loaded");
        html.classList.add("zv-js-loaded");

        /* ====================================================
           33. CLEANUP
        ==================================================== */

        window.zidanVerseCleanup = () => {
            cleanupFunctions.forEach((cleanup) => {
                try {
                    cleanup();
                } catch {
                    // Keep cleanup errors from breaking the page.
                }
            });

            if (revealObserver) revealObserver.disconnect();
            if (counterObserver) counterObserver.disconnect();
            if (sectionObserver) sectionObserver.disconnect();

            cancelAnimationFrame(cursorFrame);

            style.remove();

            delete body.dataset.zvInitialized;
        };
    };

    /* ========================================================
       34. WAIT FOR DOM
    ======================================================== */

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            startZidanVerse,
            { once: true }
        );
    } else {
        startZidanVerse();
    }

})();



/* =========================================================
   69. ZIDANVERSE — GALAXY UNIVERSE ENGINE
   Stars • Nebula • Shooting Stars • Comets • Parallax
========================================================= */

(() => {
    "use strict";

    // Prevent duplicate galaxy engines
    if (document.getElementById("zv-galaxy-canvas")) return;

    const canvas = document.createElement("canvas");
    canvas.id = "zv-galaxy-canvas";
    canvas.setAttribute("aria-hidden", "true");

    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d", { alpha: true });

    if (!ctx) {
        canvas.remove();
        return;
    }

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    const mobileQuery = window.matchMedia("(max-width: 768px)");

    let width = 0;
    let height = 0;
    let dpr = 1;

    let stars = [];
    let comets = [];
    let shootingStars = [];

    let targetScroll = window.scrollY;
    let smoothScroll = window.scrollY;

    let frameId = null;
    let lastFrame = 0;
    let elapsed = 0;

    // -----------------------------------------
    // CONFIGURATION
    // -----------------------------------------

    const CONFIG = {
        desktopStars: 190,
        mobileStars: 85,

        // Scroll movement: lower = slower
        scrollEase: 0.055,
        parallaxStrength: 0.24,

        // Comets appear occasionally
        cometIntervalMin: 4500,
        cometIntervalMax: 10000,

        shootingStarIntervalMin: 2500,
        shootingStarIntervalMax: 6000
    };

    let nextComet = 0;
    let nextShootingStar = 0;

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    // -----------------------------------------
    // CANVAS SIZE
    // -----------------------------------------

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;

        dpr = Math.min(window.devicePixelRatio || 1, 1.5);

        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        createStars();

        // Keep existing animation positions sensible
        comets = comets.filter(
            comet => comet.x < width + 300 && comet.y < height + 300
        );

        render(performance.now(), 0);
    }

    // -----------------------------------------
    // STAR FIELD
    // -----------------------------------------

    function createStars() {
        const count = mobileQuery.matches
            ? CONFIG.mobileStars
            : CONFIG.desktopStars;

        stars = [];

        for (let i = 0; i < count; i++) {
            stars.push({
                x: random(0, width),
                y: random(0, height),

                radius: random(0.35, 1.45),
                opacity: random(0.22, 0.88),

                phase: random(0, Math.PI * 2),
                twinkleSpeed: random(0.0005, 0.0018),

                // Depth gives stars different scroll speeds
                depth: random(0.12, 0.85),

                tint: Math.random()
            });
        }
    }

    function drawStars(time) {
        stars.forEach(star => {
            const twinkle =
                Math.sin(time * star.twinkleSpeed + star.phase) * 0.28;

            const alpha = Math.max(
                0.12,
                Math.min(1, star.opacity + twinkle)
            );

            const parallaxY =
                smoothScroll * star.depth * CONFIG.parallaxStrength;

            const parallaxX =
                Math.sin(smoothScroll * 0.0003 + star.phase) *
                star.depth * 12;

            const x = ((star.x + parallaxX) % width + width) % width;
            const y = ((star.y - parallaxY) % height + height) % height;

            const color = star.tint > 0.83
                ? `rgba(190, 166, 255, ${alpha})`
                : star.tint > 0.65
                    ? `rgba(255, 224, 174, ${alpha})`
                    : `rgba(225, 228, 255, ${alpha})`;

            ctx.beginPath();
            ctx.arc(x, y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();

            // Only a few brighter stars get a glow
            if (star.radius > 1.15) {
                ctx.beginPath();
                ctx.arc(x, y, star.radius * 3.5, 0, Math.PI * 2);

                ctx.fillStyle = star.tint > 0.65
                    ? `rgba(163, 127, 255, ${alpha * 0.10})`
                    : `rgba(210, 220, 255, ${alpha * 0.09})`;

                ctx.fill();
            }
        });
    }

    // -----------------------------------------
    // GALAXY NEBULA
    // -----------------------------------------

    function drawNebula() {
        const scroll = smoothScroll;

        const clouds = [
            {
                x: width * 0.18,
                y: height * 0.20 - scroll * 0.035,
                radius: Math.max(width * 0.36, 180),
                color: "rgba(111, 56, 210, 0.13)"
            },
            {
                x: width * 0.82,
                y: height * 0.48 - scroll * 0.055,
                radius: Math.max(width * 0.31, 160),
                color: "rgba(51, 91, 210, 0.11)"
            },
            {
                x: width * 0.50,
                y: height * 0.88 - scroll * 0.025,
                radius: Math.max(width * 0.28, 140),
                color: "rgba(173, 102, 213, 0.075)"
            }
        ];

        clouds.forEach(cloud => {
            const gradient = ctx.createRadialGradient(
                cloud.x, cloud.y, 0,
                cloud.x, cloud.y, cloud.radius
            );

            gradient.addColorStop(0, cloud.color);
            gradient.addColorStop(0.45, cloud.color.replace(
                /[\d.]+\)$/,
                "0.035)"
            ));
            gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

            ctx.fillStyle = gradient;
            ctx.fillRect(
                cloud.x - cloud.radius,
                cloud.y - cloud.radius,
                cloud.radius * 2,
                cloud.radius * 2
            );
        });
    }

    // -----------------------------------------
    // CREATE COMETS
    // -----------------------------------------

    function createComet() {
        const fromLeft = Math.random() > 0.5;

        const startX = fromLeft
            ? random(-100, width * 0.35)
            : random(width * 0.55, width + 100);

        const startY = random(-50, height * 0.55);

        const angle = fromLeft
            ? random(0.25, 0.65)
            : random(2.35, 2.85);

        const speed = mobileQuery.matches
            ? random(1.0, 1.8)
            : random(1.5, 2.5);

        comets.push({
            x: startX,
            y: startY,

            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,

            length: random(55, 120),
            life: 1,

            width: random(0.8, 1.5),
            color: Math.random() > 0.5
                ? "180, 166, 255"
                : "202, 220, 255"
        });
    }

    function drawComets(delta) {
        comets.forEach(comet => {
            comet.x += comet.vx * delta;
            comet.y += comet.vy * delta;

            comet.life -= 0.00013 * delta;

            const tailX = comet.x - comet.vx * comet.length;
            const tailY = comet.y - comet.vy * comet.length;

            const gradient = ctx.createLinearGradient(
                tailX, tailY, comet.x, comet.y
            );

            gradient.addColorStop(
                0,
                `rgba(${comet.color}, 0)`
            );

            gradient.addColorStop(
                0.7,
                `rgba(${comet.color}, ${Math.max(0, comet.life) * 0.22})`
            );

            gradient.addColorStop(
                1,
                `rgba(255, 255, 255, ${Math.max(0, comet.life) * 0.8})`
            );

            ctx.beginPath();
            ctx.moveTo(tailX, tailY);
            ctx.lineTo(comet.x, comet.y);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = comet.width;
            ctx.lineCap = "round";
            ctx.stroke();

            // Tiny bright comet head
            ctx.beginPath();
            ctx.arc(comet.x, comet.y, 1.4, 0, Math.PI * 2);

            ctx.fillStyle =
                `rgba(255, 255, 255, ${Math.max(0, comet.life)})`;

            ctx.fill();
        });

        comets = comets.filter(comet =>
            comet.life > 0 &&
            comet.x > -300 &&
            comet.x < width + 300 &&
            comet.y > -300 &&
            comet.y < height + 300
        );
    }

    // -----------------------------------------
    // SHOOTING STARS
    // -----------------------------------------

    function createShootingStar() {
        shootingStars.push({
            x: random(width * 0.25, width * 0.95),
            y: random(0, height * 0.45),

            vx: random(-8, -5),
            vy: random(3, 5),

            length: random(35, 75),
            life: 1
        });
    }

    function drawShootingStars(delta) {
        shootingStars.forEach(star => {
            star.x += star.vx * delta * 0.06;
            star.y += star.vy * delta * 0.06;
            star.life -= delta * 0.00065;

            const gradient = ctx.createLinearGradient(
                star.x - star.vx * star.length * 0.06,
                star.y - star.vy * star.length * 0.06,
                star.x,
                star.y
            );

            gradient.addColorStop(0, "rgba(255,255,255,0)");
            gradient.addColorStop(
                1,
                `rgba(230,220,255,${Math.max(0, star.life) * 0.7})`
            );

            ctx.beginPath();
            ctx.moveTo(
                star.x - star.vx * star.length * 0.06,
                star.y - star.vy * star.length * 0.06
            );
            ctx.lineTo(star.x, star.y);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.stroke();
        });

        shootingStars = shootingStars.filter(star => star.life > 0);
    }

    // -----------------------------------------
    // RENDER ENGINE
    // -----------------------------------------

    function render(time, delta) {
        ctx.clearRect(0, 0, width, height);

        drawNebula();
        drawStars(time);
        drawComets(delta);
        drawShootingStars(delta);
    }

    function animate(time) {
        if (reducedMotion.matches || document.hidden) {
            frameId = null;
            return;
        }

        const delta = lastFrame
            ? Math.min(time - lastFrame, 40)
            : 16;

        lastFrame = time;
        elapsed += delta;

        // Smooth background movement on scroll
        smoothScroll +=
            (targetScroll - smoothScroll) * CONFIG.scrollEase;

        // Occasionally spawn a comet
        if (time >= nextComet) {
            createComet();

            nextComet = time + random(
                CONFIG.cometIntervalMin,
                CONFIG.cometIntervalMax
            );
        }

        // Shooting stars appear less often
        if (time >= nextShootingStar) {
            if (Math.random() > 0.35) {
                createShootingStar();
            }

            nextShootingStar = time + random(
                CONFIG.shootingStarIntervalMin,
                CONFIG.shootingStarIntervalMax
            );
        }

        // Keep animation light on mobile and desktop
        if (time - lastFrame < 1000 / 60) {
            render(time, delta);
        }

        frameId = requestAnimationFrame(animate);
    }

    function start() {
        if (frameId !== null || reducedMotion.matches) return;

        lastFrame = 0;
        frameId = requestAnimationFrame(animate);
    }

    function stop() {
        if (frameId !== null) {
            cancelAnimationFrame(frameId);
            frameId = null;
        }
    }

    // -----------------------------------------
    // EVENTS
    // -----------------------------------------

    window.addEventListener("scroll", () => {
        targetScroll = window.scrollY;
    }, { passive: true });

    window.addEventListener("resize", resizeCanvas, {
        passive: true
    });

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stop();
        } else {
            start();
        }
    });

    reducedMotion.addEventListener?.("change", () => {
        if (reducedMotion.matches) {
            stop();
            render(performance.now(), 0);
        } else {
            start();
        }
    });

    // Start everything
    resizeCanvas();

    if (!reducedMotion.matches) {
        start();
    }
})();