import React from 'react';
import { ChangeEvent, FormEvent } from 'react';

export type AddTodoProps = {
  task: string;
  description?: string;
  handleSubmitTodo: (e: FormEvent) => void;
  handleChange: (e: ChangeEvent) => void;
};

export const AddTodo = ({
  task,
  handleSubmitTodo,
  handleChange,
}: AddTodoProps) => {
  return (
    <form
      className="flex items-center w-full mb-4 gap-2"
      onSubmit={handleSubmitTodo}
    >
      <input
        className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
        type="text"
        name="task"
        value={task}
        onChange={handleChange}
        placeholder="Add a new task"
      />
      <button
        type="submit"
        aria-label="Add todo"
        className="px-4 py-1 bg-primary text-white rounded-full hover:bg-primary/90 transition"
      >
        Add
      </button>
    </form>
  );
};
