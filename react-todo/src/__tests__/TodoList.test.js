import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../TodoList';
import '@testing-library/jest-dom/extend-expect';

describe('TodoList Component', () => {
  it('renders correctly with initial todos', () => {
    render(<TodoList />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Deploy to Netlify')).toBeInTheDocument();
  });

  it('adds a new todo', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText('Add a new todo');
    const addButton = screen.getByRole('button', { name: /add todo/i });

    fireEvent.change(input, { target: { value: 'New Todo Item' } });
    fireEvent.click(addButton);

    expect(screen.getByText('New Todo Item')).toBeInTheDocument();
  });

  it('toggles todo completion', () => {
    render(<TodoList />);
    const learnReactTodo = screen.getByText('Learn React');

    // Initially not completed
    expect(learnReactTodo).not.toHaveStyle('text-decoration: line-through');

    fireEvent.click(learnReactTodo);

    // After click, it should be completed
    expect(learnReactTodo).toHaveStyle('text-decoration: line-through');

    fireEvent.click(learnReactTodo);

    // After another click, it should be not completed again
    expect(learnReactTodo).not.toHaveStyle('text-decoration: line-through');
  });

  it('deletes a todo', () => {
    render(<TodoList />);
    const deployTodo = screen.getByText('Deploy to Netlify');
    expect(deployTodo).toBeInTheDocument();

    const todoItem = deployTodo.closest('li');
    const deleteButton = screen.getByRole('button', { name: /delete/i,  container: todoItem });
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);

    expect(deployTodo).not.toBeInTheDocument();
  });
});
