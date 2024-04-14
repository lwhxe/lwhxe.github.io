// drain.js
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resultElement = document.getElementById('result');

let computationWorker = null;

startButton.addEventListener('click', function() {
    if (!computationWorker) {
        computationWorker = new Worker('worker.js');
        computationWorker.onmessage = function(event) {
            console.log('Received from worker:', event.data);
            resultElement.textContent = event.data;  // Update the UI with each received result
        };
        console.log('Computation started.');
    }
});

stopButton.addEventListener('click', function() {
    if (computationWorker) {
        computationWorker.terminate();
        computationWorker = null;
        console.log('Computation stopped.');
        resultElement.textContent = "Computation stopped.";
    }
});
