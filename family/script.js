let familyData = null; // To store family data globally

document.addEventListener('DOMContentLoaded', function () {
    fetch('database.json')
        .then(response => response.json())
        .then(data => {
            familyData = data; // Store the data globally
            updateDisplay(1); // Default to ME, id 1
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
    document.getElementById('selected').dataset.id = person.id; // Store current ID in data attribute
    document.getElementById('mother').textContent = mother ? mother.name : 'No Data';
    document.getElementById('mother').dataset.id = mother ? mother.id : ''; // Store ID for clicks
    document.getElementById('father').textContent = father ? father.name : 'No Data';
    document.getElementById('father').dataset.id = father ? father.id : ''; // Store ID for clicks
}

function updateSelected(element) {
    if (element.dataset.id) {
        updateDisplay(parseInt(element.dataset.id));
    }
}

function displayError() {
    document.getElementById('selected').textContent = 'Error loading data';
    document.getElementById('mother').textContent = 'Error loading data';
    document.getElementById('father').textContent = 'Error loading data';
}
