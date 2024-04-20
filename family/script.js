let familyData = null;  // To store family data globally
let historyStack = [1];  // Start with the initial 'ME' ID in the stack

document.addEventListener('DOMContentLoaded', function () {
    fetch('database.json')
        .then(response => response.json())
        .then(data => {
            familyData = data;
            updateDisplay(historyStack[0]);  // Start with ID 1, "ME"
        })
        .catch(error => {
            console.error('Error loading the data:', error);
            displayError();
        });
});

function updateDisplay(selectedPersonId, transitionClass) {
    const person = familyData.find(p => p.id === selectedPersonId);
    const mother = person.motherId ? familyData.find(p => p.id === person.motherId) : null;
    const father = person.fatherId ? familyData.find(p => p.id === person.fatherId) : null;

    const selectedDiv = document.getElementById('selected');
    // Set z-index immediately before animation
    selectedDiv.style.zIndex = -1;

    // Remove classes and force reflow
    selectedDiv.classList.remove('fade-in-tl-br', 'fade-in-tr-bl', 'fade-in-bottom-top');
    void selectedDiv.offsetHeight;

    // Re-add the class and reset z-index after animation
    setTimeout(() => {
        if (transitionClass) {
            selectedDiv.classList.add(transitionClass);
        }
        selectedDiv.style.zIndex = -1; // Reinforce z-index after animation
    }, 10); // Ensures class is added after reflow

    // Update displayed data
    setTimeout(() => {
        selectedDiv.textContent = person.name;
        selectedDiv.dataset.id = person.id;
        document.getElementById('mother').textContent = mother ? mother.name : 'No Data';
        document.getElementById('mother').dataset.id = mother ? mother.id : '';
        document.getElementById('father').textContent = father ? father.name : 'No Data';
        document.getElementById('father').dataset.id = father ? father.id : '';
    }, 20); // Ensures display update happens after class manipulation
}

function updateSelected(element) {
    if (element.dataset.id) {
        const selectedId = parseInt(element.dataset.id);
        historyStack.push(selectedId);  // Push new selection to stack
        const transitionClass = element.id === 'father' ? 'fade-in-tl-br' : 'fade-in-tr-bl';
        updateDisplay(selectedId, transitionClass);
    }
}

function goBack() {
    if (historyStack.length > 1) {
        historyStack.pop();  // Remove current selection
        updateDisplay(historyStack[historyStack.length - 1], 'fade-in-bottom-top');  // Update to previous
    } else {
        alert("You're at the initial 'Alexander Thomas Bohman' profile.");
    }
}


function displayError() {
    document.getElementById('selected').textContent = 'Error loading data';
    document.getElementById('mother').textContent = 'Error loading data';
    document.getElementById('father').textContent = 'Error loading data';
}
