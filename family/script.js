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
    const selectedContentDiv = document.getElementById('selected-content');
    const mother = person.motherId ? familyData.find(p => p.id === person.motherId) : null;
    const father = person.fatherId ? familyData.find(p => p.id === person.fatherId) : null;

    // Target the main selected div and related person divs
    const selectedDiv = document.getElementById('selected');
    const motherDiv = document.getElementById('mother');
    const fatherDiv = document.getElementById('father');

    // Apply class to reset animations if necessary
    selectedDiv.className = 'person';  // Reset to default class to remove all previous animations
    motherDiv.className = 'person';
    fatherDiv.className = 'person';

    // Re-add the appropriate class to ensure animation can restart
    if (transitionClass) {
        // Delay adding the class slightly to ensure DOM has time to reset
        setTimeout(() => {
            selectedDiv.classList.add(transitionClass);
        }, 20);  // Short delay to help reset the animation
    }

    // Update the displayed data
    selectedDiv.textContent = person.name;
    selectedDiv.dataset.id = person.id;
    motherDiv.textContent = mother ? mother.name : 'No Data';
    motherDiv.dataset.id = mother ? mother.id : '';
    fatherDiv.textContent = father ? father.name : 'No Data';
    fatherDiv.dataset.id = father ? father.id : '';
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
