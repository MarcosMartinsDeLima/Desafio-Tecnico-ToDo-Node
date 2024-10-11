import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import axios from "axios";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/task/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  const deleteTodo = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/task/deleteById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  const toggleComplete = async (id,newStatus) => {
    try {
      if(newStatus == false){
        newStatus = true
      }else{
        newStatus = false
      }
      const token = localStorage.getItem('token'); 

      await axios.patch(`http://localhost:8000/task/updateStatusById/${id}`, {
        status: newStatus
      }, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });


    } catch (error) {
      console.error("Erro ao atualizar status da tarefa:", error);
    }
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
    <div className="TodoWrapper">
      <h1>Crie suas tarefas</h1>
      <TodoForm addTodo={addTodo} />
      {todos && todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};
