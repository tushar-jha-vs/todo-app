const todos = [];

//id for todos
let current_id=0;
//Accessing DOM elements
const todosContainer = document.querySelector(".todoContainer");
const todoInput = document.getElementsByName("title")[0];
const myForm = document.getElementById("myForm");

//Submit Handler for the form
myForm.onsubmit = (e) => {
  e.preventDefault();
  //Creating the todo
  const todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(current_id++),
  };
  //Add todo to todos list
  todos.push(todo);
  todoInput.value = "";
  //re render the todos
  renderTodo(todos);
};

//Add todo Item to display the todo
const generateTodoItem = (title, isCompleted, id) => {
  const todo = document.createElement("div");
  todo.className = "todo";

  //Creating a Checkbox
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "isCompleted";
  checkBox.checked = isCompleted;
  checkBox.onchange = () => {
    todos.find((item) => {
      if (item.id === id) item.isCompleted = checkBox.checked;
    });
    paragraph.className = checkBox.checked ? "textCut" : "";
  };

  //Creating P for title
  const paragraph = document.createElement("p");
  paragraph.innerText = title;
  paragraph.className = isCompleted ? "textCut" : "";

  //Creating Button
  const btn = document.createElement("button");
  btn.innerText = 'X';
  btn.className = "deleteBtn";
  btn.onclick = () => deleteTodo(id);

  //Apending ALL to TodoItem
  todo.append(checkBox, paragraph, btn);
  todosContainer.append(todo);
};

//Function to delete Todo
const deleteTodo = (id) => {
  const idx = todos.findIndex((item) => item.id === id);
  todos.splice(idx, 1);
  renderTodo(todos);
};

//render Todo
const renderTodo = (todos) => {
  todosContainer.innerText = "";
  todos.forEach((item) => {
    generateTodoItem(item.title, item.isCompleted, item.id);
  });
};
