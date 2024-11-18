"use client";
import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import { TodoType } from "@/types/componentTypes";

const Todo = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [isEditing, setIsEditing] = useState<number | null>(null);

  // Add a new todo
  const handleAddTodo = () => {
    if (!newTodo.trim()) return;
    if (isEditing !== null) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === isEditing ? { ...todo, text: newTodo } : todo
        )
      );
      setIsEditing(null);
    } else {
      setTodos((prev) => [
        ...prev,
        { id: Date.now(), text: newTodo, completed: false },
      ]);
    }
    setNewTodo("");
  };

  // Delete a todo
  const handleDeleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Toggle completed state
  const handleToggleCompleted = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Edit a todo
  const handleEditTodo = (id: number, text: string) => {
    setNewTodo(text);
    setIsEditing(id);
  };

  return (
    <div className="font-sans min-h-screen flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-10 mt-20">
        Todo App by{" "}
        <span className="text-teal-400 text-4xl font-serif">Areeba Zafar</span>
      </h1>

      {/* Input Form */}
      <div className="w-full max-w-md mb-4 flex justify-between gap-2 border p-2 rounded-lg">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          required
          placeholder="Add a task..."
          className="border-2 p-2 rounded w-80 border-teal-400 text-black"
        />
        <button
          onClick={handleAddTodo}
          className="bg-teal-500 text-white font-bold px-4 py-2 rounded"
        >
          {isEditing !== null ? <FaCheck size={20} /> : <FaPlus size={20} />}
        </button>
      </div>

      {/* Todo List */}
      <div className="w-full max-w-md border pt-2 px-2 rounded-lg">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500 font-semibold py-4">
            No tasks added yet
          </p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className={`flex flex-col justify-between items-start p-2 mb-2 rounded ${
                todo.completed ? "bg-lime-500" : "bg-red-500"
              }`}
              style={{
                minHeight: "50px",
                overflowWrap: "break-word",
                wordWrap: "break-word",
                overflow: "hidden",
              }}
            >
              <div className="w-full">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleCompleted(todo.id)}
                  className="mr-2"
                />
                <span
                  className={
                    todo.completed
                      ? "line-through text-black font-semibold"
                      : "text-black font-semibold"
                  }
                >
                  {todo.text}
                </span>
              </div>
              <div className="flex gap-2 mt-2 self-end">
                <button
                  onClick={() => handleEditTodo(todo.id, todo.text)}
                  className="text-blue-700 bg-white p-2 rounded-lg"
                >
                  <FaEdit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="text-red-500 bg-white p-2 rounded-lg"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Todo;