

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

    }

})();






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


            