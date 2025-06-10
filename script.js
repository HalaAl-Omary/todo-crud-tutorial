const from = document.getElementById("add-form");
const addinput = document.querySelector("#add-input");
const Todos = JSON.parse(localStorage.getItem("todos")) || [];
function addtodo(e) {
  e.preventDefault();
  const addInputValue = addinput.value.trim();
  if (addInputValue.length === 0) {
    addinput.nextElementSibling.innerText = "*This field is required!";
    return;
  }
  addinput.nextElementSibling.innerText = " ";
  const newTodo = {
    todo: addInputValue,
    completed: false,
    isUpdating: false,
  };

  Todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(Todos));
  from.reset();
  console.log(Todos);
  displayTodos();
}
function displayTodos() {
  let result = " ";
  Todos.forEach((item, index) => {
    result += `
        <tr>
        <td>${index + 1} </d>
        <td>${
          item.isUpdating
            ? `<input type="text" data-index="${index}" value="${item.todo}"/>`
            : item.todo
        }</td>
        <td><input onclick="toggleCompleted(${index})" type="checkbox" ${
      item.completed ? "checked" : ""
    }  /></td>
        <td>
          ${
            item.isUpdating
              ? ` <button class="btn btn-success"
            onclick="saveTodo(${index})">Save</button>`
              : `<button class="btn btn-primary" onclick="setUpdating(${index})">Update</button>`
          }
            
<button onclick="deletetodo(${index})" class="btn btn-danger ">Delete</button> 
        </td>
          </tr>
          `;
  });
  document.getElementById("todos").innerHTML = result;
}

function toggleCompleted(indx) {
  Todos[indx].completed = !Todos[indx].completed;
  console.log(Todos);
  localStorage.setItem("todos", JSON.stringify(Todos));
  displayTodos();
}

function deletetodo(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(Todos));
      displayTodos();
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
}

function setUpdating(index) {
  Todos[index].isUpdating = true;
  localStorage.setItem("todos", JSON.stringify(Todos));
  displayTodos();
}

function saveTodo(index) {
  const input = document.querySelector(`input[data-index ="${index}"]`);
  console.log(input, input.value);
  Todos[index].todo = input.value.trim();
  Todos[index].isUpdating = false;
  localStorage.setItem("todos", JSON.stringify(Todos));
  displayTodos();
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500,
  });
}

displayTodos();

from.addEventListener("submit", addtodo);
