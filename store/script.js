<script>
    document.addEventListener('mousemove', function(e) {
        var sidebar = document.getElementById('sidebar');
        if (e.pageX <= 5) { // Adjust if needed
            sidebar.style.left = '0'; // Show sidebar
        }
    });
</script>
