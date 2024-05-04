let historyStack = [1];  // Start with the initial 'ME' ID in the stack

document.addEventListener('DOMContentLoaded', function () {
    updateDisplay(historyStack[0]);
});

function updateDisplay(selectedPersonId, transitionClass) {
    const person = familyData.find(p => p.id === selectedPersonId);
    const mother = person.motherId ? familyData.find(p => p.id === person.motherId) : null;
    const father = person.fatherId ? familyData.find(p => p.id === person.fatherId) : null;

    const selectedDiv = document.getElementById('selected');
    const motherDiv = document.getElementById('mother');
    const fatherDiv = document.getElementById('father');
    const line1Div = document.getElementById('line1');
    const line2Div = document.getElementById('line2');

    // Remove animation classes to reset animations
    line1Div.classList.remove('fade-in');
    line2Div.classList.remove('fade-in');

    // Force a DOM reflow by reading the offsetHeight
    void line1Div.offsetHeight;
    void line2Div.offsetHeight;

    // Reapply the fade-in class to restart the animation
    line1Div.classList.add('fade-in');
    line2Div.classList.add('fade-in');

    if (transitionClass) {
        selectedDiv.className = 'person ' + transitionClass;
        motherDiv.className = 'person ' + transitionClass;
        fatherDiv.className = 'person ' + transitionClass;
    } else {
        selectedDiv.className = 'person';
        motherDiv.className = 'person';
        fatherDiv.className = 'person';
    }

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
        historyStack.pop();
        updateDisplay(historyStack[historyStack.length - 1], 'fade-in-bottom-top');
    } else {
        alert("You're at the initial 'Alexander Thomas Bohman' profile.");
    }
}


function displayError() {
    document.getElementById('selected').textContent = 'Error loading data';
    document.getElementById('mother').textContent = 'Error loading data';
    document.getElementById('father').textContent = 'Error loading data';
}
// Function to handle hover event on person elements
function handlePersonHover(personId) {
    // Fetch data when hovering over a person
    fetch('http://e817-83-233-247-226.ngrok-free.app/family', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "id": personId  // Use the provided personId instead of hardcoded 1
        })
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error occurred:', error));
}

// Get all person elements
const persons = document.querySelectorAll('.person');

// Add event listener to each person element
persons.forEach(person => {
    const personId = parseInt(person.dataset.id); // Get the person's ID from dataset
    person.addEventListener('mouseover', () => handlePersonHover(personId));
});