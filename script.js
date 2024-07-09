// JavaScript to handle form submissions and dynamic content

document.addEventListener("DOMContentLoaded", () => {
    const dormForm = document.getElementById("dormForm");
    const apartmentForm = document.getElementById("apartmentForm");
    const studentForm = document.getElementById("studentForm");
    const maintenanceForm = document.getElementById("maintenanceForm");

    const residencesDiv = document.getElementById("residences");
    const studentsDiv = document.getElementById("students");
    const requestsDiv = document.getElementById("requests");

    const studentResidenceSelect = document.getElementById("studentResidence");
    const requestStudentSelect = document.getElementById("requestStudent");

    let residences = [];
    let students = [];
    let requests = [];

    dormForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("dormName").value;
        const address = document.getElementById("dormAddress").value;
        const size = document.getElementById("dormSize").value;

        const dorm = new DormRoom(name, address, size);
        residences.push(dorm);

        updateResidenceOptions();
        displayResidences();
    });

    apartmentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("apartmentName").value;
        const address = document.getElementById("apartmentAddress").value;
        const bedrooms = document.getElementById("apartmentBedrooms").value;

        const apartment = new Apartment(name, address, bedrooms);
        residences.push(apartment);

        updateResidenceOptions();
        displayResidences();
    });

    studentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("studentName").value;
        const studentId = document.getElementById("studentId").value;
        const gender = document.getElementById("studentGender").value;
        const residenceIndex = document.getElementById("studentResidence").value;

        const student = new Student(name, studentId, gender, residences[residenceIndex]);
        residences[residenceIndex].occupied = true;
        students.push(student);

        updateStudentOptions();
        displayStudents();
        displayResidences();
    });

    maintenanceForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const description = document.getElementById("requestDescription").value;
        const studentIndex = document.getElementById("requestStudent").value;

        const request = new MaintenanceRequest(description, students[studentIndex]);
        requests.push(request);

        displayRequests();
    });

    function updateResidenceOptions() {
        studentResidenceSelect.innerHTML = "";
        residences.forEach((residence, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = residence.name;
            studentResidenceSelect.appendChild(option);
        });
    }

    function updateStudentOptions() {
        requestStudentSelect.innerHTML = "";
        students.forEach((student, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = student.name;
            requestStudentSelect.appendChild(option);
        });
    }

    function displayResidences() {
        residencesDiv.innerHTML = residences.map(res => `<p>${res.toString()}</p>`).join("");
    }

    function displayStudents() {
        studentsDiv.innerHTML = students.map(student => `<p>${student.toString()}</p>`).join("");
    }

    function displayRequests() {
        requestsDiv.innerHTML = requests.map(req => `<p>${req.toString()}</p>`).join("");
    }
});
