// This script runs at document_start to ensure smooth transitioning and applying dynamic fixes if necessary.

// Wait for the DOM to be ready to apply structural fixes if needed
document.addEventListener("DOMContentLoaded", () => {
    // A small fix: Codeforces sometimes uses inline styles that override our CSS.
    // We remove some generic inline background colors.
    const elementsWithBg = document.querySelectorAll('[style*="background"]');
    elementsWithBg.forEach(el => {
        const bg = el.style.backgroundColor;
        // If it's a hardcoded white/light gray background, remove it so CSS takes over
        if (bg === 'white' || bg === '#ffffff' || bg === 'rgb(255, 255, 255)' || bg === '#f8f8f8') {
            el.style.backgroundColor = '';
        }
    });

    // Observe for dynamically added content (like MathJax rendering or AJAX updates)
    // to ensure our dark mode styles apply correctly.
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // ELEMENT_NODE
                        // Re-check for inline styles on dynamically added nodes
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

// Immediately add a dark-theme attribute to the root for robust CSS targeting
document.documentElement.setAttribute('data-theme', 'dark');
