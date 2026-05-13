/**
 * Codeforces Dark Mode Pro
 * Copyright (c) 2026 AdityaM-IITH
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fixDynamicStyles = () => {
    // Fix blog titles that Codeforces forces to black via JS
    const blogTitles = document.querySelectorAll('h3 a[href^="/blog/"], h2 a[href^="/blog/"], .title a[href^="/blog/"]');
    blogTitles.forEach(el => {
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

// Initial run
fixDynamicStyles();

// Observe for dynamic changes (AJAX, Codeforces scripts)
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

observer.observe(document.body, { 
    childList: true, 
    subtree: true, 
    attributes: true, 
    attributeFilter: ['style'] 
});

document.documentElement.setAttribute('data-theme', 'dark');

