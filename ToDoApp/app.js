let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const addButton = document.querySelector(".add");
const searchButton = document.querySelector(".search");
const searchFilterButton = document.querySelector(".searchBtn");
const taskContaiter = document.querySelectorAll(".taskContaiter");
const createTask = document.querySelector(".createTask");
const searchTask = document.querySelector(".searchTask");
const overlay = document.querySelector(".overlay");
const formCreateBtn = document.querySelector("#createTaskBtn");

//Reset Task Array
// tasks=[]
renderTaskList();

function openSearchTask() {
  searchTask.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeSearchTask() {
  searchTask.classList.add("hidden");
  overlay.classList.add("hidden");
}

function openCreateTask() {
  createTask.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeCreateTask() {
  createTask.classList.add("hidden");
  overlay.classList.add("hidden");
}

function renderTaskList() {
  // Remove any duplicate tasks based on their name
  const uniqueTasks = removeDuplicates(tasks, "name");

  // Clear existing task list elements
  const taskContainer = document.querySelectorAll(".taskContaiter");
  taskContainer.innerHTML = "";

  // Render each task as a new task element and append to task list div
  uniqueTasks.forEach((task) => {
    const taskElement = createTaskElement(
      task.name,
      task.description,
      task.date,
      task.state
    );
  });

  // Set the 'tasks' key in local storage to the uniqueTasks for perfomance
  console.log(uniqueTasks);
  localStorage.setItem("tasks", JSON.stringify(uniqueTasks));
}

function removeDuplicates(array, key) {
  // Create an empty object to keep track of unique objects
  const uniqueObject = {};

  // Create an array to store unique objects
  const uniqueArray = [];

  // Loop through input array and add objects with unique keys to uniqueObject
  array.forEach((item) => {
    if (!uniqueObject[item[key]]) {
      uniqueObject[item[key]] = item;
    }
  });

  // Loop through uniqueObject and add unique objects to uniqueArray
  for (let prop in uniqueObject) {
    uniqueArray.push(uniqueObject[prop]);
  }

  return uniqueArray;
}

function createTaskElement(taskName, taskDescription, taskDate) {
  // Create task object with name, description, date, and completion status
  const task = {
    name: taskName,
    description: taskDescription,
    date: taskDate,
    completed: false,
  };

  // Add new task to the array
  tasks.push(task);
  

  // Store updated tasks array in local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Create Main Div
  let div = document.createElement("div");
  div.className = "task";
  div.id = Math.floor(Math.random() * 100);

  // Create Actions Div
  let actionsDiv = document.createElement("div");
  actionsDiv.className = "actions";

  // Create Colapsable Description for Main Div
  let collapsibleDiv = document.createElement("div");
  collapsibleDiv.className = "collapsible";


  // Create Text for Main Div
  let nameElement = document.createElement("h2");
  nameElement.className = "name-element";
  nameElement.appendChild(document.createTextNode(taskName));
  div.appendChild(nameElement);

  //Create Contet for Colapsable Div
  let description = document.createElement("p");
  description.className = "description-text";
  description.appendChild(document.createTextNode(taskDescription));
  collapsibleDiv.appendChild(description);

  //Set Data for Colapsable Div
  let deadline = document.createElement("h3");
  deadline.className = "data-text";
  deadline.appendChild(document.createTextNode(taskDate));
  collapsibleDiv.appendChild(deadline);

  // Create Edit Button
  let btnEdit = document.createElement("a");
  btnEdit.className = "edit";
  btnEdit.appendChild(document.createTextNode("EDIT"));
  btnEdit.addEventListener("click", editTaskElement);

  actionsDiv.appendChild(btnEdit);

  // Create Delete Button
  let btnDelete = document.createElement("a");
  btnDelete.className = "delete";
  btnDelete.appendChild(document.createTextNode("DELETE"));
  btnDelete.addEventListener("click", deleteTaskElement);

  actionsDiv.appendChild(btnDelete);

  div.appendChild(actionsDiv);
  // div.appendChild(collapsibleDiv);

  div.addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });

  //Make it draggable
  div.draggable = true;
  div.addEventListener("dragstart", onDragStart);
  div.addEventListener("dragstart", onDragEnd);

 
  if(task.completed){
    const taskContainer = document.querySelector("#isDone");
    taskContainer.appendChild(div);
    taskContainer.appendChild(collapsibleDiv);
    

  }else if(task.completed===false){
    const taskContainer = document.querySelector("#toDo");
    taskContainer.appendChild(div);
    taskContainer.appendChild(collapsibleDiv);

  }

}

