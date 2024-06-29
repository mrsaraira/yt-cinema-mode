// ==UserScript==
// @name         Youtube Cinema Mode
// @namespace    http://tampermonkey.net/
// @version      2024-06-29
// @description  Cinema mode enlarges the player in Youtube's theater mode with auto-hide search bar and show on-hover.
// @author       Takhsin Saraira
// @match        https://www.youtube.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    const ytCinemaModeStyle = `
        ytd-app:not([guide-persistent-and-visible]) ytd-page-manager {
          margin-top: 0!important;
        }
        #background.ytd-masthead{
          opacity: 1;
          transition: opacity 0s 1s;
        }
        ytd-app:not([guide-persistent-and-visible]) #masthead-container:hover ytd-masthead #background.ytd-masthead{
          opacity: 1!important;
          transition: opacity 0s 0s;
        }

        ytd-app:not([guide-persistent-and-visible]) ytd-masthead,
        ytd-app:not([guide-persistent-and-visible]) #masthead-container.ytd-app::after {
          transform: translateY(var(--topMenuPosition, -56px));
          transition: transform .1s .1s ease-out; /* times: duration, delay */
        }
        ytd-app:not([guide-persistent-and-visible]) #masthead-container:hover ytd-masthead,
        ytd-app:not([guide-persistent-and-visible]) #masthead-container:hover.ytd-app::after {
          transform: translateY(0px);
        }

        @supports (scrollbar-width: none) {
          body {
            scrollbar-width: none;
          }
        }
        @supports not (scrollbar-width: none) {
          body::-webkit-scrollbar {
            display: none;
          }
        }

        ytd-watch-flexy[full-bleed-player] #full-bleed-container.ytd-watch-flexy{
          height: 100vh!important;
          max-height: 100vh!important;
        }

        @supports (animation-timeline: scroll(root)) {
          body {
            animation: topMenu linear 1s;
            animation-timeline: scroll(root);
            animation-range-start: 0vh;
            animation-range-end: 1vh;
            animation-fill-mode: both;
          }
          @keyframes topMenu {
            from {
              --topMenuPosition: -56px;
            }
            to {
              --topMenuPosition: 0px;
            }
          }
        }
    `;

    GM_addStyle(ytCinemaModeStyle);
})();