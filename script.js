document.addEventListener('DOMContentLoaded', (event) => {
    const buttons = document.querySelectorAll('.button img'); // Select all button images
    const gojophoto = document.querySelector('.secondcontainer img'); // Select the Gojo image

    // Function to add brightness effect
    function addBrightnessEffect(element) {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
            const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
            const brightness = 130 - (distance / maxDistance * 30);
            element.style.filter = `brightness(${brightness}%)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.filter = 'brightness(105%)';
        });
    }

    // Add effect to buttons
    buttons.forEach((button) => {
        addBrightnessEffect(button);
    });

    // Add effect to Gojo image
    if (gojophoto) {
        addBrightnessEffect(gojophoto);
    }
});
