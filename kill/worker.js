// worker.js
function performHeavyComputation() {
    let result = 0;
    for (let i = 0; i < 10; i++) {
        result += Math.random() * Math.random();
        postMessage(result);  // Send the result after each addition
    }
    setTimeout(performHeavyComputation, 500);  // Continue computation after a short delay
}

performHeavyComputation();  // Start the computation when the worker is initialized
