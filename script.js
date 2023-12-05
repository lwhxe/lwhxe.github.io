var buttons = document.getElementsByClassName("image-button");
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("mouseenter", function() {
        // Actions to perform when hovered
        this.querySelector('.hover-content').style.display = 'block';
    });

    buttons[i].addEventListener("mouseleave", function() {
        // Actions to perform when hover ends
        this.querySelector('.hover-content').style.display = 'none';
    });
}
