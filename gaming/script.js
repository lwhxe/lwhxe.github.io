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

// Apply to image buttons
var imageButtons = document.getElementsByClassName("image-button");
addHoverEffect(imageButtons, 'hover-content');

// Apply to downlinks
var downlinks = document.getElementsByClassName("downlink");
addHoverEffect(downlinks, 'downlink-hover');
