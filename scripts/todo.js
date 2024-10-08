let userInput = document.querySelector("#user-input"); //user input
let addBtn = document.querySelector("#submit-btn"); //plus button
let todoBottom = document.querySelector(".todo-bottom"); // element chiqadigan joy

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let div = document.createElement("div");
  let remBtn = document.createElement("button");
  let p = document.createElement("p");

  remBtn.textContent = "del";
  remBtn.classList.add("remBtnn");
  if (userInput.value != "") {
    todoBottom.append(div);
    div.append(p);
    div.append(remBtn);
    
    p.textContent = userInput.value;
    remBtn.addEventListener("click",()=>{
        div.remove()
    })


}
  userInput.value = "";
});

