let tasks = [];
checkEmptyTasks();

// Get tasks on the LocalStorage
function getTasksFromStorage() {
  let retrievedTasks = JSON.parse(localStorage.getItem("tasks"));
  retrievedTasks == null ? (tasks = []) : (tasks = retrievedTasks);
}
getTasksFromStorage();

// Loop add tasks
function fillTasksOnPage() {
  //Clear the tasks
  document.querySelector(".tasks").innerHTML = "";

  let index = 0; // index the task now
  // Add tasks on the page
  for (task of tasks) {
    let content = `
      <div class="task ${task.isDone ? "done" : ""}">
        <div class="info">
          <h3>${task.title}</h3>
          <div>
            <i class="fa-solid fa-calendar-days"></i>
            <span>${task.date}</span>
          </div>
        </div>
        <div class="actions">
          <button onclick="updateTask(${index})" class="circular" title="Update the task">
            <i class="fa-regular fa-pen-to-square"></i>
          </button>
          ${
            task.isDone
              ? `
            <button onclick="completeTask(${index})" class="circular" style="background-color: rgb(118, 0, 101)" title="Task incomplete">
              <i class="fa-solid fa-xmark"></i>
            </button>
          `
              : `
            <button onclick="completeTask(${index})" class="circular" title="Task complete">
              <i class="fa-solid fa-check"></i>
            </button>
          `
          }
          <button onclick="deleteTask(${index})" class="circular" title="Delete the task">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </div>
    `;
    document.querySelector(".tasks").innerHTML += content;
    index++;
  };
};
checkEmptyTasks();
countTasks();
fillTasksOnPage();

//--------- Add new task on the array tasks and on the page ---------
document.querySelector("#add").addEventListener("click", function () {
  // show the form
  let create_task = document.querySelector(".create_task");
  create_task.style.display = "flex";

  // if click create new task
  let btn_create = document.querySelector(".create_task button");
  let input = document.querySelector(".create_task input");
  let close = document.querySelector(".close");
  input.focus();

  btn_create.onclick = function () {
    if (input.value !== "") {
      let now = new Date(); // date
      let date =
        now.getDate() +
        "/" +
        (now.getMonth() + 1) +
        "/" +
        now.getFullYear() +
        " | " +
        now.getHours() +
        ":" +
        now.getMinutes();
      tasks.push({
        title: input.value,
        date: date,
        isDone: false,
      });
      storageTasks();
      checkEmptyTasks();
      countTasks();
      fillTasksOnPage();
    }
    input.value = "";
    create_task.style.display = "none";
  };

  // close the create task page
  close.onclick = function () {
    create_task.style.display = "none";
    input.value = "";
  };
});
//------------------------------------------------------------------//

//--------------------------- Delete task ---------------------------
function deleteTask(index) {
  let delete_task = document.querySelector(".delete_task");
  let title = document.querySelector(".delete_task #title");
  let ok = document.querySelector(".btns button:first-child");
  let cancel = document.querySelector(".btns button:last-child");
  let close = document.querySelector(".delete_task .close");
  delete_task.style.display = "flex";
  // Show name the task
  title.innerHTML = tasks[index].title;
  // Confirm delete task
  ok.onclick = function () {
    tasks.splice(index, 1);
    storageTasks();
    checkEmptyTasks();
    countTasks();
    fillTasksOnPage();
    delete_task.style.display = "none";
  };
  // Cancel delete the task
  cancel.onclick = function () {
    delete_task.style.display = "none";
  };
  // Close the window
  close.onclick = function () {
    delete_task.style.display = "none";
  };
};
//-------------------------------------------------------------------//

//----------------------- Update title the task ----------------------
function updateTask(index) {
  // show the form
  let update_task = document.querySelector(".update_task");
  update_task.style.display = "flex";

  // if click update new task
  let btn_update = document.querySelector(".update_task button");
  let input = document.querySelector(".update_task input");
  let close = document.querySelector(".update_task .close");
  input.focus();

  input.value = tasks[index].title;

  btn_update.onclick = function () {
    if (input.value !== "") {
      tasks[index].title = input.value;
      storageTasks();
      fillTasksOnPage();
    }
    input.value = "";
    update_task.style.display = "none";
  };

  // close the update task page
  close.onclick = function () {
    update_task.style.display = "none";
    input.value = "";
  };
}
//--------------------------------------------------------------------

//--------------------------- Complete task --------------------------
function completeTask(index) {
  let task = tasks[index];
  task.isDone ? (task.isDone = false) : (task.isDone = true);
  storageTasks();
  countTasks();
  fillTasksOnPage();
}
//--------------------------------------------------------------------//

//======================== STORAGE FUNCTIONS ==========================
function storageTasks() {
  let taskString = JSON.stringify(tasks);
  localStorage.setItem("tasks", taskString);
};
//=====================================================================//

