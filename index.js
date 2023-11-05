document.addEventListener('DOMContentLoaded', (event) => {
    const buttons = document.querySelectorAll('.button img'); // Select all button images
    // Add event listeners to each button for the brightness effect
    buttons.forEach((button) => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
            const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
            const brightness = 130 - (distance / maxDistance * 30);
            button.style.filter = `brightness(${brightness}%)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.filter = 'brightness(100%)';
        });
    });
});
