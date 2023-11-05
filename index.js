document.addEventListener('DOMContentLoaded', (event) => {
    const logo = document.querySelector('.logoholder img.logoimage');

    logo.addEventListener('mousemove', (e) => {
        const rect = logo.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
        // Calculate the brightness, where the maximum distance yields 100%
        // and the minimum distance (0) yields 130%.
        const brightness = 130 - (distance / maxDistance * 30);
        logo.style.filter = `brightness(${brightness}%)`;
    });

    logo.addEventListener('mouseleave', () => {
        logo.style.filter = 'brightness(100%)';
    });
});
