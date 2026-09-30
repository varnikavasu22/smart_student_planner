// ==========================================
// SMART STUDENT STUDY & PERFORMANCE PLANNER
// ==========================================


// ==========================================
// DATA
// ==========================================

let subjects = JSON.parse(localStorage.getItem("subjects")) || [];
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// ==========================================
// SAVE DATA
// ==========================================

function saveData() {
    localStorage.setItem("subjects", JSON.stringify(subjects));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// ==========================================
// ADD SUBJECT
// ==========================================

function addSubject() {

    const input = document.getElementById("subjectInput");
    const subjectName = input.value.trim();

    if (subjectName === "") {
        alert("Please enter a subject name.");
        return;
    }

    subjects.push({
        name: subjectName
    });

    input.value = "";

    saveData();
    displaySubjects();
    updateDashboard();
}


// ==========================================
// DISPLAY SUBJECTS
// ==========================================

function displaySubjects() {

    const subjectList = document.getElementById("subjectList");

    subjectList.innerHTML = "";

    if (subjects.length === 0) {
        subjectList.innerHTML =
            "<div>No subjects added yet.</div>";
        return;
    }

    subjects.forEach((subject, index) => {

        const div = document.createElement("div");

        div.innerHTML = `
            <strong>📚 ${subject.name}</strong>
            <button onclick="deleteSubject(${index})">
                Delete
            </button>
        `;

        subjectList.appendChild(div);
    });
}


// ==========================================
// DELETE SUBJECT
// ==========================================

function deleteSubject(index) {

    subjects.splice(index, 1);

    saveData();
    displaySubjects();
    updateDashboard();
}


// ==========================================
// ADD TASK
// ==========================================

function addTask() {

    const taskInput = document.getElementById("taskInput");
    const taskDate = document.getElementById("taskDate");
    const taskPriority = document.getElementById("taskPriority");

    const taskName = taskInput.value.trim();
    const date = taskDate.value;
    const priority = taskPriority.value;

    if (taskName === "") {
        alert("Please enter a task.");
        return;
    }

    if (date === "") {
        alert("Please select a date.");
        return;
    }

    tasks.push({
        name: taskName,
        date: date,
        priority: priority,
        completed: false
    });

    taskInput.value = "";
    taskDate.value = "";

    saveData();
    displayTasks();
    updateDashboard();
}


// ==========================================
// DISPLAY TASKS
// ==========================================

function displayTasks() {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerHTML =
            "<div>No tasks added yet.</div>";
        return;
    }

    tasks.forEach((task, index) => {

        const div = document.createElement("div");

        div.innerHTML = `

            <h3>
                ${task.completed ? "✅" : "📝"}
                ${task.name}
            </h3>

            <p>
                📅 Deadline: ${task.date}
            </p>

            <p>
                ⚡ Priority: ${task.priority}
            </p>

            <button onclick="toggleTask(${index})">
                ${task.completed ? "Mark Pending" : "Mark Completed"}
            </button>

            <button onclick="deleteTask(${index})">
                Delete
            </button>
        `;

        taskList.appendChild(div);
    });
}


// ==========================================
// COMPLETE / UNCOMPLETE TASK
// ==========================================

function toggleTask(index) {

    tasks[index].completed =
        !tasks[index].completed;

    saveData();
    displayTasks();
    updateDashboard();
}


// ==========================================
// DELETE TASK
// ==========================================

function deleteTask(index) {

    tasks.splice(index, 1);

    saveData();
    displayTasks();
    updateDashboard();
}


// ==========================================
// UPDATE DASHBOARD
// ==========================================

function updateDashboard() {

    const subjectCount =
        document.getElementById("subjectCount");

    const pendingCount =
        document.getElementById("pendingCount");

    const completedCount =
        document.getElementById("completedCount");

    const overallProgress =
        document.getElementById("overallProgress");

    const progressFill =
        document.getElementById("progressFill");

    const progressText =
        document.getElementById("progressText");


    // Number of subjects

    subjectCount.textContent =
        subjects.length;


    // Completed tasks

    const completedTasks =
        tasks.filter(task => task.completed).length;


    // Pending tasks

    const pendingTasks =
        tasks.length - completedTasks;


    pendingCount.textContent =
        pendingTasks;

    completedCount.textContent =
        completedTasks;


    // Calculate progress

    let progress = 0;

    if (tasks.length > 0) {

        progress =
            Math.round(
                (completedTasks / tasks.length) * 100
            );
    }


    overallProgress.textContent =
        progress + "%";

    progressFill.style.width =
        progress + "%";

    progressText.textContent =
        progress + "% completed";
}


// ==========================================
// GENERATE STUDY PLAN
// ==========================================

function generateStudyPlan() {

    const studyHours =
        document.getElementById("studyHours").value;

    const result =
        document.getElementById("studyPlanResult");


    if (studyHours === "") {

        alert(
            "Please enter your available study hours."
        );

        return;
    }


    if (subjects.length === 0) {

        result.innerHTML =
            "<p>Please add subjects first.</p>";

        return;
    }


    const hours =
        Number(studyHours);


    const timePerSubject =
        (hours / subjects.length).toFixed(1);


    let planHTML =
        "<h3>📅 Your Study Plan</h3>";

    planHTML +=
        `<p>You have <strong>${hours} hour(s)</strong> available today.</p>`;

    planHTML +=
        "<ul>";


    subjects.forEach(subject => {

        planHTML += `
            <li>
                📚 <strong>${subject.name}</strong>
                – ${timePerSubject} hour(s)
            </li>
        `;
    });


    planHTML += "</ul>";


    planHTML += `
        <p>
            💡 Tip: Take a short break after
            every focused study session.
        </p>
    `;


    result.innerHTML = planHTML;
}


// ==========================================
// INITIAL LOAD
// ==========================================

displaySubjects();
displayTasks();
updateDashboard();