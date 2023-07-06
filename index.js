let container = document.getElementById('container');
let unordered = document.getElementById('unordered');


fetch('https://dummyjson.com/todos?limit=8')
.then(res=>res.json())
.then(res=>{
    console.log(res);
    if(res.todos){
        res.todos.map(t =>{
          let todoHolder=document.createElement('li');
          let checkbox=document.createElement("input");
          checkbox.type="checkbox"
          checkbox.checked=t.completed;
            let cont = document.createElement('p');
            cont.textContent = t.todo
            todoHolder.appendChild(checkbox);
            todoHolder.appendChild(cont);
            todoHolder.style.display = "flex";
            
            unordered.appendChild(todoHolder);
            container.appendChild(unordered);
        });
    }
    else{
        console.log("no tasks found");
    }
 
})
.catch(error=>error)




let add = document.getElementById("add")
let addedTask = document.getElementById("inputTodo");
let editTask = document.createElement('button');
let delSingleTask = document.createElement('button');
editTask.textContent = "edit";
delSingleTask.textContent = "del";




add.addEventListener("click", (event) => {
  event.preventDefault();
  fetch("https://dummyjson.com/todos/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      todo: addedTask.value,
      completed: false,
      userId: 15,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      
      let added = document.createElement("li");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      const newTask = document.createElement("p");
      added.appendChild(checkbox);
      added.appendChild(newTask);
      added.appendChild(editTask)
      added.appendChild(delSingleTask)
      added.style.display = "flex";
      added.style.alignItems = "center";
      added.style.gap = "2px";
      editTask.textContent = "edit";
      delSingleTask.textContent = "del";
      unordered.appendChild(added);
      container.appendChild(unordered)
      newTask.textContent = response.todo;
    })
    .catch((error) => error);
});

editTask.addEventListener("click", (event)=>{
  event.preventDefault();
  fetch('https://dummyjson.com/todos/15',{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        todo: addedTask.value,
        completed: true,
        userId: 15,
        }),
  })
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
})
.catch((error=>error))
});


delSingleTask.addEventListener("click", (event) => {
  event.preventDefault();
  fetch("https://dummyjson.com/todos/15", {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      addedTask.remove()
    })
    .catch((error) => error)
});














   
 