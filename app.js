//* ======================================================
//*                     TODO APP
//* ======================================================

//?Selectors

const addBtn = document.querySelector("#todo-button");
const todoInput = document.querySelector("#todo-input");
const todoUl = document.querySelector("#todo-ul");

let todos = JSON.parse(localStorage.getItem("TODOS")) || []
console.log(todos)

// JSON : JavaScript Object Notation



const renderSavedTodos = () => {
    todos.forEach((todo) => {
        createListElement(todo)
    })
} 



const createListElement = (todo) => {

    // destructure
    const { text, id, completed } = todo

    const li = document.createElement("li")

    li.setAttribute("id", id)

    completed && li.classList.add('checked')

    //? okey ikonu olustur ve li elementine bagla
    const okIcon = document.createElement("i")
    okIcon.setAttribute("class", "fa-solid fa-check")

    li.appendChild(okIcon)

 ////////////////////////////////////////

    const p = document.createElement("p")
    const pTextNode = document.createTextNode(text)
    p.appendChild(pTextNode)

    li.appendChild(p)

 ////////////////////////////////////////

    const trashIcon = document.createElement("i")
    trashIcon.setAttribute("class", 'fa-solid fa-trash')

    li.appendChild(trashIcon)

    
    todoUl.appendChild(li)

}


renderSavedTodos()

// Events
addBtn.addEventListener("click", (e) => {
    e.preventDefault()
    console.log("butona tiklandi")


    let newTodo = {
        text : todoInput.value,
        completed: false,
        id : new Date().getTime() 
    }

    todos.push(newTodo)
    localStorage.setItem("TODOS", JSON.stringify(todos))
    console.log(todos)

    createListElement(newTodo)


    todoInput.value = ""

});


todoUl.addEventListener("click", (e) => {
    // console.log(e.target)

    const id = e.target.parentElement.getAttribute("id")
    // console.log(id)

    if (e.target.classList.contains("fa-trash")){
        console.log("cop kutusuna tiklandi")

        e.target.parentElement.remove()

        todos = todos.filter((todo) => todo.id !== Number(id))

        localStorage.setItem("TODOS", JSON.stringify(todos))
        console.log(todos)

    }
    else if (e.target.classList.contains("fa-check")){
        console.log("check butonu tiklandi")

        e.target.parentElement.classList.toggle("checked")


        todos.map((todo, index) => {
            if (todo.id === Number(id)){
                todo.completed = !todo.completed
            }
        })

        localStorage.setItem("TODOS", JSON.stringify(todos))

        console.log(todos)
    }



})



