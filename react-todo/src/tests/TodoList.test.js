import { render, screen } from '@testing-library/react';
import TodoList from '../components/TodoList';
import '@testing-library/jest-dom';

describe('TodoList Component', () => {

  // Test 1: Initial Render
  test('renders the TodoList and initial todos', () => {
    render(<TodoList />);
    
    // Check if the main heading is present
    expect(screen.getByText(/My Todo List/i)).toBeInTheDocument();
    
    // Check if the initial 3 todos are rendered
    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(3); // Initial array has 3 items
    
    // Check for the text content of one of the initial todos
    expect(screen.getByText('Learn React Testing Library')).toBeInTheDocument();
  });
});