//------------------ Check empty tasks enter message ------------------
function checkEmptyTasks() {
  if (tasks.length === 0) {
    let any_tasks = document.querySelector("#any_tasks");
    any_tasks.style.display = "block";
  } else {
    any_tasks.style.display = "none";
  };
};
//--------------------------------------------------------------------//

//------------------ Count tasks and clear all tasks ------------------
function countTasks() {
  let countTasksNotDone = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].isDone) {
      
    } else {
      countTasksNotDone += 1;
    };
  };
  if (tasks.length > 0) {
    let count = document.querySelector(".count");
    let h3 = document.querySelector(".count h3");
    count.style.display = "flex";
    h3.innerHTML = `You have ${countTasksNotDone} pending tasks`;
  } else if (tasks.length === 0) {
    let count = document.querySelector(".count");
    count.style.display = "none";
  };
};

function clearAll() {
  // -------------------------------------------
  let clear_tasks = document.querySelector(".clear_tasks");
  let ok = document.querySelector(".clear_tasks .btns button:first-child");
  let cancel = document.querySelector(".clear_tasks .btns button:last-child");
  let close = document.querySelector(".clear_tasks .close");
  clear_tasks.style.display = "flex";
  // Confirm delete task
  ok.onclick = function () {
    localStorage.clear();
    tasks = [];
    checkEmptyTasks();
    countTasks();
    fillTasksOnPage();
    clear_tasks.style.display = "none";
  };
  // Cancel delete the task
  cancel.onclick = function () {
    clear_tasks.style.display = "none";
  };
  // Close the window
  close.onclick = function () {
    clear_tasks.style.display = "none";
  };
};
//--------------------------------------------------------------------//

//----------------------------- Setting ------------------------------
let settingDiv = document.querySelector(".setting_content");
let setting_btn = document.querySelector("#setting_btn");
let setting_btn_hide = document.querySelector("#setting_btn_hide");
function showSetting() {
  setting_btn.style.display = "none";
  setting_btn_hide.style.display = "flex";
  settingDiv.style.display = "flex";
};
function hideSetting() {
  setting_btn.style.display = "flex";
  setting_btn_hide.style.display = "none";
  settingDiv.style.display = "none";
};
//--------------------------------------------------------------------//

//----------------------- Setting Change color ------------------------
let header = document.querySelector(".header");
let clear_btn = document.querySelector(".count #clear_btn");
let add_btn = document.querySelector(".create_task button");
let icons = document.querySelector(".setting_content i");
let red = document.querySelector(".setting_content .colors #red");
let green = document.querySelector(".setting_content .colors #green");
let blue = document.querySelector(".setting_content .colors #blue");
let purple = document.querySelector(".setting_content .colors #purple");
let orange = document.querySelector(".setting_content .colors #orange");

purple.onclick = function () {
  localStorage.setItem("color", "#5c339e");
  let color = localStorage.getItem("color");
  header.style.backgroundColor = color;
  clear_btn.style.backgroundColor = color;
  add_btn.style.backgroundColor = color;
  icons.style.color = color;
  setting_btn.style.display = "flex";
  setting_btn_hide.style.display = "none";
  settingDiv.style.display = "none";
};
red.onclick = function () {
  localStorage.setItem("color", "#E31B24");
  let color = localStorage.getItem("color");
  header.style.backgroundColor = color;
  clear_btn.style.backgroundColor = color;
  add_btn.style.backgroundColor = color;
  icons.style.color = color;
  setting_btn.style.display = "flex";
  setting_btn_hide.style.display = "none";
  settingDiv.style.display = "none";
};
green.onclick = function () {
  localStorage.setItem("color", "#05AC72");
  let color = localStorage.getItem("color");
  header.style.backgroundColor = color;
  clear_btn.style.backgroundColor = color;
  add_btn.style.backgroundColor = color;
  icons.style.color = color;
  setting_btn.style.display = "flex";
  setting_btn_hide.style.display = "none";
  settingDiv.style.display = "none";
};
blue.onclick = function () {
  localStorage.setItem("color", "#4188FF");
  let color = localStorage.getItem("color");
  header.style.backgroundColor = color;
  clear_btn.style.backgroundColor = color;
  add_btn.style.backgroundColor = color;
  icons.style.color = color;
  setting_btn.style.display = "flex";
  setting_btn_hide.style.display = "none";
  settingDiv.style.display = "none";
};
orange.onclick = function () {
  localStorage.setItem("color", "#FF7400");
  let color = localStorage.getItem("color");
  header.style.backgroundColor = color;
  clear_btn.style.backgroundColor = color;
  add_btn.style.backgroundColor = color;
  icons.style.color = color;
  setting_btn.style.display = "flex";
  setting_btn_hide.style.display = "none";
  settingDiv.style.display = "none";
};
header.style.backgroundColor = localStorage.getItem("color");
clear_btn.style.backgroundColor = localStorage.getItem("color");
add_btn.style.backgroundColor = localStorage.getItem("color");
icons.style.color = localStorage.getItem("color");
//--------------------------------------------------------------------//