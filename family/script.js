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
    const motherDiv = document.getElementById('mother');
    const fatherDiv = document.getElementById('father');

    // Remove and re-add the element or force reflow
    selectedDiv.style.animation = 'none';  // Remove the animation

    // Force a reflow by accessing offsetHeight
    void selectedDiv.offsetHeight;

    // Re-apply animation with a slight delay to ensure it kicks in
    setTimeout(() => {
        selectedDiv.style.animation = '';  // Reset the animation so it can start again
        if (transitionClass) {
            selectedDiv.classList.add(transitionClass);
        }
        selectedDiv.textContent = person.name;
        selectedDiv.dataset.id = person.id;
        motherDiv.textContent = mother ? mother.name : 'No Data';
        motherDiv.dataset.id = mother ? mother.id : '';
        fatherDiv.textContent = father ? father.name : 'No Data';
        fatherDiv.dataset.id = father ? father.id : '';
    }, 20); // Short delay to ensure the animation is reset
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
