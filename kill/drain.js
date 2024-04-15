// drain.js
const resultElement = document.getElementById('result');

let computationWorker = null;


computationWorker = new Worker('worker.js');
computationWorker.onmessage = function(event) {
    console.log('Received from worker:', event.data);
    resultElement.textContent = event.data;  // Update the UI with each received result
};
console.log('Computation started.');
