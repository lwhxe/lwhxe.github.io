let isSidebarVisible = false; // Flag to track sidebar visibility

document.addEventListener('mousemove', function(e) {
    var sidebar = document.getElementById('sidebar');
    var closeButton = document.getElementById('close-btn');
    if (e.pageX <= 5 && !isSidebarVisible) { // Only open sidebar if it's not already visible
        sidebar.style.left = '0px';
        closeButton.style.display = 'flex'; // Show the X button
        isSidebarVisible = true; // Update flag
    }
});

document.getElementById('close-btn').addEventListener('click', function() {
    var sidebar = document.getElementById('sidebar');
    var closeButton = document.getElementById('close-btn');
    sidebar.style.left = '-200px';
    closeButton.style.display = 'none'; // Hide the X button
    isSidebarVisible = false; // Update flag
});
