import React from 'react';
import { useState, ChangeEvent, FormEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Row } from './Row';
import { data } from '../todos';
import { AddTodo } from './AddTodo';

type Todo = {
  id: string;
  task: string;
  description?: string;
  isCompleted: boolean;
};

export const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>(data);
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTodos, setSelectedTodos] = useState<string[]>([]);

  const todoLength = todos.length;
  const hasTodos = todos.length > 0;
  const remainingTodos = todos.filter((todo) => !todo.isCompleted).length;

  const handleAddTodo = (todo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, todo]);
    setTask('');
    setDescription('');
  };

  const handleSubmitTodo = (e: FormEvent) => {
    e.preventDefault();
    const newTodo: Todo = {
      id: uuidv4(),
      task: task,
      description: description,
      isCompleted: false,
    };
    if (task) {
      handleAddTodo(newTodo);
    }
  };

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    if (name === 'task') {
      setTask(value);
    } else if (name === 'description') {
      setDescription(value);
    }
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleCheckTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const handleSelectTodo = (id: string) => {
    setSelectedTodos((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteSelected = () => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => !selectedTodos.includes(todo.id))
    );
    setSelectedTodos([]);
  };

  return (
    <section className="w-full lg:w-1/2 xl:w-10/12 max-w-2xl flex flex-col items-center">
      <AddTodo
        task={task}
        description={description}
        handleSubmitTodo={handleSubmitTodo}
        handleChange={handleChange}
      />
      <ul className="space-y-2 max-h-96 w-full overflow-y-auto mt-4">
        {todos.map((todo) => (
          <Row
            key={todo.id}
            todo={todo}
            handleDeleteTodo={handleDeleteTodo}
            handleCheckTodo={handleCheckTodo}
            handleSelectTodo={handleSelectTodo}
            isSelected={selectedTodos.includes(todo.id)}
          />
        ))}
      </ul>
      {!hasTodos && (
        <p className="mb-5 text-xl text-red-500">Please add a todo!</p>
      )}
      {hasTodos && (
        <div className="mt-4 flex justify-between w-full">
          <p>{`${remainingTodos} of ${todoLength} todos remaining`}</p>
          <button
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-700"
            onClick={handleDeleteSelected}
            disabled={selectedTodos.length === 0}
          >
            Delete Selected
          </button>
        </div>
      )}
    </section>
  );
};
