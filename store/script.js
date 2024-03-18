let isSidebarVisible = false; // Flag to track sidebar visibility

document.addEventListener('mousemove', function(e) {
    if (e.pageX <= 5 && !isSidebarVisible) { // Only open sidebar if it's not already visible
        document.getElementById('sidebar').style.left = '0px';
        isSidebarVisible = true; // Update flag
    }
});

document.getElementById('close-btn').addEventListener('click', function() {
    document.getElementById('sidebar').style.left = '-200px';
    isSidebarVisible = false; // Update flag
});
