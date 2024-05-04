let historyStack = [1];  // Start with the initial 'ME' ID in the stack

document.addEventListener('DOMContentLoaded', function () {
    updateDisplay(historyStack[0]);
	persons.forEach(person => {
        const personId = parseInt(person.dataset.id);
        person.addEventListener('mouseover', () => handlePersonHover(personId));
    });
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
let lastPersonId = 1; // Initialize lastPersonId

function handlePersonHover(personId) {
    if (personId === lastPersonId) {
        return;
    }

    lastPersonId = personId; // Update lastPersonId immediately upon a new hover

    fetch('https://804c-83-233-247-226.ngrok-free.app/family', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "id": personId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            if (document.getElementById('leftData').textContent !== "No Data") {
                document.getElementById('leftData').textContent = "No Data";
            }
        } else {
            updateLeftData(data);
        }
    })
    .catch(error => {
        console.error('Error occurred:', error);
        document.getElementById('leftData').textContent = "No Data";
    });
}

// Example event listener attachment
persons.forEach(person => {
    const personId = parseInt(person.dataset.id); // Ensure dataset value is captured correctly
    person.addEventListener('mouseover', () => handlePersonHover(personId));
});

function updateLeftData(data) {
    const leftDataDiv = document.getElementById('leftData');
    leftDataDiv.innerHTML = `
        <div><strong>Name:</strong> ${data.name}</div>
        <div><img src="${data.img}" alt="Profile Picture" /></div>
        <div><strong>Birth:</strong> ${data.info.birth}</div>
        <div><strong>Gender:</strong> ${data.info.gender}</div>
        <div><strong>Siblings:</strong> ${data.info.siblings.join(', ')}</div>
        <div>${data.info.textinfo ? `<strong>Info:</strong> ${data.info.textinfo}` : ''}</div>
    `;
}

// Get all person elements
const persons = document.querySelectorAll('.person');

// Example event listener attachment
persons.forEach(person => {
    const personId = parseInt(person.dataset.id); // Ensure dataset value is captured correctly
    person.addEventListener('mouseover', () => handlePersonHover(personId, lastPersonId));
});
