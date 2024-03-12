const inputBox = document.querySelector("#input-box");
const listContainer = document.querySelector("#list-container");

function AddTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;

        let deleteButton = document.createElement("span");
        deleteButton.innerHTML = '\u00d7';
        deleteButton.className = "close";
        deleteButton.onclick = function() {
            deleteTask(li);
        };
        li.appendChild(deleteButton);

        let editButton = document.createElement("button");
        editButton.innerHTML = "Edit";
        editButton.onclick = function() {
            editTask(li);
        };
        li.appendChild(editButton);

        listContainer.appendChild(li);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "BUTTON" && e.target.textContent === "Edit") {
        let listItem = e.target.parentElement;
        editTask(listItem);
    } else if (e.target.className === "close") {
        let listItem = e.target.parentElement;
        deleteTask(listItem);
    }
}, false);

function editTask(taskItem) {
    let newText = prompt("Edit task:", taskItem.firstChild.textContent);
    if (newText !== null) {
        taskItem.firstChild.textContent = newText;
        saveData();
    }
}

function deleteTask(taskItem) {
    taskItem.remove();
    saveData();
}

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

