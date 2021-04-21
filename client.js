const ToDo_input=document.querySelector('.ToDo-input');
const ToDo_button=document.querySelector('.ToDo-button');
const ToDo_list=document.querySelector('.ToDo-list');
const filterOption=document.querySelector('.filter-todo');

document.addEventListener("DOMContentLoaded",getTodos);
ToDo_button.addEventListener("click",addToDo);
ToDo_list.addEventListener("click",DeleteCheckFavoriteToDo);
filterOption.addEventListener("click",filterToDo);

function addToDo(event){
  event.preventDefault();   //!prevent form from submitting
  console.log('To-Do List Project');

  const ToDo_div=document.createElement('div');
  ToDo_div.classList.add("ToDo")
  const ToDo_Li=document.createElement('li');
  ToDo_Li.innerText=ToDo_input.value;
  ToDo_Li.classList.add('ToDo-item');
  ToDo_div.appendChild(ToDo_Li);
  saveLocalTodos(ToDo_input.value);
  const CheckedButton=document.createElement('button');
  CheckedButton.innerHTML='<i class="fas fa-check"></i>';
  CheckedButton.classList.add("check-button");
  ToDo_div.appendChild(CheckedButton);
  const DeleteButton=document.createElement('button');
  DeleteButton.innerHTML='<i class="fas fa-trash"></i>';
  DeleteButton.classList.add("delete-button");
  ToDo_div.appendChild(DeleteButton);
  const FavoriteButton=document.createElement('button');
  FavoriteButton.innerHTML='<i class="fas fa-star"></i>';
  FavoriteButton.classList.add("favorite-button");
  ToDo_div.appendChild(FavoriteButton);
  ToDo_list.appendChild(ToDo_div);
  ToDo_input.value="";
}

function DeleteCheckFavoriteToDo(event){
  console.log(event.target);
  const item=event.target;

  if(item.classList[0]==="delete-button"){
    const todo=item.parentElement;
    todo.classList.add("fall");
    removeLocalToDos(todo);
    todo.addEventListener('transitionend',function(){
      todo.remove();
    });
  }
  if(item.classList[0]==="check-button"){
    const todo=item.parentElement;
    todo.classList.toggle("Checked");
  }
  if(item.classList[0]==="favorite-button"){
    const todo=item.parentElement;
    todo.classList.toggle("important");
  }
  }

function filterToDo(event){
  const todos=ToDo_list.childNodes;
  todos.forEach(function(todo){
    switch(event.target.value){
      case "all":todo.style.display="flex";
        break;
      case "completed":
        {
          if(todo.classList.contains('Checked')){
            todo.style.display="flex";
          }
          else{
            todo.style.display= "none";
          }
        }
        break;
        case "uncompleted":
        {
          if(!todo.classList.contains('Checked')){
            todo.style.display="flex";
          }
          else{
            todo.style.display= "none";
          }
        }
        break;
        case "important":
        {
          if(todo.classList.contains('important')){
            todo.style.display="flex";
          }
          else{
            todo.style.display= "none";
          }
        }
        break;
    }
  });
}
function saveLocalTodos(Todo){
  let todos;
  if(localStorage.getItem('todos')===null){
    todos=[];
  }else{
    todos=JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(Todo);
  localStorage.setItem("todos",JSON.stringify(todos));
}
function getTodos(){
  console.log("Todo");
  let todos;
  if(localStorage.getItem('todos')===null){
    todos=[];
  }else{
    todos=JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(todo){
  const ToDo_div=document.createElement('div');
  ToDo_div.classList.add("ToDo")
  const ToDo_Li=document.createElement('li');
  ToDo_Li.innerText=todo;
  ToDo_Li.classList.add('ToDo-item');
  ToDo_div.appendChild(ToDo_Li);
  const CheckedButton=document.createElement('button');
  CheckedButton.innerHTML='<i class="fas fa-check"></i>';
  CheckedButton.classList.add("check-button");
  ToDo_div.appendChild(CheckedButton);
  const DeleteButton=document.createElement('button');
  DeleteButton.innerHTML='<i class="fas fa-trash"></i>';
  DeleteButton.classList.add("delete-button");
  ToDo_div.appendChild(DeleteButton);
  const FavoriteButton=document.createElement('button');
  FavoriteButton.innerHTML='<i class="fas fa-star"></i>';
  FavoriteButton.classList.add("favorite-button");
  ToDo_div.appendChild(FavoriteButton);
  ToDo_list.appendChild(ToDo_div);
  });
}
function removeLocalToDos(Todo){
  let todos;
  if(localStorage.getItem('todos')===null){
    todos=[];
  }else{
    todos=JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex=Todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex),1);
  localStorage.setItem("todos",JSON.stringify(todos));
}