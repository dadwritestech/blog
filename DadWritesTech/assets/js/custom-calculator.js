let currentUnit = 'km';
const kmToMilesFactor = 0.621371;

function updateUnit() {
    currentUnit = document.getElementById('unitToggle').value;
    const unitSpans = document.getElementsByClassName('unit');
    for (let span of unitSpans) {
        span.textContent = currentUnit;
    }
    // Clear the result when changing units
    document.getElementById('result').innerText = '';
}

function calculateDistance() {
    const weekdayDays = parseFloat(document.getElementById('weekdayDays').value);
    const weekdayDistance = parseFloat(document.getElementById('weekdayDistance').value);
    const weeksOff = parseFloat(document.getElementById('weeksOff').value);
    const weekendDistance = parseFloat(document.getElementById('weekendDistance').value);
    const vacationDistance = parseFloat(document.getElementById('vacationDistance').value);

    const weeksPerYear = 52;
    const drivingWeeks = weeksPerYear - weeksOff;

    const weekdayTotal = weekdayDays * weekdayDistance * drivingWeeks;
    const weekendTotal = weekendDistance * weeksPerYear;

    let totalDistance = weekdayTotal + weekendTotal + vacationDistance;

    if (currentUnit === 'miles') {
        totalDistance *= kmToMilesFactor;
    }

    document.getElementById('result').innerText = `Total Annual Distance: ${totalDistance.toFixed(2)} ${currentUnit}`;
}

// Initialize the unit display
updateUnit();