let familyData = null;  // To store family data globally
let historyStack = [];  // To track navigation history

document.addEventListener('DOMContentLoaded', function () {
    fetch('database.json')
        .then(response => response.json())
        .then(data => {
            familyData = data;
            updateDisplay(1);  // Start with ID 1, "ME"
        })
        .catch(error => {
            console.error('Error loading the data:', error);
            displayError();
        });
});

function updateDisplay(selectedPersonId) {
    const person = familyData.find(p => p.id === selectedPersonId);
    const mother = person.motherId ? familyData.find(p => p.id === person.motherId) : null;
    const father = person.fatherId ? familyData.find(p => p.id === person.fatherId) : null;

    document.getElementById('selected').textContent = person.name;
    document.getElementById('selected').dataset.id = person.id;
    document.getElementById('mother').textContent = mother ? mother.name : 'No Data';
    document.getElementById('mother').dataset.id = mother ? mother.id : '';
    document.getElementById('father').textContent = father ? father.name : 'No Data';
    document.getElementById('father').dataset.id = father ? father.id : '';

    historyStack.push(selectedPersonId);  // Store history of selected person IDs
}

function updateSelected(element) {
    if (element.dataset.id) {
        updateDisplay(parseInt(element.dataset.id));
    }
}

function goBack() {
    if (historyStack.length > 1) {
        historyStack.pop();  // Remove current selection
        updateDisplay(historyStack[historyStack.length - 1]);  // Update to previous
    } else {
        updateDisplay(1);  // If at start, go back to "ME"
    }
}

function displayError() {
    document.getElementById('selected').textContent = 'Error loading data';
    document.getElementById('mother').textContent = 'Error loading data';
    document.getElementById('father').textContent = 'Error loading data';
}
