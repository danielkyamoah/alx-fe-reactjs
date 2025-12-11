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

// Test 2: Adding a new todo
  test('allows a user to add a new todo item', async () => {
    render(<TodoList />);
    
    // 1. Get elements using their test-ids
    const input = screen.getByTestId('new-todo-input');
    const addButton = screen.getByTestId('add-todo-button');
    const list = screen.getByTestId('todo-list');

    const newTodoText = 'Walk the dog';

    // 2. Simulate user input
    fireEvent.change(input, { target: { value: newTodoText } });
    
    // Check if input value changed
    expect(input.value).toBe(newTodoText);

    // 3. Simulate form submission
    fireEvent.click(addButton);

    // 4. Verify the new todo is in the document
    // We use findByText which waits for the element to appear (async)
    const newTodoItem = await screen.findByText(newTodoText);
    expect(newTodoItem).toBeInTheDocument();
    
    // 5. Verify the total number of items has increased (3 initial + 1 new = 4)
    expect(list.children.length).toBe(4); 
    
    // 6. Verify input is cleared
    expect(input.value).toBe('');
  });

  // Test 3: Toggling a todo item's completion status
  test('allows a user to toggle a todo item', () => {
    render(<TodoList />);
    
    // The second initial todo (id: 2) 'Write TodoList tests' is set to completed: true
    const completedTodo = screen.getByText('Write TodoList tests');
    

    expect(completedTodo).toHaveStyle('text-decoration: line-through');
    
    // 1. Simulate click to toggle it to not completed
    fireEvent.click(completedTodo);
    
    // 2. Verify the style has changed (toggled to incomplete)
    // The element should now NOT have the line-through style
    expect(completedTodo).toHaveStyle('text-decoration: none');
    
    // 3. Simulate another click to toggle it back to completed
    fireEvent.click(completedTodo);

    // 4. Verify the style is back to line-through
    expect(completedTodo).toHaveStyle('text-decoration: line-through');
  });

  // Test 4: Deleting a todo item
  test('allows a user to delete a todo item', () => {
    render(<TodoList />);
    
    const todoTextToDelete = 'Deploy the app';

    // 1. Verify the todo is initially present
    const todoToDelete = screen.getByText(todoTextToDelete);
    expect(todoToDelete).toBeInTheDocument();
    
    
    const deleteButton = screen.getByTestId('delete-todo-3');

    // 3. Simulate click on the delete button
    fireEvent.click(deleteButton);

    // 4. Verify the todo is no longer in the document
    // We use queryByText because we expect the element NOT to be found
    expect(screen.queryByText(todoTextToDelete)).not.toBeInTheDocument();
    
    // 5. Verify the total number of items has decreased (3 initial - 1 deleted = 2)
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });