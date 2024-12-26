const elSearchInput = document.querySelector(".search-input");
const elSortBtn = document.querySelector(".sort-btn");
const elAddBtn = document.querySelector(".add-student");
const elSaveBtn = document.querySelector(".save-btn");
const adminName = document.querySelector(".admin-name");
const elEditBtn = document.querySelector(".edit-btn");
const elDeleteBtn = document.querySelector(".delete-btn");
const elStudentsBtn = document.querySelector(".students-btn");
const elProfileInput = document.querySelector(".profile-inpt");
const elProfilePicture = document.querySelector(".profile-picture");
const elModalWrapper = document.querySelector("#wrapper");
const elModal = document.querySelector(".modal");
const elAddForm = document.querySelector(".add-student-form");
const elStudentList = document.querySelector(".student-list");
const elModalImg = document.querySelector(".modal-img");
const elModalImgInpt = document.querySelector(".student-img-input");

const user = JSON.parse(localStorage.getItem("user"));

if (user && user.username) {
    adminName.textContent = user.username;
} else {
    console.error("User data is missing or invalid");
}

elProfileInput.addEventListener("change", function (e) {
    elProfilePicture.src = URL.createObjectURL(e.target.files[0]);
});
elModalImgInpt.addEventListener("change", function (e) {
    elModalImg.src = URL.createObjectURL(e.target.files[0]);
});

// MODAL PART
function closeModal(e) {
    if (e.target === elModalWrapper) {
        elModalWrapper.classList.add("scale-0");
    }
}

elModalWrapper.addEventListener("click", closeModal);

elAddBtn.addEventListener("click", function (e) {
    e.preventDefault();
    elModalWrapper.classList.remove("scale-0");
});
// MODAL PART END

// Add student
function handleDeleteBtn(studentElement, studentIndex) {
    studentElement.remove();

    let students = JSON.parse(localStorage.getItem("students")) || [];
    let savedStudents = JSON.parse(localStorage.getItem("savedStudents")) || [];

    const studentToDelete = students[studentIndex];
    students.splice(studentIndex, 1);
    savedStudents = savedStudents.filter(
        (savedStudent) => savedStudent.name !== studentToDelete.name
    );

    localStorage.setItem("students", JSON.stringify(students));
    localStorage.setItem("savedStudents", JSON.stringify(savedStudents));
}

function renderStudents(students) {
    elStudentList.innerHTML = ""; 

    students.forEach((student, index) => {
        const newStudentItem = document.createElement("li");
        newStudentItem.classList.add("bg-white", "py-[15px]", "pl-[13px]", "pr-[34px]", "rounded-[8px]", "flex", "items-center");
        newStudentItem.innerHTML = `
            <img src="${student.image || 'default-image.jpg'}" alt="Profile" class="w-[65px] h-[55px] rounded-[8px]">
            <div class="w-[793px] flex justify-between ml-[150px]">
                <span class="text-[14px] font-normal">${student.name}</span>
                <span class="text-[14px] font-normal">${student.email}</span>
                <span class="text-[14px] font-normal">${student.phone}</span>
                <span class="text-[14px] font-normal">${student.enroll}</span>
                <span class="text-[14px] font-normal">${student.date}</span>
            </div>
            <div class="flex gap-[15px] items-center ml-[118px]">
                <button class="save-btn"><img src="images/list-saver.svg" alt="Save"></button>
                <button class="edit-btn"><img src="images/edit.svg" alt="Edit"></button>
                <button class="delete-btn"><img src="images/delete.svg" alt="Delete"></button>
            </div>
        `;

        const deleteButton = newStudentItem.querySelector(".delete-btn");
        deleteButton.addEventListener("click", function () {
            handleDeleteBtn(newStudentItem, index);
        });

        const saveButton = newStudentItem.querySelector(".save-btn");
        saveButton.addEventListener("click", function () {
            saveStudentToSavedList(student);
        });

        elStudentList.appendChild(newStudentItem);
    });
}

function saveStudentToSavedList(student) {
    let savedStudents = JSON.parse(localStorage.getItem("savedStudents")) || [];
    savedStudents.push(student);
    localStorage.setItem("savedStudents", JSON.stringify(savedStudents));
}

function renderSavedStudents() {
    const savedStudents = JSON.parse(localStorage.getItem("savedStudents")) || [];
    renderStudents(savedStudents);
}

elAddForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const studentName = e.target["student-name"].value;
    const studentEmail = e.target["student-email"].value;
    const studentPhone = e.target["student-phone"].value;
    const studentEnroll = e.target["student-enroll"].value;
    const studentDate = e.target["student-data"].value;
    const studentImage = elModalImg.src;

    const students = JSON.parse(localStorage.getItem("students")) || [];
    students.push({
        name: studentName,
        email: studentEmail,
        phone: studentPhone,
        enroll: studentEnroll,
        date: studentDate,
        image: studentImage,
    });
    localStorage.setItem("students", JSON.stringify(students));

    renderStudents(students);

    e.target.reset();
    elModalWrapper.classList.add("scale-0");
});

// LOCAL STORAGE START
document.addEventListener("DOMContentLoaded", function () {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    renderStudents(students);
});
// LOCAL STORAGE END

// SORT BTN START
elSortBtn.addEventListener("click", function () {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    students.sort((a, b) => a.name.localeCompare(b.name));
    localStorage.setItem("students", JSON.stringify(students));

    renderStudents(students);
});
// SORT BTN END

// SEARCH BTN START
elSearchInput.addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const students = JSON.parse(localStorage.getItem("students")) || [];

    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchTerm)
    );

    renderStudents(filteredStudents);
});
// SEARCH BTN END

// STUDENTS BTN START
elStudentsBtn.addEventListener("click", function () {
    renderSavedStudents();
});
// STUDENTS BTN END
