document.addEventListener('mousemove', function(e) {
    var sidebar = document.getElementById('sidebar');
    if (e.pageX <= 5) { // Detects mouse near the left edge
        sidebar.style.left = '0px'; // Shows the sidebar
    }
});
