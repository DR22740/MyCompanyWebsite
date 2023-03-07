// JavaScript for Personnel Availability Schedule

const personnelSelect = document.getElementById("personnel");
const timetable = document.getElementById("timetable");
const timeSlotButtons = document.querySelectorAll(".time-slot-button");

let selectedTimeSlotButton = null;

function generateTimetable(personnel) {
    // Clear existing timetable
    timetable.innerHTML = "";

    // Generate new timetable
    for (let i = 8; i <= 20; i++) {
        let timeSlot = document.createElement("div");
        timeSlot.classList.add("time-slot");

        let timeSlotLabel = document.createElement("div");
        timeSlotLabel.classList.add("time-slot-label");
        timeSlotLabel.innerText = `${i}:00`;

        let timeSlotButton = document.createElement("button");
        timeSlotButton.classList.add("time-slot-button");
        timeSlotButton.value = `${i}:00`;
        timeSlotButton.innerText = "Available";

        // Disable button if it was previously selected
        if (selectedTimeSlotButton !== null && selectedTimeSlotButton.value === timeSlotButton.value) {
            timeSlotButton.classList.add("selected");
            timeSlotButton.disabled = true;
        }

        // Add event listener to time slot button
        timeSlotButton.addEventListener("click", () => {
            // Deselect previously selected button
            if (selectedTimeSlotButton !== null) {
                selectedTimeSlotButton.classList.remove("selected");
                selectedTimeSlotButton.disabled = false;
            }

            // Select new button and disable it
            timeSlotButton.classList.add("selected");
            timeSlotButton.disabled = true;
            selectedTimeSlotButton = timeSlotButton;
        });

        timeSlot.appendChild(timeSlotLabel);
        timeSlot.appendChild(timeSlotButton);
        timetable.appendChild(timeSlot);
    }

    // Deselect selected time slot button
    if (selectedTimeSlotButton !== null) {
        selectedTimeSlotButton.classList.remove("selected");
        selectedTimeSlotButton.disabled = false;
        selectedTimeSlotButton = null;
    }
}

// Generate timetable when personnel is selected
personnelSelect.addEventListener("change", () => {
    let personnel = personnelSelect.value;
    generateTimetable(personnel);

    // Deselect selected time slot button
    if (selectedTimeSlotButton !== null) {
        selectedTimeSlotButton.classList.remove("selected");
        selectedTimeSlotButton.disabled = false;
        selectedTimeSlotButton = null;
    }
});

// Add event listeners to time slot buttons
timeSlotButtons.forEach(button => {
    button.addEventListener("click", () => {
        button.classList.add("selected");
    });
});

// Add event listener to confirm button
const confirmButton = document.querySelector(".confirm-button button");
confirmButton.addEventListener("click", () => {
    if (selectedTimeSlotButton === null) {
        alert("Please select a time slot");
    } else {
        alert(`Time slot ${selectedTimeSlotButton.value} has been reserved`);
    }
});
