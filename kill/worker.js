// worker.js
function performHeavyComputation() {
    let result = 0;
    for (let i = 0; i < 1000; i++) {
		for (let _ = 0; _ < 1000; _++) {
			quickSort(randomIntegers);
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
// Define the quick sort function
function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        const pivotIndex = partition(arr, left, right);
        quickSort(arr, left, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, right);
    }
    return arr;
}

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a list of 100 random integers between 1 and 1000
const randomIntegers = Array.from({length: 100000}, () => getRandomInt(1, 100000));

// Output the list to the console
console.log(randomIntegers);


// Respond to message from the main thread
self.onmessage = function(event) {
    console.log("Starting sort...");
    const sortedArray = bubbleSort(event.data.array);
    console.log("Sort completed.");

    // Send sorted array back to the main thread
    self.postMessage({ sortedArray });
}

performHeavyComputation();  // Start the computation when the worker is initialized
