const nodes = [];

function addNode() {
    // Gather input values
    const damage = parseInt(document.getElementById('damage').value) || 0;
    const chargeInterval = parseInt(document.getElementById('chargeInterval').value) || 0;
    const ammoCount = parseInt(document.getElementById('ammoCount').value) || 0;
    const pauseDuration = parseInt(document.getElementById('pauseDuration').value) || 0;

    // Add node based on input provided
    if (damage > 0 && chargeInterval > 0 && ammoCount > 0) {
        nodes.push({ type: 'Cataclysmic', damage, chargeInterval, ammoCount });
    } else if (pauseDuration > 0) {
        nodes.push({ type: 'Pause', duration: pauseDuration });
    }

    // Reset form fields
    document.getElementById('damage').value = '';
    document.getElementById('chargeInterval').value = '';
    document.getElementById('ammoCount').value = '';
    document.getElementById('pauseDuration').value = '';
}

function calculateDPS() {
    let current_time = 0;
    let total_damage = 0;
    nodes.forEach(node => {
        if (node.type === 'Cataclysmic') {
            for (let i = 0; i < node.ammoCount && current_time < 60; i++) {
                total_damage += node.damage;
                current_time += node.chargeInterval;
            }
        } else if (node.type === 'Pause') {
            current_time += node.duration;
        }
    });

    const dps = total_damage / 60;
    displayDPSGraph(dps);
}

function displayDPSGraph(dps) {
    const ctx = document.getElementById('dpsGraph').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['DPS'],
            datasets: [{
                label: 'Damage Per Second',
                data: [dps],
                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
