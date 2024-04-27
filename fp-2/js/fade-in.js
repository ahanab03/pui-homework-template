// check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// when a user scrolls...
function handleScroll() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(function(element) {
        if (isInViewport(element)) {
            element.classList.add('visible');
        }
    });
}

//Event listener
window.addEventListener('scroll', handleScroll);

// Check if elements are already in view on page load
handleScroll();
