import React, { useState, useCallback } from 'react';
import AddTodoForm from './AddTodoForm';

const initialTodos = [
  { id: 1, text: 'Learn React Testing Library', completed: false },
  { id: 2, text: 'Write TodoList tests', completed: true },
  { id: 3, text: 'Deploy the app', completed: false },
];

let nextId = initialTodos.length + 1;

const TodoList = () => {
  const [todos, setTodos] = useState(initialTodos);

  // Method to add a new todo
  const addTodo = useCallback((text) => {
    const newTodo = {
      id: nextId++,
      text,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }, []);

  // Method to toggle a todo's completion status
  const toggleTodo = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  // Method to delete a todo
  const deleteTodo = useCallback((id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  return (
    <div>
      <h1>My Todo List</h1>
      <AddTodoForm onAdd={addTodo} />
      
      {/* List of Todos */}
      <ul data-testid="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              cursor: 'pointer',
            }}
          >
            {/* Toggle by clicking the text */}
            <span onClick={() => toggleTodo(todo.id)} data-testid={`todo-text-${todo.id}`}>
              {todo.text}
            </span>
            
            {/* Delete button */}
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ marginLeft: '10px' }}
              data-testid={`delete-todo-${todo.id}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      
      {/* Display count of incomplete todos */}
      <p>
        Pending Todos: {todos.filter(todo => !todo.completed).length}
      </p>
    </div>
  );
};

export default TodoList;