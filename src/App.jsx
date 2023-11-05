import { useEffect, useState } from "react"
import "./styles.css"
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";

export default function App() { // can only return one component at once, so use a div
  // or fragment to return multuple at once
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if(localValue == null) return []

    return JSON.parse(localValue)
  });
  // What is state?
  // In react, state is immutable. setNewItem("adwadd") will set newItem to the input
  // when you change a state variable, it reruns everything



  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function addTodo(title) {
    setTodos( currentTodos => {
      return [...currentTodos, {id : crypto.randomUUID(), title, completed: false}];
    })
  }
  
  function toggleTodo(id, completed){
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id){
          return {...todo, completed}
        }
        return todo
      })
    })
}

function deleteTodo(id) {
    setTodos(currentTodos => {
        return currentTodos.filter(todo => todo.id !== id)
    })
}
 
  return ( // we used a fragment <> </>
    <> 
      <NewTodoForm onSubmit={addTodo}/>
      <h1 className="header">Todo List:</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  )

}