let currentUnit = 'km';
const kmToMilesFactor = 0.621371;

function updateUnit() {
    const unitToggleEl = document.getElementById('unitToggle');
    // Exit if the core element isn't found
    if (!unitToggleEl) return;

    currentUnit = unitToggleEl.value;

    const unitSpans = document.getElementsByClassName('unit');
    for (let span of unitSpans) {
        span.textContent = currentUnit;
    }

    const resultElement = document.getElementById('result');
    if (resultElement) {
         resultElement.innerText = ''; // Clear result safely
    }
}

function calculateDistance() {
    // Get all elements first
    const weekdayDaysEl = document.getElementById('weekdayDays');
    const weekdayDistanceEl = document.getElementById('weekdayDistance');
    const weeksOffEl = document.getElementById('weeksOff');
    const weekendDistanceEl = document.getElementById('weekendDistance');
    const vacationDistanceEl = document.getElementById('vacationDistance');
    const resultEl = document.getElementById('result');
    const unitToggleEl = document.getElementById('unitToggle'); // Need this for unit check

    // Check if ALL required elements exist
    if (!weekdayDaysEl || !weekdayDistanceEl || !weeksOffEl || !weekendDistanceEl || !vacationDistanceEl || !resultEl || !unitToggleEl) {
        console.error("Calculator elements missing, cannot calculate.");
        // Optionally display error to user if resultEl exists
        if(resultEl) resultEl.innerText = "Error: Input elements missing.";
        return;
    }

    // Now safe to get values
    const weekdayDays = parseFloat(weekdayDaysEl.value);
    const weekdayDistance = parseFloat(weekdayDistanceEl.value);
    const weeksOff = parseFloat(weeksOffEl.value);
    const weekendDistance = parseFloat(weekendDistanceEl.value);
    const vacationDistance = parseFloat(vacationDistanceEl.value);
    currentUnit = unitToggleEl.value; // Update unit just in case

    if (isNaN(weekdayDays) || isNaN(weekdayDistance) || isNaN(weeksOff) || isNaN(weekendDistance) || isNaN(vacationDistance)) {
         resultEl.innerText = 'Please enter valid numbers in all fields.';
         return;
    }

    const weeksPerYear = 52;
    const drivingWeeks = weeksPerYear - weeksOff;

    const weekdayTotal = weekdayDays * weekdayDistance * drivingWeeks;
    const weekendTotal = weekendDistance * weeksPerYear;

    let totalDistance = weekdayTotal + weekendTotal + vacationDistance;

    if (currentUnit === 'miles') {
        totalDistance *= kmToMilesFactor;
    }

    resultEl.innerText = `Total Annual Distance: ${totalDistance.toFixed(2)} ${currentUnit}`;
}

// --- Initialization & Event Listeners ---
// Wrap initialization and listeners in a check for a key element
const unitToggleElement = document.getElementById('unitToggle');
if (unitToggleElement) {
    // It's likely the calculator page, proceed with setup
    updateUnit(); // Initialize units

    // Add listeners for calculator interactions
    unitToggleElement.addEventListener('change', updateUnit);

    // Assuming you have input fields and potentially a button to trigger calculation
    // Add listeners to recalculate when inputs change or button is clicked
    const calcButton = document.getElementById('calculateButton'); // Example ID
    if (calcButton) {
         calcButton.addEventListener('click', calculateDistance);
    } else {
        // If no button, maybe calculate on input change (can be performance intensive)
        const inputFields = ['weekdayDays', 'weekdayDistance', 'weeksOff', 'weekendDistance', 'vacationDistance'];
        inputFields.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                 el.addEventListener('input', calculateDistance);
            }
        });
        unitToggleElement.addEventListener('change', calculateDistance); // Recalc on unit change too
    }
}
// No 'else' needed, script just won't attach listeners or run init if elements aren't found