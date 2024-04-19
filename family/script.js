document.addEventListener('DOMContentLoaded', function () {
    fetch('database.json')
        .then(response => response.json())
        .then(data => {
            const selectedPersonId = 1; // Default is 1, "ME"
            const person = data.find(p => p.id === selectedPersonId);
            const mother = person.motherId ? data.find(p => p.id === person.motherId) : null;
            const father = person.fatherId ? data.find(p => p.id === person.fatherId) : null;

            document.getElementById('selected').textContent = person.name;
            document.getElementById('mother').textContent = mother ? mother.name : 'No Data';
            document.getElementById('father').textContent = father ? father.name : 'No Data';
        })
        .catch(error => {
            console.error('Error loading the data:', error);
        });
});
