function addHoverEffect(elements, hoverClassName) {
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("mouseenter", function() {
            var hoverContent = this.querySelector('.' + hoverClassName);
            if (hoverContent) {
                hoverContent.style.display = 'block';
            }
        });

        elements[i].addEventListener("mouseleave", function() {
            var hoverContent = this.querySelector('.' + hoverClassName);
            if (hoverContent) {
                hoverContent.style.display = 'none';
            }
        });
    }
}
let lastScrollTop = 0;
const banner = document.getElementById('scrollBanner');

window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {

        banner.style.top = '-50px';
    } else {
        banner.style.top = '0';
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, false);

// Apply to image buttons
var imageButtons = document.getElementsByClassName("image-button");
addHoverEffect(imageButtons, 'hover-content');

// Apply to downlinks
var downlinks = document.getElementsByClassName("downlink");
addHoverEffect(downlinks, 'downlink-hover');
