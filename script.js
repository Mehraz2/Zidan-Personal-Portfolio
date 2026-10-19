

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







































        })();