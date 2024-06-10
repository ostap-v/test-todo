import React from 'react';

type Todo = {
  id: string;
  task: string;
  description?: string;
  isCompleted: boolean;
};

type TodoProps = {
  todo: Todo;
  handleDeleteTodo: (id: string) => void;
  handleCheckTodo: (id: string) => void;
  handleSelectTodo: (id: string) => void;
  isSelected: boolean;
};

export const Row = ({
  todo: { task, description, isCompleted, id },
  handleDeleteTodo,
  handleCheckTodo,
  handleSelectTodo,
  isSelected,
}: TodoProps) => {
  return (
    <div
      className={`flex flex-col transition duration-200 p-4 rounded-lg w-full ${
        isCompleted ? 'bg-gray-100' : 'bg-white'
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <p
          className={`text-lg font-semibold ${
            isCompleted ? 'text-gray-500 line-through' : 'text-gray-900'
          }`}
        >
          {task}
        </p>
        <div className="flex space-x-2 items-center">
          <input
            className="h-5 w-5"
            type="checkbox"
            checked={isSelected}
            onChange={() => handleSelectTodo(id)}
          />
          <button
            className="h-7 w-7 bg-red-500 text-white rounded hover:bg-red-700 flex item-center text-white font-semibold transition duration-75 rounded justify-center"
            aria-label="Delete a todo"
            onClick={() => handleDeleteTodo(id)}
          >
            x
          </button>
          <input
            className="h-5 w-5"
            type="checkbox"
            checked={isCompleted}
            onChange={() => handleCheckTodo(id)}
          />
        </div>
      </div>
      {description && <p className="text-sm text-gray-600">{description}</p>}
    </div>
  );
};
