let historyStack = [1];  // Start with the initial 'ME' ID in the stack
const persons = document.querySelectorAll('.person');

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
	
	attachEventListeners(selectedDiv, person.id);
    attachEventListeners(motherDiv, mother ? mother.id : null);
    attachEventListeners(fatherDiv, father ? father.id : null);
}
function attachEventListeners(element, personId) {
    if (element.eventListener) {
        element.removeEventListener('mouseover', element.eventListener);
    }

    if (personId) {
        element.eventListener = () => handlePersonHover(personId);
        element.addEventListener('mouseover', element.eventListener);
    }
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
let lastPersonId = 512; // Initialize lastPersonId

function handlePersonHover(personId) {
    // Check if the current personId is the same as the last hovered personId
    if (personId === lastPersonId) {
        console.log("Hovered the same person:", lastPersonId); // Debugging output
        return; // Exit the function if the same person is hovered again
    }

    // Update lastPersonId to the current personId
    lastPersonId = personId;
    console.log("New hover detected, lastPersonId updated to:", lastPersonId); // Debugging output

    // Fetch data for the new person
    fetch('https://804c-83-233-247-226.ngrok-free.app/family', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "id": personId })
    })
    .then(response => response.json())
    .then(data => {
        if (!data.error) {
            updateLeftData(data); // Update the display with the new person data
			const leftDataDiv = document.getElementById('leftData');
        } else {
            console.error("Data error received:", data.error);
        }
    })
    .catch(error => {
        console.error('Error occurred:', error);
    });
}


function updateLeftData(data) {
    const leftDataDiv = document.getElementById('leftData');

    // Ensure animation class is removed
    leftDataDiv.classList.remove('fade-in-left-right');
	leftDataDiv.classList.remove('opacity-down');
	setTimeout(() => leftDataDiv.classList.add('opacity-down'), 10);
    // Force reflow to reset the animation
    void leftDataDiv.offsetWidth;
    leftDataDiv.innerHTML = `
        <div><strong>Name:</strong> ${data.name}</div>
        <div><img src="${data.img}" alt="Profile Picture" /></div>
        <div><strong>Birth:</strong> ${data.info.birth}</div>
        <div><strong>Gender:</strong> ${data.info.gender}</div>
        <div><strong>Siblings:</strong> ${data.info.siblings.join(', ')}</div><br>
        <div>${data.info.textinfo}</
    `;
	setTimeout(() => leftDataDiv.classList.add('fade-in-left-right'), 10);
}
