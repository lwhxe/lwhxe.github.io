let historyStack = [1];  // Start with the initial 'ME' ID in the stack

document.addEventListener('DOMContentLoaded', function () {
    updateDisplay(historyStack[0]);
});

function updateDisplay(selectedPersonId, transitionClass) {
    const person = familyData.find(p => p.id === selectedPersonId);
    const mother = person.motherId ? familyData.find(p => p.id === person.motherId) : null;
    const father = person.fatherId ? familyData.find(p => p.id === person.fatherId) : null;

    // Target the main selected div and related person divs
    const selectedDiv = document.getElementById('selected');
    const motherDiv = document.getElementById('mother');
    const fatherDiv = document.getElementById('father');
    const line1Div = document.getElementById('line1');
    const line2Div = document.getElementById('line2');

    // Reset classes to remove any previous animations
    selectedDiv.className = 'person';
    motherDiv.className = 'person';
    fatherDiv.className = 'person';
    line1Div.className = ''; // Ensure no other classes interfere
    line2Div.className = '';

    // Apply fade-in animation to lines at the same time as other transitions
    line1Div.classList.add('fade-in');
    line2Div.classList.add('fade-in');

    // Re-add the appropriate class to ensure animation can restart
    if (transitionClass) {
        setTimeout(() => {
            selectedDiv.classList.add(transitionClass);
            motherDiv.classList.add(transitionClass);
            fatherDiv.classList.add(transitionClass);
            // Also apply the fade-in animation if needed here to synchronize
            selectedDiv.classList.add('fade-in');
            motherDiv.classList.add('fade-in');
            fatherDiv.classList.add('fade-in');
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
updateDisplay(historyStack[0]);