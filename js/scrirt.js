let bigDiv = document.createElement("div");
bigDiv.className = "container";
document.body.append(bigDiv);

let boxDiv = document.createElement("div");
boxDiv.className = "box";
boxDiv.innerHTML = "<h1>My ToDo list</h1>";
bigDiv.append(boxDiv);

let boxesInput = document.createElement("div");
boxesInput.className = "boxesinput";
boxDiv.append(boxesInput);

let inputText = document.createElement("input");
inputText.className = "inputtext";
inputText.type = "text";
inputText.placeholder = " Write here your task...";
boxesInput.append(inputText);

let inputDate = document.createElement("input");
inputDate.className = "inputdate";
inputDate.type = "date";
boxesInput.append(inputDate);

let inputButton = document.createElement("input");
inputButton.className = " inputbtn";
inputButton.type = "button";
inputButton.value = "add task";
boxesInput.append(inputButton);

let list = document.createElement("ul");
boxDiv.append(list);

let todoArray =
  localStorage.getItem("todo") == null
    ? []
    : [...JSON.parse(localStorage.getItem("todo"))];

const addTodo = () => {
  let newTask = inputText.value;
  let date = inputDate.value;
  if (newTask != "") {
    todoArray.push({
      text: newTask,
      checked: false,
      date,
    });

    localStorage.setItem("todo", JSON.stringify(todoArray));
    renderTodoItems();

    inputText.value = "";
    inputDate.value = "";
  }
};

const deleteTodo = (e) => {
  let index = parseInt(e.target.parentNode.id);
  todoArray.splice(index, 1);
  localStorage.setItem("todo", JSON.stringify(todoArray));
  renderTodoItems();
};

const doneTodo = (e) => {
  let todoTemporary = [...todoArray];

  let index = parseInt(e.target.parentNode.id);
  let objElement = todoTemporary[index].checked;
  todoTemporary[index].checked = !objElement;

  localStorage.setItem("todos", JSON.stringify(todoTemporary));

  let isDone = e.currentTarget.parentNode.classList.contains("done");

  isDone
    ? e.currentTarget.parentNode.classList.remove("done")
    : e.currentTarget.parentNode.classList.add("done");
};

inputButton.addEventListener("click", addTodo);

const renderTodoItems = () => {
  list.innerHTML = "";

  todoArray.map((item, id) => {
    let li = document.createElement("li");
    li.className = item.checked ? "taskItem done" : "taskItem";
    li.id = id;

    let doneIcon = document.createElement("img");
    doneIcon.src = "done.png";
    doneIcon.className = "button";
    doneIcon.addEventListener("click", doneTodo);

    let deleteButton = document.createElement("img");
    deleteButton.src = "delete.png";
    deleteButton.className = "button";
    deleteButton.addEventListener("click", deleteTodo);

    let label = document.createElement("label");
    label.append(item.text + " " + item.date);

    li.append(label);
    li.append(doneIcon);
    li.append(deleteButton);

    list.prepend(li);
  });
};
console.log(todoArray);

renderTodoItems();
