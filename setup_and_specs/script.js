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

function toggleContent(content) {
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
}
