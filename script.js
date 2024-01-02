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
            <i class="fa-solid fa-pencil"></i>
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
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `;
    document.querySelector(".tasks").innerHTML += content;
    index++;
  };
};
checkEmptyTasks();
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
  fillTasksOnPage();
}
//--------------------------------------------------------------------//

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

//======================== STORAGE FUNCTIONS ==========================
function storageTasks() {
  let taskString = JSON.stringify(tasks);
  localStorage.setItem("tasks", taskString);
}
//=====================================================================//