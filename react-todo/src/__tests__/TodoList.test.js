// src/__tests__/TodoList.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TodoList from "../TodoList";



describe("TodoList component", () => {
  test("renders initial demo todos", () => {
    render(<TodoList />);
    // Expect initial demo todos to appear
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Write tests")).toBeInTheDocument();

    // Expect there to be at least two list items
    const items = screen.getAllByRole("listitem");
    expect(items.length).toBeGreaterThanOrEqual(2);
  });

  test("adds a new todo via the form", () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText(/add new todo/i);
    const addButton = screen.getByRole("button", { name: /add todo/i });

    // Type a new todo and submit
    fireEvent.change(input, { target: { value: "New Todo Item" } });
    fireEvent.click(addButton);

    // New todo should appear in the list
    expect(screen.getByText("New Todo Item")).toBeInTheDocument();

    // The input should be cleared after adding (common UX)
    expect(input.value).toBe("");
  });

  test("toggles a todo's completion status when clicked", () => {
    render(<TodoList />);

    const todo = screen.getByText("Learn React");
    // Find the parent listitem (assumed structure: <li><span>Todo text</span> ...</li>)
    const listItem = todo.closest("li");
    expect(listItem).toBeInTheDocument();

    // Initially should NOT have the completed class
    expect(listItem).not.toHaveClass("completed");

    // Click the todo to toggle completion
    fireEvent.click(todo);

    // Now it should have the completed class
    expect(listItem).toHaveClass("completed");

    // Click again to un-toggle
    fireEvent.click(todo);
    expect(listItem).not.toHaveClass("completed");
  });

  test("deletes a todo when its Delete button is clicked", () => {
    render(<TodoList />);

    // Confirm the todo exists first
    const todoText = "Write tests";
    const todoNode = screen.getByText(todoText);
    expect(todoNode).toBeInTheDocument();

    // Find the delete button inside the same list item
    const listItem = todoNode.closest("li");
    expect(listItem).toBeInTheDocument();
    const deleteButton = within(listItem).getByRole("button", { name: /delete/i });

    // Click delete
    fireEvent.click(deleteButton);

    // Expect the todo to be removed from the document
    expect(screen.queryByText(todoText)).not.toBeInTheDocument();
  });
});
