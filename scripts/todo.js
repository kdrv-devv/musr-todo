// let userInput = document.querySelector("#user-input"); //user input
// let addBtn = document.querySelector("#submit-btn"); //plus button
// let todoBottom = document.querySelector(".todo-bottom"); // element chiqadigan joy

// function showUsers(users) {
//   todoBottom.innerHTML = "";
//   users.forEach((element,index) => {
//     todoBottom.innerHTML += ` 
    
//         <div class="data-output" id = "${index}">
//                     <p class="user-input">${element.name}</p>
//                     <div class="data-output-right">
//                         <button class="edit-btn">Edit</button>
//                         <button class="del-btn">Delete</button>
//                     </div>
//                 </div>

//     `;
//   });
// }

// // lokal storagega qo'shish start

// addBtn.addEventListener("click", function (e) {
//   e.preventDefault();

//   let data = JSON.parse(localStorage.getItem("users")) || [];

//   let newData = {
//     name: userInput.value,
//   };

//   data.push(newData);
//   localStorage.setItem("users", JSON.stringify(data));

//   showUsers(data);

//   userInput.value = "";
// });
// window.addEventListener("load", function () {
//   let data = JSON.parse(localStorage.getItem("users")) || [];
//   showUsers(data);
// });

// // lokal storagega qo'shish finish





// // O'chirish funksiya start
// window.addEventListener("click", function(e) {
//   if (e.target.classList.contains("del-btn")) { // Faqat delete tugmasiga bosilganda ishlaydi
//     let dataoutput = e.target.closest(".data-output"); // O'chirilishi kerak bo'lgan elementni topadi
//     let dataId = Number(dataoutput.getAttribute("id")); // 'id' qiymatini raqamga aylantiradi

//     // Ma'lumotlarni localStorage'dan yangilash
//     let data = JSON.parse(localStorage.getItem("users")) || [];
//     data.splice(dataId, 1); // Ushbu id bilan mos keladigan foydalanuvchini o'chiradi
//     localStorage.setItem("users", JSON.stringify(data)); // Yangilangan ma'lumotlarni saqlash

//     // HTML'dan o'chirish
//     showUsers(data); // Ma'lumotlarni qayta ko'rsatish
//   }
// });
// // O'chirish funksiya finish







// // edit qilish funksiyasi start 




// // edit qilish funksiyasi finish 












// // xozirgi vaqt
// function nowDate() {
//   const now = new Date();

//   let hours = now.getHours();
//   let minutes = now.getMinutes();

//   hours = hours < 10 ? "0" + hours : hours;
//   minutes = minutes < 10 ? "0" + minutes : minutes;

//   return `${hours}:${minutes}`;
// }

// // xozirgi vaqt

// // addBtn.addEventListener("click", (e) => {
// //   e.preventDefault();
// //   let div = document.createElement("div");
// //   let remBtn = document.createElement("button");
// //   let p = document.createElement("p");

// //   remBtn.textContent = "delete";
// //   remBtn.classList.add("remBtnn");
// //   if (userInput.value != "") {
// //     todoBottom.append(div);
// //     div.append(p);
// //     div.append(remBtn);

// //     p.textContent = userInput.value;
// //     remBtn.addEventListener("click",()=>{
// //         div.remove()
// //     })

// // }
// //   userInput.value = "";
// // });











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
