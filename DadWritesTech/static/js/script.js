function calculateMileage() {
    const weekdayDays = document.getElementById('weekdayDays').value;
    const weekdayKms = document.getElementById('weekdayKms').value;
    const weeksOff = document.getElementById('weeksOff').value;
    const weekendKms = document.getElementById('weekendKms').value;
    const vacationKms = document.getElementById('vacationKms').value;
    
    const weeksPerYear = 52;
    const drivingWeeks = weeksPerYear - weeksOff;
    
    const weekdayMileage = weekdayDays * weekdayKms * drivingWeeks;
    const weekendMileage = weekendKms * weeksPerYear;
    
    const totalMileage = parseFloat(weekdayMileage) + parseFloat(weekendMileage) + parseFloat(vacationKms);
    
    document.getElementById('result').innerText = `Total Annual Mileage: ${totalMileage} km`;
}
