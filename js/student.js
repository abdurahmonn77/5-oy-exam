document.addEventListener("DOMContentLoaded", () => {
    const elProfileInput = document.querySelector(".profile-inpt");
    const elProfilePicture = document.querySelector(".profile-picture");
    const savedStudentList = document.querySelector(".saved-student-list");
    const adminName = document.querySelector(".admin-name");
    const clearButton = document.querySelector(".clear-btn");
    
    const user = JSON.parse(localStorage.getItem("user"));
    adminName.textContent = user.username;

    elProfileInput.addEventListener("change", function (e) {
        elProfilePicture.src = URL.createObjectURL(e.target.files[0]);
    });

    function renderSavedStudents() {
        const savedStudents = JSON.parse(localStorage.getItem("savedStudents")) || [];
        savedStudentList.innerHTML = "";
        if (savedStudents.length === 0) {
            savedStudentList.innerHTML = "<li>No saved students found.</li>";
            return;
        }

        savedStudents.forEach((student) => {
            const elItem = document.createElement("li");
            elItem.className = "bg-white w-[500px] h-[300px] rounded-[10px] pl-[15px] pb-[10px] pt-[10px]";
            elItem.innerHTML = `
                <img src="images/teacher.png" alt="Profile" class="w-[165px] h-[105px] rounded-[8px]">
                <div class="w-[793px] flex flex-col justify-between mt-[30px]">
                    <span class="text-[18px] font-bold">Name: ${student.name}</span>
                    <span class="text-[18px] font-bold">Email: ${student.email}</span>
                    <span class="text-[18px] font-bold">Phone: ${student.phone}</span>
                    <span class="text-[18px] font-bold">Enroll ID: ${student.enroll}</span>
                    <span class="text-[18px] font-bold">Date: ${student.date}</span>
                </div>
            `;
            savedStudentList.appendChild(elItem);
        });
    }

    function handleClearStudents() {
        savedStudentList.innerHTML = "";
        localStorage.removeItem("savedStudents"); 
    }

    clearButton.addEventListener("click", handleClearStudents);

    renderSavedStudents();
});
