let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// Empty Array For Add Task Inside It

let arrayOfTask = [];

// Check If There Is Task In The Local Storage
if (localStorage.getItem("tasks")) {
  arrayOfTask = JSON.parse(localStorage.getItem("tasks"));
}

// Get Data From Local Storage
getDataFromLocalStorage();

// Add Task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); // Add Task To Array
    input.value = ""; // Empty Input Value
  }
};

// Click On Task Element To Update It
tasksDiv.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("delete")) {
    // Remove Element From Local Storage
    deleteTask(e.target.parentElement.getAttribute("data-id"));

    // Remove Element From Page
    e.target.parentElement.remove();
  }

  // Update Task To Done

  if (e.target.classList.contains("task")) {
    // Update Class In The Local Storage
    toggleStatusTask(e.target.getAttribute("data-id"));

    // Add Class Has A done Name
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };

  // Push The Task To The Array Of Tasks
  arrayOfTask.push(task);

  //Add Elements To Page
  addElementsToPageFrom(arrayOfTask);
  // Add Tasks To Local Storage
  addDataToLocalStorage(arrayOfTask);
}

function addElementsToPageFrom(arrayOfTask) {
  // Empty Tasks Div
  tasksDiv.innerHTML = "";

  // Looping On Array Of Tasks

  arrayOfTask.forEach((task) => {
    // Create Main Div
    let div = document.createElement("div");
    div.className = "task";
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));

    // Check If Task Is Done
    if (task.completed) {
      div.className = "task done";
    }

    // Create Delete Button
    let span = document.createElement("span");
    span.className = "delete";
    span.appendChild(document.createTextNode("Delete"));

    // Put The Button Into The Main Div
    div.appendChild(span);

    // Add Task Div To Page

    tasksDiv.appendChild(div);
  });
}

// Local Storage

function addDataToLocalStorage(arrayOfTask) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTask));
}

// Get Items From Local  Storage

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

// Delete Task From Page

function deleteTask(taskId) {
  // for (let i = 0; i < arrayOfTask.length; i++) {
  //     console.log(`${arrayOfTask[i].id} === ${taskId}`)
  // }

  arrayOfTask = arrayOfTask.filter((task) => task.id != taskId);
  addDataToLocalStorage(arrayOfTask);
}

// Update Class In The Local Storage
function toggleStatusTask(taskId) {
  for (let i = 0; i < arrayOfTask.length; i++) {
    if (arrayOfTask[i].id == taskId) {
      arrayOfTask[i].completed == false
        ? (arrayOfTask[i].completed = true)
        : (arrayOfTask[i].completed = false);
    }
  }
  addDataToLocalStorage(arrayOfTask);

}
