import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  function addtodo(e) {
    e.preventDefault(); // refresh stop karta hai
    if (task.trim() == "") return; // empty hai toh return karo
    setTodos([...todos, { id: Date.now(), text: task, done: false }]); // old + new list
    setTask(""); // add hone ke baad box khaali
  }

  function togoleTodo(id) {
    // har task check karo, wahi task ho toh copy banao aur done ulta karo
    setTodos(todos.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTodo(id) {
    // jo id match na kare unhe rakho, match wala hat gaya
    setTodos(todos.filter(t => t.id !== id));
  }

  return (
    <div className="app">
      <h2>Todo List</h2>

      <form className="add-row" onSubmit={addtodo}>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a Task <3"
        />
        <button>Add</button>
      </form>

      <ul>
        {todos.map(t => (
          <li key={t.id}>
            <input type="checkbox" checked={t.done} onChange={() => togoleTodo(t.id)} />
            <span className={t.done ? "done" : ""}>{t.text}</span>
            <button onClick={() => deleteTodo(t.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <p>{todos.filter(t => !t.done).length} task(s) left</p>
    </div>
  );
}

export default App;
