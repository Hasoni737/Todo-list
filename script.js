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
    let count_span = document.querySelector(".count h3 span");
    count.style.display = "flex";
    count_span.innerHTML = `${countTasksNotDone}`;

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
    localStorage.removeItem("tasks");
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
let icon_color = document.querySelector(".setting_content .colors i");
let icon_language = document.querySelector(".setting_content .language i");
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
  icon_color.style.color = color;
  icon_language.style.color = color;
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
  icon_color.style.color = color;
  icon_language.style.color = color;
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
  icon_color.style.color = color;
  icon_language.style.color = color;
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
  icon_color.style.color = color;
  icon_language.style.color = color;
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
  icon_color.style.color = color;
  icon_language.style.color = color;
  setting_btn.style.display = "flex";
  setting_btn_hide.style.display = "none";
  settingDiv.style.display = "none";
};
header.style.backgroundColor = localStorage.getItem("color");
clear_btn.style.backgroundColor = localStorage.getItem("color");
add_btn.style.backgroundColor = localStorage.getItem("color");
icon_color.style.color = localStorage.getItem("color");
icon_language.style.color = localStorage.getItem("color");
//--------------------------------------------------------------------//

//------------------------- Change language ---------------------------
// English
function languageEnglish() {
  localStorage.setItem("language", "english");
  changeLanguage();
};
// Arab
function languageArabic() {
  localStorage.setItem("language", "arabic");
  changeLanguage();
};
// Change language
function changeLanguage() {
  // Elements
  let primary_title = document.querySelector(".primary_title");
  let tasksDiv = document.querySelector(".tasks");
  let count = document.querySelector(".count");
  let count_h3 = document.querySelector(".count h3");
  let create_task_title = document.querySelector(".create_task h2");
  let create_task_btn = document.querySelector(".create_task button");
  let create_task_input = document.querySelector(".create_task input");
  let delete_task_title = document.querySelector(".delete_task h2");
  let delete_task_ok = document.querySelector(".delete_task #ok");
  let delete_task_cancel = document.querySelector(".delete_task #cancel");
  let update_task_title = document.querySelector(".update_task h2");
  let update_task_btn = document.querySelector(".update_task button");
  let update_task_input = document.querySelector(".update_task input");
  let clear_tasks_title = document.querySelector(".clear_tasks h2");
  let clear_tasks_ok = document.querySelector(".clear_tasks #ok");
  let clear_tasks_cancel = document.querySelector(".clear_tasks #cancel");
  let any_tasks = document.querySelector("#any_tasks");
  let allBtns = document.querySelectorAll('button');
  let allInputs = document.querySelectorAll('input');
  let body = document.querySelector("body");

  // English
  if (localStorage.getItem("language") === "english") {
    primary_title.innerHTML = "Todo List";
    tasksDiv.style.direction = "ltr";
    count.style.direction = "ltr";
    count_h3.innerHTML = "You have <span>0</span> pending tasks";
    countTasks();
    clear_btn.innerHTML = "Clear All";
    create_task_title.innerHTML = "Write name the task";
    create_task_btn.innerHTML = "Add";
    create_task_input.style.direction = "ltr";
    delete_task_title.innerHTML = "Are you sure to delete task : ";
    delete_task_ok.innerHTML = "Ok";
    delete_task_cancel.innerHTML = "Cancel";
    update_task_title.innerHTML = "Write the new task name";
    update_task_btn.innerHTML = "Update";
    update_task_input.style.direction = "ltr";
    clear_tasks_title.innerHTML = "Are you sure you cleared all tasks ?";
    clear_tasks_ok.innerHTML = "Ok";
    clear_tasks_cancel.innerHTML = "Cancel";
    any_tasks.innerHTML = "You don't have any tasks";
    // Change font
    allBtns.forEach(function(element) {
      var currentFont = window.getComputedStyle(element).fontFamily;
      element.style.fontFamily = 'Poppins, sans-serif';
    });
    allInputs.forEach(function(element) {
      var currentFont = window.getComputedStyle(element).fontFamily;
      element.style.fontFamily = 'Poppins, sans-serif';
    });
    body.style.fontFamily = 'Poppins, sans-serif';
  }
  // Arabic
  else if (localStorage.getItem("language") === "arabic"){
    primary_title.innerHTML = "مهامي";
    tasksDiv.style.direction = "rtl";
    count.style.direction = "rtl";
    count_h3.innerHTML = "لديك <span>0</span> مهام معلقة";
    countTasks();
    clear_btn.innerHTML = "مسح الكل";
    create_task_title.innerHTML = "أكتب اسم المهمة";
    create_task_btn.innerHTML = "اضافة";
    create_task_input.style.direction = "rtl";
    delete_task_title.innerHTML = ": هل أنت متأكد من حذف مهمة ";
    delete_task_ok.innerHTML = "نعم";
    delete_task_cancel.innerHTML = "الغاء";
    update_task_title.innerHTML = "أكتب اسم المهمة الجديد";
    update_task_btn.innerHTML = "تحديث";
    update_task_input.style.direction = "rtl";
    clear_tasks_title.innerHTML = "هل أنت متأكد من مسح جميع المهام ؟";
    clear_tasks_ok.innerHTML = "نعم";
    clear_tasks_cancel.innerHTML = "الغاء";
    any_tasks.innerHTML = "ليس لديك أي مهام";
    // Change font
    allBtns.forEach(function(element) {
        var currentFont = window.getComputedStyle(element).fontFamily;
        element.style.fontFamily = 'Tajawal, sans-serif';
    });
    allInputs.forEach(function(element) {
        var currentFont = window.getComputedStyle(element).fontFamily;
        element.style.fontFamily = 'Tajawal, sans-serif';
    });
    body.style.fontFamily = 'Tajawal, sans-serif';
  };
};
window.onload = changeLanguage();
//--------------------------------------------------------------------//