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
    if (personId === lastPersonId) {
        return;
    }

    fetch(`${key}family`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "id": personId })
    })
    .then(response => {
        if (response.ok) {
            const contentType = response.headers.get("Content-Type");
            if (contentType && contentType.includes("application/json")) {
                return response.json();
            } else {
                console.log("Oops, we haven't got JSON!");
            }
        } else {
            console.log('Network response was not ok.');
        }
    })
    .then(data => {
        if (!data.error) {
            updateLeftData(data, personId);
	    lastPersonId = personId;
        } else {
            console.error("Data error received:", data.error);
        }
    })
    .catch(error => {
        console.error('Error occurred:', error);
    });
}

function updateLeftData(data, id) {
    const leftDataDiv = document.getElementById('leftData');

    function updateInnerHTML(imageUrl) {
        leftDataDiv.classList.remove('fade-in-left-right', 'opacity-down');
        void leftDataDiv.offsetWidth; // Force reflow
        leftDataDiv.innerHTML = `
            <div><h3><strong>Name:</strong> ${data.name}</h3></div>
            <div><img src="${imageUrl}" alt="Profile Picture"/></div>
            <div><strong>Birth:</strong> ${data.info.birth}</div>
            <div><strong>Gender:</strong> ${data.info.gender}</div>
            <div><strong>Siblings:</strong> ${data.info.siblings.join(', ')}</div><br>
            <div>${data.info.textinfo || ''}</div>
        `;
        leftDataDiv.classList.add('fade-in-left-right');
    }

    if (data.img) {
        updateInnerHTML(data.img);
    } else {
        fetch(`${key}images/${id}/`, { method: 'GET' })

        .then(response => response.blob())
        .then(imageBlob => {
            const imageUrl = URL.createObjectURL(imageBlob);
            updateInnerHTML(imageUrl);
        })
        .catch(error => {
            console.error('Error occurred:', error);
            updateInnerHTML('https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg'); // Fallback image
        });
    }
}
