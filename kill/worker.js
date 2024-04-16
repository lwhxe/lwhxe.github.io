// worker.js
function performHeavyComputation() {
    let result = 0;
    for (let i = 0; i < 1000; i++) {
		for (let _ = 0; _ < 1000; _++) {
			result += Math.random() * Math.random();
			result += Math.pow(Math.random(), Math.random()); // Power calculations
			result += Math.sin(Math.random() * Math.PI); // Trigonometric calculations
			result += Math.pow(Math.random(), Math.random()); // Power calculations
			result += Math.sin(Math.random() * Math.PI); // Trigonometric calculations
			result += Math.pow(Math.random(), Math.random()); // Power calculations
			result += Math.sin(Math.random() * Math.PI); // Trigonometric calculations
		}
        postMessage(result);  // Send the result after each addition
    }
    setTimeout(performHeavyComputation, 500);  // Continue computation after a short delay
}

performHeavyComputation();  // Start the computation when the worker is initialized
