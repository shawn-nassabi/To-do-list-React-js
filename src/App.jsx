import { useState } from "react"
import "./styles.css"

export default function App() { // can only return one component at once, so use a div
  // or fragment to return multuple at once
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);
  // What is state?
  // In react, state is immutable. setNewItem("adwadd") will set newItem to the input
  // when you change a state variable, it reruns everything
  function handleSubmit(e) {
    e.preventDefault();
    setTodos((currentTodos) => {
      return [...currentTodos, {id : crypto.randomUUID(), title: newItem, completed: false}];
    })

    setNewItem(""); // Empties the input box after every entry
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
 
  return ( // we used a fragment <> </>
    <> 
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input 
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            type="text" 
            id="item" 
          />
        </div>
        <button className="btn">Add</button>
      </form>
      <h1>Todo List:</h1>
      <ul className="list">
        {todos.map(todo => {
          return (
            <li key={todo.id}>
              <label>
                <input type="checkbox" checked={todo.completed} 
                onChange={e => toggleTodo(todo.id, e.target.checked)} />
                {todo.title}
              </label>
              <button className="btn btn-danger">Delete</button>
            </li>
          )
        })}
      </ul>
    </>
  )

}