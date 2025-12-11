import React, { useState } from 'react';

const AddTodoForm = ({ onAdd }) => {
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      onAdd(newTodo.trim());
      setNewTodo(''); // Clear input after submission
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo..."
        // Use a test-specific attribute for easy selection in tests
        data-testid="new-todo-input"
      />
      <button type="submit" data-testid="add-todo-button">
        Add Todo
      </button>
    </form>
  );
};

export default AddTodoForm;