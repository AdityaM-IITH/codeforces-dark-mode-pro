/**
 * Codeforces Dark Mode Pro
 * Copyright (c) 2026 AdityaM-IITH
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fixDynamicStyles = () => {
    // Fix blog titles that Codeforces forces to black via JS
    const blogTitles = document.querySelectorAll('h3 a[href^="/blog/"], h2 a[href^="/blog/"], .title a[href^="/blog/"], #pageContent div div h3 a');
    blogTitles.forEach(el => {
        // Only override if it actually has an inline color style or matches our selector
        el.style.setProperty('color', 'var(--text-heading)', 'important');
    });

    // Kill inline white/light backgrounds
    const elementsWithStyle = document.querySelectorAll('[style*="background"]');
    elementsWithStyle.forEach(el => {
        const bg = el.style.backgroundColor.toLowerCase();
        if (bg.includes('white') || bg.includes('fff') || bg.includes('255, 255, 255') || bg.includes('f8f8f8')) {
            el.style.setProperty('background-color', 'transparent', 'important');
        }
    });
};

// Initialize observer safely
const init = () => {
    // Ensure we have a target to observe
    const target = document.documentElement;
    if (!target) {
        window.setTimeout(init, 10);
        return;
    }

    const observer = new MutationObserver((mutations) => {
        let shouldFix = false;
        for (const mutation of mutations) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                shouldFix = true;
                break;
            }
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                shouldFix = true;
                break;
            }
        }
        if (shouldFix) fixDynamicStyles();
    });

    observer.observe(target, { 
        childList: true, 
        subtree: true, 
        attributes: true, 
        attributeFilter: ['style'] 
    });

    // Initial fix
    fixDynamicStyles();
    
    // Also run on DOMContentLoaded just to be sure
    document.addEventListener('DOMContentLoaded', fixDynamicStyles);
};

init();

// Set theme attribute immediately
document.documentElement.setAttribute('data-theme', 'dark');

