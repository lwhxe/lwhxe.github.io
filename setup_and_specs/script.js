document.querySelectorAll(".collapsible").forEach(function(coll) {
    coll.addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        toggleContent(content);

        // If this is a nested collapsible, update the parent
        if (this.classList.contains("nested")) {
            var parentContent = this.closest(".content").previousElementSibling;
            toggleContent(parentContent);
        }
    });
});

function toggleContent(content) {
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
}
