document.querySelectorAll(".collapsible").forEach(function(coll) {
    coll.addEventListener("click", function() {
        var wasActive = this.classList.contains("active");
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        toggleContent(content, wasActive);

        if (!wasActive) { // Only run the parent adjustment if we are expanding
            // Update all parent collapsible elements
            let parent = this.parentElement;
            while (parent) {
                if (parent.classList.contains("content") && parent.style.maxHeight) {
                    // Adjust the parent content's max height
                    parent.style.maxHeight = parseInt(parent.style.maxHeight) + content.scrollHeight + "px";
                    parent = parent.parentElement; // Move up to the next parent element
                } else {
                    break; // Stop if the parent is not a content container
                }
            }
        }
    });
});

function toggleContent(content, wasActive) {
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }

    // If collapsing, don't shrink the parents
    if (wasActive) return;

    // If expanding, update the maxHeight for any active parent containers
    let parent = content.parentElement;
    while (parent) {
        if (parent.classList.contains("content") && parent.style.maxHeight) {
            parent.style.maxHeight = parseInt(parent.style.maxHeight) + content.scrollHeight + "px";
        }
        parent = parent.parentElement;
    }
}