//Task Div Buttons Functions
function deleteTaskElement(event) {
  const taskElement = event.target.closest(".task");
  const taskName = taskElement.firstChild.textContent;

  // Get existing tasks from local storage
  const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Remove the task from the array of existing tasks
  const updatedTasks = existingTasks.filter((task) => task.name !== taskName);

  // Update local storage with the new array of tasks
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));

  // Remove the task element from the screen
  taskElement.parentNode.removeChild(taskElement);
}
function editTaskElement(event) {
  const taskElement = event.target.closest(".task");
  const taskTextElement = taskElement.querySelector("h2");
  const editButtonElement = taskElement.querySelector(".edit");

  // Replace the task text with an input field
  const taskTextInputElement = document.createElement("input");
  taskTextInputElement.type = "text";
  taskTextInputElement.className = "name";
  taskTextInputElement.value = taskTextElement.textContent;
  taskElement.replaceChild(taskTextInputElement, taskTextElement);

  // Update the edit button text and event listener
  editButtonElement.textContent = "Save";
  editButtonElement.removeEventListener("click", editTaskElement);
  editButtonElement.addEventListener("click", saveTaskElement);
}

function saveTaskElement(event) {
  const taskElement = event.target.closest(".task");
  const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const taskTextElement = taskElement.querySelector("input");
  const editButtonElement = taskElement.querySelector(".edit");

  // Replace the input field with the updated task text
  const taskSpanElement = document.createElement("h2");
  taskSpanElement.className = "text-element";
  taskSpanElement.textContent = taskTextElement.value;

  taskElement.replaceChild(taskSpanElement, taskTextElement);

  // const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // // Find the task to edit
  // const taskToEdit = existingTasks.find(
  //   (task) => task.name === taskElement.firstChild.value||taskElement.firstChild
  // );
  // console.log(taskToEdit);

  // // Update the task properties
  // taskToEdit.name = taskTextElement.value
  // console.log(taskToEdit.name);
  //  taskToEdit.date = newDate;

  // Update local storage with the new array of tasks
  localStorage.setItem("tasks", JSON.stringify(existingTasks));

  // Update the edit button text and event listener
  editButtonElement.textContent = "EDIT";
  editButtonElement.removeEventListener("click", saveTaskElement);
  editButtonElement.addEventListener("click", editTaskElement);
}

// Filter functions
function filterTasks(e) {
  const allTasks = document.querySelectorAll(".task");

  var text = e.target.value;
  console.log(text);
  console.log(allTasks);
  Array.from(allTasks).forEach(function (task) {
    if (task.innerText.slice(0, -5).indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });

  overlay.addEventListener("click", closeSearchTask);
}

// Drag/Drop functions
function onDragStart(e) {
  e.dataTransfer.setData("text", e.target.id);
  e.target.classList.add("drag");
}

function onDragEnd(e) {
  e.target.classList.remove("drag");
}

taskContaiter.forEach((task) => {
  task.addEventListener("dragover", function (e) {
    e.preventDefault();
  });
});

taskContaiter.forEach((task) => {
  task.addEventListener("drop", function (e) {
    e.preventDefault();
    const textAreaID = e.dataTransfer.getData("text");
    e.target.appendChild(document.getElementById(textAreaID));
  });
});

formCreateBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const taskName = document.querySelector("#taskName");
  const taskDescription = document.querySelector("#taskDescription");
  const taskDate = document.querySelector("#date");

  console.log(validation());
  if (validation() === true) {
    closeCreateTask();
    createTaskElement(taskName.value, taskDescription.value, taskDate.value);
  } else {
    return false;
  }
});
searchFilterButton.addEventListener("click", function (e) {
  closeSearchTask();
  e.preventDefault();
});

document.getElementById("filter").addEventListener("keyup", filterTasks);
addButton.addEventListener("click", openCreateTask);
searchButton.addEventListener("click", openSearchTask);
overlay.addEventListener("click", closeCreateTask);
overlay.addEventListener("click", closeSearchTask);

//Form validation
function validation() {
  var name = document.getElementById("taskName").value;
  var description = document.getElementById("taskDescription").value;
  var date = document.getElementById("date").value;

  document.getElementById("Name").innerHTML = "";
  document.getElementById("TaskDate").innerHTML = "";
  document.getElementById("Description").innerHTML = "";

  console.log(
    "Task name: " + name + " description: " + description + " date: " + date
  );

  if (name === "") {
    document.getElementById("Name").innerHTML =
      " ** Please fill the Name field";
    return false;
  } else if (date === "") {
    document.getElementById("TaskDate").innerHTML = " ** Please select Date";
    return false;
  } else if (description === "") {
    document.getElementById("Description").innerHTML =
      " ** Please fill the description field";
    return false;
  } else {
    return true;
  }
}
