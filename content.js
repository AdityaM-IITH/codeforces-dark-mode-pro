/**
 * Codeforces Dark Mode Pro
 * Copyright (c) 2026 AdityaM-IITH
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

document.addEventListener("DOMContentLoaded", () => {
    const elementsWithBg = document.querySelectorAll('[style*="background"]');
    elementsWithBg.forEach(el => {
        const bg = el.style.backgroundColor;
        if (bg === 'white' || bg === '#ffffff' || bg === 'rgb(255, 255, 255)' || bg === '#f8f8f8') {
            el.style.backgroundColor = '';
        }
    });

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { 
                        if (node.style && node.style.backgroundColor) {
                            const bg = node.style.backgroundColor;
                            if (bg === 'white' || bg === '#ffffff' || bg === 'rgb(255, 255, 255)') {
                                node.style.backgroundColor = '';
                            }
                        }
                    }
                });
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
});

document.documentElement.setAttribute('data-theme', 'dark');
