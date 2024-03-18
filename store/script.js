document.addEventListener('mousemove', function(e) {
    var sidebar = document.getElementById('sidebar');
    // Check if sidebar is already closed to avoid reopening it.
    if (e.pageX <= 5 && sidebar.style.left === "-200px") {
        sidebar.style.left = '0px';
    }
});

document.getElementById('close-btn').addEventListener('click', function() {
    document.getElementById('sidebar').style.left = '-200px';
});
