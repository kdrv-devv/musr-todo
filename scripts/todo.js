






let userInput = document.querySelector("#user-input"); // user input
let addBtn = document.querySelector("#submit-btn"); // plus button
let todoBottom = document.querySelector(".todo-bottom"); // element chiqadigan joy
let isEditing = false; // hozirgi holat tahrirlashmi yoki yangi ma'lumot qo'shishmi
let currentEditIndex = null; // tahrirlanayotgan element indeksi

function showUsers(users) {
  todoBottom.innerHTML = "";
  users.forEach((element, index) => {
    todoBottom.innerHTML += `
        <div class="data-output" id="${index}">
            <p class="user-input">${element.name}</p>
            <p class="edit-time">${element.time ? "Tahrirlangan: " + element.time : ""}</p>
            <div class="data-output-right">
                <button class="edit-btn">Edit</button>
                <button class="del-btn">Delete</button>
            </div>
        </div>
    `;
  });
}

// vaqtn olish funkisiyasi 
function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return `${hours}:${minutes}:${seconds}`;
}

addBtn.addEventListener("click", function (e) {
  e.preventDefault();

  let data = JSON.parse(localStorage.getItem("users")) || [];

  if (userInput.value.trim() === "") {
    alert("Iltimos, ma'lumot kiriting!");
    return;
  }

  if (isEditing) {
    data[currentEditIndex].name = userInput.value; 
    data[currentEditIndex].time = getCurrentTime(); 
    isEditing = false; 
    currentEditIndex = null; 
  } else {
    let newData = {
      name: userInput.value,
      time: getCurrentTime(), 
    };
    data.push(newData);
  }

  localStorage.setItem("users", JSON.stringify(data));
  showUsers(data);
  userInput.value = "";
});

window.addEventListener("load", function () {
  let data = JSON.parse(localStorage.getItem("users")) || [];
  showUsers(data);
});

window.addEventListener("click", function (e) {
  if (e.target.classList.contains("del-btn")) {
    let dataoutput = e.target.closest(".data-output");
    let dataId = Number(dataoutput.getAttribute("id"));

    let data = JSON.parse(localStorage.getItem("users")) || [];
    data.splice(dataId, 1);
    localStorage.setItem("users", JSON.stringify(data));

    showUsers(data);
  }
});

window.addEventListener("click", function (e) {
  if (e.target.classList.contains("edit-btn")) {
    let dataoutput = e.target.closest(".data-output");
    let dataId = Number(dataoutput.getAttribute("id"));

    let data = JSON.parse(localStorage.getItem("users")) || [];
    userInput.value = data[dataId].name;
    isEditing = true; 
    currentEditIndex = dataId; 
  }
});
